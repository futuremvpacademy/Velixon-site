import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const failures = [];
let htmlCount = 0;

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }))).flat();
};

const files = await walk(root);
for (const file of files) {
  if (extname(file) !== ".html") continue;
  if (basename(file) !== "index.html" && basename(file) !== "404.html") continue;
  htmlCount += 1;
  const name = relative(root, file);
  const html = await readFile(file, "utf8");
  const cspTag = html.match(/<meta\s+[^>]*http-equiv=["']content-security-policy["'][^>]*>/i)?.[0] || "";
  const cspIndex = html.indexOf(cspTag);
  const csp = cspTag.match(/\scontent="([^"]+)"/i)?.[1] || "";
  const scriptDirective = csp.split(";").map((directive) => directive.trim()).find((directive) => directive.startsWith("script-src ")) || "";

  if (!csp) failures.push(`${name}: missing generated Content Security Policy`);
  if (!/'sha384-[A-Za-z0-9+/=]+'/.test(scriptDirective)) failures.push(`${name}: script policy has no generated SHA-384 hashes`);
  if (scriptDirective.includes("'unsafe-inline'")) failures.push(`${name}: script policy permits unsafe-inline`);
  if (!csp.includes("object-src 'none'")) failures.push(`${name}: object-src is not disabled`);
  if (!csp.includes("form-action 'self'")) failures.push(`${name}: form-action is not same-origin`);
  if (/<[^>]+\son[a-z]+\s*=/i.test(html)) failures.push(`${name}: inline event-handler attribute found`);
  if (/(?:href|src)\s*=\s*["']\s*javascript:/i.test(html)) failures.push(`${name}: javascript URL found`);

  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attributes = match[1] || "";
    const content = match[2] || "";
    if (/\ssrc=["'][^"']+["']/i.test(attributes)) continue;

    const type = attributes.match(/\stype=["']([^"']+)["']/i)?.[1]?.toLowerCase() || "";
    const executable = !type || type === "module" || /(?:java|ecma)script/.test(type);
    if (executable && (match.index ?? 0) < cspIndex) {
      failures.push(`${name}: executable inline script appears before the CSP meta policy`);
      continue;
    }
    if ((match.index ?? 0) < cspIndex) continue;

    const digest = createHash("sha384").update(content).digest("base64");
    if (!scriptDirective.includes(`'sha384-${digest}'`)) {
      failures.push(`${name}: inline script is missing its exact CSP hash`);
    }
  }

  for (const match of html.matchAll(/<script\b[^>]*\ssrc=["']([^"']+)["'][^>]*>/gi)) {
    const source = match[1] || "";
    if (
      source.startsWith("/")
      || source.startsWith("https://www.googletagmanager.com/")
      || source.startsWith("https://www.clarity.ms/")
    ) continue;
    failures.push(`${name}: unapproved script source ${source}`);
  }
}

if (htmlCount === 0) failures.push("No generated HTML files were found.");

if (failures.length > 0) {
  console.error(`Security audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Security audit: ${htmlCount} generated HTML pages use hashed scripts, allowlisted sources, same-origin forms, and no inline handlers or javascript URLs.`);
