import { getDeployStore, getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";
import { AUDIT_SCHEMA_VERSION, inspectAuditEmailConfiguration } from "../../src/lib/free-audit-config";
import {
  AUDIT_DEDUPE_WINDOW_MS,
  AUDIT_IDEMPOTENCY_PREFIX,
  AUDIT_LEGACY_IDEMPOTENCY_PREFIX,
  AUDIT_SUBMISSION_PREFIX,
  auditRetentionIndexEntry,
  auditRetentionIndexKey,
  auditRetentionMetadata,
  auditRetentionTargetId,
  isAuditRetentionTargetKey
} from "../lib/audit-retention";

const SCHEMA_VERSION = AUDIT_SCHEMA_VERSION;
const MAX_BODY_BYTES = 16_384;
const STORE_NAME = "velixon-free-audit-submissions";
const FORBIDDEN_UNICODE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/u;

const industries = ["construction", "fencing", "roofing", "hvac", "plumbing", "electrical", "landscaping", "moving", "restoration", "professional-services", "medical", "legal", "real-estate", "other"] as const;
const employeeCounts = ["1-4", "5-10", "11-25", "26-50", "51-100", "101-plus"] as const;
const revenueRanges = ["under-25000", "25000-50000", "50000-100000", "100000-250000", "250000-500000", "500000-plus", "prefer-not-to-say"] as const;
const budgets = ["under-1000", "1000-3000", "3000-7500", "7500-15000", "15000-plus", "not-sure"] as const;
const timelines = ["immediately", "within-30-days", "60-90-days", "researching"] as const;
const callTimes = ["morning", "midday", "afternoon", "flexible"] as const;

const topKeys = ["schemaVersion", "idempotencyKey", "botField", "startedAt", "contact", "qualification", "attribution", "consent"] as const;
const contactKeys = ["firstName", "lastName", "businessName", "workEmail", "phone", "website"] as const;
const requiredContactKeys = ["firstName", "lastName", "businessName", "workEmail"] as const;
const qualificationKeys = ["industry", "employeeCount", "monthlyRevenue", "mainOperationalProblem", "currentSoftware", "monthlyBudget", "timeline", "preferredCallTime", "additionalContext"] as const;
const requiredQualificationKeys = ["mainOperationalProblem"] as const;
const attributionKeys = ["source", "utmSource", "utmMedium", "utmCampaign", "utmTerm", "utmContent", "gclid", "gbraid", "wbraid", "fbclid", "referralSource", "landingPage", "capturedAt", "submissionPage", "landingVariant"] as const;

type StringRecord = Record<string, unknown>;
type EmailStatus = "sent" | "skipped" | "failed";
type ValidationResult = { ok: true; value: AuditPayload } | { ok: false; errors: string[] };
type EmailConfigurationState = "disabled" | "ready" | "invalid";

export interface AuditConfigurationDiagnostics {
  blobStore: { state: "runtime-managed"; storeName: typeof STORE_NAME; consistency: "strong" };
  email: { state: EmailConfigurationState; issues: string[]; replyToConfigured: boolean };
}

interface AuditPayload {
  schemaVersion: typeof SCHEMA_VERSION;
  idempotencyKey: string;
  botField: string;
  startedAt: string;
  contact: {
    firstName: string;
    lastName: string;
    businessName: string;
    workEmail: string;
    phone: string;
    website: string;
  };
  qualification: {
    mainOperationalProblem: string;
    industry?: (typeof industries)[number];
    employeeCount?: (typeof employeeCounts)[number];
    monthlyRevenue?: (typeof revenueRanges)[number];
    currentSoftware?: string;
    monthlyBudget?: (typeof budgets)[number];
    timeline?: (typeof timelines)[number];
    preferredCallTime?: (typeof callTimes)[number];
    additionalContext?: string;
  };
  attribution: Record<(typeof attributionKeys)[number], string>;
  consent: { processing: true };
}

export interface StoredAuditRecord {
  submissionId: string;
  submittedAt: string;
  schemaVersion: typeof SCHEMA_VERSION;
  status: "New";
  strategyCallStatus: "Not requested";
  internalNotes: string[];
  assignedOwner: null;
  clientStartedAt: string;
  contact: AuditPayload["contact"];
  qualification: AuditPayload["qualification"];
  attribution: AuditPayload["attribution"];
  consent: { processing: true; recordedAt: string; policyVersion: typeof SCHEMA_VERSION };
  notification?: { prospect: EmailStatus; internal: EmailStatus };
}

interface SubmissionAlias { submissionKey: string }

export const config: Config = {
  path: "/api/free-audit",
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ["ip", "domain"] }
};

