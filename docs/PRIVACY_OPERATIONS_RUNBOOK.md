# Privacy operations runbook

Use this monthly and whenever someone makes a privacy request. Do not place request details or identity documents in issue trackers or public logs.

## Monthly retention review

1. Confirm the published `purge-expired-audits` function has a **Scheduled** badge and a recent successful daily run.
2. Review Netlify Forms submissions for `website-inquiry`. Permanently delete submissions older than 24 months unless the record is tied to an active engagement, requested follow-up, dispute, security investigation, or required business record.
3. Review Resend, booking, analytics, CRM, and any newly connected provider for records outside the published purpose or retention period.
4. Record the review date, systems checked, oldest retained submission date, deletions completed, exceptions, exception owner, and next review date. Do not copy personal data into the review log.

## Privacy request procedure

1. Record the request date, request type, contact channel, and response deadline in a restricted log.
2. Verify identity proportionately. Do not request government identification unless necessary.
3. Search Netlify Forms, Netlify Blobs, email, booking, CRM, analytics exports, and active project systems that could reasonably contain the person's information.
4. Apply relevant legal and contractual exceptions. Escalate uncertain cases to counsel.
5. Complete access, correction, deletion, restriction, or opt-out work in each applicable system.
6. Respond securely and record completion without retaining unnecessary identity evidence.

## Incident response

1. Contain the issue, preserve relevant evidence, rotate affected credentials, and restrict access.
2. Identify the systems, data categories, people, jurisdictions, time period, and likely consequences involved.
3. Contact qualified privacy/security counsel and the relevant providers or insurers.
4. Determine notification duties and deadlines before communicating externally.
5. Document remediation and verify that the cause—not only the symptom—was corrected.

## Change-management gate

Before enabling a new form, analytics tool, session replay service, CRM, scheduler, AI processor, or messaging provider:

- document what data it receives and why;
- minimize fields and permissions;
- review its current privacy, security, retention, and data-processing terms;
- update the Privacy and Cookie policies before collection begins;
- test consent, decline, deletion, and failure behavior;
- confirm the vendor appears in the production inventory.
