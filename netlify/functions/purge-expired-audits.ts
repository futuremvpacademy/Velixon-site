import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";
import {
  AUDIT_IDEMPOTENCY_PREFIX,
  AUDIT_LEGACY_IDEMPOTENCY_PREFIX,
  AUDIT_RETENTION_INDEX_PREFIX,
  AUDIT_RETENTION_STATE_KEY,
  type AuditRetentionIndexEntry,
  auditLegacySubmissionPrefixesForExpirationDate,
  auditRetentionIndexEntry,
  auditRetentionIndexKeyForExpiration,
  auditRetentionMetadata,
  auditRetentionTargetId,
  isAuditRetentionTargetKey,
  isExpiredAuditMetadata,
  nextUtcDate,
  utcDate
} from "../lib/audit-retention";

const STORE_NAME = "velixon-free-audit-submissions";

export const RETENTION_PURGE_LIMITS = {
  datesPerRun: 7,
  indexEntriesPerRun: 500,
  legacySubmissionsPerRun: 500,
  legacyAliasesPerRun: 100,
  concurrency: 20
} as const;

type AuditStore = Pick<
  ReturnType<typeof getStore>,
  "delete" | "get" | "getWithMetadata" | "list" | "setJSON"
>;

interface RetentionState {
  version: 1;
  nextDate: string;
}

interface PurgeLimits {
  datesPerRun: number;
  indexEntriesPerRun: number;
  legacySubmissionsPerRun: number;
  legacyAliasesPerRun: number;
  concurrency: number;
}

interface PurgeStats {
  datesCompleted: number;
  indexInspected: number;
  legacySubmissionsInspected: number;
  legacyAliasesInspected: number;
  legacyAliasesMigrated: number;
  targetsDeleted: number;
  indexEntriesDeleted: number;
  pending: number;
  failed: number;
}

interface RetentionDetails {
  submittedAt: string;
  expiresAt: number;
}

export const config: Config = {
  schedule: "@daily"
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const isUtcDate = (value: unknown): value is string => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = Date.parse(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed) && utcDate(parsed) === value;
};

const retentionDetails = (metadata: unknown, data?: unknown): RetentionDetails | null => {
  const metadataRecord = isRecord(metadata) ? metadata : {};
  const dataRecord = isRecord(data) ? data : {};
  const explicitExpiration = Number(metadataRecord.expiresAt);
  const submittedAt = typeof metadataRecord.submittedAt === "string"
    ? metadataRecord.submittedAt
    : typeof dataRecord.submittedAt === "string"
      ? dataRecord.submittedAt
      : "";

  if (Number.isFinite(explicitExpiration) && submittedAt && Number.isFinite(Date.parse(submittedAt))) {
    return { submittedAt, expiresAt: explicitExpiration };
  }
  if (!submittedAt || !Number.isFinite(Date.parse(submittedAt))) return null;
  const normalized = auditRetentionMetadata(submittedAt);
  return { submittedAt: normalized.submittedAt, expiresAt: normalized.expiresAt };
};

const inBatches = async <T>(
  values: readonly T[],
  concurrency: number,
  worker: (value: T) => Promise<void>
) => {
  for (let index = 0; index < values.length; index += concurrency) {
    await Promise.all(values.slice(index, index + concurrency).map(worker));
  }
};

const ensureRetentionIndex = async (
  store: AuditStore,
  targetKey: string,
  retention: RetentionDetails
) => {
  const targetId = await auditRetentionTargetId(targetKey);
  await store.setJSON(
    auditRetentionIndexKeyForExpiration(retention.expiresAt, targetId),
    auditRetentionIndexEntry(targetKey),
    { metadata: { recordType: "free-audit", ...retention } }
  );
};

const migrateLegacyAliases = async (
  store: AuditStore,
  now: number,
  limits: PurgeLimits,
  stats: PurgeStats
) => {
  let remaining = limits.legacyAliasesPerRun;

  for await (const page of store.list({ prefix: AUDIT_LEGACY_IDEMPOTENCY_PREFIX, paginate: true })) {
    if (remaining <= 0) break;
    const aliases = page.blobs.slice(0, remaining);
    remaining -= aliases.length;
    stats.legacyAliasesInspected += aliases.length;

    await inBatches(aliases, limits.concurrency, async (blob) => {
      try {
        const legacyAlias = await store.getWithMetadata(blob.key, { type: "json", consistency: "strong" });
        if (!legacyAlias) return;
        const alias = isRecord(legacyAlias.data) ? legacyAlias.data : {};
        const submissionKey = alias.submissionKey;
        if (!isAuditRetentionTargetKey(submissionKey) || !submissionKey.startsWith("submissions/")) {
          stats.failed += 1;
          return;
        }

        const submission = await store.getWithMetadata(submissionKey, { type: "json", consistency: "strong" });
        if (!submission) {
          await store.delete(blob.key);
          stats.targetsDeleted += 1;
          return;
        }
        const retention = retentionDetails(submission.metadata, submission.data)
          || retentionDetails(legacyAlias.metadata);
        if (!retention) {
          stats.failed += 1;
          return;
        }

        if (retention.expiresAt <= now) {
          await store.delete(submissionKey);
          await store.delete(blob.key);
          stats.targetsDeleted += 2;
          return;
        }

        const aliasSuffix = blob.key.slice(AUDIT_LEGACY_IDEMPOTENCY_PREFIX.length);
        const currentAliasKey = `${AUDIT_IDEMPOTENCY_PREFIX}${aliasSuffix}`;
        const metadata = { recordType: "free-audit", ...retention };
        const write = await store.setJSON(currentAliasKey, { submissionKey }, {
          onlyIfNew: true,
          metadata
        });
        if (!write.modified) {
          const currentAlias = await store.get(currentAliasKey, { type: "json", consistency: "strong" });
          if (!isRecord(currentAlias) || currentAlias.submissionKey !== submissionKey) {
            stats.failed += 1;
            return;
          }
        }

        await ensureRetentionIndex(store, submissionKey, retention);
        await ensureRetentionIndex(store, currentAliasKey, retention);
        await store.delete(blob.key);
        stats.targetsDeleted += 1;
        stats.legacyAliasesMigrated += 1;
      } catch {
        stats.failed += 1;
      }
    });
    if (remaining <= 0) break;
  }
};

