import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

test("review solicitation requests honest feedback without review gating", () => {
  const reviewPage = read("../src/pages/review.astro");
  assert.match(reviewPage, /positive, critical, or somewhere in between/);
  assert.match(reviewPage, /does not condition review requests/);
  assert.match(reviewPage, /No purchase benefit or incentive is offered/);
  assert.doesNotMatch(reviewPage, /If we did a great job/i);
  assert.doesNotMatch(reviewPage, /5 out of 5 stars/);
});

test("only source-backed non-performance testimonials are featured", () => {
  const reviewData = read("../src/data/customer-reviews.ts");
  const featuredBlock = reviewData.match(/const featuredProofNames = new Set\(\[([\s\S]*?)\]\);/)?.[1] ?? "";
  for (const reviewer of ["Chiggy Combs", "Giada Ferrazzano", "Mighty Movers", "Ready Relocation"]) {
    assert.match(featuredBlock, new RegExp(reviewer));
  }
  assert.doesNotMatch(featuredBlock, /Audrey Earnshaw|Future MVP Soccer Academy/);
});

test("privacy disclosures cover retention, marketing boundaries, and sale or sharing", () => {
  const privacy = read("../src/pages/privacy.astro");
  assert.match(privacy, /scheduled for deletion no later than 24 months/);
  assert.match(privacy, /does not sell personal information or share it for cross-context behavioral advertising/);
  assert.match(privacy, /does not by itself authorize recurring promotional text messages/);
  assert.match(privacy, /Privacy Appeal/);
});

test("free audit terms and machine-readable security disclosure are published", () => {
  const terms = read("../src/pages/terms.astro");
  const site = read("../src/data/site.ts");
  const securityTxtUrl = new URL("../public/.well-known/security.txt", import.meta.url);
  assert.match(terms, /No purchase is required/);
  assert.match(terms, /does not guarantee acceptance/);
  assert.match(terms, /businessInfo\.legalName/);
  assert.match(site, /legalName: "Velixon Solutions LLC"/);
  assert.match(terms, /arranges that call manually/);
  assert.match(terms, /does not offer public self-scheduling/i);
  assert.equal(existsSync(securityTxtUrl), true);
  const securityTxt = read("../public/.well-known/security.txt");
  assert.match(securityTxt, /^Contact:/m);
  assert.match(securityTxt, /^Expires: 2027-07-01T00:00:00Z$/m);
  assert.match(securityTxt, /^Canonical: https:\/\/velixon\.net\/\.well-known\/security\.txt$/m);
});

test("review evidence is excluded from public deployment and private proof paths stay ignored", () => {
  const gitignore = read("../.gitignore");
  const privateProofPolicy = read("../ops/private-proof/README.md");
  assert.equal(existsSync(new URL("../public/images/reviews", import.meta.url)), false);
  assert.match(gitignore, /^ops\/private-proof\/reviews\/$/m);
  assert.match(gitignore, /^ops\/private-proof\/release-archive\/$/m);
  assert.match(privateProofPolicy, /not deployed with the website/);
  assert.match(privateProofPolicy, /Do not copy these files into `public\/`/);
});
