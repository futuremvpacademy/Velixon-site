import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const dist = path.join(root, "dist");
const siteOrigin = "https://velixon.net";
const siteHost = "velixon.net";
const endpoint = "https://api.indexnow.org/indexnow";
const indexNowKey = "0ee966b99042118dcf10a3ec65908121";
const keyFileName = `${indexNowKey}.txt`;
const keyLocation = `${siteOrigin}/${keyFileName}`;
const requestTimeoutMs = 15_000;

const usage = `
Submit only newly published or materially updated canonical URLs to IndexNow.

Dry run (default):
  node scripts/submit-indexnow.mjs --url /services/ai-automation/ --url /case-studies/

Submit after the production deploy is live:
  node scripts/submit-indexnow.mjs --url /services/ai-automation/ --submit

Read one path or absolute URL per line:
  node scripts/submit-indexnow.mjs --url-file changed-urls.txt --submit

Options:
  --url <path-or-url>   Add a changed/new URL. Repeat for multiple URLs.
  --url-file <file>     Read changed/new URLs from a UTF-8 text file. Lines beginning with # are ignored.
  --submit              Verify the live key and URLs, then send the batch. Without this flag, no request is sent.
  --help                Show this help.
`;

function parseArguments(argv) {
  const urls = [];
  const urlFiles = [];
  let submit = false;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === "--help" || argument === "-h") return { help: true, submit, urls, urlFiles };
    if (argument === "--submit") {
      submit = true;
      continue;
    }

    if (argument === "--url" || argument === "--url-file") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) throw new Error(`${argument} requires a value.`);
      (argument === "--url" ? urls : urlFiles).push(value);
      index += 1;
      continue;
    }

    if (argument.startsWith("--url=")) {
      urls.push(argument.slice("--url=".length));
      continue;
    }

    if (argument.startsWith("--url-file=")) {
      urlFiles.push(argument.slice("--url-file=".length));
      continue;
    }

    throw new Error(`Unknown option: ${argument}`);
  }

  return { help: false, submit, urls, urlFiles };
}

