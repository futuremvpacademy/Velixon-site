import assert from "node:assert/strict";
import test from "node:test";
import {
  inspectAnalyticsConfiguration,
  inspectAuditEmailConfiguration
} from "../src/lib/free-audit-config";

test("email configuration requires the approved audit mailbox without exposing supplied values", () => {
  const result = inspectAuditEmailConfiguration({
    apiKey: "secret-value",
    from: "not-an-email",
    internalTo: "team@velixon.net",
    replyTo: "hello@velixon.net"
  });
  assert.equal(result.state, "invalid");
  assert.deepEqual(result.issues, [
    "RESEND_API_KEY has an invalid format.",
    "AUDIT_FROM_EMAIL is invalid.",
    "AUDIT_NOTIFICATION_EMAIL must use velixon@velixon.net.",
    "AUDIT_REPLY_TO_EMAIL must use velixon@velixon.net."
  ]);
  assert.doesNotMatch(JSON.stringify(result), /secret-value|not-an-email|team@velixon\.net|hello@velixon\.net/);

  assert.equal(inspectAuditEmailConfiguration({
    apiKey: "re_test_key_12345",
    from: "Velixon <velixon@velixon.net>",
    internalTo: "velixon@velixon.net",
    replyTo: "velixon@velixon.net"
  }).state, "ready");
});

test("analytics configuration sanitizes invalid IDs and identifies conversion tracking readiness", () => {
  const ready = inspectAnalyticsConfiguration({
    gaMeasurementId: "G-ABC123",
    gtmContainerId: "",
    clarityProjectId: "clarity123",
    googleAdsConversionId: "",
    googleAdsAuditLabel: ""
  });
  assert.equal(ready.state, "ready");
  assert.equal(ready.conversionTrackingConfigured, true);

  const invalid = inspectAnalyticsConfiguration({
    gaMeasurementId: "not-a-ga-id",
    gtmContainerId: "GTM-ABC123",
    clarityProjectId: "bad!",
    googleAdsConversionId: "",
    googleAdsAuditLabel: ""
  });
  assert.equal(invalid.state, "invalid");
  assert.equal(invalid.gaMeasurementId, "");
  assert.equal(invalid.gtmContainerId, "GTM-ABC123");
  assert.equal(invalid.clarityProjectId, "");
  assert.equal(invalid.conversionTrackingConfigured, true);
  assert.deepEqual(invalid.issues, [
    "PUBLIC_GA_MEASUREMENT_ID is invalid.",
    "PUBLIC_CLARITY_PROJECT_ID is invalid."
  ]);
});

test("direct Google Ads configuration validates public IDs and labels without echoing values", () => {
  const ready = inspectAnalyticsConfiguration({
    googleAdsConversionId: "AW-123456789",
    googleAdsAuditLabel: "AbCdEfGhIjK"
  });
  assert.equal(ready.state, "ready");
  assert.equal(ready.directGoogleAdsConfigured, true);
  assert.equal(ready.conversionTrackingConfigured, true);

  const invalid = inspectAnalyticsConfiguration({
    googleAdsConversionId: "AW-secret",
    googleAdsAuditLabel: "bad label"
  });
  assert.equal(invalid.state, "invalid");
  assert.equal(invalid.directGoogleAdsConfigured, false);
  assert.deepEqual(invalid.issues, [
    "PUBLIC_GOOGLE_ADS_CONVERSION_ID is invalid.",
    "PUBLIC_GOOGLE_ADS_AUDIT_CONVERSION_LABEL is invalid."
  ]);
  assert.doesNotMatch(JSON.stringify(invalid), /AW-secret|bad label/);
});

test("analytics configuration rejects duplicate GA and Ads delivery paths", () => {
  const duplicateGa = inspectAnalyticsConfiguration({
    gaMeasurementId: "G-ABC123",
    gtmContainerId: "GTM-ABC123"
  });
  assert.equal(duplicateGa.state, "invalid");
  assert.deepEqual(duplicateGa.issues, [
    "Configure either PUBLIC_GA_MEASUREMENT_ID or PUBLIC_GTM_CONTAINER_ID, not both."
  ]);

  const duplicateAds = inspectAnalyticsConfiguration({
    gtmContainerId: "GTM-ABC123",
    googleAdsConversionId: "AW-123456789",
    googleAdsAuditLabel: "AbCdEfGhIjK"
  });
  assert.equal(duplicateAds.state, "invalid");
  assert.deepEqual(duplicateAds.issues, [
    "When PUBLIC_GTM_CONTAINER_ID is configured, Google Ads conversion tags must be configured in GTM; remove direct PUBLIC_GOOGLE_ADS_* values."
  ]);
});
