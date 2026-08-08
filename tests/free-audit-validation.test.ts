import assert from "node:assert/strict";
import test from "node:test";
import auditHandler, { payloadFromNativeForm, validateAuditPayload } from "../netlify/functions/free-audit";
import { AUDIT_SCHEMA_VERSION } from "../src/lib/free-audit-config";

const validPayload = () => ({
  schemaVersion: AUDIT_SCHEMA_VERSION,
  idempotencyKey: "62c9a5b7-62a4-45a8-8a21-156b4330bf18",
  botField: "",
  startedAt: new Date().toISOString(),
  contact: {
    firstName: "Taylor",
    lastName: "Example",
    businessName: "Example Services",
    workEmail: "Taylor@Example.com",
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
    landingPage: "/free-audit/?utm_source=google",
    capturedAt: new Date().toISOString(),
    submissionPage: "/free-audit/",
    landingVariant: "a"
  },
  consent: { processing: true }
});

test("server validation accepts and normalizes the simplified payload", () => {
  const result = validateAuditPayload(validPayload());
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.contact.workEmail, "taylor@example.com");
    assert.deepEqual(result.value.qualification, {
      mainOperationalProblem: "New leads are falling through the cracks before anyone follows up."
    });
  }
});

test("server validation requires the current schema version", () => {
  const payload = { ...validPayload(), schemaVersion: "2026-07-19" };
  const result = validateAuditPayload(payload);
  assert.equal(result.ok, false);
  if (!result.ok) assert.ok(result.errors.some((error) => error.includes("schema version")));
});

test("server validation rejects unknown and missing top-level fields", () => {
  const unknown = { ...validPayload(), trustedStatus: "Closed Won" };
  assert.equal(validateAuditPayload(unknown).ok, false);
  const missing = validPayload() as Record<string, unknown>;
  delete missing.qualification;
  assert.equal(validateAuditPayload(missing).ok, false);
});

test("server validation enforces exact nested contracts", () => {
  const payload = validPayload();
  const invalid = { ...payload, contact: { ...payload.contact, role: "Owner" } };
  const result = validateAuditPayload(invalid);
  assert.equal(result.ok, false);
  if (!result.ok) assert.ok(result.errors.includes("Contact information is invalid."));
});

test("website is optional but must be an http or https URL when supplied", () => {
  const withoutWebsite = validPayload();
  withoutWebsite.contact.website = "";
  assert.equal(validateAuditPayload(withoutWebsite).ok, true);

  const invalidWebsite = validPayload();
  invalidWebsite.contact.website = "javascript:alert(1)";
  assert.equal(validateAuditPayload(invalidWebsite).ok, false);

  const privateWebsite = validPayload();
  privateWebsite.contact.website = "http://127.0.0.1/admin";
  assert.equal(validateAuditPayload(privateWebsite).ok, false);

  const ipLiteralWebsite = validPayload();
  ipLiteralWebsite.contact.website = "https://[::ffff:127.0.0.1]/";
  assert.equal(validateAuditPayload(ipLiteralWebsite).ok, false);

  const credentialedWebsite = validPayload();
  credentialedWebsite.contact.website = "https://user:password@example.com/";
  assert.equal(validateAuditPayload(credentialedWebsite).ok, false);

  const omittedWebsite = validPayload();
  const { website: _website, ...contactWithoutWebsite } = omittedWebsite.contact;
  assert.equal(validateAuditPayload({ ...omittedWebsite, contact: contactWithoutWebsite }).ok, true);
});

test("server validation requires one bounded free-form bottleneck and no legacy qualification fields", () => {
  const multiline = validPayload();
  multiline.qualification.mainOperationalProblem = "Dispatch is manual.\nCustomer updates get missed.";
  assert.equal(validateAuditPayload(multiline).ok, true);

  const missingProblem = { ...validPayload(), qualification: {} };
  assert.equal(validateAuditPayload(missingProblem).ok, false);

  const oversizedProblem = validPayload();
  oversizedProblem.qualification.mainOperationalProblem = "x".repeat(2001);
  assert.equal(validateAuditPayload(oversizedProblem).ok, false);

  const payload = validPayload();
  const unknown = { ...payload, qualification: { ...payload.qualification, privateScore: "high" } };
  assert.equal(validateAuditPayload(unknown).ok, false);
});

test("server validation captures advertising click IDs and the landing variant but rejects unsupported attribution", () => {
  const accepted = validateAuditPayload(validPayload());
  assert.equal(accepted.ok, true);
  if (accepted.ok) {
    assert.equal(accepted.value.attribution.gclid, "google-click-id");
    assert.equal(accepted.value.attribution.gbraid, "google-app-browser-id");
    assert.equal(accepted.value.attribution.wbraid, "google-web-to-app-id");
    assert.equal(accepted.value.attribution.fbclid, "facebook-click-id");
    assert.equal(accepted.value.attribution.landingVariant, "a");
  }

  const payload = validPayload();
  const invalid = { ...payload, attribution: { ...payload.attribution, privateNote: "do not accept" } };
  assert.equal(validateAuditPayload(invalid).ok, false);

  const invalidVariant = validPayload();
  invalidVariant.attribution.landingVariant = "experiment-99";
  assert.equal(validateAuditPayload(invalidVariant).ok, false);
});

