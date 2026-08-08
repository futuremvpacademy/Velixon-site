import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const git = process.env.GIT_BINARY || "git";
const bounded = (pattern) => `(^|[^A-Za-z0-9_])(${pattern})([^A-Za-z0-9_]|$)`;
const secretPattern = [
  "-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----",
  bounded("AKIA[0-9A-Z]{16}"),
  bounded("AIza[0-9A-Za-z_-]{35}"),
  bounded("gh[pousr]_[A-Za-z0-9_]{30,}"),
  bounded("github_pat_[A-Za-z0-9_]{50,}"),
  bounded("sk-(proj-)?[A-Za-z0-9_-]{20,}"),
  bounded("(sk|rk)_(live|test)_[A-Za-z0-9]{16,}"),
  bounded("xox[baprs]-[A-Za-z0-9-]{10,}"),
  bounded("re_[A-Za-z0-9_-]{20,}"),
  bounded("SG\\.[A-Za-z0-9_-]{16,}\\.[A-Za-z0-9_-]{32,}"),
  bounded("eyJ[A-Za-z0-9_-]{20,}\\.[A-Za-z0-9_-]{20,}\\.[A-Za-z0-9_-]{20,}")
].join("|");

const runGit = (args) => spawnSync(git, args, {
  cwd: root,
  encoding: "utf8",
  env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },
  maxBuffer: 20 * 1024 * 1024
});

const revisions = runGit(["rev-list", "--all"]);
if (revisions.status !== 0) {
  console.error("Secret-history audit could not read repository history. Set GIT_BINARY to a working Git executable.");
  process.exit(1);
}

const commits = revisions.stdout.split(/\r?\n/).filter(Boolean);
if (commits.length === 0) {
  console.error("Secret-history audit found no commits to inspect.");
  process.exit(1);
}

const grep = runGit(["grep", "-I", "-l", "-E", "-e", secretPattern, ...commits, "--", "."]);
if (grep.status !== 0 && grep.status !== 1) {
  console.error("Secret-history audit could not scan repository objects.");
  process.exit(1);
}

const secretHits = grep.status === 0 ? grep.stdout.split(/\r?\n/).filter(Boolean) : [];
const paths = runGit(["log", "--all", "--name-only", "--pretty=format:"]);
if (paths.status !== 0) {
  console.error("Secret-history audit could not inspect committed file names.");
  process.exit(1);
}
const privateEnvironmentFiles = [...new Set(paths.stdout.split(/\r?\n/)
  .filter((path) => /(^|\/)\.env($|\.)/.test(path) && !/(^|\/)\.env\.example$/.test(path)))];

if (secretHits.length > 0 || privateEnvironmentFiles.length > 0) {
  console.error(`Secret-history audit failed with ${secretHits.length + privateEnvironmentFiles.length} issue(s):`);
  for (const hit of secretHits) console.error(`- ${hit}: contains a high-confidence credential pattern`);
  for (const path of privateEnvironmentFiles) console.error(`- ${path}: private environment file was committed`);
  process.exit(1);
}

console.log(`Secret-history audit: ${commits.length} commits contain no detected private credentials or committed private environment files.`);
