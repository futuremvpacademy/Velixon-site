export const AUDIT_SCHEMA_VERSION = "2026-07-23" as const;
export const AUDIT_EMAIL_ADDRESS = "velixon@velixon.net" as const;

export type ConfigurationState = "disabled" | "ready" | "invalid";

export interface EmailConfiguration {
  state: ConfigurationState;
  issues: string[];
  replyToConfigured: boolean;
}

export interface AnalyticsConfiguration {
  state: ConfigurationState;
  issues: string[];
  gaMeasurementId: string;
  gtmContainerId: string;
  clarityProjectId: string;
  googleAdsConversionId: string;
  googleAdsAuditLabel: string;
  directGoogleAdsConfigured: boolean;
  conversionTrackingConfigured: boolean;
}

const clean = (value: unknown) => typeof value === "string" ? value.trim() : "";
const validEmail = (value: string) => value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const emailAddressFrom = (value: string) => value.match(/<([^<>]+)>$/)?.[1]?.trim() || value;
const isConfiguredEmail = (value: string) => validEmail(emailAddressFrom(value));
const usesAuditAddress = (value: string) => emailAddressFrom(value).toLowerCase() === AUDIT_EMAIL_ADDRESS;

export const inspectAuditEmailConfiguration = (values: {
  apiKey?: string;
  from?: string;
  internalTo?: string;
  replyTo?: string;
}): EmailConfiguration => {
  const apiKey = clean(values.apiKey);
  const from = clean(values.from);
  const internalTo = clean(values.internalTo);
  const replyTo = clean(values.replyTo);
  const configured = [apiKey, from, internalTo, replyTo].filter(Boolean).length;
  const issues: string[] = [];

  if (configured > 0) {
    if (!apiKey) issues.push("RESEND_API_KEY is missing.");
    else if (!/^re_[A-Za-z0-9_-]{8,}$/.test(apiKey)) issues.push("RESEND_API_KEY has an invalid format.");
    if (!from) issues.push("AUDIT_FROM_EMAIL is missing.");
    else if (!isConfiguredEmail(from)) issues.push("AUDIT_FROM_EMAIL is invalid.");
    else if (!usesAuditAddress(from)) issues.push(`AUDIT_FROM_EMAIL must use ${AUDIT_EMAIL_ADDRESS}.`);
    if (!internalTo) issues.push("AUDIT_NOTIFICATION_EMAIL is missing.");
    else if (!isConfiguredEmail(internalTo)) issues.push("AUDIT_NOTIFICATION_EMAIL is invalid.");
    else if (!usesAuditAddress(internalTo)) issues.push(`AUDIT_NOTIFICATION_EMAIL must use ${AUDIT_EMAIL_ADDRESS}.`);
    if (!replyTo) issues.push("AUDIT_REPLY_TO_EMAIL is missing.");
    else if (!isConfiguredEmail(replyTo)) issues.push("AUDIT_REPLY_TO_EMAIL is invalid.");
    else if (!usesAuditAddress(replyTo)) issues.push(`AUDIT_REPLY_TO_EMAIL must use ${AUDIT_EMAIL_ADDRESS}.`);
  }

  return {
    state: configured === 0 ? "disabled" : issues.length ? "invalid" : "ready",
    issues,
    replyToConfigured: Boolean(replyTo)
  };
};

export const inspectAnalyticsConfiguration = (values: {
  gaMeasurementId?: string;
  gtmContainerId?: string;
  clarityProjectId?: string;
  googleAdsConversionId?: string;
  googleAdsAuditLabel?: string;
}): AnalyticsConfiguration => {
  const gaCandidate = clean(values.gaMeasurementId);
  const gtmCandidate = clean(values.gtmContainerId);
  const clarityCandidate = clean(values.clarityProjectId);
  const googleAdsIdCandidate = clean(values.googleAdsConversionId);
  const googleAdsAuditLabelCandidate = clean(values.googleAdsAuditLabel);
  const issues: string[] = [];

  const gaMeasurementId = /^G-[A-Z0-9]+$/i.test(gaCandidate) ? gaCandidate : "";
  const gtmContainerId = /^GTM-[A-Z0-9]+$/i.test(gtmCandidate) ? gtmCandidate : "";
  const clarityProjectId = /^[A-Z0-9]{5,64}$/i.test(clarityCandidate) ? clarityCandidate : "";
  const googleAdsConversionId = /^AW-\d{6,20}$/.test(googleAdsIdCandidate) ? googleAdsIdCandidate : "";
  const validGoogleAdsLabel = (value: string) => /^[A-Za-z0-9_-]{5,100}$/.test(value);
  const googleAdsAuditLabel = validGoogleAdsLabel(googleAdsAuditLabelCandidate) ? googleAdsAuditLabelCandidate : "";

  if (gaCandidate && !gaMeasurementId) issues.push("PUBLIC_GA_MEASUREMENT_ID is invalid.");
  if (gtmCandidate && !gtmContainerId) issues.push("PUBLIC_GTM_CONTAINER_ID is invalid.");
  if (clarityCandidate && !clarityProjectId) issues.push("PUBLIC_CLARITY_PROJECT_ID is invalid.");
  if (googleAdsIdCandidate && !googleAdsConversionId) issues.push("PUBLIC_GOOGLE_ADS_CONVERSION_ID is invalid.");
  if (googleAdsAuditLabelCandidate && !googleAdsAuditLabel) issues.push("PUBLIC_GOOGLE_ADS_AUDIT_CONVERSION_LABEL is invalid.");
  const googleAdsValuesConfigured = [googleAdsIdCandidate, googleAdsAuditLabelCandidate].filter(Boolean).length;
  if (googleAdsValuesConfigured > 0 && !googleAdsIdCandidate) issues.push("PUBLIC_GOOGLE_ADS_CONVERSION_ID is required when a Google Ads conversion label is configured.");
  if (googleAdsIdCandidate && !googleAdsAuditLabelCandidate) {
    issues.push("PUBLIC_GOOGLE_ADS_AUDIT_CONVERSION_LABEL is required when PUBLIC_GOOGLE_ADS_CONVERSION_ID is configured.");
  }

  const directGoogleAdsConfigured = Boolean(googleAdsConversionId && googleAdsAuditLabel);
  const configured = Boolean(gaCandidate || gtmCandidate || clarityCandidate || googleAdsValuesConfigured);
  return {
    state: !configured ? "disabled" : issues.length ? "invalid" : "ready",
    issues,
    gaMeasurementId,
    gtmContainerId,
    clarityProjectId,
    googleAdsConversionId,
    googleAdsAuditLabel,
    directGoogleAdsConfigured,
    conversionTrackingConfigured: Boolean(gaMeasurementId || gtmContainerId || directGoogleAdsConfigured)
  };
};
