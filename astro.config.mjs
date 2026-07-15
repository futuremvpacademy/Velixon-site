import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { isPublicIndexablePath } from "./src/data/seo/indexing";

const site = "https://velixon.net";

export default defineConfig({
  site,
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => isPublicIndexablePath(new URL(page).pathname),
      customSitemaps: [`${site}/image-sitemap.xml`]
    })
  ],
  compressHTML: true,
  build: {
    format: "directory",
    inlineStylesheets: "auto"
  }
});