const decodeXml = (value) => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", "\"")
  .replaceAll("&apos;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">");

async function readCanonicalSitemapUrls() {
  let entries;
  try {
    entries = await readdir(dist, { withFileTypes: true });
  } catch {
    throw new Error("dist/ is missing. Run npm run build before preparing an IndexNow submission.");
  }

  const sitemapFiles = entries
    .filter((entry) => entry.isFile() && /^sitemap-\d+\.xml$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  if (sitemapFiles.length === 0) {
    throw new Error("No generated page sitemap was found in dist/. Run npm run build first.");
  }

  const canonicalUrls = new Set();
  for (const fileName of sitemapFiles) {
    const xml = await readFile(path.join(dist, fileName), "utf8");
    for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
      const value = decodeXml(match[1].trim());
      const url = new URL(value);
      if (url.origin !== siteOrigin) {
        throw new Error(`${fileName} contains a URL outside ${siteOrigin}: ${value}`);
      }
      canonicalUrls.add(url.href);
    }
  }

  return canonicalUrls;
}

async function readRequestedUrls(arguments_) {
  const values = [...arguments_.urls];

  for (const fileName of arguments_.urlFiles) {
    const source = await readFile(path.resolve(root, fileName), "utf8");
    for (const line of source.split(/\r?\n/)) {
      const value = line.trim();
      if (value && !value.startsWith("#")) values.push(value);
    }
  }

  return values;
}

function normalizeRequestedUrls(values, canonicalUrls) {
  if (values.length === 0) {
    throw new Error("No changed/new URLs were provided. Use --url or --url-file; bulk submission of the whole site is intentionally disabled.");
  }

  const normalized = new Set();
  for (const value of values) {
    const url = new URL(value, `${siteOrigin}/`);
    if (url.origin !== siteOrigin) throw new Error(`URL must belong to ${siteOrigin}: ${value}`);
    if (url.username || url.password || url.search || url.hash) {
      throw new Error(`URL must be a clean canonical without credentials, query parameters, or fragments: ${value}`);
    }
    if (!canonicalUrls.has(url.href)) {
      throw new Error(`URL is not present in the generated canonical sitemap: ${url.href}`);
    }
    normalized.add(url.href);
  }

  if (normalized.size > 10_000) throw new Error("IndexNow accepts at most 10,000 URLs per request.");
  return [...normalized].sort();
}

async function fetchWithTimeout(url, options = {}) {
  return fetch(url, { ...options, signal: AbortSignal.timeout(requestTimeoutMs) });
}

async function verifyProductionKey() {
  const response = await fetchWithTimeout(keyLocation, {
    headers: { Accept: "text/plain" },
    redirect: "error"
  });
  const body = (await response.text()).trim();
  if (!response.ok || body !== indexNowKey) {
    throw new Error(`The live IndexNow key is not ready at ${keyLocation} (HTTP ${response.status}). Deploy the current build before submitting.`);
  }
}

function getHtmlAttribute(tag, attribute) {
  const match = tag.match(new RegExp(`\\b${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
  return match?.[1] ?? match?.[2] ?? "";
}

async function verifyProductionUrl(url) {
  const response = await fetchWithTimeout(url, {
    headers: { Accept: "text/html" },
    redirect: "manual"
  });
  if (response.status !== 200) {
    throw new Error(`Changed URL is not live as a canonical 200 response: ${url} (HTTP ${response.status}).`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("text/html")) {
    throw new Error(`Changed URL did not return HTML: ${url} (${contentType || "missing content type"}).`);
  }

  const html = await response.text();
  const canonicalTag = (html.match(/<link\b[^>]*rel=(?:"canonical"|'canonical')[^>]*>/i) ?? [""])[0];
  const canonical = getHtmlAttribute(canonicalTag, "href");
  if (canonical !== url) {
    throw new Error(`Changed URL does not declare itself canonical in production: ${url} (found ${canonical || "no canonical"}).`);
  }

  const robotsTag = (html.match(/<meta\b[^>]*name=(?:"robots"|'robots')[^>]*>/i) ?? [""])[0];
  const robots = getHtmlAttribute(robotsTag, "content").toLowerCase();
  if (!robots || robots.includes("noindex")) {
    throw new Error(`Changed URL is not indexable in production: ${url} (robots: ${robots || "missing"}).`);
  }
}

async function verifyProductionUrls(urls) {
  const batchSize = 10;
  for (let index = 0; index < urls.length; index += batchSize) {
    await Promise.all(urls.slice(index, index + batchSize).map(verifyProductionUrl));
  }
}

async function submitUrls(urls) {
  const payload = {
    host: siteHost,
    key: indexNowKey,
    keyLocation,
    urlList: urls
  };

  const response = await fetchWithTimeout(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  if (response.status !== 200 && response.status !== 202) {
    const body = (await response.text()).trim();
    throw new Error(`IndexNow rejected the request (HTTP ${response.status})${body ? `: ${body.slice(0, 500)}` : "."}`);
  }

  console.log(`IndexNow accepted ${urls.length} changed/new canonical URL${urls.length === 1 ? "" : "s"} (HTTP ${response.status}).`);
  console.log("Acceptance confirms receipt only; participating search engines still decide whether and when to crawl or index each URL.");
}

async function main() {
  const arguments_ = parseArguments(process.argv.slice(2));
  if (arguments_.help) {
    console.log(usage.trim());
    return;
  }

  const canonicalUrls = await readCanonicalSitemapUrls();
  const requestedValues = await readRequestedUrls(arguments_);
  const urls = normalizeRequestedUrls(requestedValues, canonicalUrls);

  if (!arguments_.submit) {
    console.log(`IndexNow dry run: ${urls.length} changed/new canonical URL${urls.length === 1 ? "" : "s"} validated against the generated sitemap.`);
    urls.forEach((url) => console.log(`- ${url}`));
    console.log("No network request was sent. Add --submit only after these URLs are live in the production deployment.");
    return;
  }

  await verifyProductionKey();
  await verifyProductionUrls(urls);
  await submitUrls(urls);
}

main().catch((error) => {
  console.error(`IndexNow submission failed: ${error.message}`);
  process.exitCode = 1;
});
