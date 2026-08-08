import assert from "node:assert/strict";
import test from "node:test";
import {
  AUDIT_IDEMPOTENCY_PREFIX,
  AUDIT_LEGACY_IDEMPOTENCY_PREFIX,
  AUDIT_RETENTION_DAYS,
  AUDIT_RETENTION_INDEX_PREFIX,
  AUDIT_RETENTION_STATE_KEY,
  auditExpirationDate,
  auditExpirationTime,
  auditLegacySubmissionPrefixesForExpirationDate,
  auditRetentionIndexEntry,
  auditRetentionIndexKey,
  auditRetentionMetadata,
  auditRetentionTargetId,
  isAuditRetentionTargetKey,
  isExpiredAuditMetadata
} from "../netlify/lib/audit-retention";
import { purgeExpiredAudits } from "../netlify/functions/purge-expired-audits";

interface FakeEntry {
  data: unknown;
  metadata: Record<string, unknown>;
}

class FakeAuditStore {
  entries = new Map<string, FakeEntry>();
  activeDeletes = 0;
  maximumActiveDeletes = 0;

  async *list({ prefix = "" }: { prefix?: string; paginate?: boolean }) {
    const keys = [...this.entries.keys()].filter((key) => key.startsWith(prefix)).sort();
    for (let index = 0; index < keys.length; index += 1_000) {
      yield {
        blobs: keys.slice(index, index + 1_000).map((key) => ({ key, etag: `etag-${key}` })),
        directories: []
      };
    }
    if (keys.length === 0) yield { blobs: [], directories: [] };
  }

  async get(key: string) {
    return this.entries.get(key)?.data ?? null;
  }

  async getWithMetadata(key: string) {
    const entry = this.entries.get(key);
    return entry ? { data: entry.data, metadata: entry.metadata, etag: `etag-${key}` } : null;
  }

  async setJSON(key: string, data: unknown, options: { onlyIfNew?: boolean; metadata?: Record<string, unknown> } = {}) {
    if (options.onlyIfNew && this.entries.has(key)) return { modified: false, etag: `etag-${key}` };
    this.entries.set(key, { data, metadata: options.metadata || {} });
    return { modified: true, etag: `etag-${key}` };
  }

  async delete(key: string) {
    this.activeDeletes += 1;
    this.maximumActiveDeletes = Math.max(this.maximumActiveDeletes, this.activeDeletes);
    await Promise.resolve();
    this.entries.delete(key);
    this.activeDeletes -= 1;
  }
}

test("audit records receive a fixed 24-month operational retention deadline", () => {
  const submittedAt = "2026-07-23T12:00:00.000Z";
  const expected = Date.parse(submittedAt) + 730 * 24 * 60 * 60 * 1000;

  assert.equal(AUDIT_RETENTION_DAYS, 730);
  assert.equal(auditExpirationTime(submittedAt), expected);
  assert.deepEqual(auditRetentionMetadata(submittedAt), {
    recordType: "free-audit",
    submittedAt,
    expiresAt: expected
  });
});

test("retention cleanup deletes only records whose explicit deadline has passed", () => {
  const now = Date.parse("2028-07-23T12:00:00.000Z");
  assert.equal(isExpiredAuditMetadata({ expiresAt: now - 1 }, now), true);
  assert.equal(isExpiredAuditMetadata({ expiresAt: now + 1 }, now), false);
  assert.equal(isExpiredAuditMetadata({}, now), false);
  assert.equal(isExpiredAuditMetadata(null, now), false);
});

