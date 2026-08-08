# Velixon technical SEO operations

Updated: July 15, 2026

## Release gate

Run this before every production deployment:

```sh
npm run verify
```

The gate type-checks the Astro project, creates a clean production build, and audits generated pages for canonical/indexability consistency, unique metadata, social cards and real image dimensions, headings, page-type-appropriate JSON-LD, internal routes and fragments, orphan pages, priority contextual links, authority links into noindex routes, image assets, robots directives, manifest icons, the IndexNow verification file, and exact sitemap parity.

After deployment, verify representative production responses rather than treating a local build as release proof:

- `https://velixon.net/` returns `200` with the current canonical, title, description, and robots directive.
- `https://www.velixon.net/...` permanently redirects to the same path on `https://velixon.net`.
- Representative legacy aliases return one `301` directly to their canonical route.
- `/robots.txt`, `/sitemap-index.xml`, `/sitemap-0.xml`, `/image-sitemap.xml`, `/video-sitemap.xml`, and the IndexNow key file return `200`.
- An unknown path returns a real `404`, not a `200` soft error.
- Search Console can fetch the sitemap and sees the new canonical count after processing.

Google recommends aligning redirects, self-referencing canonical tags, and sitemap URLs rather than sending conflicting canonical signals. Keep the principal URL map in `docs/SEO_STRATEGY.md` and preserve that alignment whenever a route changes. See [Google's canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Indexability policy

`src/data/seo/indexing.ts` is the single allow-by-default registry used by both page robots directives and sitemap generation. Add a public route to the noindex list only when there is an evidence-based reason, such as a utility page or a thin legacy route that overlaps a stronger canonical page. Do not use robots.txt to hide a noindex page; crawlers must be able to fetch the page to read its directive. See [Google's robots meta guidance](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

Netlify deploy previews and branch deploys set `PUBLIC_SITE_NOINDEX=true`, which makes every generated preview page `noindex, follow`. Production does not set that flag and follows the route registry normally. Preserve this context split so temporary Netlify URLs cannot become competing search results.

The FormEsque and ShareCal detail studies are indexable. Both pages identify the work as Velixon-owned first-party product evidence, explain the architecture and intended operational value, and explicitly avoid unverified client, adoption, and ROI claims. That makes them useful original proof rather than unapproved third-party testimonials. Screenshots, customer names, testimonials, or quantified results must still be added only when ownership, permission, and supporting evidence are confirmed.

## IndexNow

Velixon hosts a stable IndexNow verification key at:

`https://velixon.net/0ee966b99042118dcf10a3ec65908121.txt`

The submission helper intentionally has no submit-all mode. It accepts only URLs explicitly identified as newly published or materially updated and requires every URL to be an exact canonical in the generated page sitemap.

Dry-run a changed URL list:

```sh
node scripts/submit-indexnow.mjs \
  --url /services/ai-automation/ \
  --url /case-studies/formesque-proposal-to-payment-platform/
```

Submit only after the corresponding production deployment is live:

```sh
node scripts/submit-indexnow.mjs \
  --url /services/ai-automation/ \
  --url /case-studies/formesque-proposal-to-payment-platform/ \
  --submit
```

For a larger release, put one changed/new path or absolute canonical URL per line in a temporary text file and use `--url-file`. The submit mode verifies the live key and checks that every requested URL returns direct indexable HTML with a `200`, a matching self-canonical, and no `noindex` directive before it sends the batch to `api.indexnow.org`.

The [official IndexNow protocol](https://www.indexnow.org/documentation) says to notify participating search engines when a URL is added, updated, or deleted, limits a batch to 10,000 URLs, and requires a host verification key. Velixon's helper deliberately limits itself to current sitemap URLs, so removal notifications require a separate deliberate process. An IndexNow `200` or `202` confirms receipt only; it does not guarantee crawling, indexing, or ranking.

IndexNow is not a Google submission mechanism. Continue using the canonical sitemap and Google Search Console for Google discovery and indexing diagnostics. Google says sitemaps should contain the fully qualified canonical URLs a site wants shown in Search. See [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Change control

- Never invent `lastmod` dates. Add them only when each page has trustworthy editorial modification data.
- Keep noindex pages crawlable unless authentication is required; `noindex` is not access control.
- Keep redirect targets to one hop and force intentional legacy aliases even if a stale generated file appears.
- Do not add schema for reviews, locations, prices, employees, awards, or customer results until the visible page contains verified matching evidence.
- Re-run the release gate whenever metadata, routes, content collections, images, robots rules, the manifest, or sitemap generation changes.
