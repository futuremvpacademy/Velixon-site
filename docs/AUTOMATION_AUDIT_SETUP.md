# Free Business Systems Audit setup

The conversion route is `/free-audit/`. It stays within the existing Astro, TypeScript, Netlify Functions, Netlify Blobs, and Resend architecture; no React or Supabase runtime was added.

## What is implemented

- Three configurable hero variants with one active build-time variant
- Premium responsive landing page, sticky page navigation, and sticky mobile CTA
- Explanatory lead-to-payment workflow and before/after system visualization
- Five-input illustrative ROI calculator
- One-step audit request for core contact/business details, the main bottleneck, and consent, with an optional website field, native inline validation, a no-JavaScript form fallback, and 24-hour tab-scoped progress recovery. The server keeps backward-compatible support for an absent legacy phone value; there is no public phone control.
- An explicit fulfillment promise: a personalized one-page scorecard and 3 prioritized recommendations within 3 business days
- First-touch UTM, `gclid`, `gbraid`, `wbraid`, `fbclid`, referrer, landing-page, and hero-variant attribution stored with each lead
- Strict server validation, honeypot, request-size/origin checks, Netlify rate limiting, duplicate handling, and durable Blob storage
- Optional Resend confirmation and internal notification emails
- Post-delivery guidance for requesting an optional 20-minute strategy call by replying to the audit email; Velixon arranges calls manually and exposes no public booking URL or scheduling embed
- Consent-aware GA4, GTM, and Microsoft Clarity loading when their public IDs are configured
- Service, FAQ, Organization, WebPage, image, and breadcrumb structured data through the shared layout

## Page brand

The audit route uses the supplied Velixon V mark at `public/velixon-v-mark.png`. Its page-scoped palette is near-black with lavender accents sampled from the mark:

- Primary lavender: `#c6b6f2`
- Light lavender: `#ded5f8`
- Purple-black background: `#08060a`

The matching social preview is `public/business-systems-audit-social.png`. These audit-page assets and colors are intentionally scoped so unrelated site routes are not restyled.

## Environment variables

Copy `.env.example` to `.env` for local values. Never put a private key in a `PUBLIC_` variable.