test("retention keys partition due work without exposing or accepting arbitrary blob paths", async () => {
  const submittedAt = "2026-07-23T12:00:00.000Z";
  const targetKey = "submissions/example-record";
  const targetId = await auditRetentionTargetId(targetKey);
  const expirationDate = auditExpirationDate(submittedAt);

  assert.match(targetId, /^[a-f0-9]{32}$/);
  assert.equal(
    auditRetentionIndexKey(submittedAt, targetId),
    `${AUDIT_RETENTION_INDEX_PREFIX}${expirationDate}/${targetId}`
  );
  assert.deepEqual(auditRetentionIndexEntry(targetKey), { version: 1, targetKey });
  assert.equal(isAuditRetentionTargetKey(targetKey), true);
  assert.equal(isAuditRetentionTargetKey(`${AUDIT_IDEMPOTENCY_PREFIX}request-id`), true);
  assert.equal(isAuditRetentionTargetKey("retention-state/v1/purge"), false);
  assert.equal(isAuditRetentionTargetKey("submissions/../private"), false);

  const legacyPrefixes = auditLegacySubmissionPrefixesForExpirationDate(expirationDate);
  assert.equal(legacyPrefixes.length, 48);
  assert.ok(legacyPrefixes.every((prefix) => /^submissions\/[a-z0-9]+-$/.test(prefix)));
  assert.equal(new Set(legacyPrefixes).size, 48);
});

test("daily purge caps indexed work and deletion concurrency while leaving a checkpoint", async () => {
  const store = new FakeAuditStore();
  const submittedAt = "2026-01-01T00:00:00.000Z";
  const expiration = auditExpirationTime(submittedAt);
  const date = auditExpirationDate(submittedAt);
  const metadata = auditRetentionMetadata(submittedAt);

  for (let index = 0; index < 60; index += 1) {
    const targetKey = `submissions/test-${String(index).padStart(3, "0")}`;
    const targetId = index.toString(16).padStart(32, "0");
    store.entries.set(targetKey, { data: { submittedAt }, metadata });
    store.entries.set(auditRetentionIndexKey(submittedAt, targetId), {
      data: auditRetentionIndexEntry(targetKey),
      metadata
    });
  }

  const result = await purgeExpiredAudits(store as never, expiration + 1, {
    datesPerRun: 1,
    indexEntriesPerRun: 25,
    legacySubmissionsPerRun: 25,
    legacyAliasesPerRun: 10,
    concurrency: 4
  });

  assert.equal(result.indexInspected, 25);
  assert.equal(result.indexEntriesDeleted, 25);
  assert.equal(result.targetsDeleted, 25);
  assert.equal(result.nextDate, date);
  assert.ok(store.maximumActiveDeletes <= 4);
  assert.deepEqual(store.entries.get(AUDIT_RETENTION_STATE_KEY)?.data, { version: 1, nextDate: date });
});

test("legacy aliases migrate incrementally into the indexed namespace", async () => {
  const store = new FakeAuditStore();
  const submittedAt = "2026-07-23T12:00:00.000Z";
  const now = Date.parse("2026-08-08T12:00:00.000Z");
  const metadata = auditRetentionMetadata(submittedAt);
  const submissionKey = "submissions/legacy-record";
  const legacyAliasKey = `${AUDIT_LEGACY_IDEMPOTENCY_PREFIX}legacy-request`;
  const currentAliasKey = `${AUDIT_IDEMPOTENCY_PREFIX}legacy-request`;

  store.entries.set(submissionKey, { data: { submittedAt }, metadata });
  store.entries.set(legacyAliasKey, { data: { submissionKey }, metadata });
  store.entries.set(AUDIT_RETENTION_STATE_KEY, {
    data: { version: 1, nextDate: "2026-08-09" },
    metadata: {}
  });

  const result = await purgeExpiredAudits(store as never, now, {
    datesPerRun: 1,
    indexEntriesPerRun: 10,
    legacySubmissionsPerRun: 10,
    legacyAliasesPerRun: 10,
    concurrency: 2
  });

  assert.equal(result.legacyAliasesInspected, 1);
  assert.equal(result.legacyAliasesMigrated, 1);
  assert.equal(store.entries.has(legacyAliasKey), false);
  assert.deepEqual(store.entries.get(currentAliasKey)?.data, { submissionKey });
  assert.equal(
    [...store.entries.keys()].filter((key) => key.startsWith(AUDIT_RETENTION_INDEX_PREFIX)).length,
    2
  );
});
