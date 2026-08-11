import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { isPublicIndexablePath } from "./src/data/seo/indexing";

const site = "https://velixon.net";

export default defineConfig({
  site,
  trailingSlash: "always",
  security: {
    csp: {
      algorithm: "SHA-384",
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://www.googleadservices.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://www.google.com https://google.com https://stats.g.doubleclick.net https://*.clarity.ms https://c.bing.com",
        "font-src 'self' data:",
        "form-action 'self'",
        "frame-src https://www.googletagmanager.com",
        "img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.googleadservices.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.google.com https://google.com https://stats.g.doubleclick.net https://*.clarity.ms https://c.bing.com",
        "manifest-src 'self'",
        "media-src 'self'",
        "object-src 'none'",
        "worker-src 'self'",
        "upgrade-insecure-requests"
      ],
      scriptDirective: {
        resources: [
          "'self'",
          "https://www.googletagmanager.com",
          "https://www.googleadservices.com",
          "https://pagead2.googlesyndication.com",
          "https://googleads.g.doubleclick.net",
          "https://www.google.com",
          "https://www.clarity.ms"
        ]
      },
      styleDirective: {
        resources: [
          { resource: "'self'", kind: "element" },
          { resource: "'unsafe-inline'", kind: "attribute" }
        ]
      }
    }
  },
  integrations: [
    sitemap({
      filter: (page) => isPublicIndexablePath(new URL(page).pathname),
      customSitemaps: [`${site}/image-sitemap.xml`, `${site}/video-sitemap.xml`]
    })
  ],
  compressHTML: true,
  build: {
    format: "directory",
    inlineStylesheets: "auto"
  },
  markdown: {
    syntaxHighlight: false
  }
});