test("server validation requires processing consent", () => {
  const payload = validPayload();
  payload.consent.processing = false;
  assert.equal(validateAuditPayload(payload).ok, false);
});

test("phone is optional but rejects non-phone text when supplied", () => {
  const blankPhone = validPayload();
  blankPhone.contact.phone = "";
  assert.equal(validateAuditPayload(blankPhone).ok, true);

  const omittedPhone = validPayload();
  const { phone: _phone, ...contactWithoutPhone } = omittedPhone.contact;
  assert.equal(validateAuditPayload({ ...omittedPhone, contact: contactWithoutPhone }).ok, true);

  const payload = validPayload();
  payload.contact.phone = "not-a-phone";
  assert.equal(validateAuditPayload(payload).ok, false);
});

test("server validation rejects control characters, bidi overrides, and unsafe attribution paths", () => {
  const headerInjection = validPayload();
  headerInjection.contact.businessName = "Example Services\r\nBcc: attacker@example.com";
  assert.equal(validateAuditPayload(headerInjection).ok, false);

  const bidiSpoof = validPayload();
  bidiSpoof.contact.firstName = "Taylor\u202e";
  assert.equal(validateAuditPayload(bidiSpoof).ok, false);

  const protocolRelativePath = validPayload();
  protocolRelativePath.attribution.submissionPage = "//evil.example/path";
  assert.equal(validateAuditPayload(protocolRelativePath).ok, false);

  const credentialedReferrer = validPayload();
  credentialedReferrer.attribution.referralSource = "https://user:password@evil.example/";
  assert.equal(validateAuditPayload(credentialedReferrer).ok, false);
});

test("API rejections return the same safe request reference in the body and header", async () => {
  const originalWarn = console.warn;
  console.warn = () => {};
  try {
    const response = await auditHandler(
      new Request("https://velixon.net/api/free-audit", { method: "GET" }),
      { requestId: "request-test-123" } as Parameters<typeof auditHandler>[1]
    );
    const body = await response.json() as { ok?: boolean; requestId?: string };
    assert.equal(response.status, 405);
    assert.equal(response.headers.get("X-Request-Id"), "request-test-123");
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    assert.match(response.headers.get("Content-Security-Policy") || "", /default-src 'none'/);
    assert.equal(response.headers.get("X-Frame-Options"), "DENY");
    assert.equal(response.headers.get("Referrer-Policy"), "no-referrer");
    assert.deepEqual(body, { ok: false, message: "Method not allowed.", requestId: "request-test-123" });
  } finally {
    console.warn = originalWarn;
  }
});

test("API rejects missing and cross-site origins before processing a submission", async () => {
  const originalWarn = console.warn;
  console.warn = () => {};
  try {
    for (const origin of [undefined, "https://attacker.example"]) {
      const headers = new Headers({ "Content-Type": "application/json" });
      if (origin) headers.set("Origin", origin);
      const response = await auditHandler(
        new Request("https://velixon.net/api/free-audit", {
          method: "POST",
          headers,
          body: JSON.stringify(validPayload())
        }),
        { requestId: "request-origin-test" } as Parameters<typeof auditHandler>[1]
      );
      assert.equal(response.status, 403);
      assert.deepEqual(await response.json(), {
        ok: false,
        message: "This submission origin is not allowed.",
        requestId: "request-origin-test"
      });
    }
  } finally {
    console.warn = originalWarn;
  }
});

test("API rejects oversized streamed bodies and ambiguous JSON content types", async () => {
  const originalWarn = console.warn;
  console.warn = () => {};
  const context = { requestId: "request-size-test" } as Parameters<typeof auditHandler>[1];
  try {
    const oversized = await auditHandler(
      new Request("https://velixon.net/api/free-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://velixon.net"
        },
        body: JSON.stringify({ payload: "x".repeat(20_000) })
      }),
      context
    );
    assert.equal(oversized.status, 413);

    const ambiguousType = await auditHandler(
      new Request("https://velixon.net/api/free-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json-malicious",
          "Origin": "https://velixon.net"
        },
        body: "{}"
      }),
      context
    );
    assert.equal(ambiguousType.status, 415);
  } finally {
    console.warn = originalWarn;
  }
});

test("native form fallback builds the current schema and returns accessible HTML responses", async () => {
  const nativeBody = new URLSearchParams({
    firstName: "Taylor",
    lastName: "Morgan",
    businessName: "Example Services",
    workEmail: "taylor@example.com",
    phone: "",
    website: "https://example.com",
    mainOperationalProblem: "Lead follow-up is still copied between tools.",
    processingConsent: "accepted"
  });
  const parsed = validateAuditPayload(payloadFromNativeForm(nativeBody.toString()));
  assert.equal(parsed.ok, true);

  const originalInfo = console.info;
  console.info = () => {};
  try {
    nativeBody.set("company-fax", "bot value");
    const response = await auditHandler(
      new Request("https://velixon.net/api/free-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Origin": "https://velixon.net",
          "Sec-Fetch-Site": "same-origin"
        },
        body: nativeBody
      }),
      { requestId: "request-native-form" } as Parameters<typeof auditHandler>[1]
    );
    assert.equal(response.status, 200);
    assert.match(response.headers.get("Content-Type") || "", /text\/html/);
    assert.match(await response.text(), /Audit request received/);
    assert.equal(response.headers.get("X-Request-Id"), "request-native-form");
  } finally {
    console.info = originalInfo;
  }
});