| Variable | Purpose | Required |
| --- | --- | --- |
| `PUBLIC_AUTOMATION_AUDIT_HERO_VARIANT` | Activates hero `A`, `B`, or `C` at build time | No; defaults to `A` |
| `PUBLIC_GA_MEASUREMENT_ID` | Direct GA4 measurement ID in `G-...` format | No |
| `PUBLIC_GTM_CONTAINER_ID` | Google Tag Manager container ID in `GTM-...` format | No |
| `PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity project ID | No |
| `PUBLIC_GOOGLE_ADS_CONVERSION_ID` | Optional direct Google Ads destination in `AW-...` format | No; leave blank when GTM owns conversion tags |
| `PUBLIC_GOOGLE_ADS_AUDIT_CONVERSION_LABEL` | Direct conversion label for a unique validated audit submission | No |
| `PUBLIC_LINKEDIN_URL` | Verified Velixon LinkedIn company URL | No; omitted when blank |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console HTML verification token | No |
| `RESEND_API_KEY` | Private Resend API key | Required for email delivery |
| `AUDIT_FROM_EMAIL` | Resend-verified sender using `velixon@velixon.net`; `Velixon <velixon@velixon.net>` is accepted | Required for email delivery |
| `AUDIT_NOTIFICATION_EMAIL` | Internal new-lead recipient `velixon@velixon.net` | Required for email delivery |
| `AUDIT_REPLY_TO_EMAIL` | Reply-to address `velixon@velixon.net` | Required for email delivery |

Submissions still store successfully when the four email variables are incomplete; the response records email delivery as `skipped`. All audit sender, notification, and reply-to addresses must use `velixon@velixon.net`. No public booking URL exists. The success state confirms that the request is complete, repeats the 3-business-day delivery promise, and explains that a recipient may reply after delivery to request a manually arranged optional call.

The Google Ads ID and audit label are public tag identifiers, not secrets. Never place a Google Ads API token, OAuth secret, account login, contact data, or lead data in a `PUBLIC_` variable. Use either GTM-owned conversion tags or the direct Google Ads variables, never both for the same conversion action. The exact setup is in `docs/CONVERSION_ANALYTICS.md`.

Run the secret-safe configuration diagnostic locally or in an approved operator shell:

```bash
npm run check:free-audit-config
npm run check:free-audit-config -- --strict
```

The default mode treats intentionally disabled integrations as valid local configuration. The strict release profile exits nonzero unless email and at least one GA4/GTM conversion destination are ready. Output contains states, destination booleans, and variable-name issues only; it never prints configured values.

## Optional 20-minute strategy-call workflow

The audit request, delivery, and promised contents do not depend on a call. There is no public calendar URL and the site must not embed or promise self-scheduling. After Velixon delivers the audit, the recipient may reply to that email to request an optional 20-minute strategy call. Velixon then confirms a mutually workable time manually. If a public scheduling system is considered later, it requires a separate verified implementation and release review before any URL, embed, provider permission, or booking conversion is enabled.

## Hero variants

Variant copy lives in `src/data/automation-audit.ts`.

- `A`: Request Your Free Business Systems Audit
- `B`: Find the Workflow Slowing You Down
- `C`: Get Clear Next Steps for a Better System

Set `PUBLIC_AUTOMATION_AUDIT_HERO_VARIANT=A`, `B`, or `C`, then rebuild. The page does not split traffic automatically. Every lead stores the active lowercase variant (`a`, `b`, or `c`) so manually separated campaigns can be compared without adding unsafe experiment logic.

## Local development and tests

```bash
npm install
npm run dev
npm run typecheck
npm test
npm run check:free-audit-config
npm run build
npm run audit:seo
npm run verify
```

`astro dev` and `astro preview` do not reproduce the hosted Netlify Function, Blob store, rate limit, or Resend delivery. Use Netlify's local development environment when it is already installed, or use a deploy preview for the end-to-end backend check.

Browser checks should cover:

1. Desktop, tablet, and mobile layouts with no horizontal overflow
2. Every primary and secondary CTA destination
3. Mobile menu, sticky CTA, keyboard order, visible focus, and Escape behavior
4. The single-step form, required and optional fields, native validation, progress restoration, loading, API failure, duplicate retry, and success
5. UTM parameters, `gclid`, `gbraid`, `wbraid`, `fbclid`, referrer, landing page, and hero variant in the stored lead
6. Post-submit copy states that no call is required and that optional calls are requested by reply only after delivery
7. FAQ and scroll-depth events after analytics consent
8. Reduced-motion mode and browser console/network errors
9. Lighthouse performance, accessibility, best-practice, and SEO checks against a production-style preview

## Production-only verification

Before treating the whole funnel as live, verify the following against Netlify and the selected providers:

- The Function writes a record to the `velixon-free-audit-submissions` Blob store.
- Retrying the same request returns the existing submission instead of creating a second record.
- Rate limiting returns the intended platform response under a controlled test.
- Resend delivers both emails from the verified domain with correct reply-to values.
- The confirmation email promises a personalized one-page scorecard and 3 prioritized recommendations within 3 business days, states that no call is required, and explains the manual post-delivery reply workflow.
- No public booking URL, scheduling embed, or provider script is present.
- GA4 DebugView or GTM Preview receives the documented event names once per intended action.
- Clarity loads only after consent when configured.
- Each API response exposes the same non-secret request reference in its JSON body and `X-Request-Id` header.
- Function logs can be correlated by request reference and end with `submission_completed`, including duration, duplicate status, email configuration state, and delivery statuses without lead data.

Keep implementation evidence separate from live-provider evidence: passing unit tests proves the local contracts, not a hosted credential or provider account.