const isRecord = (value: unknown): value is StringRecord => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const hasExactKeys = (value: StringRecord, expected: readonly string[]) => {
  const keys = Object.keys(value);
  return keys.length === expected.length && keys.every((key) => expected.includes(key));
};
const hasRequiredAllowedKeys = (value: StringRecord, required: readonly string[], allowed: readonly string[]) => {
  const keys = Object.keys(value);
  return required.every((key) => Object.hasOwn(value, key)) && keys.every((key) => allowed.includes(key));
};
const cleanString = (value: unknown) => typeof value === "string" ? value.normalize("NFKC").trim() : "";
const cleanSingleLine = (value: unknown) => cleanString(value).replace(/\s+/g, " ");
const isSafeString = (value: unknown, multiline = false) =>
  typeof value === "string"
  && !FORBIDDEN_UNICODE.test(value)
  && (multiline || !/[\t\r\n]/u.test(value));
const isAllowed = <T extends readonly string[]>(value: string, allowed: T): value is T[number] => allowed.includes(value);
const validEmail = (value: string) => value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isNonPublicHostname = (hostname: string) => {
  const value = hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
  if (value === "localhost" || value.endsWith(".localhost") || value.endsWith(".local") || value.endsWith(".internal")) return true;
  if (value.includes(":")) return true;
  const octets = value.split(".").map(Number);
  if (octets.length === 4 && octets.every((part) => Number.isInteger(part) && part >= 0 && part <= 255)) return true;
  return !value.includes(".");
};
const validUrl = (value: string) => {
  if (!value || value.length > 300) return false;
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:")
      && !url.username
      && !url.password
      && Boolean(url.hostname)
      && !isNonPublicHostname(url.hostname);
  } catch { return false; }
};
const validPath = (value: string) => value.startsWith("/") && !value.startsWith("//") && !value.includes("\\");
const validReferrer = (value: string) => {
  if (value === "direct") return true;
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && !url.username && !url.password;
  } catch {
    return false;
  }
};

