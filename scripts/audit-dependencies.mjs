import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const videoWorkspace = fileURLToPath(new URL("../velixon-video/", import.meta.url));
const allowedImageSizeAdvisories = new Set([
  "https://github.com/advisories/GHSA-w3rx-r6r6-pgpr",
  "https://github.com/advisories/GHSA-5p2g-fcmc-qvqq"
]);

const runAudit = (cwd) => {
  const npmExecPath = process.env.npm_execpath;
  const command = npmExecPath ? process.execPath : "npm";
  const args = npmExecPath
    ? [npmExecPath, "audit", "--audit-level=low", "--json"]
    : ["audit", "--audit-level=low", "--json"];
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, npm_config_loglevel: "silent" },
    maxBuffer: 10 * 1024 * 1024
  });

  if (result.error) throw result.error;
  const output = result.stdout || "";
  const start = output.indexOf("{");
  const end = output.lastIndexOf("}");
  if (start < 0 || end < start) {
    throw new Error(result.stderr?.trim() || "npm audit did not return a JSON report");
  }

  return { report: JSON.parse(output.slice(start, end + 1)), status: result.status ?? 1 };
};

const sameStrings = (value, expected) =>
  Array.isArray(value)
  && value.length === expected.length
  && value.every((item, index) => item === expected[index]);

const isNarrowNetlifyException = async (report) => {
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  if (packageJson.dependencies?.["@netlify/blobs"] !== "10.7.12") return false;

  const vulnerabilities = report.vulnerabilities || {};
  const names = Object.keys(vulnerabilities).sort();
  if (!sameStrings(names, ["@netlify/blobs", "@netlify/dev-utils", "image-size"])) return false;

  const blobs = vulnerabilities["@netlify/blobs"];
  const devUtils = vulnerabilities["@netlify/dev-utils"];
  const imageSize = vulnerabilities["image-size"];
  if (!sameStrings(blobs?.via, ["@netlify/dev-utils"])) return false;
  if (!sameStrings(devUtils?.via, ["image-size"])) return false;
  if (!Array.isArray(imageSize?.via) || imageSize.via.length !== allowedImageSizeAdvisories.size) return false;
  if (!imageSize.via.every((item) =>
    item
    && typeof item === "object"
    && item.name === "image-size"
    && allowedImageSizeAdvisories.has(item.url)
  )) return false;
  if (!sameStrings(imageSize.nodes, ["node_modules/image-size"])) return false;

  return report.metadata?.vulnerabilities?.total === 3;
};

const rootAudit = runAudit(root);
if (rootAudit.status !== 0) {
  if (!(await isNarrowNetlifyException(rootAudit.report))) {
    console.error(JSON.stringify(rootAudit.report, null, 2));
    throw new Error("Root dependency audit found a non-allowlisted advisory.");
  }
  console.warn(
    "Dependency audit: accepted the two documented image-size advisories reachable only through @netlify/blobs development utilities; all other root advisories remain blocking."
  );
} else {
  console.log("Dependency audit: root workspace has no reported advisories.");
}

const videoAudit = runAudit(videoWorkspace);
if (videoAudit.status !== 0 || videoAudit.report.metadata?.vulnerabilities?.total !== 0) {
  console.error(JSON.stringify(videoAudit.report, null, 2));
  throw new Error("Video workspace dependency audit found an advisory.");
}
console.log("Dependency audit: video workspace has no reported advisories.");
