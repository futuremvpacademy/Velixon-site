import {
  AUDIT_SCHEMA_VERSION,
  inspectAnalyticsConfiguration,
  inspectAuditEmailConfiguration
} from "../src/lib/free-audit-config";

const strict = process.argv.includes("--strict") || process.env.CONTEXT === "production";
const productionBuild = process.env.CONTEXT === "production";
const email = inspectAuditEmailConfiguration({
  apiKey: process.env.RESEND_API_KEY,
  from: process.env.AUDIT_FROM_EMAIL,
  internalTo: process.env.AUDIT_NOTIFICATION_EMAIL,
  replyTo: process.env.AUDIT_REPLY_TO_EMAIL
});
const analytics = inspectAnalyticsConfiguration({
  gaMeasurementId: process.env.PUBLIC_GA_MEASUREMENT_ID,
  gtmContainerId: process.env.PUBLIC_GTM_CONTAINER_ID,
  clarityProjectId: process.env.PUBLIC_CLARITY_PROJECT_ID,
  googleAdsConversionId: process.env.PUBLIC_GOOGLE_ADS_CONVERSION_ID,
  googleAdsAuditLabel: process.env.PUBLIC_GOOGLE_ADS_AUDIT_CONVERSION_LABEL
});
// Netlify's local production build can expose function-scoped secrets either as
// all asterisks or as an asterisk mask with the final four characters retained.
// A real Resend key never contains `*`, so these shapes are unambiguously masks.
const emailSecretMasked = /^(?:\*{3,}|\*{12,}[A-Za-z0-9_-]{4})$/.test(
  (process.env.RESEND_API_KEY || "").trim()
);
const functionScopedEmailUnavailable = productionBuild && (email.state === "disabled" || emailSecretMasked);

const result = {
  schemaVersion: AUDIT_SCHEMA_VERSION,
  mode: strict ? "strict" : "local",
  email: {
    ...(functionScopedEmailUnavailable
      ? { state: "unavailable-at-build", issues: [], replyToConfigured: email.replyToConfigured }
      : email),
    validationBoundary: functionScopedEmailUnavailable
      ? "function-scope-verified-separately"
      : "current-process"
  },
  analytics: {
    state: analytics.state,
    issues: analytics.issues,
    conversionTrackingConfigured: analytics.conversionTrackingConfigured,
    destinations: {
      ga4: Boolean(analytics.gaMeasurementId),
      gtm: Boolean(analytics.gtmContainerId),
      clarity: Boolean(analytics.clarityProjectId),
      directGoogleAds: analytics.directGoogleAdsConfigured,
      googleAdsAudit: Boolean(analytics.googleAdsConversionId && analytics.googleAdsAuditLabel)
    }
  }
};

console.log(JSON.stringify(result, null, 2));

const invalid = (!functionScopedEmailUnavailable && email.state === "invalid")
  || analytics.state === "invalid";
const emailMissingFromRequiredBoundary = email.state !== "ready"
  && !functionScopedEmailUnavailable;
const missingRequiredProductionBoundary = strict && (
  emailMissingFromRequiredBoundary
  || !analytics.conversionTrackingConfigured
);

if (invalid || missingRequiredProductionBoundary) process.exitCode = 1;
