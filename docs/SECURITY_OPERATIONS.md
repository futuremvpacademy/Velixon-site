# Velixon security operations

This is the operating baseline for `velixon.net`. It reduces risk; it does not make the site invulnerable. Record completion dates and evidence outside the public repository without copying secrets into tickets, screenshots, or logs.

## Account and domain controls

- Require phishing-resistant MFA or passkeys for the domain registrar, DNS provider, GitHub, Netlify, Resend, analytics, and booking providers.
- Keep at least two tested recovery methods under separate control. Remove former users, unused deploy keys, stale OAuth apps, and unnecessary personal access tokens immediately.
- Give each person the lowest role needed. Production deployment, environment-variable, DNS, billing, and domain-transfer rights should be limited to named administrators.
- Enable registrar lock and transfer protection. Enable DNSSEC only after verifying support and documenting a rollback path.
- Use unique generated credentials from a password manager. Never share credentials through forms, email, source code, build logs, or chat.
- Review GitHub branch protection, required security verification, secret scanning, dependency alerts, and Netlify 2FA settings quarterly.

## Secrets and vendors

- Store `RESEND_API_KEY` and other private values only in Netlify's encrypted environment settings. Variables exposed to browser code must use the `PUBLIC_` prefix and must never contain secrets.
- Keep real deployment identifiers out of source-controlled example files and `netlify.toml` when the provider can supply them at build time. Run `npm run audit:secrets` before every release; CI also runs `npm run audit:secret-history` against the complete Git history.
- Use a dedicated, least-privilege Resend key and verified sender. Rotate it after staff changes, suspected exposure, or according to the provider's recommended lifecycle.
- Confirm SPF, DKIM, and DMARC for sending domains. Start DMARC reporting before moving to an enforcement policy.
- Keep production, deploy-preview, and local values separate. Preview deployments must remain `noindex` and must not inherit production secrets unless a reviewed test requires them.
- Review vendor administrators, connected applications, webhooks, API keys, and data-processing settings quarterly.

Browser-visible API routes and public identifiers cannot be made secret. The `/api/free-audit` route, analytics measurement IDs when configured, Search Console verification metadata, and the IndexNow verification file can be inspected by visitors or browser tools. They must never grant privileged access and must not be reused as passwords, API credentials, signing secrets, or recovery tokens. Security comes from server-side authorization, validation, rate limits, least privilege, and secret storage—not from hiding a route name.

## Release controls

1. Install from committed lockfiles with `npm ci` in both the root and `velixon-video` workspaces.
2. Run `npm run verify:security`.
   Netlify production builds additionally run `npm run check:free-audit-config`; this blocks invalid or missing booking/conversion configuration while treating function-only email secrets as a separately verified boundary.
3. Review every dependency update. A newer package is not automatically safer; reject updates that introduce advisories or unnecessary transitive code.
4. Confirm the generated CSP contains per-page script hashes and no general `script-src 'unsafe-inline'`.
5. Review the Netlify deploy log and confirm the `/api/free-audit` rate-limit rule was accepted. Netlify does not fail every deployment when a rate-limit rule is invalid.
6. Verify production headers, `/.well-known/security.txt`, form rejection behavior, and representative browser flows.
7. Never test production by submitting secrets, regulated data, third-party personal information, or aggressive traffic.

### Temporary upstream advisory exception

As of 2026-08-08, npm reports `GHSA-w3rx-r6r6-pgpr` and `GHSA-5p2g-fcmc-qvqq` in `image-size`, reached only through `@netlify/blobs` → `@netlify/dev-utils`. The site does not import `image-size`, accept image uploads, or pass untrusted ICNS, JXL, or HEIF files to that parser. The current Netlify Blobs SDK is retained because the audit endpoint uses its conditional `onlyIfNew` writes for race-safe submission deduplication; npm's suggested downgrade removes that API and would weaken the control.

`npm run audit:dependencies` permits only those two exact advisory URLs, only through that exact dependency chain, and only while `@netlify/blobs` is pinned to `10.7.12`. Every other advisory remains release-blocking. Review this exception weekly and remove it as soon as Netlify publishes a compatible dependency chain without the affected parser.

## Monitoring cadence

- Weekly: review failed security verification, Dependabot activity, dependency advisories, and Netlify function errors.
- Monthly: review rejected audit traffic, rate-limit events, unexplained email-provider activity, Netlify Forms retention, Blob purge completion, and active account members.
- Quarterly: review registrar/DNS security, recovery methods, MFA, access roles, tokens, environment variables, vendor connections, and incident contacts.
- Annually: update the threat model, rehearse account recovery and incident response, review insurance and contracts, and arrange independent testing when risk or customer requirements justify it.

Alert on unusual request spikes, repeated origin or validation rejection, Blob write failures, disabled or invalid email configuration, notification failures, purge failures, unexpected deploys, and account or DNS changes.

## Incident response

1. Preserve relevant timestamps, request IDs, provider alerts, and logs without copying unnecessary personal data.
2. Contain the issue: revoke affected sessions and keys, remove malicious access, pause a compromised integration, or roll back to a known-good deploy.
3. Determine affected systems, data, people, time range, and attacker capability. Do not assume a code rollback revokes stolen credentials.
4. Rotate exposed secrets from a clean device and verify account recovery, MFA, DNS, deploy hooks, OAuth applications, and administrator lists.
5. Restore service from a verified state, monitor for recurrence, and document what changed.
6. Evaluate contractual, insurance, law-enforcement, customer, and legal-notification duties with qualified counsel. Do not promise notification timing before the facts and applicable duties are understood.
7. Complete a written post-incident review and track corrective actions to closure.

## Residual risks that require external configuration

- Repository controls cannot prove that MFA, registrar lock, DNSSEC, branch protection, secret scanning, provider alerts, or least-privilege roles are enabled in the live accounts.
- The contact and Project Estimate forms rely on Netlify Forms spam controls; high-risk or sustained abuse may require provider-level firewall rules or a reviewed challenge such as Turnstile.
- Google, Microsoft, Resend, Netlify, the registrar, and other configured providers remain independent trust dependencies. No scheduling provider is connected to the public audit flow.
- A qualified independent penetration test is appropriate before accepting sensitive or regulated data, adding authentication/admin features, or making contractual security commitments.