const purgeIndexDate = async (
  store: AuditStore,
  date: string,
  now: number,
  remainingBudget: { value: number },
  limits: PurgeLimits,
  stats: PurgeStats
) => {
  let complete = true;
  const prefix = `${AUDIT_RETENTION_INDEX_PREFIX}${date}/`;

  for await (const page of store.list({ prefix, paginate: true })) {
    if (remainingBudget.value <= 0) {
      complete = false;
      break;
    }
    const entries = page.blobs.slice(0, remainingBudget.value);
    if (entries.length < page.blobs.length) complete = false;
    remainingBudget.value -= entries.length;
    stats.indexInspected += entries.length;

    await inBatches(entries, limits.concurrency, async (blob) => {
      try {
        const indexed = await store.getWithMetadata(blob.key, { type: "json", consistency: "strong" });
        if (!indexed) return;
        if (!isExpiredAuditMetadata(indexed.metadata, now)) {
          stats.pending += 1;
          complete = false;
          return;
        }
        const entry = indexed.data as Partial<AuditRetentionIndexEntry> | null;
        if (!entry || entry.version !== 1 || !isAuditRetentionTargetKey(entry.targetKey)) {
          stats.failed += 1;
          complete = false;
          return;
        }
        await store.delete(entry.targetKey);
        await store.delete(blob.key);
        stats.targetsDeleted += 1;
        stats.indexEntriesDeleted += 1;
      } catch {
        stats.failed += 1;
        complete = false;
      }
    });

    if (remainingBudget.value <= 0) {
      complete = false;
      break;
    }
  }
  return complete;
};

const purgeLegacySubmissionDate = async (
  store: AuditStore,
  date: string,
  now: number,
  remainingBudget: { value: number },
  limits: PurgeLimits,
  stats: PurgeStats
) => {
  let complete = true;

  for (const prefix of auditLegacySubmissionPrefixesForExpirationDate(date)) {
    for await (const page of store.list({ prefix, paginate: true })) {
      if (remainingBudget.value <= 0) {
        complete = false;
        break;
      }
      const records = page.blobs.slice(0, remainingBudget.value);
      if (records.length < page.blobs.length) complete = false;
      remainingBudget.value -= records.length;
      stats.legacySubmissionsInspected += records.length;

      await inBatches(records, limits.concurrency, async (blob) => {
        try {
          const record = await store.getWithMetadata(blob.key, { type: "json", consistency: "strong" });
          if (!record) return;
          const retention = retentionDetails(record.metadata, record.data);
          if (!retention) {
            stats.failed += 1;
            complete = false;
            return;
          }
          if (retention.expiresAt > now) {
            stats.pending += 1;
            if (utcDate(retention.expiresAt) > date) {
              await ensureRetentionIndex(store, blob.key, retention);
            } else {
              complete = false;
            }
            return;
          }
          await store.delete(blob.key);
          stats.targetsDeleted += 1;
        } catch {
          stats.failed += 1;
          complete = false;
        }
      });

      if (remainingBudget.value <= 0) {
        complete = false;
        break;
      }
    }
    if (remainingBudget.value <= 0) break;
  }
  return complete;
};

export const purgeExpiredAudits = async (
  store: AuditStore,
  now = Date.now(),
  limits: PurgeLimits = RETENTION_PURGE_LIMITS
) => {
  const stats: PurgeStats = {
    datesCompleted: 0,
    indexInspected: 0,
    legacySubmissionsInspected: 0,
    legacyAliasesInspected: 0,
    legacyAliasesMigrated: 0,
    targetsDeleted: 0,
    indexEntriesDeleted: 0,
    pending: 0,
    failed: 0
  };
  await migrateLegacyAliases(store, now, limits, stats);

  const today = utcDate(now);
  const savedState = await store.get(AUDIT_RETENTION_STATE_KEY, { type: "json", consistency: "strong" }) as RetentionState | null;
  let nextDate = savedState?.version === 1 && isUtcDate(savedState.nextDate)
    ? savedState.nextDate
    : today;
  const indexBudget = { value: limits.indexEntriesPerRun };
  const legacyBudget = { value: limits.legacySubmissionsPerRun };

  for (let index = 0; index < limits.datesPerRun && nextDate <= today; index += 1) {
    const indexComplete = await purgeIndexDate(store, nextDate, now, indexBudget, limits, stats);
    const legacyComplete = await purgeLegacySubmissionDate(store, nextDate, now, legacyBudget, limits, stats);
    if (!indexComplete || !legacyComplete) break;
    nextDate = nextUtcDate(nextDate);
    stats.datesCompleted += 1;
  }

  await store.setJSON(AUDIT_RETENTION_STATE_KEY, { version: 1, nextDate } satisfies RetentionState);
  return { ...stats, nextDate };
};

export default async () => {
  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  const result = await purgeExpiredAudits(store);
  console.info(JSON.stringify({
    service: "free-audit-retention",
    event: "retention_purge_completed",
    ...result
  }));
};
