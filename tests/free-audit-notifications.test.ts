import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { getAuditConfigurationDiagnostics, sendNotifications, type StoredAuditRecord } from "../netlify/functions/free-audit";
import { AUDIT_SCHEMA_VERSION } from "../src/lib/free-audit-config";

const environmentKeys = ["RESEND_API_KEY", "AUDIT_FROM_EMAIL", "AUDIT_NOTIFICATION_EMAIL", "AUDIT_REPLY_TO_EMAIL"] as const;
const originalEnvironment = Object.fromEntries(environmentKeys.map((key) => [key, process.env[key]]));
const originalFetch = globalThis.fetch;

afterEach(() => {
  for (const key of environmentKeys) {
    const value = originalEnvironment[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  globalThis.fetch = originalFetch;
});

const record = (): StoredAuditRecord => ({
  submissionId: "submission-123",
  submittedAt: "2026-07-22T12:00:00.000Z",
  schemaVersion: AUDIT_SCHEMA_VERSION,
  status: "New",
  strategyCallStatus: "Not requested",
  internalNotes: [],
  assignedOwner: null,
  clientStartedAt: "2026-07-22T11:55:00.000Z",
  contact: {
    firstName: "Taylor",
    lastName: "Example",
    businessName: "Example Services",
    workEmail: "taylor@example.com",
    phone: "801-555-0123",
    website: "https://example.com"
  },
  qualification: {
    mainOperationalProblem: "New leads are falling through the cracks before anyone follows up."
  },
  attribution: {
    source: "google",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "automation-audit",
    utmTerm: "business automation",
    utmContent: "hero-a",
    gclid: "google-click-id",
    gbraid: "google-app-browser-id",
    wbraid: "google-web-to-app-id",
    fbclid: "facebook-click-id",
    referralSource: "https://google.com/",
    landingPage: "/free-audit/",
    capturedAt: "2026-07-22T11:54:00.000Z",
    submissionPage: "/free-audit/",
    landingVariant: "a"
  },
  consent: { processing: true, recordedAt: "2026-07-22T12:00:00.000Z", policyVersion: AUDIT_SCHEMA_VERSION }
});

const configureEmail = () => {
  process.env.RESEND_API_KEY = "re_test_key_12345";
  process.env.AUDIT_FROM_EMAIL = "Velixon <velixon@velixon.net>";
  process.env.AUDIT_NOTIFICATION_EMAIL = "velixon@velixon.net";
  process.env.AUDIT_REPLY_TO_EMAIL = "velixon@velixon.net";
};

test("configuration diagnostics distinguish disabled, partial, invalid, and ready email delivery", () => {
  for (const key of environmentKeys) delete process.env[key];
  assert.equal(getAuditConfigurationDiagnostics().email.state, "disabled");

  process.env.RESEND_API_KEY = "not-a-resend-key";
  assert.equal(getAuditConfigurationDiagnostics().email.state, "invalid");
  assert.deepEqual(getAuditConfigurationDiagnostics().email.issues, [
    "RESEND_API_KEY has an invalid format.",
    "AUDIT_FROM_EMAIL is missing.",
    "AUDIT_NOTIFICATION_EMAIL is missing.",
    "AUDIT_REPLY_TO_EMAIL is missing."
  ]);

  configureEmail();
  assert.deepEqual(getAuditConfigurationDiagnostics().email, {
    state: "ready",
    issues: [],
    replyToConfigured: true
  });
});

test("invalid email configuration never calls the provider", async () => {
  process.env.RESEND_API_KEY = "re_test_key_12345";
  process.env.AUDIT_FROM_EMAIL = "not-an-email";
  process.env.AUDIT_NOTIFICATION_EMAIL = "velixon@velixon.net";
  process.env.AUDIT_REPLY_TO_EMAIL = "velixon@velixon.net";
  globalThis.fetch = (async () => { throw new Error("fetch should not run"); }) as typeof fetch;
  assert.deepEqual(await sendNotifications(record()), { prospect: "skipped", internal: "skipped" });
});

test("email delivery is skipped without complete private configuration", async () => {
  for (const key of environmentKeys) delete process.env[key];
  globalThis.fetch = (async () => { throw new Error("fetch should not run"); }) as typeof fetch;
  assert.deepEqual(await sendNotifications(record()), { prospect: "skipped", internal: "skipped" });
});

test("confirmation and internal notification contain the new audit contract and correct reply-to addresses", async () => {
  configureEmail();
  const messages: Record<string, unknown>[] = [];
  const idempotencyKeys: string[] = [];
  globalThis.fetch = (async (_input: string | URL | Request, init?: RequestInit) => {
    messages.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
    idempotencyKeys.push(new Headers(init?.headers).get("Idempotency-Key") || "");
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  assert.deepEqual(await sendNotifications(record()), { prospect: "sent", internal: "sent" });
  assert.equal(messages[0]?.reply_to, "velixon@velixon.net");
  assert.equal(messages[1]?.reply_to, "taylor@example.com");
  assert.deepEqual(messages[1]?.to, ["velixon@velixon.net"]);
  assert.match(String(messages[0]?.subject), /Free Business Systems Audit/);
  assert.match(String(messages[0]?.text), /one-page scorecard and 3 prioritized recommendations within 3 business days/);
  assert.match(String(messages[0]?.text), /A call is not required/);
  assert.match(String(messages[0]?.text), /optional 20-minute strategy call/);
  assert.match(String(messages[0]?.text), /arrange it with you manually/);
  assert.match(String(messages[0]?.text), /Velixon Solutions LLC, doing business as Velixon/);
  assert.match(String(messages[0]?.text), /180 S 1350 E St, Lehi, UT 84043/);
  assert.doesNotMatch(String(messages[0]?.text), /book|calendar|schedul/i);
  assert.match(String(messages[1]?.subject), /New Business Systems Audit/);
  assert.match(String(messages[1]?.text), /Strategy call status: Not requested/);
  assert.match(String(messages[1]?.text), /Main bottleneck: New leads are falling through the cracks/);
  assert.doesNotMatch(String(messages[1]?.text), /Industry:|Monthly budget:|Preferred call time:/);
  assert.match(String(messages[1]?.text), /Gbraid: google-app-browser-id/);
  assert.match(String(messages[1]?.text), /Wbraid: google-web-to-app-id/);
  assert.match(String(messages[1]?.text), /Fbclid: facebook-click-id/);
  assert.match(String(messages[1]?.text), /Landing Variant: a/);
  assert.deepEqual(idempotencyKeys, ["free_audit_prospect_submission-123", "free_audit_internal_submission-123"]);
});

test("one email failure does not hide the other delivery result", async () => {
  configureEmail();
  let requestCount = 0;
  globalThis.fetch = (async () => {
    requestCount += 1;
    return new Response(null, { status: requestCount === 1 ? 503 : 200 });
  }) as typeof fetch;
  assert.deepEqual(await sendNotifications(record()), { prospect: "failed", internal: "sent" });
});

test("notification retry preserves a sent email and retries only the missing one", async () => {
  configureEmail();
  const idempotencyKeys: string[] = [];
  globalThis.fetch = (async (_input: string | URL | Request, init?: RequestInit) => {
    idempotencyKeys.push(new Headers(init?.headers).get("Idempotency-Key") || "");
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  assert.deepEqual(await sendNotifications(record(), { prospect: "sent", internal: "failed" }), { prospect: "sent", internal: "sent" });
  assert.deepEqual(idempotencyKeys, ["free_audit_internal_submission-123"]);
});
