# Free Business Systems Audit production test checklist

Use a clearly labeled internal test lead after an approved production deploy. Do not use a real prospect, expose environment values, or paste credentials into logs or screenshots.

The visitor journey is one request step. An accepted request receives a personalized one-page scorecard and 3 prioritized recommendations within 3 business days. No meeting or purchase is required. After delivery, the recipient may reply to request an optional 20-minute strategy call, which Velixon arranges manually.

## Configuration gate

- [ ] No `PUBLIC_BOOKING_URL`, calendar link, scheduling embed, or booking-provider script is configured or rendered.
- [ ] `RESEND_API_KEY`, `AUDIT_FROM_EMAIL`, `AUDIT_NOTIFICATION_EMAIL`, and `AUDIT_REPLY_TO_EMAIL` are set only in Netlify. The three address fields all use `velixon@velixon.net` (the sender may include the `Velixon` display name).
- [ ] The Resend sender/domain is verified, and the internal recipient is monitored.
- [ ] Function logs show no `email_configuration_invalid` event. `email_delivery_disabled` is acceptable only when email is intentionally disabled.
- [ ] No private variable uses a `PUBLIC_` prefix.
- [ ] In an approved production-configured operator shell, `npm run check:free-audit-config -- --strict` reports ready email and GA4 or GTM conversion tracking; the output contains no configured secret values.
- [ ] Confirm the four email variables are scoped to Netlify Functions. Function-scoped secret presence and a controlled hosted submission must be verified separately because Netlify masks secret values and does not expose them to builds.

## One controlled submission

- [ ] Open `/free-audit/?source=google&utm_source=google&utm_medium=cpc&utm_campaign=production-test&utm_term=internal-test&gclid=TEST-GCLID&gbraid=TEST-GBRAID&wbraid=TEST-WBRAID`.
- [ ] Complete the single-step request with a labeled internal address. Confirm first name, last name, business name, work email, main bottleneck, and consent are required; phone and website are optional; and client-side validation and 24-hour tab-scoped progress recovery work.
- [ ] Confirm `POST /api/free-audit` returns `200`, `Cache-Control: no-store`, the same request reference in `X-Request-Id` and the JSON body, a `submissionId`, and no credential or stack-trace data.
- [ ] Confirm the `velixon-free-audit-submissions` Blob record contains the expected contact, qualification, consent, and test attribution fields.
- [ ] Retry the identical submission in the same tab and confirm `duplicate: true`, the same trusted record is used, and no duplicate email marked `sent` is resent.
- [ ] Confirm the prospect confirmation and internal notification arrive from and reply to the approved mailbox, with the submission ID and test attribution. The prospect message must promise a personalized one-page scorecard and 3 prioritized recommendations within 3 business days and describe the manual post-delivery call-request workflow.

## Manual strategy-call and failure paths

- [ ] Confirm the success state says the audit will arrive within 3 business days and explains that an optional call may be requested by replying only after delivery.
- [ ] Confirm no booking URL, iframe, provider script, calendar-open event, or booked-call event appears in the page source or network log.
- [ ] In a non-production deploy, temporarily omit email settings and confirm storage succeeds while logs show `email_delivery_disabled`.
- [ ] In a non-production deploy, use a deliberately incomplete non-secret email configuration and confirm no provider call occurs and logs show `email_configuration_invalid` with variable names only.

## Operations sign-off

- [ ] Search function logs by `X-Request-Id` and confirm the sequence includes `blob_write_succeeded`, `email_delivery_completed`, and a final `submission_completed` event with duration and status fields.
- [ ] Confirm no raw request body, email address, phone number, API key, or provider response body appears in logs.
- [ ] Confirm the rate limit returns a controlled response under repeated abuse without affecting a normal follow-up submission.
- [ ] Review `npm audit --omit=dev`; document the applicability and upgrade plan for any remaining framework-level advisory before release.
- [ ] Remove or clearly label all test requests according to the business retention policy.
- [ ] Record the deploy ID, test timestamp, submission ID, request ID, manual-call state, and operator initials in the release log.

Production proof is incomplete until the hosted Blob, Resend, and log checks above pass. Local static preview cannot prove those services.
