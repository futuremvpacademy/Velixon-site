# Velixon SEO measurement plan

Updated: July 20, 2026

## Measurement principles

- Measure qualified business outcomes, not rankings alone.
- Separate branded and non-branded search performance.
- Report by page and intent cluster so improvements do not hide cannibalization.
- Use Search Console as the source of truth for Google organic queries and landing-page visibility.
- Use GA4, when configured and consented, for on-site behavior and conversion journeys.
- Never send names, email addresses, phone numbers, message text, company names, full form values, or other personally identifiable information in analytics events.
- Treat consented analytics as a directional sample: declined consent and privacy controls mean GA4 will undercount total visits and actions.
- Do not set arbitrary traffic or ranking promises before a reliable baseline exists.

## Environment variables

| Variable | Required | Format | Behavior and owner |
| --- | --- | --- | --- |
| `PUBLIC_GA_MEASUREMENT_ID` | No | GA4 web stream ID such as `G-XXXXXXXXXX` | Analytics remains disabled when blank. Configure in the production host only after the property and consent behavior are verified. Marketing/analytics owns the property; engineering owns safe loading. |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Recommended | Google-provided HTML verification token | Used for the optional meta-tag verification method. Prefer a Domain property verified through DNS; omit the tag when no verified value exists. SEO owner and domain administrator share ownership. |

Do not put secrets, service-account credentials, API secrets, or private form-delivery credentials in `PUBLIC_*` variables. GA measurement IDs and verification tokens are public identifiers, but they must still correspond to properties Velixon controls.

## Conversion definitions

### Primary conversions

| Conversion | Definition | Event | Deduplication / evidence | Status |
| --- | --- | --- | --- | --- |
| Qualified inquiry submitted | Netlify confirms successful receipt of the main website inquiry form. | `generate_lead` | Fire once after a successful response, not on button click. Reconcile monthly with received Netlify submissions. | Implemented; verify in production |
| Unique Free Audit submitted | The Free Audit API accepts the request and reports that it is not a duplicate. | `audit_submitted` with `duplicate: false` | Fire after a successful API response. Retain duplicate responses as diagnostics, but exclude `duplicate: true` from conversion totals. | Implemented; verify in production |
| Automation quiz completed | The client-side quiz validates every answer and renders a versioned, explainable score. | `quiz_completed` | Fire once per completed attempt. Store only score band and maturity level in analytics, never the exact score, answers, or contact details. | Implemented; verify in production |
| Project Estimate submitted | Visitor submits the single structured intake for a defined or new project. | `estimate_request_submitted` | Reconcile with the `estimate-request` Netlify form and do not send free-form fields, budget, or timeline to analytics. | Implemented; verify in production |
| Strategy call request | Audit recipient replies after delivery to request a manually arranged call. | None in browser | No public scheduling CTA or booking destination exists. Reconcile any request operationally from the delivery-email reply. | Manual/off-site |
| Phone lead | Visitor activates a `tel:` link. | `contact_click` with `contact_method: "phone"` | Count unique sessions separately from total clicks. Do not send the phone number. | Implemented |
| Email lead | Visitor activates a `mailto:` link. | `contact_click` with `contact_method: "email"` | Count unique sessions separately from total clicks. Do not send the email address. | Implemented |

### Supporting conversions and diagnostics