export const validateAuditPayload = (input: unknown): ValidationResult => {
  const errors: string[] = [];
  if (!isRecord(input) || !hasExactKeys(input, topKeys)) return { ok: false, errors: ["The submission payload is invalid."] };

  const schemaVersion = cleanString(input.schemaVersion);
  const idempotencyKey = cleanString(input.idempotencyKey);
  const botField = cleanString(input.botField);
  const startedAt = cleanString(input.startedAt);
  if (![input.schemaVersion, input.idempotencyKey, input.botField, input.startedAt].every((value) => isSafeString(value))) {
    errors.push("Submission metadata contains unsupported characters.");
  }
  if (schemaVersion !== SCHEMA_VERSION) errors.push("The submission schema version is invalid.");
  if (!/^[a-zA-Z0-9-]{20,80}$/.test(idempotencyKey)) errors.push("The submission identifier is invalid.");
  if (botField.length > 200) errors.push("The spam-protection field is invalid.");
  const startedAtTime = Date.parse(startedAt);
  if (!startedAt || !Number.isFinite(startedAtTime) || startedAtTime > Date.now() + 300_000 || startedAtTime < Date.now() - 2_592_000_000) errors.push("The audit start time is invalid.");

  if (!isRecord(input.contact) || !hasRequiredAllowedKeys(input.contact, requiredContactKeys, contactKeys)) errors.push("Contact information is invalid.");
  const contact = isRecord(input.contact) ? input.contact : {};
  if (!contactKeys.every((key) => contact[key] === undefined || isSafeString(contact[key]))) errors.push("Contact information contains unsupported characters.");
  const firstName = cleanSingleLine(contact.firstName);
  const lastName = cleanSingleLine(contact.lastName);
  const businessName = cleanSingleLine(contact.businessName);
  const workEmail = cleanString(contact.workEmail).toLowerCase();
  const phone = cleanSingleLine(contact.phone);
  const website = cleanString(contact.website);
  const phoneDigits = phone.replace(/\s*(?:x|ext\.?)\s*\d{1,8}$/i, "").replace(/\D/g, "");
  if (firstName.length < 1 || firstName.length > 80) errors.push("First name is invalid.");
  if (lastName.length < 1 || lastName.length > 80) errors.push("Last name is invalid.");
  if (businessName.length < 2 || businessName.length > 160) errors.push("Business name is invalid.");
  if (!validEmail(workEmail)) errors.push("Work email is invalid.");
  if (phone && (phone.length > 40 || phoneDigits.length < 7 || phoneDigits.length > 15 || !/^[+()\d][+()\d\s.-]*(?:\s*(?:x|ext\.?)\s*\d{1,8})?$/i.test(phone))) errors.push("Phone number is invalid.");
  if (website && !validUrl(website)) errors.push("Website must use a valid http or https URL.");

  if (!isRecord(input.qualification) || !hasRequiredAllowedKeys(input.qualification, requiredQualificationKeys, qualificationKeys)) errors.push("Audit focus is invalid.");
  const qualification = isRecord(input.qualification) ? input.qualification : {};
  if (!qualificationKeys.every((key) => qualification[key] === undefined || isSafeString(
    qualification[key],
    key === "mainOperationalProblem" || key === "currentSoftware" || key === "additionalContext"
  ))) errors.push("Qualification information contains unsupported characters.");
  const industry = cleanString(qualification.industry);
  const employeeCount = cleanString(qualification.employeeCount);
  const monthlyRevenue = cleanString(qualification.monthlyRevenue);
  const mainOperationalProblem = cleanString(qualification.mainOperationalProblem);
  const currentSoftware = cleanString(qualification.currentSoftware);
  const monthlyBudget = cleanString(qualification.monthlyBudget);
  const timeline = cleanString(qualification.timeline);
  const preferredCallTime = cleanString(qualification.preferredCallTime);
  const additionalContext = cleanString(qualification.additionalContext);
  if (industry && !isAllowed(industry, industries)) errors.push("Industry is invalid.");
  if (employeeCount && !isAllowed(employeeCount, employeeCounts)) errors.push("Employee count is invalid.");
  if (monthlyRevenue && !isAllowed(monthlyRevenue, revenueRanges)) errors.push("Monthly revenue range is invalid.");
  if (mainOperationalProblem.length < 2 || mainOperationalProblem.length > 2000) errors.push("Main bottleneck is required or exceeds its allowed length.");
  if (currentSoftware.length > 1500) errors.push("Current software exceeds its allowed length.");
  if (monthlyBudget && !isAllowed(monthlyBudget, budgets)) errors.push("Monthly budget is invalid.");
  if (timeline && !isAllowed(timeline, timelines)) errors.push("Timeline is invalid.");
  if (preferredCallTime && !isAllowed(preferredCallTime, callTimes)) errors.push("Preferred call time is invalid.");
  if (additionalContext.length > 2000) errors.push("Additional context exceeds its allowed length.");

  if (!isRecord(input.attribution) || !hasExactKeys(input.attribution, attributionKeys)) errors.push("Attribution data is invalid.");
  const rawAttribution = isRecord(input.attribution) ? input.attribution : {};
  if (!attributionKeys.every((key) => isSafeString(rawAttribution[key]))) errors.push("Attribution data contains unsupported characters.");
  const limits: Record<(typeof attributionKeys)[number], number> = {
    source: 160, utmSource: 160, utmMedium: 160, utmCampaign: 200, utmTerm: 300, utmContent: 300,
    gclid: 300, gbraid: 300, wbraid: 300, fbclid: 300, referralSource: 1000, landingPage: 1000,
    capturedAt: 80, submissionPage: 1000, landingVariant: 80
  };
  const attribution = {} as AuditPayload["attribution"];
  for (const key of attributionKeys) {
    const value = cleanString(rawAttribution[key]);
    if (value.length > limits[key]) errors.push(`${key} attribution is too long.`);
    attribution[key] = value;
  }
  if (attribution.capturedAt && !Number.isFinite(Date.parse(attribution.capturedAt))) errors.push("Attribution capture time is invalid.");
  if (attribution.landingPage && !validPath(attribution.landingPage)) errors.push("Landing-page attribution is invalid.");
  if (attribution.submissionPage && !validPath(attribution.submissionPage)) errors.push("Submission-page attribution is invalid.");
  if (attribution.referralSource && !validReferrer(attribution.referralSource)) errors.push("Referral attribution is invalid.");
  if (!/^[abc]$/.test(attribution.landingVariant)) errors.push("Landing variant is invalid.");

  if (!isRecord(input.consent) || !hasExactKeys(input.consent, ["processing"]) || input.consent.processing !== true) errors.push("Required processing consent was not provided.");
  if (errors.length) return { ok: false, errors: [...new Set(errors)] };

  return { ok: true, value: {
    schemaVersion: SCHEMA_VERSION, idempotencyKey, botField, startedAt,
    contact: { firstName, lastName, businessName, workEmail, phone, website },
    qualification: {
      mainOperationalProblem,
      ...(industry ? { industry: industry as NonNullable<AuditPayload["qualification"]["industry"]> } : {}),
      ...(employeeCount ? { employeeCount: employeeCount as NonNullable<AuditPayload["qualification"]["employeeCount"]> } : {}),
      ...(monthlyRevenue ? { monthlyRevenue: monthlyRevenue as NonNullable<AuditPayload["qualification"]["monthlyRevenue"]> } : {}),
      ...(currentSoftware ? { currentSoftware } : {}),
      ...(monthlyBudget ? { monthlyBudget: monthlyBudget as NonNullable<AuditPayload["qualification"]["monthlyBudget"]> } : {}),
      ...(timeline ? { timeline: timeline as NonNullable<AuditPayload["qualification"]["timeline"]> } : {}),
      ...(preferredCallTime ? { preferredCallTime: preferredCallTime as NonNullable<AuditPayload["qualification"]["preferredCallTime"]> } : {}),
      ...(additionalContext ? { additionalContext } : {})
    }, attribution, consent: { processing: true }
  } };
};

