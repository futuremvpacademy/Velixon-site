import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = "https://velixon.net";
const excludedSitemapPaths = new Set(["/404/", "/404.html", "/review/"]);

export default defineConfig({
  site,
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !excludedSitemapPaths.has(new URL(page).pathname),
      customSitemaps: [`${site}/image-sitemap.xml`]
    })
  ],
  compressHTML: true,
  build: {
    format: "directory",
    inlineStylesheets: "auto"
  }
});