| Action | Event | Purpose | Status |
| --- | --- | --- | --- |
| First meaningful form interaction | `form_start` | Diagnose contact-page engagement and abandonment. | Implemented |
| Contact invitation viewed | `contact_prompt_viewed` | Measure whether the once-per-session prompt is actually shown after meaningful engagement. | Implemented |
| Contact form opened | `contact_form_opened` | Compare manual popup entry points without treating an open as a lead. | Implemented |
| Contact form dismissed | `contact_form_dismissed` | Diagnose popup abandonment by safe trigger and dismissal method. | Implemented; directional only |
| Contact invitation dismissed | `contact_prompt_dismissed` | Measure prompt rejection without repeatedly showing it in the same session. | Implemented; directional only |
| Free Audit CTA activated | `free_audit_cta_clicked` | Compare entry points into the primary audit funnel. Emit one event per physical click; page path and CTA location identify quiz, checklist, calculator, and other assists. | Implemented |
| Project Estimate CTA activated | `estimate_request_cta_clicked` | Compare entry points into the defined-project funnel without treating a click as a submitted estimate. | Implemented |
| Google review source opened | `review_source_clicked` | Measure whether customer proof prompts visitors to validate the public source. Keep this supporting-only and exclude reviewer names, excerpts, and Google query details. | Implemented |
| Audit overview viewed | `audit_video_viewed` | Record the homepage film reaching 50% visibility once per page lifecycle. | Implemented; directional only |
| Audit overview started | `audit_video_started` | Measure the first user-initiated play without recording playback position or browser details. | Implemented |
| Audit overview completed | `audit_video_completed` | Record the first complete playback without treating it as a primary conversion. | Implemented; directional only |
| Free Audit started | `audit_started` | Measure the first form interaction using only a cataloged source value. | Implemented |
| Free Audit step completed | `audit_step_completed` | Diagnose validated progression, once per step per page attempt, without recording answers. | Implemented |
| Free Audit submission failed | `audit_submission_error` | Detect delivery failures without recording submitted values. | Implemented |
| Free Audit abandoned | `audit_abandoned` | Directional diagnostic emitted at most once per page lifecycle; starts minus accepted submissions remain the more reliable abandonment measure. | Implemented; directional only |
| Automation quiz started | `quiz_started` | Measure entry into the qualification funnel. | Implemented |
| Automation quiz step completed | `quiz_step_completed` | Diagnose progression once per question per attempt without recording answers. | Implemented |
| Automation quiz abandoned | `quiz_abandoned` | Directional diagnostic emitted at most once per attempt. | Implemented; directional only |
| Project Estimate started | `estimate_request_started` | Measure high-intent project-intake starts. | Implemented |
| Project Estimate failed | `estimate_request_error` | Detect estimate delivery failures without recording submitted values. | Implemented |
| Form delivery or validation failure | `form_error` | Detect conversion-blocking failures without recording submitted values. | Implemented |
| Commercial CTA click | `cta_click` with `content_type: "call_to_action"` | Compare CTA placement and landing-page intent. | Implemented for shared buttons, homepage buttons, mobile CTAs, and explicitly tagged links |
| Navigation activated | `navigation_clicked` | Compare header, mobile-menu, and footer paths using normalized public destinations. | Implemented |
| Automation calculator interaction | `roi_calculator_engaged` | Measure use of the decision tool. | Implemented |
| Checklist loaded | `checklist_opened` | Record that a checklist component initialized; do not interpret this as meaningful engagement. | Implemented; rename or replace with a first-interaction event in a future pass |
| Checklist completed | `checklist_completed` | Measure a checklist reaching 100% without recording individual checked items. | Implemented |
| Checklist printed | `checklist_print_clicked` | Measure print or Save-as-PDF intent. | Implemented |
| Resource-to-service click | `select_content` or `resource_cta_click` | Measure whether educational content assists commercial discovery. | Recommended |
| Case-study-to-contact click | `select_content` or `case_study_cta_click` | Measure evidence-assisted conversion intent. | Recommended |
| Navigation to a service from an industry/location page | `select_content` with source cluster | Evaluate internal-link usefulness. | Recommended; sample only key links to avoid event noise |

Recommended non-PII parameters:

- `page_path`
- `page_type`
- `content_cluster`
- `service_slug`
- `source_page`
- `cta_id`
- `cta_text` limited to the public label
- `cta_location`
- `form_name`
- `contact_method`
- `calculator_name`
- `video_id`
- `video_location`
- `link_url` only for public Velixon paths, not user-provided URLs

Do not send budget selections, launch timing, free-form project details, query-string attribution containing personal information, or contact fields to GA4.

Analytics source dimensions must use the authored catalog in `src/lib/analytics.ts`. Unknown URL or campaign values resolve to `other`; they must never be copied into analytics verbatim. Detailed form attribution can remain in the submitted operational record under the privacy policy, but it is separate from consented analytics.

## Google Search Console setup

### Verified Phase 1 snapshot

The `https://velixon.net/` property was accessible in Google Search Console during the Phase 1 audit. The three-month snapshot on July 15, 2026 showed 30 clicks, 1,019 impressions, 2.9% average CTR, and 4.3 average position. Page indexing showed eight indexed pages and one not-indexed page. These values are a dated baseline, not a ranking claim or forecast. The sitemap index was submitted during the audit; it must be rechecked after the final production deployment because Search Console initially displayed a transient “Couldn’t fetch” status for the new submission while the existing sitemap remained successful.

The local repository does not contain a GA4 measurement ID. GA4 remains safely disabled until a verified production ID is configured.

