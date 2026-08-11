import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("browser policy uses Astro-generated hashes and allowlisted sources instead of general inline-script permission", async () => {
  const [astroConfig, netlifyConfig, hero, layout, navbar, consent, intro] = await Promise.all([
    read("astro.config.mjs"),
    read("netlify.toml"),
    read("src/components/HeroSection.astro"),
    read("src/layouts/MainLayout.astro"),
    read("src/components/Navbar.astro"),
    read("src/components/ConsentBanner.astro"),
    read("src/components/IntroExperience.astro")
  ]);

  assert.match(astroConfig, /security:\s*\{\s*csp:/);
  assert.match(astroConfig, /algorithm:\s*"SHA-384"/);
  assert.match(astroConfig, /https:\/\/www\.googletagmanager\.com/);
  assert.match(astroConfig, /frame-src https:\/\/www\.googletagmanager\.com/);
  assert.doesNotMatch(astroConfig, /cal\.com|calendly/i);
  const scriptDirective = astroConfig.split("scriptDirective:")[1]?.split("styleDirective:")[0] || "";
  assert.doesNotMatch(scriptDirective, /'unsafe-inline'/);
  assert.doesNotMatch(netlifyConfig, /script-src[^"\n]*'unsafe-inline'/);
  assert.match(netlifyConfig, /frame-ancestors 'none'/);
  assert.match(netlifyConfig, /Origin-Agent-Cluster = "\?1"/);
  assert.doesNotMatch(hero, /set:html/);
  assert.match(layout, /Astro\.csp\?\.insertScriptHash\(structuredDataHash\)/);
  for (const source of [layout, navbar, consent, intro]) {
    assert.doesNotMatch(source, /<script is:inline(?!\s+type="application\/ld\+json")/);
  }
});

test("response policy, asset caching, and responsive audit media preserve safe browser behavior", async () => {
  const [netlifyConfig, layout, auditVideo] = await Promise.all([
    read("netlify.toml"),
    read("src/layouts/MainLayout.astro"),
    read("src/components/AuditPromoVideo.astro")
  ]);

  const responsePolicy = netlifyConfig.match(/Content-Security-Policy = "([^"]+)"/)?.[1] || "";
  assert.match(responsePolicy, /connect-src 'self'/);
  assert.match(responsePolicy, /font-src 'self' data:/);
  assert.match(responsePolicy, /form-action 'self'/);
  assert.match(responsePolicy, /frame-src https:\/\/www\.googletagmanager\.com/);
  assert.match(responsePolicy, /img-src 'self' data:/);
  assert.match(responsePolicy, /media-src 'self'/);
  assert.match(responsePolicy, /worker-src 'self'/);
  assert.doesNotMatch(responsePolicy, /\b(?:default|script|style)-src\b/);
  for (const provider of [
    "https://www.googletagmanager.com",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://www.googleadservices.com",
    "https://pagead2.googlesyndication.com",
    "https://googleads.g.doubleclick.net",
    "https://ad.doubleclick.net",
    "https://www.google.com",
    "https://stats.g.doubleclick.net",
    "https://*.clarity.ms",
    "https://c.bing.com"
  ]) {
    assert.ok(responsePolicy.includes(provider), `Missing CSP provider: ${provider}`);
  }

  const headerBlock = (path: string) => {
    const marker = `for = "${path}"`;
    const start = netlifyConfig.indexOf(marker);
    assert.notEqual(start, -1, `Missing Netlify header block for ${path}`);
    const next = netlifyConfig.indexOf("[[headers]]", start + marker.length);
    return netlifyConfig.slice(start, next === -1 ? undefined : next);
  };

  assert.match(headerBlock("/*"), /max-age=0, must-revalidate/);
  assert.match(headerBlock("/_astro/*"), /max-age=31536000, immutable/);
  for (const path of [
    "/og.png",
    "/business-systems-audit-social.png",
    "/images/*",
    "/videos/*",
    "/favicon-*",
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/velixon-logo.webp"
  ]) {
    const block = headerBlock(path);
    assert.match(block, /max-age=2592000, stale-while-revalidate=604800/);
    assert.doesNotMatch(block, /immutable/);
  }

  assert.match(auditVideo, /\/\.netlify\/images\?url=/);
  assert.match(auditVideo, /srcset=\{posterSrcset\}/);
  assert.match(auditVideo, /sizes="\(max-width: 900px\) calc\(100vw - 2rem\), 50vw"/);
  assert.match(auditVideo, /data-audit-film-poster aria-hidden="true"/);
  assert.match(auditVideo, /data-audit-film-poster-image/);
  assert.match(auditVideo, /width="960"[\s\S]*height="540"/);
  assert.match(auditVideo, /posterImage\.removeAttribute\("srcset"\)/);
  assert.match(auditVideo, /posterImage\?\.complete && posterImage\.naturalWidth === 0/);
  assert.match(auditVideo, /video\.addEventListener\("playing"/);
  assert.match(auditVideo, /poster\?\.removeAttribute\("hidden"\)/);
  assert.doesNotMatch(auditVideo, /\sposter="/);

  assert.doesNotMatch(layout, /googleAdsBookingLabel|booking_cta_clicked/);
  assert.match(layout, /if \(getConsent\(\) === "granted"\)/);
  assert.match(layout, /const eventName = explicitEventName \|\| "cta_click"/);
});

test("public audit endpoint has layered abuse and response protections", async () => {
  const endpoint = await read("netlify/functions/free-audit.ts");

  assert.match(endpoint, /MAX_BODY_BYTES = 16_384/);
  assert.match(endpoint, /aggregateBy: \["ip", "domain"\]/);
  assert.match(endpoint, /origin !== requestUrl\.origin/);
  assert.match(endpoint, /fetchSite !== "same-origin"/);
  assert.match(endpoint, /readRequestBody/);
  assert.match(endpoint, /BodyTooLargeError/);
  assert.match(endpoint, /getDeployStore/);
  assert.match(endpoint, /context\.deploy\?\.context === "production"/);
  assert.match(endpoint, /application\/x-www-form-urlencoded/);
  assert.match(endpoint, /payloadFromNativeForm/);
  assert.match(endpoint, /preview_notification_skipped/);
  assert.match(endpoint, /default-src 'none'/);
  assert.match(endpoint, /Cache-Control": "no-store"/);
  assert.doesNotMatch(endpoint, /return json\(\{ ok: true, submissionId: record\.submissionId, duplicate, notification \}/);
});

test("dependency automation is read-only and actions are pinned to immutable commits", async () => {
  const [workflow, dependabot, packageJson, dependencyAudit, securityOperations] = await Promise.all([
    read(".github/workflows/security-verification.yml"),
    read(".github/dependabot.yml"),
    read("package.json"),
    read("scripts/audit-dependencies.mjs"),
    read("docs/SECURITY_OPERATIONS.md")
  ]);

  assert.match(workflow, /permissions:\s*\n\s*contents: read/);
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /actions\/checkout@[0-9a-f]{40}/);
  assert.match(workflow, /actions\/setup-node@[0-9a-f]{40}/);
  assert.match(workflow, /npm run verify:security/);
  assert.match(dependabot, /"\/velixon-video"/);
  assert.match(dependabot, /package-ecosystem: "github-actions"/);
  assert.match(packageJson, /"audit:dependencies": "node scripts\/audit-dependencies\.mjs"/);
  assert.match(packageJson, /"verify:security": "npm run audit:dependencies/);
  for (const advisory of ["GHSA-w3rx-r6r6-pgpr", "GHSA-5p2g-fcmc-qvqq"]) {
    assert.match(dependencyAudit, new RegExp(advisory));
    assert.match(securityOperations, new RegExp(advisory));
  }
  assert.match(dependencyAudit, /\["@netlify\/blobs", "@netlify\/dev-utils", "image-size"\]/);
  assert.doesNotMatch(dependencyAudit, /audit-level=(?:high|critical)|audit fix --force/);
});

test("secret scanning is part of the release gate and deployment identifiers are not hardcoded", async () => {
  const [packageJson, scanner, historyScanner, workflow, netlifyConfig, environmentExample, configurationCheck] = await Promise.all([
    read("package.json"),
    read("scripts/audit-secrets.mjs"),
    read("scripts/audit-secret-history.mjs"),
    read(".github/workflows/security-verification.yml"),
    read("netlify.toml"),
    read(".env.example"),
    read("scripts/check-free-audit-config.ts")
  ]);

  assert.match(packageJson, /"audit:secrets": "node scripts\/audit-secrets\.mjs"/);
  assert.match(packageJson, /"audit:secret-history": "node scripts\/audit-secret-history\.mjs"/);
  assert.match(packageJson, /npm run audit:security && npm run audit:secrets/);
  assert.match(packageJson, /"node": ">=22\.12\.0 <25"/);
  assert.match(packageJson, /"build:netlify": "npm run check:free-audit-config && npm run build"/);
  assert.match(scanner, /PRIVATE KEY/);
  assert.match(scanner, /PUBLIC_GOOGLE_SITE_VERIFICATION/);
  assert.match(historyScanner, /rev-list/);
  assert.match(historyScanner, /\\.env\\.example/);
  assert.match(workflow, /fetch-depth: 0/);
  assert.match(workflow, /npm run audit:secret-history/);
  assert.doesNotMatch(netlifyConfig, /PUBLIC_GOOGLE_SITE_VERIFICATION\s*=/);
  assert.match(netlifyConfig, /command = "npm run build:netlify"/);
  assert.match(configurationCheck, /process\.env\.CONTEXT === "production"/);
  assert.match(configurationCheck, /function-scope-verified-separately/);
  assert.match(configurationCheck, /functionScopedEmailUnavailable/);
  assert.match(configurationCheck, /emailSecretMasked/);
  assert.match(configurationCheck, /\\\*\{12,\}/);
  assert.match(configurationCheck, /final four characters retained/);
  assert.match(environmentExample, /^PUBLIC_GOOGLE_SITE_VERIFICATION=$/m);
});

test("retention purge uses bounded date partitions, checkpoints, and legacy migration", async () => {
  const [purge, retention, endpoint] = await Promise.all([
    read("netlify/functions/purge-expired-audits.ts"),
    read("netlify/lib/audit-retention.ts"),
    read("netlify/functions/free-audit.ts")
  ]);

  assert.match(purge, /paginate: true/);
  assert.match(purge, /indexEntriesPerRun: 500/);
  assert.match(purge, /legacySubmissionsPerRun: 500/);
  assert.match(purge, /legacyAliasesPerRun: 100/);
  assert.match(purge, /concurrency: 20/);
  assert.match(purge, /AUDIT_RETENTION_STATE_KEY/);
  assert.match(purge, /auditLegacySubmissionPrefixesForExpirationDate/);
  assert.match(purge, /migrateLegacyAliases/);
  assert.match(retention, /AUDIT_RETENTION_INDEX_PREFIX = "retention-index\/v1\/"/);
  assert.match(endpoint, /AUDIT_IDEMPOTENCY_PREFIX/);
  assert.match(endpoint, /AUDIT_LEGACY_IDEMPOTENCY_PREFIX/);
  assert.match(endpoint, /ensureRetentionIndex\(store, submissionKey/);
  assert.doesNotMatch(purge, /prefix of \["submissions\/", "idempotency\/"\]/);
});
