# Velixon legal-risk register

This is an operational checklist, not legal advice. No website language can prevent all claims or lawsuits. A Utah-licensed business attorney should review the items marked **Attorney** before Velixon relies on them.

## Must resolve before treating the site as legally complete

- **Attorney — governing law and disputes:** Decide whether the website terms and client agreement should contain Utah governing-law, venue, informal-resolution, arbitration, class-action waiver, or jury-waiver provisions. Do not add these without advice on enforceability and the intended customer geography.
- **Client agreement:** Use a signed agreement for every paid engagement. It should define scope, acceptance, change requests, payment, late payment, client dependencies, intellectual-property ownership and licenses, third-party services, confidentiality, data handling, warranties, liability limits, indemnity, termination, support, and dispute terms.
- **Insurance:** Ask a broker about technology errors and omissions, cyber liability, commercial general liability, and any coverage required by client contracts.
- **Entity registrations and standing:** Continue confirming that the entity remains active, the Velixon name is registered where required, taxes and licenses are current, and contracts/invoices use the correct legal party. The operator's identity is verified; this ongoing standing check remains separate.

## Verified business facts reflected in the site

- **Legal identity — resolved:** Velixon Solutions LLC is a Utah single-member limited liability company doing business as Velixon. Peter Munnich is the founder. Live Terms, Privacy, identity, contact, footer, security, and structured-data references use these facts.
- **Public mailing address — resolved:** 180 S 1350 E St, Lehi, UT 84043. The site identifies it as office space and a mailing address and does not represent it as a walk-in storefront. Counsel should still confirm that each specific commercial-email program satisfies all applicable postal-address and disclosure rules before launch.

## Website controls to maintain

- Keep screenshots or source links proving every published customer review and obtain permission where a contract or platform term requires it.
- Do not publish quantified sales, revenue, savings, lead, ranking, or ROI claims without written substantiation and an attorney-approved disclosure of generally expected results.
- Never condition an incentive on a positive review. Disclose any material relationship or incentive next to the endorsement.
- Keep calculator outputs labeled illustrative and preserve assumptions, dates, and source material.
- Re-run keyboard, form-label, error-message, caption, contrast, zoom, and reduced-motion checks after material design changes.
- Keep inquiry and audit consent records, but do not use service-request consent as marketing-email or automated-text consent.
- Do not add promotional SMS, robocalls, or recorded/AI calls until counsel has approved the consent language and operating process for every target jurisdiction.
- Commercial email must use accurate sender information, a non-deceptive subject, a valid postal address, and a working opt-out process that is honored promptly.

## Privacy operations

- Confirm the production vendor list at every release: hosting, form processing, storage, email, analytics, session replay, CRM, and any AI processor. No booking provider is connected to the public audit flow.
- Website inquiry and Free Business Systems Audit submissions have a published 24-month limit. Audit Blob records receive an expiration timestamp and a daily scheduled purge; Netlify Forms submissions require the monthly deletion review in `PRIVACY_OPERATIONS_RUNBOOK.md`.
- Follow `PRIVACY_OPERATIONS_RUNBOOK.md` to verify and answer access, correction, deletion, and opt-out requests.
- Sign data-processing terms with vendors where appropriate and restrict staff/vendor access to the minimum necessary.
- Use the incident procedure in `PRIVACY_OPERATIONS_RUNBOOK.md`, then document provider-specific credential rotation, backup responsibility, breach assessment, and customer notification ownership.
- Reassess state privacy-law applicability as revenue, traffic, data volume, sales activity, and customer locations change.

## Current site safeguards observed

- Separate Privacy, Terms, Cookies, Accessibility, and Security pages.
- Privacy disclosures state that Velixon does not sell personal information or share it for cross-context behavioral advertising, explain the 24-month inquiry/audit retention limit, and provide a request and appeal route.
- Optional analytics is consent-gated in the site implementation.
- Contact and audit forms require acknowledgement/processing consent and warn against sensitive submissions.
- Audit/quiz/calculator language includes outcome disclaimers.
- The Free Business Systems Audit terms state that no purchase or meeting is required; accepted complete requests receive a personalized one-page scorecard and 3 prioritized recommendations within 3 business days; and an optional 20-minute strategy call may be requested by email and arranged manually only after delivery. Outcomes are not guaranteed.
- The public Terms separate website use from signed client engagements and limit website warranties and liability.
- The review request asks for honest feedback without steering sentiment or offering a benefit. The four approved featured public Google review excerpts—from Chiggy Combs, Giada Ferrazzano, Mighty Movers, and Ready Relocation—are complete sentences linked to the public Google source. Supporting source evidence is retained outside the published `public/` directory.
- The site publishes an RFC 9116 security contact file and configures anti-framing and cross-origin isolation headers in `netlify.toml`.
- As of July 23, 2026, `npm audit --audit-level=moderate` reports no known dependency vulnerabilities and the legal verification suite passes 45 tests.

## Release gate

Before publishing a legal-page change, record:

1. Verification that the published legal operator remains Velixon Solutions LLC, doing business as Velixon, and the public mailing address remains 180 S 1350 E St, Lehi, UT 84043.
2. The production vendor/configuration inventory.
3. Counsel’s approval date and the exact pages/agreement reviewed.
4. The build, test, accessibility, form, and browser results for that release.
