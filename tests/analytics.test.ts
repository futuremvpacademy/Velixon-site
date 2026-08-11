import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeAnalyticsSource } from "../src/lib/analytics";
import {
  GOOGLE_ADS_LEAD_CONVERSION,
  createLeadConversionHandoff,
  parseLeadConversionHandoff
} from "../src/lib/google-ads";

test("analytics source keeps cataloged attribution values", () => {
  assert.equal(sanitizeAnalyticsSource("homepage-client-systems"), "homepage-client-systems");
  assert.equal(sanitizeAnalyticsSource("homepage-reviews"), "homepage-reviews");
  assert.equal(sanitizeAnalyticsSource(" Google "), "google");
  assert.equal(sanitizeAnalyticsSource("pricing-plan-3"), "pricing-plan-3");
});

test("analytics source groups untrusted values without exposing them", () => {
  assert.equal(sanitizeAnalyticsSource("person@example.com"), "other");
  assert.equal(sanitizeAnalyticsSource("8016025389"), "other");
  assert.equal(sanitizeAnalyticsSource("https://example.com/?message=private"), "other");
  assert.equal(sanitizeAnalyticsSource("unrecognized-campaign"), "other");
  assert.equal(sanitizeAnalyticsSource(null), "other");
});

test("Google Ads lead conversion keeps the approved public destination and payload", () => {
  assert.deepEqual(GOOGLE_ADS_LEAD_CONVERSION, {
    conversionId: "AW-18088634031",
    conversionLabel: "IvyFCKHRw98cEK_NqrFD",
    sendTo: "AW-18088634031/IvyFCKHRw98cEK_NqrFD",
    value: 1.0,
    currency: "USD"
  });
});

test("lead conversion handoffs allow only known forms and safe analytics dimensions", () => {
  const handoff = createLeadConversionHandoff({
    formName: "website-inquiry",
    formLocation: "contact_page",
    leadSource: "google",
    pagePath: "/contact/"
  });
  assert.deepEqual(parseLeadConversionHandoff(JSON.stringify(handoff)), handoff);

  assert.equal(parseLeadConversionHandoff(JSON.stringify({ ...handoff, formName: "newsletter" })), null);
  assert.equal(parseLeadConversionHandoff(JSON.stringify({ ...handoff, token: "short" })), null);
  assert.deepEqual(parseLeadConversionHandoff(JSON.stringify({
    ...handoff,
    formLocation: "person@example.com",
    leadSource: "private value",
    pagePath: "https://example.com/private"
  })), {
    ...handoff,
    formLocation: "unknown",
    leadSource: "other",
    pagePath: "/unknown"
  });
});
