import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const dist = path.join(root, "dist");
const siteOrigin = "https://velixon.net";
const indexNowKey = "0ee966b99042118dcf10a3ec65908121";
const indexNowKeyFile = `${indexNowKey}.txt`;
const errors = [];
const warnings = [];
const internalLinks = [];
const internalFragmentLinks = [];
const requiredPhaseOneRoutes = [
  "/",
  "/services/ai-automation/",
  "/services/custom-software/",
  "/services/workflow-automation/",
  "/services/custom-crm/",
  "/services/ai-integrations/",
  "/solutions/contractors/",
  "/solutions/service-businesses/",
  "/locations/utah/",
  "/locations/lehi/",
  "/integrations/n8n/",
  "/integrations/make/",
  "/resources/",
  "/resources/ai-automation-roi-calculator/",
  "/resources/what-is-business-process-automation/",
  "/resources/how-much-does-ai-automation-cost/",
  "/resources/when-business-needs-custom-software/",
  "/case-studies/",
  "/case-studies/formesque-proposal-to-payment-platform/",
  "/case-studies/sharecal-collaborative-scheduling-platform/",
  "/contact/"
];

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

function schemaNodesByType(value, requiredType, nodes = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => schemaNodesByType(item, requiredType, nodes));
  } else if (value && typeof value === "object") {
    const type = value["@type"];
    if ((Array.isArray(type) ? type : [type]).includes(requiredType)) nodes.push(value);
    Object.values(value).forEach((item) => schemaNodesByType(item, requiredType, nodes));
  }
  return nodes;
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

const imageDimensionsCache = new Map();
async function readPngDimensions(filePath) {
  if (imageDimensionsCache.has(filePath)) return imageDimensionsCache.get(filePath);

  const source = await readFile(filePath);
  const signature = "89504e470d0a1a0a";
  const dimensions = source.length >= 24 && source.subarray(0, 8).toString("hex") === signature
    ? { width: source.readUInt32BE(16), height: source.readUInt32BE(20) }
    : null;
  imageDimensionsCache.set(filePath, dimensions);
  return dimensions;
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
  const googlebot = getMeta(html, "name", "googlebot").toLowerCase();
  const openGraphType = getMeta(html, "property", "og:type");
  const openGraphTitle = getMeta(html, "property", "og:title");
  const openGraphDescription = getMeta(html, "property", "og:description");
  const openGraphUrl = getMeta(html, "property", "og:url");
  const openGraphImage = getMeta(html, "property", "og:image");
  const openGraphImageAlt = getMeta(html, "property", "og:image:alt");
  const openGraphImageWidth = getMeta(html, "property", "og:image:width");
  const openGraphImageHeight = getMeta(html, "property", "og:image:height");
  const twitterCard = getMeta(html, "name", "twitter:card");
  const twitterTitle = getMeta(html, "name", "twitter:title");
  const twitterDescription = getMeta(html, "name", "twitter:description");
  const twitterImage = getMeta(html, "name", "twitter:image");
  const twitterImageAlt = getMeta(html, "name", "twitter:image:alt");
  const articlePublishedTime = getMeta(html, "property", "article:published_time");
  const articleModifiedTime = getMeta(html, "property", "article:modified_time");
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
  if (!googlebot) errors.push(`${route}: missing googlebot directive`);
  else if (googlebot !== robots) errors.push(`${route}: googlebot directive does not match robots directive`);
  if (!canonical) errors.push(`${route}: missing canonical URL`);
  if (h1Count !== 1) errors.push(`${route}: expected one H1, found ${h1Count}`);
  if (!html.includes('id="main-content"')) errors.push(`${route}: missing #main-content landmark target`);
  if (!html.includes('href="#main-content"')) errors.push(`${route}: missing skip link`);
  if (!html.match(/<link\b[^>]*rel=(?:"manifest"|'manifest')[^>]*href=(?:"\/site\.webmanifest"|'\/site\.webmanifest')[^>]*>/i)) {
    errors.push(`${route}: missing web manifest link`);
  }

  if (indexable) {
    const expectedCanonical = new URL(canonicalRoute(route), siteOrigin).href;
    if (canonical !== expectedCanonical) errors.push(`${route}: canonical is ${canonical || "missing"}; expected ${expectedCanonical}`);
    const types = schemaTypes(schemas);
    const requiredTypes = ["Organization", "WebSite", "WebPage", ...(route === "/" ? [] : ["BreadcrumbList"])];
    for (const requiredType of requiredTypes) {
      if (!types.has(requiredType)) errors.push(`${route}: JSON-LD is missing ${requiredType}`);
    }
    if (!openGraphTitle || !openGraphDescription || !openGraphUrl || !openGraphImage || !openGraphImageAlt || !openGraphImageWidth || !openGraphImageHeight) {
      errors.push(`${route}: incomplete Open Graph metadata`);
    }
    if (!twitterCard || !twitterTitle || !twitterDescription || !twitterImage || !twitterImageAlt) {
      errors.push(`${route}: incomplete Twitter/X card metadata`);
    }
    if (openGraphUrl && openGraphUrl !== canonical) errors.push(`${route}: og:url does not match canonical URL`);
    if (twitterImage && openGraphImage && twitterImage !== openGraphImage) errors.push(`${route}: Twitter/X image does not match Open Graph image`);

    if (types.has("Article")) {
      if (openGraphType !== "article" || !articlePublishedTime || !articleModifiedTime) {
        errors.push(`${route}: Article schema is missing matching article Open Graph metadata`);
      }
      for (const article of schemaNodesByType(schemas, "Article")) {
        for (const property of ["headline", "datePublished", "dateModified", "author", "publisher"]) {
          if (!article[property]) errors.push(`${route}: Article schema is missing ${property}`);
        }
      }
    }

    if (openGraphImage) {
      const imageUrl = new URL(openGraphImage, siteOrigin);
      if (imageUrl.origin === siteOrigin) {
        const imageAsset = path.join(dist, decodeURIComponent(imageUrl.pathname).replace(/^\//, ""));
        if (!(await fileExists(imageAsset))) {
          errors.push(`${route}: Open Graph image asset not found: ${imageUrl.pathname}`);
        } else {
          const dimensions = await readPngDimensions(imageAsset);
          if (dimensions && (Number(openGraphImageWidth) !== dimensions.width || Number(openGraphImageHeight) !== dimensions.height)) {
            errors.push(`${route}: Open Graph dimensions ${openGraphImageWidth || "missing"}x${openGraphImageHeight || "missing"} do not match ${dimensions.width}x${dimensions.height}`);
          }
        }
      }
    }
  }

  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\balt\s*=/i.test(tag)) errors.push(`${route}: image is missing an alt attribute`);
    if (!getAttribute(tag, "width") || !getAttribute(tag, "height")) {
      errors.push(`${route}: image is missing explicit width and height attributes`);
    }
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
    internalLinks.push({ sourceRoute: route, targetRoute });
    if (url.hash) internalFragmentLinks.push({ sourceRoute: route, targetRoute, fragment: decodeURIComponent(url.hash.slice(1)) });
  }

  pages.push({ route, title, description, robots, canonical, indexable, html, schemas, ids });
}

