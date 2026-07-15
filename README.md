# Velixon website

Production Astro site for Velixon, a custom software, AI, and business automation company. The site is statically generated, deployed on Netlify, and uses data-driven landing-page systems for services, solutions, industries, integrations, and locations.

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
- `src/styles/` — global and route-system styles
- `public/` — crawl directives, favicons, manifest, social image, and other static assets
- `scripts/audit-site.mjs` — generated-site SEO and internal-link verification
- `docs/` — Phase 1 audit, keyword map, content backlog, and measurement plan

## Verification

```bash
npm run verify
```

The verification command runs Astro type checking, a clean production build, and the generated-site SEO audit. The audit checks required Phase 1 routes, indexation, metadata, canonicals, Open Graph and X cards, headings, JSON-LD, image attributes, links, robots directives, the web manifest, and sitemap coverage.

There is no separate ESLint or unit-test suite in this repository yet; `astro check` and the generated-site audit are the current static and integration gates.

## Environment variables

Copy `.env.example` to `.env` only when local verification values are needed.

- `PUBLIC_GA_MEASUREMENT_ID` — optional GA4 measurement ID in `G-...` format. Analytics remains disabled when blank or invalid and loads only after consent.
- `PUBLIC_GOOGLE_SITE_VERIFICATION` — optional Google Search Console HTML verification token.

Never place private API keys or service credentials in `PUBLIC_` variables.

## Deployment

Netlify uses the settings in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`

Run `npm run verify` before deploying. Netlify Forms processes the contact form in production; local form submissions do not reproduce that backend behavior.