1. Confirm whether the accessible URL-prefix property is complemented by a DNS-verified **Domain property** for `velixon.net`.
2. Keep the HTML meta verification token only as a verified secondary method; remove an unconfirmed fallback.
3. Submit `https://velixon.net/sitemap-index.xml` after the final production deploy.
4. Use URL Inspection to request and confirm indexing for:
   - `/`
   - each principal service page
   - Utah and Lehi location pages
   - contractor and service-business solution pages
   - n8n and Make pages
   - each starter resource
   - the case-studies and resources hubs
5. Confirm Google-selected canonical matches the declared canonical for every principal route.
6. Check Page indexing for duplicate, crawled-not-indexed, discovered-not-indexed, soft-404, redirect, and server-error patterns.
7. Review HTTPS, Core Web Vitals, Mobile Usability if available, and structured-data enhancement reports without assuming enhancement eligibility.
8. Grant least-privilege access to the business owner, SEO owner, and technical owner.
9. Annotate deployments and material title/content changes in the monthly report.
10. Do not use the removals tool for routine canonicalization or URL migrations; use correct status codes, canonicals, and sitemaps.

## Initial keyword groups

The groups below are reporting segments, not claims that Velixon currently ranks.

| Group | Representative queries | Principal page types |
| --- | --- | --- |
| AI automation | AI automation agency, AI automation company, AI automation services | Homepage and AI automation service |
| Business/process automation | business automation company, business process automation, process automation services | Business-process automation service and supporting resource |
| Workflow automation | workflow automation agency, workflow automation services | Workflow automation service and workflow guide |
| Custom software | custom software development company, custom business software, custom web applications | Custom software service and decision resources |
| CRM and internal systems | custom CRM development, internal dashboard development, client portal development | CRM and dashboard/portal services |
| AI integrations and agents | AI integration services, AI agent development, AI receptionist systems | AI/API integration, AI agent, and voice AI services |
| Automation platforms | n8n automation agency, Make.com automation agency, Zapier automation services | Integration/platform pages and comparisons |
| Application platforms | Supabase development services, Stripe integration services, Twilio automation services | Integration pages |
| Utah | AI automation Utah, business automation Utah, custom software Utah, CRM development Utah | Utah location page and related services |
| Lehi | custom software company Lehi Utah, custom software development Lehi, AI automation company Lehi | Lehi location page and related services |
| Contractors/construction | AI automation for contractors, construction automation, CRM software for contractors | Contractor/construction pages and relevant guides |
| Service businesses | AI automation for service businesses, custom software for service businesses | Service-business/home-services pages and case evidence |
| Educational cost/selection | AI automation cost, custom software cost, when to build custom software | Resource articles |
| Branded | Velixon, Velixon AI, Velixon software | Homepage, About, Contact, and brand profiles |

Maintain a query-to-principal-page mapping in `docs/SEO_KEYWORD_MAP.md`. If two URLs repeatedly receive impressions for the same commercial query, review intent, content overlap, internal anchors, and canonicalization before adding more pages.

## Page-level KPIs

| Page type | Primary KPIs | Diagnostic KPIs | Decision question |
| --- | --- | --- | --- |
| Homepage | Organic qualified inquiries and non-branded clicks | Impressions, CTR, service-path clicks, intro exits, mobile engagement | Does the page quickly route qualified visitors to the right capability? |
| Core service page | Qualified inquiries and CTA conversion rate | Non-branded clicks, query coverage, CTR, assisted resource/case-study views | Does the page own one commercial intent and produce qualified action? |
| Industry/solution page | Qualified inquiries and service click-through | Industry-query clicks, engagement with workflows/FAQs, assisted conversions | Does the page demonstrate distinct operational understanding? |
| Location page | Qualified local inquiries | Local impressions/clicks, CTR, map/directory referral context where available | Is the page genuinely useful for that service area without doorway duplication? |
| Technology/integration page | Integration-qualified inquiries | Platform-query clicks, related-service clicks, comparison-page assists | Does platform interest progress to a business-system conversation? |
| Resource article | Organic entrances and assisted conversions | Query coverage, CTR, scroll/TOC use if measured, resource-to-service clicks | Does the article fully answer the query and create a relevant next step? |
| Case study | Evidence-assisted inquiries | Organic entrances, related-service clicks, CTA rate | Does verified evidence reduce buyer uncertainty? |
| Resources/case-study hub | Detail-page discovery and assisted conversions | Hub impressions, CTR, outbound card clicks | Can visitors find the right evidence or answer quickly? |
| Contact page | Successful qualified submissions | Form starts, form errors, completion rate, direct phone/email clicks | Can a qualified visitor complete the next step without friction? |