const indexablePages = pages.filter((page) => page.indexable);
const pagesByRoute = new Map(pages.map((page) => [page.route, page]));
const internalEdges = new Set(internalLinks.map(({ sourceRoute, targetRoute }) => `${sourceRoute}\n${targetRoute}`));
const indexableRouteSet = new Set(indexablePages.map(({ route }) => route));

for (const page of indexablePages) {
  if (page.route === "/") continue;
  const hasIndexableInboundLink = internalLinks.some(({ sourceRoute, targetRoute }) => (
    targetRoute === page.route && sourceRoute !== page.route && indexableRouteSet.has(sourceRoute)
  ));
  if (!hasIndexableInboundLink) errors.push(`${page.route}: indexable page has no inbound link from another indexable page`);
}

const warnedNoindexEdges = new Set();
for (const { sourceRoute, targetRoute } of internalLinks) {
  const targetPage = pagesByRoute.get(targetRoute);
  const edge = `${sourceRoute}\n${targetRoute}`;
  if (indexableRouteSet.has(sourceRoute) && targetPage && !targetPage.indexable && !warnedNoindexEdges.has(edge)) {
    warnedNoindexEdges.add(edge);
    warnings.push(`${sourceRoute}: links to noindex page ${targetRoute}`);
  }
}

for (const [sourceRoute, targetRoute] of [
  ["/", "/case-studies/formesque-proposal-to-payment-platform/"],
  ["/", "/case-studies/sharecal-collaborative-scheduling-platform/"],
  ["/", "/resources/ai-automation-roi-calculator/"],
  ["/resources/", "/resources/ai-automation-roi-calculator/"],
  ["/resources/how-much-does-ai-automation-cost/", "/resources/ai-automation-roi-calculator/"],
  ["/services/ai-automation/", "/resources/ai-automation-roi-calculator/"],
  ["/services/workflow-automation/", "/resources/ai-automation-roi-calculator/"]
]) {
  if (!internalEdges.has(`${sourceRoute}\n${targetRoute}`)) {
    errors.push(`${sourceRoute}: missing required contextual link to ${targetRoute}`);
  }
}

for (const { sourceRoute, targetRoute, fragment } of internalFragmentLinks) {
  if (!fragment) continue;
  const targetPage = pagesByRoute.get(targetRoute);
  if (targetPage && !targetPage.ids.has(fragment)) {
    errors.push(`${sourceRoute}: missing fragment target #${fragment} on ${targetRoute}`);
  }
}

