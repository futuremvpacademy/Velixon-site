# Velixon website

Production Astro site for Velixon, the trade name of Velixon Solutions LLC, a Utah single-member LLC founded by Peter Munnich. Public mailing address: 180 S 1350 E St, Lehi, UT 84043. The site is statically generated, deployed on Netlify, and uses data-driven landing-page systems for services, solutions, industries, integrations, and locations.

The primary public offer is the Free Business Systems Audit. The dedicated `/free-audit/` conversion page uses a short one-step request form and promises a personalized one-page scorecard and three prioritized recommendations within three business days for accepted complete requests. No call is required. After delivery, a recipient may reply to request an optional 20-minute strategy call, which Velixon arranges manually; the site has no public booking URL or scheduling embed. It captures first-touch campaign attribution even when optional analytics is disabled. The server endpoint validates and deduplicates submissions, stores trusted records in Netlify Blobs, and can send confirmation and internal notification emails when a verified Resend sender is configured.

The Automation Maturity Quiz and four interactive checklists remain secondary self-serve tools. Their browser-local progress is separate from the short audit request so the primary funnel stays focused.

## Local development

```bash
npm install
npm run dev
```

Astro serves the site at `http://localhost:4321` by default.

## Project structure

- `src/pages/` — route entry points and long-form resource articles
- `src/components/` — shared navigation, landing-page, FAQ, CTA, resource, and case-study UI
- `src/data/seo/` — structured landing-page content, directories, indexation allowlist, and internal-link relationships
- `src/layouts/MainLayout.astro` — canonical metadata, social cards, analytics, robots directives, and global schema graph
- `src/lib/schema.ts` — JSON-LD helpers
- `src/data/automation-audit.ts` — landing-page copy, hero variants, problems, solutions, process, qualification, and FAQ configuration
- `src/lib/automation-quiz-scoring.ts` — centralized 0–100 quiz scoring and maturity thresholds
- `src/pages/free-audit.astro` — primary conversion page, workflow visuals, ROI calculator, proof boundaries, qualification, FAQs, and post-delivery manual-call guidance
- `src/pages/automation-assessment.astro` — ungated 10-question maturity quiz
- `src/pages/resources/checklists/[slug].astro` — four reusable interactive checklist routes
- `netlify/functions/free-audit.ts` — validated audit submission, rate limit, idempotent Blob storage, and optional email delivery
- `src/pages/estimate-request.astro` — the single structured Project Estimate intake for defined and new projects
- `src/pages/proposal-request.astro` — legacy transition route redirected to the Project Estimate
- `src/styles/` — global and route-system styles
- `public/` — crawl directives, favicons, manifest, social image, and other static assets
- `scripts/audit-site.mjs` — generated-site SEO and internal-link verification
- `docs/AUTOMATION_AUDIT_SETUP.md` — conversion funnel, environment, A/B variant, email, testing, and production verification setup
- `docs/CONVERSION_ANALYTICS.md` — analytics event catalog, destinations, privacy rules, and verification
- `docs/SECURITY_OPERATIONS.md` — account, domain, secret, release, monitoring, and incident-response controls
- `docs/THREAT_MODEL.md` — protected assets, trust boundaries, threats, controls, and security review triggers
- `ops/` — private, review-controlled authority opportunity tracker and operating rules (not deployed)

## Verification

```bash
npm run verify
```

The verification command runs Astro and TypeScript checking, unit tests for quiz scoring and audit validation, a clean production build, and the generated-site SEO audit. The audit checks required routes, indexation, metadata, canonicals, Open Graph and X cards, headings, JSON-LD, image attributes, links, robots directives, the web manifest, and sitemap coverage.

Before a security-sensitive release, run:

```bash
npm run verify:security
```

This also audits both npm workspaces and validates the separate video workspace. GitHub security verification repeats the locked install and checks on pushes, pull requests, and a weekly schedule. Dependabot monitors the root, video, and GitHub Actions dependencies.

## Environment variables

Copy `.env.example` to `.env` only when local verification values are needed.

- `PUBLIC_AUTOMATION_AUDIT_HERO_VARIANT` — optional build-time `A`, `B`, or `C` hero selection.
- `PUBLIC_GA_MEASUREMENT_ID` — optional direct GA4 measurement ID in `G-...` format.
- `PUBLIC_GTM_CONTAINER_ID` — optional Google Tag Manager container ID in `GTM-...` format.
- `PUBLIC_CLARITY_PROJECT_ID` — optional Microsoft Clarity project ID.
- `PUBLIC_LINKEDIN_URL` — optional verified Velixon LinkedIn company URL.
- `PUBLIC_GOOGLE_SITE_VERIFICATION` — optional Google Search Console HTML verification token.
- `RESEND_API_KEY` — optional private Resend API key used only by the audit function.
- `AUDIT_FROM_EMAIL` — verified sender using `velixon@velixon.net` (a `Velixon` display name is allowed).
- `AUDIT_NOTIFICATION_EMAIL` — internal recipient `velixon@velixon.net`.
- `AUDIT_REPLY_TO_EMAIL` — reply-to address `velixon@velixon.net`.

Never place private API keys or service credentials in `PUBLIC_` variables.

## Deployment

Netlify uses the settings in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`

Run `npm run verify` before deploying. Netlify Forms processes the general contact and Project Estimate forms. The Free Business Systems Audit posts to `/api/free-audit`, where a Netlify Function validates the body, applies platform rate limiting, stores one trusted record per idempotency key in the `velixon-free-audit-submissions` Blob store, and optionally sends two emails through Resend. Email requests use provider idempotency keys, and a duplicate form retry attempts only notifications that were not already recorded as sent. Local static preview does not reproduce the hosted Function, Blobs, or email environment; verify those behaviors after deployment.

The endpoint returns an `X-Request-Id` for support correlation and emits structured, secret-safe operational events for validation rejection, Blob persistence, email configuration, delivery status, and notification-status persistence. Use [`docs/FREE_AUDIT_PRODUCTION_TEST_CHECKLIST.md`](docs/FREE_AUDIT_PRODUCTION_TEST_CHECKLIST.md) for the approved post-deploy test; never infer hosted integration health from the local build.

## Current service boundaries

The site intentionally does not claim a secure admin dashboard, CRM sync, scheduled nurture sequence, or self-scheduling flow. The audit endpoint provides validated intake storage and optional transactional email. Optional 20-minute strategy calls are arranged manually only after audit delivery.

Automation Maturity Quiz scores are visitor guidance calculated in the browser. They are not used as an automated qualification decision about a visitor or business.