Calculate form completion rate as successful `generate_lead` events divided by `form_start` events for consented sessions, then reconcile with Netlify's total submission count. Do not present the GA4 ratio as total-site truth.

## Technical health checks

### Every release

- Run the project's type/static check, production build, and `npm run audit:seo`.
- Confirm one H1, unique title, unique description, self-canonical, index directive, and valid JSON-LD on every new indexable route.
- Confirm all internal links and local fragments resolve.
- Confirm indexable URL count equals page-sitemap URL count.
- Confirm no review, 404, staging, utility, or private URL appears in the sitemap.
- Check redirects return one-hop 301 responses and final canonical URLs return 200.
- Confirm unknown paths return HTTP 404, not a soft 404.
- Validate robots and sitemap responses in production.
- Test contact submission success/failure without recording test PII in analytics.
- Test keyboard navigation, visible focus, skip link, mobile menu, contact dialog, and reduced-motion behavior.
- Test mobile, tablet, and desktop layouts for overflow and obstructed actions.
- Compare production metadata and structured data with the built artifact.

### Weekly during launch; monthly after stabilization

- Search Console Page indexing changes and crawl/server errors.
- Submitted versus indexed sitemap counts.
- Manual checks of top landing pages and conversion paths.
- Broken external references in resources and guides.
- GA4 event volume anomalies relative to Netlify submissions.
- Form failures and spam volume.
- Production uptime and redirect behavior.

### Monthly or when enough field data exists

- Core Web Vitals by mobile/desktop and template group: LCP, INP, and CLS.
- Search Console clicks, impressions, CTR, and query distribution by cluster.
- Pages with rising impressions but low CTR.
- Pages with declining clicks after accounting for seasonality and query mix.
- Cannibalization: multiple pages competing for the same commercial query.
- Crawl/index bloat from parameters, duplicate paths, or new utility routes.
- Accessibility regression sampling across templates.

## Reporting cadence and structure

Use a 28-day reporting window compared with the previous 28 days, plus year-over-year comparison once available. Add context for deployments, seasonality, outages, and major content changes.

### Monthly report

1. **Executive outcome**
   - Qualified organic inquiries
   - Phone and email intent; strategy-call requests are reconciled manually from post-delivery email replies
   - Material changes and the business implication
2. **Search visibility**
   - Non-branded clicks and impressions
   - Branded clicks and impressions
   - CTR and position distribution by cluster, with no isolated ranking claims
3. **Landing-page performance**
   - Top gaining and declining pages
   - High-impression/low-CTR opportunities
   - New pages and indexation status
4. **Conversion quality**
   - Form starts, successful submissions, and errors
   - Service, location, industry, resource, and case-study assisted conversions
   - Netlify submission reconciliation and, when available, qualified-opportunity outcomes
5. **Technical health**
   - Indexed versus submitted URLs
   - Crawl/index errors, redirect issues, structured-data errors, and CWV status
6. **Content and authority**
   - Published or materially improved pages
   - Earned links, mentions, and verified directory work
   - Cannibalization or content-quality risks
7. **Next actions**
   - Three to five prioritized actions, each with owner, expected evidence, and review date

### Quarterly review

- Reassess keyword-to-page ownership using actual query data.
- Review whether any planned industry, technology, or location page passes the unique-value gate.
- Compare organic lead quality with other acquisition channels when CRM outcomes are available.
- Review content freshness, evidence, authorship, case-study approvals, and outdated technical references.
- Set evidence-based targets for the next quarter; do not backfill invented baselines.

## Initial launch baseline

Record the following on the day the final Phase 1 deployment is verified:

- Production deploy identifier and timestamp
- Indexable HTML URL count
- Sitemap URL count
- Number of valid and excluded URLs in Search Console
- Organic clicks, impressions, CTR, and branded/non-branded split for the preceding 28 days
- Consented organic users and sessions in GA4, if configured
- Netlify inquiry count and known qualified inquiry count
- Mobile and desktop CWV status or lab baseline when field data is unavailable
- Top ten organic landing pages and query clusters

Until that baseline exists, report implementation and indexation status rather than promising traffic, lead, or ranking gains.