for (const requiredRoute of requiredPhaseOneRoutes) {
  const page = pagesByRoute.get(requiredRoute);
  if (!page) errors.push(`required Phase 1 route was not generated: ${requiredRoute}`);
  else if (!page.indexable) errors.push(`required Phase 1 route is accidentally noindex: ${requiredRoute}`);
}

const commercialDetailSections = new Set(["services", "solutions", "industries", "integrations", "locations"]);
for (const page of indexablePages) {
  const segments = page.route.split("/").filter(Boolean);
  if (segments.length < 2 || !commercialDetailSections.has(segments[0])) continue;
  const types = schemaTypes(page.schemas);
  for (const requiredType of ["Service", "FAQPage"]) {
    if (!types.has(requiredType)) errors.push(`${page.route}: JSON-LD is missing ${requiredType}`);
  }
}

for (const page of indexablePages.filter(({ route }) => (
  (route.startsWith("/resources/") && route !== "/resources/")
  || (route.startsWith("/guides/") && route !== "/guides/")
  || (route.startsWith("/comparisons/") && route !== "/comparisons/")
  || (route.startsWith("/case-studies/") && route !== "/case-studies/")
))) {
  const types = schemaTypes(page.schemas);
  if (!types.has("Article")) errors.push(`${page.route}: JSON-LD is missing Article`);
  if (!page.route.startsWith("/case-studies/") && !types.has("FAQPage")) errors.push(`${page.route}: JSON-LD is missing FAQPage`);
  if (page.route.startsWith("/guides/") && !types.has("HowTo")) errors.push(`${page.route}: JSON-LD is missing HowTo`);
}

for (const route of ["/case-studies/", "/comparisons/", "/guides/", "/industries/", "/integrations/", "/locations/", "/resources/", "/services/", "/solutions/"]) {
  const types = schemaTypes(pagesByRoute.get(route)?.schemas ?? []);
  for (const requiredType of ["CollectionPage", "ItemList"]) {
    if (!types.has(requiredType)) errors.push(`${route}: JSON-LD is missing ${requiredType}`);
  }
}

const roiCalculatorTypes = schemaTypes(pagesByRoute.get("/resources/ai-automation-roi-calculator/")?.schemas ?? []);
for (const requiredType of ["SoftwareApplication", "FAQPage"]) {
  if (!roiCalculatorTypes.has(requiredType)) errors.push(`/resources/ai-automation-roi-calculator/: JSON-LD is missing ${requiredType}`);
}
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
for (const required of ["User-agent: *", "Allow: /", "User-agent: OAI-SearchBot", "User-agent: PerplexityBot", `Sitemap: ${siteOrigin}/sitemap-index.xml`]) {
  if (!robotsTxt.includes(required)) errors.push(`robots.txt is missing: ${required}`);
}

const manifest = JSON.parse(await readFile(path.join(dist, "site.webmanifest"), "utf8"));
if (manifest.name !== "Velixon" || manifest.id !== "/" || manifest.start_url !== "/" || manifest.scope !== "/" || !Array.isArray(manifest.icons) || manifest.icons.length < 2) {
  errors.push("site.webmanifest is missing the Velixon identity or required icons");
}
for (const icon of manifest.icons ?? []) {
  if (!icon.src || !/^\d+x\d+$/.test(icon.sizes ?? "")) {
    errors.push("site.webmanifest contains an icon without a valid src and sizes value");
    continue;
  }
  const iconUrl = new URL(icon.src, siteOrigin);
  const iconAsset = path.join(dist, decodeURIComponent(iconUrl.pathname).replace(/^\//, ""));
  if (!(await fileExists(iconAsset))) {
    errors.push(`site.webmanifest icon asset not found: ${iconUrl.pathname}`);
    continue;
  }
  const dimensions = await readPngDimensions(iconAsset);
  const [expectedWidth, expectedHeight] = icon.sizes.split("x").map(Number);
  if (dimensions && (dimensions.width !== expectedWidth || dimensions.height !== expectedHeight)) {
    errors.push(`site.webmanifest icon ${iconUrl.pathname} declares ${icon.sizes} but is ${dimensions.width}x${dimensions.height}`);
  }
}

const deployedIndexNowKey = (await readFile(path.join(dist, indexNowKeyFile), "utf8")).trim();
if (!/^[A-Za-z0-9-]{8,128}$/.test(indexNowKey) || deployedIndexNowKey !== indexNowKey) {
  errors.push(`IndexNow verification file ${indexNowKeyFile} is missing or does not match its key`);
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
  console.log("PASS: unique metadata, canonicals, headings, JSON-LD, internal links/fragments, images, robots, manifest, IndexNow key, and sitemap coverage are valid.");
}