const json = (body: Record<string, unknown>, status = 200, requestId = "") => new Response(JSON.stringify({
  ...body,
  ...(requestId ? { requestId } : {})
}), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Security-Policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'; sandbox",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Origin-Agent-Cluster": "?1",
    "Permissions-Policy": "accelerometer=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()",
    "Referrer-Policy": "no-referrer",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-Permitted-Cross-Domain-Policies": "none",
    ...(requestId ? { "X-Request-Id": requestId } : {})
  }
});

const escapeResponseHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[character] || character);

const nativeFormResponse = (message: string, status: number, requestId = "") => {
  const successful = status >= 200 && status < 300;
  const title = successful ? "Audit request received" : "Audit request needs attention";
  const reference = !successful && requestId
    ? `<p>Reference: ${escapeResponseHtml(requestId)}</p>`
    : "";
  return new Response(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} | Velixon</title></head>
<body><main><h1>${title}</h1><p>${escapeResponseHtml(message)}</p>${reference}<p><a href="/free-audit/#book-audit">Return to the Free Business Systems Audit</a></p></main></body></html>`, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      ...(requestId ? { "X-Request-Id": requestId } : {})
    }
  });
};

export const payloadFromNativeForm = (source: string): unknown => {
  const form = new URLSearchParams(source);
  const now = new Date().toISOString();
  return {
    schemaVersion: SCHEMA_VERSION,
    idempotencyKey: crypto.randomUUID(),
    botField: form.get("company-fax") || "",
    startedAt: now,
    contact: {
      firstName: form.get("firstName") || "",
      lastName: form.get("lastName") || "",
      businessName: form.get("businessName") || "",
      workEmail: form.get("workEmail") || "",
      phone: form.get("phone") || "",
      website: form.get("website") || ""
    },
    qualification: {
      mainOperationalProblem: form.get("mainOperationalProblem") || ""
    },
    attribution: {
      source: "native-form",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
      gclid: "",
      gbraid: "",
      wbraid: "",
      fbclid: "",
      referralSource: "direct",
      landingPage: "/free-audit/",
      capturedAt: now,
      submissionPage: "/free-audit/",
      landingVariant: "a"
    },
    consent: { processing: form.get("processingConsent") === "accepted" }
  };
};

const escapeHtml = (value: unknown) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const humanize = (value: string) => value.replace(/([a-z])([A-Z])/g, "$1 $2").replaceAll("-", " ").replace(/^./, (letter) => letter.toUpperCase());
const emailSubjectValue = (value: string) => value
  .replace(/[\r\n]+/g, " ")
  .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/gu, "")
  .trim()
  .slice(0, 160);
const buildInternalSummary = (record: StoredAuditRecord) => {
  const legacyQualification = [
    record.qualification.industry ? `Industry: ${humanize(record.qualification.industry)}` : "",
    record.qualification.employeeCount ? `Employees: ${humanize(record.qualification.employeeCount)}` : "",
    record.qualification.monthlyRevenue ? `Monthly revenue: ${humanize(record.qualification.monthlyRevenue)}` : "",
    record.qualification.currentSoftware ? `Current software: ${record.qualification.currentSoftware}` : "",
    record.qualification.monthlyBudget ? `Monthly budget: ${humanize(record.qualification.monthlyBudget)}` : "",
    record.qualification.timeline ? `Timeline: ${humanize(record.qualification.timeline)}` : "",
    record.qualification.preferredCallTime ? `Preferred call time: ${humanize(record.qualification.preferredCallTime)}` : "",
    record.qualification.additionalContext ? `Additional context: ${record.qualification.additionalContext}` : ""
  ].filter(Boolean);

  return [
    `Submission: ${record.submissionId}`, `Received: ${record.submittedAt}`, `Status: ${record.status}`, `Strategy call status: ${record.strategyCallStatus || "Not requested"}`, "", "Contact:",
    `First name: ${record.contact.firstName}`, `Last name: ${record.contact.lastName}`, `Business: ${record.contact.businessName}`, `Work email: ${record.contact.workEmail}`,
    `Phone: ${record.contact.phone || "Not provided"}`, `Website: ${record.contact.website || "Not provided"}`, "", "Audit focus:",
    `Main bottleneck: ${record.qualification.mainOperationalProblem}`,
    ...legacyQualification, "", "Attribution:",
    ...attributionKeys.map((key) => `${humanize(key)}: ${record.attribution[key] || "Not provided"}`)
  ].join("\n");
};

const getEnvironmentValue = (key: string) => {
  const runtime = globalThis as typeof globalThis & { Netlify?: { env?: { get?: (name: string) => string | undefined } } };
  return runtime.Netlify?.env?.get?.(key)?.trim() || process.env[key]?.trim() || "";
};
export const getAuditConfigurationDiagnostics = (): AuditConfigurationDiagnostics => {
  const email = inspectAuditEmailConfiguration({
    apiKey: getEnvironmentValue("RESEND_API_KEY"),
    from: getEnvironmentValue("AUDIT_FROM_EMAIL"),
    internalTo: getEnvironmentValue("AUDIT_NOTIFICATION_EMAIL"),
    replyTo: getEnvironmentValue("AUDIT_REPLY_TO_EMAIL")
  });

  return {
    blobStore: { state: "runtime-managed", storeName: STORE_NAME, consistency: "strong" },
    email
  };
};

const logOperationalEvent = (level: "info" | "warn" | "error", event: string, details: Record<string, unknown>) => {
  const entry = JSON.stringify({ service: "free-audit", event, ...details });
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.info(entry);
};

const sendResendEmail = async (apiKey: string, message: Record<string, unknown>, idempotencyKey: string) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
    body: JSON.stringify(message), signal: AbortSignal.timeout(8_000)
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
};

export const sendNotifications = async (record: StoredAuditRecord, previous?: { prospect: EmailStatus; internal: EmailStatus }) => {
  const diagnostics = getAuditConfigurationDiagnostics();
  if (diagnostics.email.state !== "ready") {
    return {
      prospect: previous?.prospect === "sent" ? "sent" as const : "skipped" as const,
      internal: previous?.internal === "sent" ? "sent" as const : "skipped" as const
    };
  }
  const apiKey = getEnvironmentValue("RESEND_API_KEY");
  const from = getEnvironmentValue("AUDIT_FROM_EMAIL");
  const internalTo = getEnvironmentValue("AUDIT_NOTIFICATION_EMAIL");
  const replyTo = getEnvironmentValue("AUDIT_REPLY_TO_EMAIL");

  const summary = buildInternalSummary(record);
  const prospectMessage = {
    from, to: [record.contact.workEmail], subject: "We received your Velixon Free Business Systems Audit request", ...(replyTo ? { reply_to: replyTo } : {}),
    text: `Hi ${record.contact.firstName},\n\nYour Free Business Systems Audit request has been received. Velixon will email your personalized one-page scorecard and 3 prioritized recommendations within 3 business days.\n\nA call is not required. After the audit is delivered, reply to that email if you want an optional 20-minute strategy call. Velixon will arrange it with you manually. There is no obligation and no specific business result is guaranteed.\n\nSmarter Systems. Better Business.\nVelixon Solutions LLC, doing business as Velixon\n718 N 1130 W, Orem, UT 84057`,
    html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#17151d"><p style="color:#1f66ff;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Velixon Free Business Systems Audit</p><h1 style="font-size:30px;line-height:1.1">Your audit request has been received.</h1><p>Hi ${escapeHtml(record.contact.firstName)},</p><p>Velixon will email your personalized one-page scorecard and 3 prioritized recommendations within 3 business days.</p><p>A call is not required. After the audit is delivered, reply to that email if you want an optional 20-minute strategy call. Velixon will arrange it with you manually. There is no obligation and no specific business result is guaranteed.</p><p><strong>Smarter Systems. Better Business.</strong><br>Velixon Solutions LLC, doing business as Velixon<br>718 N 1130 W, Orem, UT 84057</p></div>`
  };
  const internalMessage = { from, to: [internalTo], reply_to: record.contact.workEmail, subject: `New Business Systems Audit — ${emailSubjectValue(record.contact.businessName)}`, text: summary, html: `<div style="font-family:Arial,sans-serif;max-width:760px;margin:auto"><h1>New Free Business Systems Audit</h1><pre style="white-space:pre-wrap;font:14px/1.55 Arial,sans-serif;background:#f5f7fb;padding:20px;border-radius:10px">${escapeHtml(summary)}</pre></div>` };
  const send = async (prior: EmailStatus | undefined, message: Record<string, unknown>, key: string): Promise<EmailStatus> => {
    if (prior === "sent") return "sent";
    try { await sendResendEmail(apiKey, message, key); return "sent"; } catch { return "failed"; }
  };
  const [prospect, internal] = await Promise.all([
    send(previous?.prospect, prospectMessage, `free_audit_prospect_${record.submissionId}`),
    send(previous?.internal, internalMessage, `free_audit_internal_${record.submissionId}`)
  ]);
  return { prospect, internal };
};

