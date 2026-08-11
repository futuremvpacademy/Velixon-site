export const GOOGLE_ADS_LEAD_CONVERSION = Object.freeze({
  conversionId: "AW-18088634031",
  conversionLabel: "IvyFCKHRw98cEK_NqrFD",
  sendTo: "AW-18088634031/IvyFCKHRw98cEK_NqrFD",
  value: 1.0,
  currency: "USD"
} as const);

export const LEAD_CONVERSION_PENDING_KEY = "velixon_lead_conversion_pending_v1";
export const LEAD_CONVERSION_PROCESSED_KEY = "velixon_lead_conversion_processed_v1";

const leadFormNames = new Set(["website-inquiry", "estimate-request"]);
const safeSlug = (value: unknown, fallback: string) => {
  const normalized = String(value ?? "").trim();
  return /^[a-z0-9._-]{1,60}$/i.test(normalized) ? normalized : fallback;
};

export interface LeadConversionHandoff {
  token: string;
  formName: "website-inquiry" | "estimate-request";
  formLocation: string;
  leadSource: string;
  pagePath: string;
}

export const createLeadConversionHandoff = (input: Omit<LeadConversionHandoff, "token">): LeadConversionHandoff => {
  let token = "";
  try {
    token = crypto.randomUUID();
  } catch {
    token = `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
  }

  return {
    token,
    formName: input.formName,
    formLocation: safeSlug(input.formLocation, "unknown"),
    leadSource: safeSlug(input.leadSource, "other"),
    pagePath: /^\/[a-z0-9/_-]{0,119}$/i.test(input.pagePath) ? input.pagePath : "/unknown"
  };
};

export const parseLeadConversionHandoff = (value: string | null): LeadConversionHandoff | null => {
  if (!value || value.length > 1_000) return null;

  try {
    const parsed = JSON.parse(value) as Partial<LeadConversionHandoff>;
    if (!/^[a-z0-9-]{16,100}$/i.test(String(parsed.token ?? ""))) return null;
    if (!leadFormNames.has(String(parsed.formName ?? ""))) return null;

    return {
      token: String(parsed.token),
      formName: parsed.formName as LeadConversionHandoff["formName"],
      formLocation: safeSlug(parsed.formLocation, "unknown"),
      leadSource: safeSlug(parsed.leadSource, "other"),
      pagePath: typeof parsed.pagePath === "string" && /^\/[a-z0-9/_-]{0,119}$/i.test(parsed.pagePath)
        ? parsed.pagePath
        : "/unknown"
    };
  } catch {
    return null;
  }
};
