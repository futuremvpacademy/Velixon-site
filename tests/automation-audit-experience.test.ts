import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { featuredCustomerReviews } from "../src/data/customer-reviews";
import { caseStudies } from "../src/data/seo/case-studies";
import {
  automationAuditFaqs,
  automationAuditHeroVariants,
  automationAuditOfferName,
  automationAuditPrimaryCta,
  automationAuditReassurance,
  automationAuditProofDisclaimer,
  automationAuditSecondaryCta
} from "../src/data/automation-audit";

const read = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("business systems audit landing page contains the focused conversion path and one clear promise", async () => {
  const [page, styles] = await Promise.all([
    read("src/pages/free-audit.astro"),
    read("src/styles/automation-audit.css")
  ]);

  assert.equal(automationAuditOfferName, "Free Business Systems Audit");
  assert.match(page, /pageTitle = `\$\{automationAuditOfferName\} \| Velixon`/);
  assert.equal(automationAuditPrimaryCta, "Request Your Free Audit");
  assert.equal(automationAuditSecondaryCta, "See What You Receive");
  assert.match(`${page}\n${automationAuditReassurance}`, /one-page scorecard/i);
  assert.match(`${page}\n${automationAuditReassurance}`, /3 prioritized recommendations/i);
  assert.match(`${page}\n${automationAuditReassurance}`, /within 3 business days/i);
  assert.match(`${page}\n${automationAuditReassurance}`, /optional 20-minute strategy call.*arranged manually|arranged manually.*optional 20-minute strategy call/i);
  for (const section of ["solutions", "calculator", "process", "results", "book-audit", "faq"]) {
    assert.match(page, new RegExp(`id=["']${section}["']`));
  }
  assert.ok(page.indexOf('id="book-audit"') < page.indexOf('id="solutions"'), "the request form must appear before supporting detail");
  assert.ok(page.indexOf('id="book-audit"') < page.indexOf('id="results"'), "customer proof must follow the request form");
  assert.ok(page.indexOf('id="results"') < page.indexOf('id="calculator"'), "proof must appear before the ROI calculator");
  assert.ok(page.indexOf('id="results"') < page.indexOf('id="process"'), "proof must appear before process detail");
  assert.ok(featuredCustomerReviews.some((review) => review.name === "Chiggy Combs" && Boolean(review.featuredQuote)));
  assert.ok(caseStudies.some((study) => study.slug === "frontier-fence-digital-systems" && study.caseStudyType === "client"));
  assert.match(page, /featuredCustomerReviews\.find\(\(review\) => review\.name === "Chiggy Combs"\)/);
  assert.match(page, /frontier-fence-digital-systems/);
  assert.match(page, /View source on Google/);
  assert.match(page, /Read the Frontier Fence case study/);
  assert.match(page, /No revenue, ROI, lead-volume, or time-saving result is implied/);
  assert.doesNotMatch(page, /data-case-study-placeholder-library/);
  assert.match(page, /data-mobile-audit-cta/);
  assert.match(page, /mobileAuditCta\.hidden = formIsNear \|\| heroCtaIsVisible \|\| consentBannerVisible/);
  assert.match(page, /formObserver\.observe\(auditFormSection\)/);
  assert.match(page, /heroObserver\.observe\(heroAuditCta\)/);
  assert.match(page, /dataset\.consentBannerVisible/);
  assert.match(page, /velixon:consentbannerchange/);
  assert.match(page, /class="audit-workflow-mobile"/);
  assert.match(styles, /html\[data-consent-banner-visible="false"\] \.audit-mobile-cta/);
  assert.match(styles, /@media \(max-width: 680px\)[\s\S]*?\.audit-workflow-card\s*\{\s*display: none;/);
  assert.match(automationAuditProofDisclaimer, /not presented as measured client outcomes/i);
  assert.doesNotMatch(page, /guaranteed (revenue|savings|results)/i);
  assert.equal(automationAuditFaqs.length, 12);
  assert.deepEqual(Object.keys(automationAuditHeroVariants), ["A", "B", "C"]);
});

test("audit entry points go directly to the request form", async () => {
  const [site, homepageFeature, clusterLanding, resourceLayout] = await Promise.all([
    read("src/data/site.ts"),
    read("src/components/FreeAuditFeature.astro"),
    read("src/components/ClusterLanding.astro"),
    read("src/components/ResourceLayout.astro")
  ]);

  assert.match(site, /href:\s*["']\/free-audit\/#book-audit["']/);
  for (const source of [homepageFeature, clusterLanding, resourceLayout]) {
    assert.match(source, /#book-audit/);
  }
});

test("simplified audit request validates one step, retains attribution, and offers only a manual post-delivery call", async () => {
  const form = await read("src/components/FreeAuditForm.astro");

  assert.equal((form.match(/data-form-step="[0-9]+"/g) || []).length, 1);
  for (const field of [
    "firstName", "lastName", "businessName", "workEmail", "website",
    "mainOperationalProblem", "processingConsent"
  ]) {
    assert.match(form, new RegExp(`name=["']${field}["']`));
  }
  for (const legacyField of [
    "industry", "employeeCount", "monthlyRevenue", "currentSoftware", "monthlyBudget",
    "timeline", "preferredCallTime", "additionalContext"
  ]) {
    assert.doesNotMatch(form, new RegExp(`name=["']${legacyField}["']`));
    assert.doesNotMatch(form, new RegExp(`${legacyField}:\\s*text\\(`));
  }
  const websiteInput = form.match(/<input[^>]*name="website"[^>]*>/)?.[0] || "";
  assert.ok(websiteInput, "the optional website field should remain available for audit context");
  assert.doesNotMatch(websiteInput, /\brequired\b/);
  for (const attributionKey of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"]) {
    assert.match(form, new RegExp(attributionKey));
  }
  assert.match(form, /schemaVersion:\s*AUDIT_SCHEMA_VERSION/);
  assert.match(form, /sessionStorage\.setItem/);
  assert.match(form, /sessionStorage\.removeItem/);
  assert.match(form, /company-fax/);
  assert.match(form, /aria-busy/);
  assert.match(form, /one-page scorecard and 3 prioritized recommendations within 3 business days/i);
  assert.match(form, /No call is required/);
  assert.match(form, /After the audit is delivered, reply to that email/i);
  assert.match(form, /arrange it with you manually/i);
  assert.doesNotMatch(form, /PUBLIC_BOOKING_URL|bookingSuccessfulV2|calendly|data-booking-|calendar_opened|call_booked/i);
  assert.match(form, /if \(!result\.duplicate\)\s*\{\s*analytics\(\)\?\.track\("qualify_lead"/);
  assert.match(form, /Reference: \$\{result\.requestId\}/);
  assert.match(form, /step_number:\s*1/);
  assert.match(form, /step_name:\s*"Audit request"/);
});

test("ROI calculator is bounded, illustrative, and does not send financial values to analytics", async () => {
  const calculator = await read("src/components/AutomationRoiCalculator.astro");

  for (const field of ["employees", "hours", "hourlyCost", "missedLeads", "customerValue"]) {
    assert.match(calculator, new RegExp(`name=["']${field}["']`));
  }
  for (const output of ["monthlyLabor", "missedRevenue", "annualCost", "annualRecovered"]) {
    assert.match(calculator, new RegExp(`data-roi-output=["']${output}["']`));
  }
  assert.match(calculator, /illustrative, not a forecast or guarantee/i);
  assert.match(calculator, /calculator_started/);
  assert.match(calculator, /calculator_completed/);
  assert.doesNotMatch(calculator, /annual_cost_band|recovery_value_band|model_version/);
});

test("analytics source, documentation, and UI use one privacy-safe event contract", async () => {
  const [layout, form, page, documentation] = await Promise.all([
    read("src/layouts/MainLayout.astro"),
    read("src/components/FreeAuditForm.astro"),
    read("src/pages/free-audit.astro"),
    read("docs/CONVERSION_ANALYTICS.md")
  ]);

  for (const event of [
    "free_audit_cta_clicked", "calculator_started", "calculator_completed", "audit_started",
    "audit_step_completed", "audit_abandoned", "audit_submitted", "qualify_lead", "audit_submission_error",
    "faq_opened", "scroll_depth"
  ]) {
    assert.match(`${layout}\n${form}\n${page}\n${documentation}`, new RegExp(event));
    assert.match(documentation, new RegExp(`\\| \`${event}\` \\|`));
  }
  assert.match(layout, /send_page_view:\s*false/);
  assert.match(layout, /normalizedEventName === "page_view"/);
  assert.match(layout, /containsEmail/);
  assert.match(layout, /containsPhone/);
  assert.match(layout, /eventName === "qualify_lead"/);
  assert.doesNotMatch(`${layout}\n${form}\n${page}`, /calendar_opened|calendar_failed|call_booked/);
  assert.match(layout, /gtag\("event", "conversion", \{ send_to:/);
  assert.doesNotMatch(`${form}\n${page}`, /landing_variant|duplicate_submission|percent_scrolled|faq_index/);
});

test("SEO, social image, and scheduler-free CSP are ready for the audit route", async () => {
  const [page, netlify, astroConfig, socialImage] = await Promise.all([
    read("src/pages/free-audit.astro"),
    read("netlify.toml"),
    read("astro.config.mjs"),
    readFile(new URL("../public/business-systems-audit-social.png", import.meta.url))
  ]);

  assert.match(page, /"@type": "Service"/);
  assert.match(page, /"@type": "FAQPage"/);
  assert.match(page, /socialImage="\/business-systems-audit-social\.png"/);
  assert.match(astroConfig, /frame-src https:\/\/www\.googletagmanager\.com/);
  assert.doesNotMatch(`${netlify}\n${astroConfig}`, /cal\.com|calendly/i);
  assert.equal(socialImage.readUInt32BE(16), 1200);
  assert.equal(socialImage.readUInt32BE(20), 630);
});

test("Google Ads plan keeps the budget, conversion goal, and ad copy within launch guardrails", async () => {
  const plan = await read("docs/GOOGLE_ADS_500_SEARCH_PLAN.md");
  assert.match(plan, /Campaign total budget/);
  assert.match(plan, /\$500.*hard campaign cap/);
  assert.match(plan, /Primary conversion \| `qualify_lead`/);
  assert.match(plan, /Search Partners and Display expansion off initially/);
  assert.match(plan, /The campaign must stay paused until/);

  const headlineSection = plan.split("Descriptions are 90 characters or fewer:")[0]?.split("Headlines are 30 characters or fewer:")[1] || "";
  const descriptionSection = plan.split("Descriptions are 90 characters or fewer:")[1]?.split("Display paths:")[0] || "";
  const headlines = [...headlineSection.matchAll(/^\d+\.\s(.+)$/gm)].map((match) => match[1]?.trim() || "");
  const descriptions = [...descriptionSection.matchAll(/^\d+\.\s(.+)$/gm)].map((match) => match[1]?.trim() || "");

  assert.equal(headlines.length, 15);
  assert.equal(descriptions.length, 4);
  assert.ok(headlines.every((headline) => headline.length <= 30));
  assert.ok(descriptions.every((description) => description.length <= 90));
});

test("conversion documentation provides non-duplicating GTM and direct Google Ads setup", async () => {
  const [documentation, environment] = await Promise.all([
    read("docs/CONVERSION_ANALYTICS.md"),
    read(".env.example")
  ]);

  for (const variable of [
    "PUBLIC_GOOGLE_ADS_CONVERSION_ID",
    "PUBLIC_GOOGLE_ADS_AUDIT_CONVERSION_LABEL"
  ]) {
    assert.match(documentation, new RegExp(variable));
    assert.match(environment, new RegExp(variable));
  }
  assert.match(documentation, /Choose exactly one Google Ads delivery path/);
  assert.match(documentation, /CE - qualify_lead/);
  assert.match(documentation, /Count: \*\*One\*\*/);
  assert.doesNotMatch(`${documentation}\n${environment}`, /PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION_LABEL|PUBLIC_BOOKING_URL|call_booked/);
  assert.match(documentation, /does not create, enable, or publish a Google Ads campaign/);
});
