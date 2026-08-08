const safeAnalyticsSources = new Set([
  "website",
  "direct",
  "organic",
  "paid",
  "referral",
  "email",
  "social",
  "newsletter",
  "google",
  "bing",
  "linkedin",
  "instagram",
  "facebook",
  "contact",
  "assessment",
  "about-page",
  "ai-automation-roi-calculator",
  "audit-confirmation",
  "automation-quiz",
  "case-studies-hub",
  "case-studies-pathways",
  "directory-hub",
  "homepage-client-systems",
  "homepage-reviews",
  "pricing-page",
  "pricing-plans-build",
  "process-page",
  "resource-ai-automation-cost",
  "resource-business-process-automation",
  "resource-custom-software-readiness",
  "resource-guide",
  "resources-featured",
  "resources-hero",
  "results-page",
  "services-page",
  "site-closing-cta",
  "site-final-cta",
  "site-pricing-cta",
  "site-results-cta",
  "site-services-cta",
  "work-page",
  "website-conversion-checklist",
  "lead-follow-up-checklist",
  "business-automation-checklist",
  "operations-checklist"
]);

/**
 * Analytics dimensions must come from an authored catalog, not directly from
 * query parameters. Unknown values are grouped without exposing their content.
 */
export const sanitizeAnalyticsSource = (value: unknown) => {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (safeAnalyticsSources.has(normalized) || /^pricing-plan-[1-9]\d?$/.test(normalized)) return normalized;
  return "other";
};