const normalizeBusiness = (value: string) => value.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
const semanticKey = async (payload: AuditPayload) => {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${payload.contact.workEmail}|${normalizeBusiness(payload.contact.businessName)}`));
  const hash = Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 32);
  return `${AUDIT_SUBMISSION_PREFIX}${Math.floor(Date.now() / AUDIT_DEDUPE_WINDOW_MS).toString(36)}-${hash}`;
};

const ensureRetentionIndex = async (
  store: ReturnType<typeof getStore>,
  targetKey: string,
  submittedAt: string
) => {
  const targetId = await auditRetentionTargetId(targetKey);
  await store.setJSON(
    auditRetentionIndexKey(submittedAt, targetId),
    auditRetentionIndexEntry(targetKey),
    { metadata: auditRetentionMetadata(submittedAt) }
  );
};

class BodyTooLargeError extends Error {}

const readRequestBody = async (request: Request) => {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let byteLength = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    byteLength += value.byteLength;
    if (byteLength > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new BodyTooLargeError();
    }
    chunks.push(value);
  }

  const body = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(body);
};

export default async (request: Request, context: Context) => {
  const requestId = context.requestId || crypto.randomUUID();
  const requestStartedAt = Date.now();
  let isNativeForm = false;
  const reject = (message: string, status: number, event: string, details: Record<string, unknown> = {}) => {
    logOperationalEvent(status >= 500 ? "error" : "warn", event, { requestId, status, ...details });
    return isNativeForm
      ? nativeFormResponse(message, status, requestId)
      : json({ ok: false, message }, status, requestId);
  };

  if (request.method !== "POST") return reject("Method not allowed.", 405, "method_rejected", { method: request.method });
  const contentType = request.headers.get("content-type") || "";
  const mediaType = contentType.split(";", 1)[0]?.trim().toLowerCase();
  isNativeForm = mediaType === "application/x-www-form-urlencoded";
  if (mediaType !== "application/json" && !isNativeForm) return reject("Send this form as JSON or standard form data.", 415, "content_type_rejected");
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) return reject("The audit submission is too large.", 413, "body_size_rejected");
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (origin !== requestUrl.origin || (fetchSite && fetchSite !== "same-origin")) {
    return reject("This submission origin is not allowed.", 403, "origin_rejected");
  }

  let source = "";
  try {
    source = await readRequestBody(request);
  } catch (error) {
    if (error instanceof BodyTooLargeError) return reject("The audit submission is too large.", 413, "body_size_rejected");
    return reject("The audit submission could not be read.", 400, "body_read_failed");
  }
  let input: unknown;
  if (isNativeForm) {
    input = payloadFromNativeForm(source);
  } else {
    try { input = JSON.parse(source); } catch { return reject("The audit submission is not valid JSON.", 400, "json_parse_rejected"); }
  }
  if (isRecord(input) && cleanString(input.botField)) {
    logOperationalEvent("info", "honeypot_accepted", { requestId });
    return isNativeForm
      ? nativeFormResponse("Your request has been received.", 200, requestId)
      : json({ ok: true, submissionId: crypto.randomUUID(), duplicate: false }, 200, requestId);
  }
  const validation = validateAuditPayload(input);
  if (!validation.ok) {
    logOperationalEvent("warn", "validation_rejected", { requestId, errorCount: validation.errors.length });
    return json({ ok: false, message: validation.errors[0] }, 422, requestId);
  }

  const submittedAt = new Date().toISOString();
  const newRecord: StoredAuditRecord = {
    submissionId: crypto.randomUUID(), submittedAt, schemaVersion: SCHEMA_VERSION, status: "New", strategyCallStatus: "Not requested", internalNotes: [], assignedOwner: null,
    clientStartedAt: validation.value.startedAt, contact: validation.value.contact, qualification: validation.value.qualification, attribution: validation.value.attribution,
    consent: { processing: true, recordedAt: submittedAt, policyVersion: SCHEMA_VERSION }
  };
  const retentionMetadata = auditRetentionMetadata(submittedAt);
  const isProductionDeploy = context.deploy?.context === "production" && context.deploy?.published === true;
  const store = isProductionDeploy
    ? getStore({ name: STORE_NAME, consistency: "strong" })
    : getDeployStore({ name: `${STORE_NAME}-preview`, consistency: "strong" });
  const aliasKey = `${AUDIT_IDEMPOTENCY_PREFIX}${validation.value.idempotencyKey}`;
  const legacyAliasKey = `${AUDIT_LEGACY_IDEMPOTENCY_PREFIX}${validation.value.idempotencyKey}`;
  let record = newRecord;
  let submissionKey = "";
  let duplicate = false;
  try {
    const alias = (
      await store.get(aliasKey, { type: "json", consistency: "strong" })
      || await store.get(legacyAliasKey, { type: "json", consistency: "strong" })
    ) as SubmissionAlias | null;
    if (isAuditRetentionTargetKey(alias?.submissionKey) && alias.submissionKey.startsWith(AUDIT_SUBMISSION_PREFIX)) {
      const existing = await store.get(alias.submissionKey, { type: "json", consistency: "strong" }) as StoredAuditRecord | null;
      if (existing) { record = existing; submissionKey = alias.submissionKey; duplicate = true; }
    }
    if (!submissionKey) {
      submissionKey = await semanticKey(validation.value);
      const write = await store.setJSON(submissionKey, newRecord, {
        onlyIfNew: true,
        metadata: retentionMetadata
      });
      if (!write.modified) {
        const existing = await store.get(submissionKey, { type: "json", consistency: "strong" }) as StoredAuditRecord | null;
        if (!existing) throw new Error("Duplicate record missing");
        record = existing; duplicate = true;
      }
    }
    const recordRetentionMetadata = auditRetentionMetadata(record.submittedAt);
    const aliasWrite = await store.setJSON(aliasKey, { submissionKey }, {
      onlyIfNew: true,
      metadata: recordRetentionMetadata
    });
    if (!aliasWrite.modified) {
      const existingAlias = await store.get(aliasKey, { type: "json", consistency: "strong" }) as SubmissionAlias | null;
      if (existingAlias?.submissionKey !== submissionKey) throw new Error("Idempotency alias conflict");
    }
    await ensureRetentionIndex(store, submissionKey, record.submittedAt);
    await ensureRetentionIndex(store, aliasKey, record.submittedAt);
  } catch (error) {
    logOperationalEvent("error", "blob_write_failed", {
      requestId,
      errorType: error instanceof Error ? error.name : "UnknownError",
      durationMs: Date.now() - requestStartedAt
    });
    return json({ ok: false, message: "The audit could not be stored securely. Please try again." }, 503, requestId);
  }

  logOperationalEvent("info", "blob_write_succeeded", { requestId, submissionId: record.submissionId, duplicate });
  const configuration = getAuditConfigurationDiagnostics();
  if (configuration.email.state === "invalid") {
    logOperationalEvent("error", "email_configuration_invalid", { requestId, issues: configuration.email.issues });
  } else if (configuration.email.state === "disabled") {
    logOperationalEvent("warn", "email_delivery_disabled", { requestId });
  }
  const notification = isProductionDeploy
    ? await sendNotifications(record, record.notification)
    : { prospect: "skipped" as const, internal: "skipped" as const };
  if (!isProductionDeploy) {
    logOperationalEvent("info", "preview_notification_skipped", {
      requestId,
      deployContext: context.deploy?.context || "local"
    });
  }
  logOperationalEvent(notification.prospect === "failed" || notification.internal === "failed" ? "error" : "info", "email_delivery_completed", {
    requestId,
    submissionId: record.submissionId,
    prospect: notification.prospect,
    internal: notification.internal
  });
  try {
    await store.setJSON(submissionKey, { ...record, notification }, {
      metadata: auditRetentionMetadata(record.submittedAt)
    });
  } catch (error) {
    logOperationalEvent("error", "notification_status_persist_failed", {
      requestId,
      submissionId: record.submissionId,
      errorType: error instanceof Error ? error.name : "UnknownError"
    });
  }
  logOperationalEvent("info", "submission_completed", {
    requestId,
    submissionId: record.submissionId,
    duplicate,
    durationMs: Date.now() - requestStartedAt,
    emailConfiguration: configuration.email.state,
    prospectNotification: notification.prospect,
    internalNotification: notification.internal
  });
  return isNativeForm
    ? nativeFormResponse("Your request is complete. Velixon will email your one-page scorecard and 3 prioritized recommendations within 3 business days.", 200, requestId)
    : json({ ok: true, submissionId: record.submissionId, duplicate }, 200, requestId);
};
