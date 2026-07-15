import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const dist = path.join(root, "dist");
const siteOrigin = "https://velixon.net";
const errors = [];
const warnings = [];

const decodeHtml = (value = "") => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">");

const stripTags = (value = "") => decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());

async function collectFiles(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(filePath, extension);
    return !extension || filePath.endsWith(extension) ? [filePath] : [];
  }));
  return nested.flat();
}

function routeForFile(filePath) {
  const relative = path.relative(dist, filePath).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (relative === "404.html") return "/404.html";
  return `/${relative.replace(/\/index\.html$/, "/")}`;
}

function getAttribute(tag, attribute) {
  const match = tag.match(new RegExp(`\\b${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
  return decodeHtml(match?.[1] ?? match?.[2] ?? "");
}

function getMeta(html, attribute, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) => getAttribute(candidate, attribute).toLowerCase() === value.toLowerCase());
  return tag ? getAttribute(tag, "content") : "";
}

function canonicalRoute(pathname) {
  if (pathname === "/") return "/";
  if (/\.[a-z0-9]+$/i.test(pathname)) return pathname;
  return `${pathname.replace(/\/+$/, "")}/`;
}

function duplicateValues(pages, field) {
  const grouped = new Map();
  for (const page of pages) {
    const value = page[field];
    if (!value) continue;
    grouped.set(value, [...(grouped.get(value) ?? []), page.route]);
  }
  return [...grouped.entries()].filter(([, routes]) => routes.length > 1);
}

function schemaTypes(value, types = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item) => schemaTypes(item, types));
  } else if (value && typeof value === "object") {
    const type = value["@type"];
    (Array.isArray(type) ? type : [type]).filter(Boolean).forEach((item) => types.add(item));
    Object.values(value).forEach((item) => schemaTypes(item, types));
  }
  return types;
}

function existsRoute(route, routes) {
  if (routes.has(route)) return true;
  if (route.endsWith("/")) return routes.has(`${route}index.html`);
  return routes.has(canonicalRoute(route));
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

await access(dist).catch(() => {
  throw new Error("dist/ does not exist. Run npm run build before npm run audit:seo.");
});

const generatedFiles = (await collectFiles(dist)).sort();
for (const filePath of generatedFiles) {
  const relative = path.relative(dist, filePath).split(path.sep).join("/");
  if (/ [0-9]+\.[^/]+$/.test(relative)) errors.push(`stale conflict-copy output detected: ${relative}`);
}

const htmlFiles = generatedFiles.filter((filePath) => filePath.endsWith(".html"));
const routes = new Set(htmlFiles.map(routeForFile));
const pages = [];

for (const filePath of htmlFiles) {
  const route = routeForFile(filePath);
  const html = await readFile(filePath, "utf8");
  const title = stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
  const description = getMeta(html, "name", "description");
  const robots = getMeta(html, "name", "robots").toLowerCase();
  const canonicalTag = (html.match(/<link\b[^>]*rel=(?:"canonical"|'canonical')[^>]*>/i) ?? [""])[0];
  const canonical = getAttribute(canonicalTag, "href");
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const indexable = !robots.includes("noindex") && route !== "/404.html";
  const ids = new Set((html.match(/\bid=(?:"[^"]+"|'[^']+')/gi) ?? []).map((item) => getAttribute(`<x ${item}>`, "id")));
  const schemaScripts = [...html.matchAll(/<script\b[^>]*type=(?:"application\/ld\+json"|'application\/ld\+json')[^>]*>([\s\S]*?)<\/script>/gi)];
  const schemas = [];

  for (const [, source] of schemaScripts) {
    try {
      schemas.push(JSON.parse(source));
    } catch (error) {
      errors.push(`${route}: invalid JSON-LD (${error.message})`);
    }
  }

  if (!title) errors.push(`${route}: missing title`);
  if (!description) errors.push(`${route}: missing meta description`);
  if (!robots) errors.push(`${route}: missing robots directive`);
  if (!canonical) errors.push(`${route}: missing canonical URL`);
  if (h1Count !== 1) errors.push(`${route}: expected one H1, found ${h1Count}`);
  if (!html.includes('id="main-content"')) errors.push(`${route}: missing #main-content landmark target`);
  if (!html.includes('href="#main-content"')) errors.push(`${route}: missing skip link`);

  if (indexable) {
    const expectedCanonical = new URL(canonicalRoute(route), siteOrigin).href;
    if (canonical !== expectedCanonical) errors.push(`${route}: canonical is ${canonical || "missing"}; expected ${expectedCanonical}`);
    const types = schemaTypes(schemas);
    const requiredTypes = ["Organization", "WebSite", "WebPage", ...(route === "/" ? [] : ["BreadcrumbList"])];
    for (const requiredType of requiredTypes) {
      if (!types.has(requiredType)) errors.push(`${route}: JSON-LD is missing ${requiredType}`);
    }
  }

  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\balt\s*=/i.test(tag)) errors.push(`${route}: image is missing an alt attribute`);
    const source = getAttribute(tag, "src");
    if (!source || source.startsWith("data:")) continue;
    const url = new URL(source, `${siteOrigin}${route}`);
    if (url.origin !== siteOrigin) continue;
    const asset = path.join(dist, decodeURIComponent(url.pathname).replace(/^\//, ""));
    if (!(await fileExists(asset))) errors.push(`${route}: image asset not found: ${url.pathname}`);
  }

  for (const tag of html.match(/<a\b[^>]*href=(?:"[^"]*"|'[^']*')[^>]*>/gi) ?? []) {
    const href = getAttribute(tag, "href");
    if (!href || /^(?:mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    const url = new URL(href, `${siteOrigin}${route}`);
    if (url.origin !== siteOrigin) continue;
    const targetRoute = canonicalRoute(decodeURIComponent(url.pathname));
    if (!existsRoute(targetRoute, routes)) {
      errors.push(`${route}: broken internal link to ${href}`);
      continue;
    }
    if (url.hash) {
      const fragment = decodeURIComponent(url.hash.slice(1));
      if (targetRoute === canonicalRoute(route) && fragment && !ids.has(fragment)) {
        errors.push(`${route}: missing local fragment target ${url.hash}`);
      }
    }
  }

  pages.push({ route, title, description, robots, canonical, indexable, html, schemas });
}

const indexablePages = pages.filter((page) => page.indexable);
for (const [value, duplicateRoutes] of duplicateValues(indexablePages, "title")) {
  errors.push(`duplicate title on ${duplicateRoutes.join(", ")}: ${value}`);
}
for (const [value, duplicateRoutes] of duplicateValues(indexablePages, "description")) {
  errors.push(`duplicate meta description on ${duplicateRoutes.join(", ")}: ${value}`);
}
for (const [value, duplicateRoutes] of duplicateValues(indexablePages, "canonical")) {
  errors.push(`duplicate canonical on ${duplicateRoutes.join(", ")}: ${value}`);
}

for (const page of indexablePages) {
  if (page.title.length > 65) warnings.push(`${page.route}: title is ${page.title.length} characters`);
  if (page.description.length < 110 || page.description.length > 170) {
    warnings.push(`${page.route}: meta description is ${page.description.length} characters`);
  }
}

const sitemap = await readFile(path.join(dist, "sitemap-0.xml"), "utf8");
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeHtml(match[1])));
const expectedUrls = new Set(indexablePages.map((page) => page.canonical));
for (const url of expectedUrls) {
  if (!sitemapUrls.has(url)) errors.push(`sitemap is missing ${url}`);
}
for (const url of sitemapUrls) {
  if (!expectedUrls.has(url)) errors.push(`sitemap contains a non-indexable or unknown URL: ${url}`);
}

const sitemapIndex = await readFile(path.join(dist, "sitemap-index.xml"), "utf8");
for (const requiredSitemap of [`${siteOrigin}/sitemap-0.xml`, `${siteOrigin}/image-sitemap.xml`]) {
  if (!sitemapIndex.includes(`<loc>${requiredSitemap}</loc>`)) errors.push(`sitemap index is missing ${requiredSitemap}`);
}

const imageSitemap = await readFile(path.join(dist, "image-sitemap.xml"), "utf8");
for (const [, imageUrl] of imageSitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)) {
  const url = new URL(decodeHtml(imageUrl));
  const asset = path.join(dist, decodeURIComponent(url.pathname).replace(/^\//, ""));
  if (!(await fileExists(asset))) errors.push(`image sitemap asset not found: ${url.href}`);
}

const robotsTxt = await readFile(path.join(dist, "robots.txt"), "utf8");
for (const required of ["User-agent: OAI-SearchBot", "User-agent: PerplexityBot", `Sitemap: ${siteOrigin}/sitemap-index.xml`]) {
  if (!robotsTxt.includes(required)) errors.push(`robots.txt is missing: ${required}`);
}

console.log(`SEO audit: ${pages.length} generated HTML pages, ${indexablePages.length} indexable URLs, ${sitemapUrls.size} sitemap URLs.`);
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  warnings.forEach((warning) => console.log(`- ${warning}`));
}
if (errors.length) {
  console.error(`Errors (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log("PASS: unique metadata, canonicals, headings, JSON-LD, internal links, images, robots, and sitemap coverage are valid.");
}
