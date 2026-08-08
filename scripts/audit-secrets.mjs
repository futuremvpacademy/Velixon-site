import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const scanRoots = [
  ".github",
  "dist",
  "docs",
  "netlify",
  "public",
  "scripts",
  "src",
  "tests",
  "velixon-video/src"
];
const topLevelFiles = [
  ".env.example",
  ".gitignore",
  "astro.config.mjs",
  "netlify.toml",
  "package.json",
  "package-lock.json",
  "README.md",
  "tsconfig.json"
];
const textExtensions = new Set([
  ".astro",
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".toml",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yaml",
  ".yml"
]);
const credentialFileNames = new Set([
  ".env",
  ".env.local",
  ".env.production",
  "credentials.json",
  "service-account.json"
]);
const credentialExtensions = new Set([
  ".jks",
  ".key",
  ".keystore",
  ".p12",
  ".pem",
  ".pfx"
]);
const secretPatterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/g],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35}\b/g],
  ["GitHub token", /\b(?:gh[pousr]_[A-Za-z0-9_]{30,}|github_pat_[A-Za-z0-9_]{50,})\b/g],
  ["OpenAI API key", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/g],
  ["Stripe secret key", /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}\b/g],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g],
  ["Resend API key", /\bre_[A-Za-z0-9_-]{20,}\b/g],
  ["SendGrid API key", /\bSG\.[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{32,}\b/g],
  ["JWT bearer token", /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/g],
  ["credentialed URL", /\bhttps?:\/\/[^/\s:@]+:[^/\s@]+@/g]
];
const failures = [];
let scannedFiles = 0;

const exists = async (path) => stat(path).then(() => true).catch(() => false);

const walk = async (directory) => {
  if (!(await exists(directory))) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
};

const candidates = [];
for (const directory of scanRoots) candidates.push(...await walk(join(root, directory)));
for (const name of topLevelFiles) {
  const path = join(root, name);
  if (await exists(path)) candidates.push(path);
}

for (const file of [...new Set(candidates)]) {
  const name = relative(root, file);
  const extension = extname(file).toLowerCase();
  const basename = name.split("/").at(-1) || "";

  if (name.startsWith("public/") || name.startsWith("dist/")) {
    if (credentialFileNames.has(basename) || credentialExtensions.has(extension)) {
      failures.push(`${name}: credential-shaped file is inside a deployable directory`);
    }
  }
  if (name.startsWith("dist/") && extension === ".map") {
    failures.push(`${name}: production source map is publicly deployable`);
  }
  if (!textExtensions.has(extension) && !basename.startsWith(".env")) continue;

  const fileInfo = await stat(file);
  if (fileInfo.size > 2_000_000) continue;
  const content = await readFile(file, "utf8");
  scannedFiles += 1;

  if (name !== "scripts/audit-secrets.mjs") {
    for (const [label, pattern] of secretPatterns) {
      pattern.lastIndex = 0;
      for (const match of content.matchAll(pattern)) {
        const testCredentialFixture = name.startsWith("tests/")
          && label === "credentialed URL"
          && match[0] === "https://user:password@";
        if (testCredentialFixture) continue;
        failures.push(`${name}: contains a value matching ${label}`);
        break;
      }
    }
  }
}

const environmentExample = await readFile(join(root, ".env.example"), "utf8");
for (const [index, line] of environmentExample.split(/\r?\n/).entries()) {
  const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
  if (!match) continue;
  const [, variable, value] = match;
  if (variable === "PUBLIC_AUTOMATION_AUDIT_HERO_VARIANT" && /^[ABC]$/.test(value)) continue;
  if (value.trim()) failures.push(`.env.example:${index + 1}: ${variable} must not contain a real value`);
}

const netlifyConfig = await readFile(join(root, "netlify.toml"), "utf8");
if (/PUBLIC_GOOGLE_SITE_VERIFICATION\s*=\s*["'][^"']+["']/.test(netlifyConfig)) {
  failures.push("netlify.toml: Search Console verification must come from deployment configuration");
}

if (failures.length > 0) {
  console.error(`Secret audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Secret audit: ${scannedFiles} source, configuration, documentation, test, and build files contain no detected private credentials or public source maps.`);
