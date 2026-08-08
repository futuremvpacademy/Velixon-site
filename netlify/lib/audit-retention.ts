export const AUDIT_RETENTION_DAYS = 730;
export const AUDIT_RETENTION_MS = AUDIT_RETENTION_DAYS * 24 * 60 * 60 * 1000;
export const AUDIT_DEDUPE_WINDOW_MS = 30 * 60 * 1000;

export const AUDIT_SUBMISSION_PREFIX = "submissions/";
export const AUDIT_IDEMPOTENCY_PREFIX = "idempotency-v2/";
export const AUDIT_LEGACY_IDEMPOTENCY_PREFIX = "idempotency/";
export const AUDIT_RETENTION_INDEX_PREFIX = "retention-index/v1/";
export const AUDIT_RETENTION_STATE_KEY = "retention-state/v1/purge";

export interface AuditRetentionIndexEntry {
  version: 1;
  targetKey: string;
}

export const auditExpirationTime = (submittedAt: string) => {
  const submittedTime = Date.parse(submittedAt);
  if (!Number.isFinite(submittedTime)) throw new Error("A valid submission time is required.");
  return submittedTime + AUDIT_RETENTION_MS;
};

export const auditRetentionMetadata = (submittedAt: string) => ({
  recordType: "free-audit",
  submittedAt,
  expiresAt: auditExpirationTime(submittedAt)
});

const parseUtcDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return Number.NaN;
  const parsed = Date.parse(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === value
    ? parsed
    : Number.NaN;
};

export const utcDate = (time: number) => {
  if (!Number.isFinite(time)) throw new Error("A valid time is required.");
  return new Date(time).toISOString().slice(0, 10);
};

export const nextUtcDate = (value: string) => {
  const parsed = parseUtcDate(value);
  if (!Number.isFinite(parsed)) throw new Error("A valid UTC date is required.");
  return utcDate(parsed + 24 * 60 * 60 * 1000);
};

export const auditExpirationDate = (submittedAt: string) => utcDate(auditExpirationTime(submittedAt));

export const isAuditRetentionTargetKey = (key: unknown): key is string =>
  typeof key === "string"
  && key.length <= 240
  && (
    key.startsWith(AUDIT_SUBMISSION_PREFIX)
    || key.startsWith(AUDIT_IDEMPOTENCY_PREFIX)
    || key.startsWith(AUDIT_LEGACY_IDEMPOTENCY_PREFIX)
  )
  && !key.includes("..")
  && !key.includes("\\");

export const auditRetentionTargetId = async (targetKey: string) => {
  if (!isAuditRetentionTargetKey(targetKey)) throw new Error("The retention target key is invalid.");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(targetKey));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 32);
};

export const auditRetentionIndexKeyForExpiration = (expiresAt: number, targetId: string) => {
  if (!Number.isFinite(expiresAt)) throw new Error("The retention expiration time is invalid.");
  if (!/^[a-f0-9]{32}$/.test(targetId)) throw new Error("The retention target identifier is invalid.");
  return `${AUDIT_RETENTION_INDEX_PREFIX}${utcDate(expiresAt)}/${targetId}`;
};

export const auditRetentionIndexKey = (submittedAt: string, targetId: string) =>
  auditRetentionIndexKeyForExpiration(auditExpirationTime(submittedAt), targetId);

export const auditRetentionIndexEntry = (targetKey: string): AuditRetentionIndexEntry => {
  if (!isAuditRetentionTargetKey(targetKey)) throw new Error("The retention target key is invalid.");
  return { version: 1, targetKey };
};

export const auditLegacySubmissionPrefixesForExpirationDate = (expirationDate: string) => {
  const expirationDay = parseUtcDate(expirationDate);
  if (!Number.isFinite(expirationDay)) throw new Error("A valid expiration date is required.");
  const submissionDay = expirationDay - AUDIT_RETENTION_MS;
  return Array.from({ length: 48 }, (_, index) => {
    const bucket = Math.floor((submissionDay + index * AUDIT_DEDUPE_WINDOW_MS) / AUDIT_DEDUPE_WINDOW_MS);
    return `${AUDIT_SUBMISSION_PREFIX}${bucket.toString(36)}-`;
  });
};

export const isExpiredAuditMetadata = (
  metadata: unknown,
  now = Date.now()
) => {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return false;
  const expiresAt = Number((metadata as Record<string, unknown>).expiresAt);
  return Number.isFinite(expiresAt) && expiresAt <= now;
};
