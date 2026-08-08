# Velixon website threat model

Last reviewed: August 8, 2026

## Protected assets

- Control of `velixon.net`, DNS, Netlify deployments, GitHub source, and provider accounts.
- Free Business Systems Audit and contact information, including names, work contact details, business context, the main bottleneck, and consent records.
- Source evidence and publication integrity for the four approved public Google review excerpts: Chiggy Combs, Giada Ferrazzano, Mighty Movers, and Ready Relocation.
- Private Resend and deployment credentials.
- Site integrity, availability, customer trust, and accurate analytics.

The public site does not intentionally accept passwords, payment-card data, health records, government identifiers, customer datasets, or other regulated/high-sensitivity material.

The Free Business Systems Audit uses a single request step. An accepted request receives a personalized one-page scorecard and 3 prioritized recommendations within 3 business days. No call is required. After delivery, the recipient may request an optional 20-minute strategy call by replying to the audit email; Velixon arranges it manually.

## Trust boundaries

1. Browser to Netlify static hosting.
2. Browser to Netlify Forms for general contact and Project Estimate requests.
3. Browser to `/api/free-audit`, then the function to Netlify Blobs and optional Resend delivery.
4. Consent-gated browser connections to configured Google and Microsoft Clarity services. Optional post-delivery strategy calls are arranged manually and introduce no browser scheduling-provider boundary.
5. Maintainer access to GitHub, Netlify, the registrar/DNS provider, email, analytics, and booking accounts.

## Material threats and controls

| Threat | Current repository control | Residual requirement |
| --- | --- | --- |
| Script injection or compromised page content | Astro escaping, removal of raw HTML rendering, generated SHA-384 script hashes, allowlisted script/network sources, no inline event handlers, anti-framing headers | Review every new third-party script and monitor CSP behavior after release |
| Form/API abuse and cost exhaustion | Small body limit, bounded streaming read, exact JSON content type/schema, same-origin enforcement, honeypot, idempotency, semantic deduplication, Netlify rate limiting | Confirm the rule in every deploy log; add provider firewall/challenge controls if abuse persists |
| Stored injection through lead fields | Type/length/enum validation, forbidden control and bidi-character rejection, HTML escaping, single-line email-header normalization | Treat exported/copied data as untrusted in every future CRM, spreadsheet, or admin interface |
| SSRF or unsafe submitted website addresses | Submitted websites are not fetched; credentials, IP literals, local/internal names, and non-HTTP schemes are rejected | Reassess with strict DNS/IP checks before any future automated website fetcher |
| False or altered public endorsements | Four allowlisted complete-sentence excerpts are rendered from shared data and linked to the public Google source; guardrail tests exclude unapproved reviewers | Retain source evidence, confirm permissions where required, and re-verify the allowlist before changing public review copy |
| Credential theft | No private key in public configuration; private email key read server-side; secret-safe logs; repository scans and lockfiles | MFA/passkeys, least privilege, secret scanning, rotation, and recovery controls must be enabled in provider accounts |
| Dependency or CI compromise | Locked installs, audits for both workspaces, immutable-SHA GitHub Actions, read-only workflow permissions, Dependabot, weekly verification | Review updates; do not merge a newer version that adds advisories or unnecessary code |
| Data over-retention | 24-month expiration metadata, paginated daily purge, monthly Netlify Forms review | Verify scheduled execution and deletion in production |
| Domain or deployment takeover | HSTS, canonical host redirect, noindex previews, deployment verification documentation | Registrar lock, DNS/MFA controls, branch protection, Netlify access review, and alerting are external |
| Third-party compromise | Consent gate, narrow CSP allowlist, minimal disclosed vendor use | Providers remain independent trust dependencies; remove unused integrations promptly |
| Denial of service | Static site architecture, Netlify edge protections, function rate limiting | Distributed attacks and provider outages cannot be eliminated; monitor and escalate to Netlify |

## Change triggers

Repeat the threat model and obtain security review before adding authentication, an admin dashboard, customer accounts, payments, file uploads, automated URL fetching, webhooks that change state, a CRM sync, sensitive/regulated data, database read APIs, AI processing of submissions, or contractual security/compliance commitments.

Independent penetration testing becomes appropriate before those changes or when a customer, insurer, regulator, or contract requires it.
