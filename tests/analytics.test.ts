import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeAnalyticsSource } from "../src/lib/analytics";

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
