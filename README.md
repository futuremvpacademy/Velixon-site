# Velixon Starter Site

Premium Astro homepage starter for Velixon.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:4321`.

## Edit content

Homepage text, navigation labels, trust items, and hero preview content live in:

- `src/data/site.ts`

Reusable homepage components live in:

- `src/components/Navbar.astro`
- `src/components/HeroSection.astro`
- `src/components/TrustStrip.astro`

Page composition lives in:

- `src/pages/index.astro`

Theme tokens and global styles live in:

- `src/styles/global.css`

Brand assets live in:

- `public/velixon-logo.png`

## Build

```bash
npm run build
```

## Deploy

This site outputs static files, so it works well on:

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages

Build command:

```bash
npm run build
```

Publish directory:

```bash
dist
```
