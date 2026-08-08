# Google Ads $500 search plan

Status: prepared for account entry, not launched. The campaign must stay paused until the production request and conversion checks pass.

The advertised offer is the **Free Business Systems Audit**: a short, one-step request followed by a personalized one-page scorecard and 3 prioritized recommendations within 3 business days. No purchase or meeting is required. After delivery, an optional 20-minute strategy call may be requested by email and is arranged manually.

## Campaign controls

| Setting | Value |
| --- | --- |
| Campaign | `Search | Free Business Systems Audit | Utah | $500 Test` |
| Goal | Accepted Free Business Systems Audit requests |
| Primary conversion | `qualify_lead` after the API accepts a unique stored lead |
| Secondary conversion | None at launch; manually arranged strategy calls are not counted as browser conversions |
| Type | Standard Search |
| Networks | Google Search only; Search Partners and Display expansion off initially |
| Location | Utah, presence only |
| Language | English |
| Budget type | Campaign total budget; this choice cannot be changed after campaign creation |
| Total budget | `$500` hard campaign cap |
| Dates | Start after the hosted launch gate passes; use a 30-day test window unless a shorter calendar-month window is explicitly approved |
| Initial bidding | Maximize Clicks with an `$8` maximum CPC guardrail |
| Schedule | Monday–Friday, 7:00 a.m.–7:00 p.m. Mountain Time |
| Devices | All; no initial device adjustment |
| Final URL | `https://velixon.net/free-audit/` |
| Final URL suffix | `source=google&utm_source=google&utm_medium=cpc&utm_campaign=free_business_systems_audit_utah&utm_content={creative}&utm_term={keyword}` |

Do not compress the full $500 into only a few remaining calendar days. If the hosted launch gate passes near the end of an approved calendar window, use a 30-day test window rather than forcing the spend into the remaining days. Google Ads will pace a campaign total budget across the selected dates and will not charge above the configured total.

## Ad groups and keywords

Use exact and phrase match only for the first test.

### Workflow automation

- `[business automation consultant]`
- `"business process automation services"`
- `[workflow automation consultant]`
- `"small business automation services"`
- `"manual process automation"`

### CRM and systems integration

- `[crm automation consultant]`
- `"crm integration services"`
- `[business systems consultant]`
- `"software integration consultant"`
- `"sales process automation consultant"`

## Shared negative keywords

- jobs
- career
- salary
- course
- certification
- degree
- tutorial
- training
- template
- download
- open source
- free software
- home automation
- smart home
- PLC
- robotics
- industrial equipment
- Excel macro

Review search terms at least twice during the first week. Add negatives for education, employment, DIY software, residential automation, industrial-control equipment, and unrelated consumer intent without blocking relevant business-service searches.

## Responsive search ad

Headlines are 30 characters or fewer:

1. Free Business Systems Audit
2. Find What Slows Your Team
3. Automate Manual Work
4. Connect Your Business Systems
5. Workflow Automation Support
6. Custom CRM & Integrations
7. One-Page Scorecard
8. No Required Meeting
9. Build Smarter Business Systems
10. Velixon Systems Audit
11. 3 Prioritized Next Steps
12. AI Workflow & CRM Support
13. Business Systems That Connect
14. Request Free Systems Audit
15. Fix Disconnected Workflows

Descriptions are 90 characters or fewer:

1. See where manual work, disconnected tools, and slow follow-up are costing your team time.
2. Personalized one-page scorecard and 3 prioritized recommendations within 3 business days.
3. Velixon builds CRM systems, integrations, AI workflows, and custom business software.
4. After delivery, request an optional 20-minute call by email. No meeting is required.

Display paths: `business` / `systems-audit`.

Do not add guarantees, savings claims, client counts, awards, urgency, or testimonial language unless Velixon has documented substantiation.

## Assets

- Sitelink: Workflow Automation → `/services/workflow-automation/`
- Sitelink: Custom CRM → `/services/custom-crm/`
- Sitelink: AI Automation → `/services/ai-automation/`
- Sitelink: How Velixon Works → `/process/`
- Callout: One-Page Scorecard
- Callout: No Required Meeting
- Callout: Custom CRM & Integrations
- Callout: Practical Workflow Review
- Structured snippet, Services: Workflow Automation, CRM Systems, AI Workflows, Integrations

Do not enable a call asset until call routing, business hours, and conversion handling are explicitly approved.

## Launch gate

- Production `/free-audit/` passes `docs/FREE_AUDIT_PRODUCTION_TEST_CHECKLIST.md`.
- Blob storage and Resend delivery are proven on the hosted environment, and the public audit flow contains no scheduler URL, embed, or booking-provider script.
- GA4 or GTM records one unique `qualify_lead` event without PII or duplicate page/conversion events.
- The Google Ads conversion action imports or receives that verified event and is set as the campaign’s only primary lead goal.
- Auto-tagging is on; `gclid`, `gbraid`, and `wbraid` remain captured in the operational lead record and out of analytics event properties.
- Billing, advertiser verification, location, the `$500` campaign total budget, and the exact start/end dates are reviewed in the account.
- The user approves the final paused-campaign settings before launch.

## First-month decision rules

- Pause any keyword after meaningful spend with clearly irrelevant search terms or no qualified engagement.
- Keep `audit_submitted` and `qualify_lead` distinct; duplicate retries are not conversions.
- Do not optimize to CTA clicks, calendar opens, or page views.
- Change to Maximize Conversions only after conversion tracking is proven and the account has enough clean unique-lead data to judge the change.
- Report spend, search terms, unique accepted audit requests, optional strategy calls, cost per accepted request, and request quality. Do not treat raw clicks or form starts as accepted requests.
