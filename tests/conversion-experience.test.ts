import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { featuredCustomerReviews } from "../src/data/customer-reviews";
import { caseStudies } from "../src/data/seo/case-studies";

const read = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the cleaner homepage offers clear audit and estimate paths without a blocking intro", async () => {
  const homepage = await read("src/pages/index.astro");
  assert.doesNotMatch(homepage, /IntroExperience/);
  assert.match(homepage, /cta\.label/);
  assert.match(homepage, /Get a Project Estimate/);
  assert.match(homepage, /estimate_request_cta_clicked/);
  assert.match(homepage, /ai-automation-roi-calculator/);
  assert.match(homepage, /Systems for growing service businesses/);
  assert.match(homepage, /time, leads, and money/);
});

test("public identity, pricing, and offer positioning use approved business facts", async () => {
  const [site, about, pricing, services, footer, layout] = await Promise.all([
    read("src/data/site.ts"),
    read("src/pages/about.astro"),
    read("src/pages/pricing.astro"),
    read("src/pages/services.astro"),
    read("src/components/Footer.astro"),
    read("src/layouts/MainLayout.astro")
  ]);

  const publicCopy = `${site}\n${about}\n${pricing}\n${services}\n${footer}\n${layout}`;
  assert.match(publicCopy, /Peter Munnich/);
  assert.match(publicCopy, /Velixon Solutions LLC/);
  assert.match(publicCopy, /Utah single-member/);
  assert.match(publicCopy, /Founder of Velixon/);
  assert.match(publicCopy, /718 N 1130 W/);
  assert.match(publicCopy, /Orem, UT 84057/);
  assert.match(publicCopy, /Utah/);
  assert.match(publicCopy, /United States/);
  assert.match(publicCopy, /velixon@velixon\.net/);
  assert.match(publicCopy, /Within 1 business day|within 1 business day/);
  assert.match(pricing, /Projects start at \$200/);
  assert.match(pricing, /scope, complexity, integrations, and ongoing support/i);
  assert.match(pricing, /does not publish one generic timeline/i);
  assert.match(services, /growing service businesses/i);
  assert.doesNotMatch(publicCopy, /Velixon\.web@gmail\.com/);
});

test("project estimates are the single detailed project-intake lane", async () => {
  const [page, styles, proposal, contact, inquiry, netlify, dialog, pageHero, analyticsDocumentation] = await Promise.all([
    read("src/pages/estimate-request.astro"),
    read("src/styles/estimate-request.css"),
    read("src/pages/proposal-request.astro"),
    read("src/pages/contact.astro"),
    read("src/components/InquiryForm.astro"),
    read("netlify.toml"),
    read("src/components/QuickContactDialog.astro"),
    read("src/components/PageHero.astro"),
    read("docs/CONVERSION_ANALYTICS.md")
  ]);

  const heroPosition = page.indexOf("<PageHero");
  const formPosition = page.indexOf('id="estimate-request-form"');
  const serviceDirectoryPosition = page.indexOf('class="estimate-services"');

  assert.ok(heroPosition >= 0 && heroPosition < formPosition, "the estimate form should follow the hero");
  assert.ok(formPosition < serviceDirectoryPosition, "the estimate form should appear before the service directory");
  assert.match(page, /ctaHref="#estimate-request-form"/);
  assert.match(page, /name="estimate-request"/);
  assert.match(page, /data-netlify="true"/);
  assert.match(page, /Request My Project Estimate/);
  assert.match(page, /Custom software & SaaS/);
  assert.match(page, /Workflow automation/);
  assert.match(page, /AI systems & agents/);
  assert.match(page, /estimate_request_started/);
  assert.match(page, /estimate_request_submitted/);
  assert.match(page, /action="\/thank-you\/"/);
  assert.match(page, /LEAD_CONVERSION_PENDING_KEY/);
  assert.match(page, /window\.location\.assign\(form\.dataset\.successPath \|\| "\/thank-you\/"\)/);
  assert.match(pageHero, /href === "#estimate-request-form"[\s\S]*estimate_request_cta_clicked/);
  assert.match(analyticsDocumentation, /\| `estimate_request_cta_clicked` \|/);
  assert.match(page, /privacy-acknowledgment/);
  assert.match(styles, /#estimate-request-form\s*\{[\s\S]*scroll-margin-top/);

  assert.match(proposal, /\/estimate-request\/\?source=proposal-transition#estimate-request-form/);
  assert.doesNotMatch(proposal, /name="proposal-request"|data-netlify="true"|proposal_request_submitted/);
  assert.match(netlify, /from = "\/proposal-request"\s+to = "\/estimate-request\/#estimate-request-form"\s+status = 301/);
  assert.match(netlify, /from = "\/proposal-request\/"\s+to = "\/estimate-request\/#estimate-request-form"\s+status = 301/);

  assert.match(contact, /Free Business Systems Audit/);
  assert.match(contact, /\/estimate-request\/\?source=contact-page#estimate-request-form/);
  assert.doesNotMatch(contact, /\/proposal-request\/|showBusiness|showProjectType/);
  assert.doesNotMatch(inquiry, /Start the Full Free Audit|inquiry-success#book-audit/);
  assert.match(inquiry, /action="\/thank-you\/"/);
  assert.match(dialog, /"\/estimate-request"/);
});

test("informational audit links do not inflate primary audit CTA intent", async () => {
  const [page, documentation] = await Promise.all([
    read("src/pages/free-audit.astro"),
    read("docs/CONVERSION_ANALYTICS.md")
  ]);

  assert.match(page, /href="#solutions"/);
  assert.doesNotMatch(page, /href="#solutions"[^>]+data-analytics-event="free_audit_cta_clicked"/);
  assert.match(documentation, /Informational in-page links[^.]+must not emit this event/);
});

test("the audit form stays concise and consent visibility coordinates fixed mobile layers", async () => {
  const [form, banner, globalStyles] = await Promise.all([
    read("src/components/FreeAuditForm.astro"),
    read("src/components/ConsentBanner.astro"),
    read("src/styles/global.css")
  ]);

  assert.doesNotMatch(form, /<input[^>]+name="phone"/);
  assert.match(form, /phone:\s*text\("phone"\)/);
  assert.match(banner, /dataset\.consentBannerVisible\s*=\s*visible\s*\?\s*"true"\s*:\s*"false"/);
  assert.match(banner, /CustomEvent\("velixon:consentbannerchange"/);
  assert.match(banner, /detail:\s*\{\s*visible\s*\}/);
  assert.match(banner, /focus\(\{\s*preventScroll:\s*true\s*\}\)/);
  assert.match(globalStyles, /\.consent-banner\s*\{[\s\S]*bottom:\s*max\(1rem, env\(safe-area-inset-bottom\)\)/);
  assert.match(globalStyles, /\.consent-banner\s*\{[\s\S]*max-height:\s*calc\(100dvh/);
  assert.match(globalStyles, /\.consent-banner\s*\{[\s\S]*overscroll-behavior:\s*contain/);
});

test("site motion stays progressive, pointer-aware, and reduced-motion safe", async () => {
  const [homepage, motion, layout] = await Promise.all([
    read("src/pages/index.astro"),
    read("src/components/MotionExperience.astro"),
    read("src/layouts/MainLayout.astro")
  ]);

  assert.match(layout, /MotionExperience/);
  assert.match(homepage, /data-motion-hero/);
  assert.match(homepage, /data-motion-path/);
  assert.match(homepage, /data-motion-tilt/);
  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /prefers-reduced-motion:\s*reduce/);
  assert.match(motion, /hover:\s*hover.*pointer:\s*fine/);
  assert.match(motion, /data-motion-magnetic/);
  assert.match(motion, /data-motion-parallax/);
  assert.doesNotMatch(motion, /gsap|animejs|three(?:\.js)?/i);
});

test("premium typography is self-hosted and preserves a readable UI hierarchy", async () => {
  const [layout, typography, packageSource] = await Promise.all([
    read("src/layouts/MainLayout.astro"),
    read("src/styles/typography.css"),
    read("package.json")
  ]);
  const packageJson = JSON.parse(packageSource);

  assert.match(layout, /@fontsource\/gloock\/latin-400\.css/);
  assert.match(layout, /@fontsource-variable\/host-grotesk\/wght\.css/);
  assert.match(layout, /gloock-latin-400-normal\.woff2\?url/);
  assert.match(layout, /host-grotesk-latin-wght-normal\.woff2\?url/);
  assert.match(typography, /--font-heading:\s*"Gloock"/);
  assert.match(typography, /--font-body:\s*"Host Grotesk Variable"/);
  assert.match(typography, /font-synthesis:\s*none/);
  assert.equal(packageJson.dependencies["@fontsource/gloock"], "^5.3.0");
  assert.equal(packageJson.dependencies["@fontsource-variable/host-grotesk"], "^5.3.0");
  assert.equal(packageJson.dependencies["@fontsource-variable/outfit"], undefined);
});

test("lead forms use a successful one-time handoff before the shared Google Ads thank-you conversion", async () => {
  const [form, dialog, layout, navbar, inquiryStyles, thankYouPage, indexing, googleAds] = await Promise.all([
    read("src/components/InquiryForm.astro"),
    read("src/components/QuickContactDialog.astro"),
    read("src/layouts/MainLayout.astro"),
    read("src/components/Navbar.astro"),
    read("src/styles/inquiry.css"),
    read("src/pages/thank-you.astro"),
    read("src/data/seo/indexing.ts"),
    read("src/lib/google-ads.ts")
  ]);

  assert.match(form, /name="website-inquiry"/);
  assert.match(form, /data-netlify="true"/);
  assert.match(form, /action="\/thank-you\/"/);
  assert.match(form, /window\.location\.assign\(form\.dataset\.successPath \|\| "\/thank-you\/"\)/);
  assert.match(form, /sessionStorage\.setItem\(LEAD_CONVERSION_PENDING_KEY/);
  assert.doesNotMatch(form, /track\("generate_lead"/);
  assert.match(form, /privacy-acknowledgment/);
  assert.doesNotMatch(form, /name="budget-range"/);
  assert.doesNotMatch(form, /name="business-name"/);
  assert.doesNotMatch(form, /name="project-type"/);
  assert.match(thankYouPage, /Inquiry received/);
  assert.match(thankYouPage, /Thank you, we’ll be in touch soon/);
  assert.match(thankYouPage, /within 1 business day/);
  assert.match(thankYouPage, /noIndex/);
  assert.match(thankYouPage, /LEAD_CONVERSION_PROCESSED_KEY/);
  assert.match(thankYouPage, /sessionStorage\.removeItem\(LEAD_CONVERSION_PENDING_KEY\)/);
  assert.match(thankYouPage, /track\("generate_lead"/);
  assert.match(googleAds, /AW-18088634031\/IvyFCKHRw98cEK_NqrFD/);
  assert.match(layout, /eventName === "generate_lead"/);
  assert.match(layout, /value: 1\.0/);
  assert.match(layout, /currency: "USD"/);
  assert.match(indexing, /"\/thank-you\/"/);
  assert.match(dialog, /<dialog/);
  assert.match(dialog, /"\/thank-you"/);
  assert.match(dialog, /contact_prompt_viewed/);
  assert.match(dialog, /contact_form_opened/);
  assert.match(dialog, /scrollFrame/);
  assert.match(dialog, /cancelAnimationFrame\(scrollFrame\)/);
  assert.match(dialog, /IntersectionObserver/);
  assert.match(dialog, /\[data-inquiry-prompt-suppress\]/);
  assert.match(dialog, /rootMargin:\s*"160px 0px"/);
  assert.match(layout, /QuickContactDialog/);
  assert.match(layout, /destination\.pathname/);
  assert.doesNotMatch(layout, /item_id:\s*href/);
  assert.match(navbar, /\.quick-contact/);
  assert.match(inquiryStyles, /body\.mobile-menu-open \.inquiry-invitation/);
  assert.match(inquiryStyles, /env\(safe-area-inset-bottom\)/);
});

test("the homepage audit film is lightweight, user initiated, and measurable", async () => {
  const [homepage, film, videoAsset, posterAsset, logoAsset] = await Promise.all([
    read("src/pages/index.astro"),
    read("src/components/AuditPromoVideo.astro"),
    stat(new URL("../public/videos/velixon-audit-promo.mp4", import.meta.url)),
    stat(new URL("../public/images/velixon-audit-poster.webp", import.meta.url)),
    stat(new URL("../public/velixon-logo.webp", import.meta.url))
  ]);

  assert.match(homepage, /AuditPromoVideo/);
  assert.match(homepage, /"@type": "VideoObject"/);
  assert.match(film, /preload="none"/);
  assert.match(film, /playsinline/);
  assert.match(film, /aria-describedby="audit-film-description"/);
  assert.match(film, /audit_video_viewed/);
  assert.match(film, /audit_video_started/);
  assert.match(film, /audit_video_completed/);
  assert.doesNotMatch(film, /\sautoplay(?:\s|>)/);
  assert.doesNotMatch(film, /\sloop(?:\s|>)/);
  assert.ok(videoAsset.size < 800_000, "audit film should stay below 800 KB");
  assert.ok(posterAsset.size < 25_000, "audit film poster should stay below 25 KB");
  assert.ok(logoAsset.size < 6_000, "shared logo should stay below 6 KB");
});

test("homepage customer proof stays source-backed, restrained, and accessible", async () => {
  const [homepage, wheel, reviewPage] = await Promise.all([
    read("src/pages/index.astro"),
    read("src/components/ReviewWheel.astro"),
    read("src/pages/review.astro")
  ]);

  assert.match(homepage, /<ReviewWheel\s*\/>/);
  assert.deepEqual(
    featuredCustomerReviews.map((review) => review.name),
    ["Chiggy Combs", "Giada Ferrazzano", "Mighty Movers", "Ready Relocation"]
  );
  assert.ok(featuredCustomerReviews.every((review) => Boolean(review.featuredQuote)));
  assert.ok(featuredCustomerReviews.every((review) => !/Audrey Earnshaw|25%/i.test(`${review.name} ${review.featuredQuote}`)));
  assert.match(wheel, /data-review-wheel-motion/);
  assert.match(wheel, /data-inquiry-prompt-suppress/);
  assert.match(wheel, /View all reviews on Google/);
  assert.match(wheel, /data-analytics-event="review_source_clicked"/);
  assert.match(wheel, /data-analytics-event="free_audit_cta_clicked"/);
  assert.match(wheel, /prefers-reduced-motion:\s*reduce/);
  assert.match(wheel, /scroll-snap-type:\s*inline mandatory/);
  assert.match(wheel, /will-change:\s*transform/);
  assert.match(wheel, /\.review-wheel:is\(\.is-paused/);
  assert.match(wheel, /\.is-interaction-paused/);
  assert.match(wheel, /\.is-out-of-view/);
  assert.match(wheel, /\.is-document-hidden/);
  assert.match(wheel, /focusin/);
  assert.match(wheel, /IntersectionObserver/);
  assert.match(wheel, /@media \(min-width:\s*1200px\)/);
  assert.match(wheel, /review-wheel__trail/);
  assert.match(wheel, /review-wheel__energy/);
  assert.doesNotMatch(wheel, /setOrbitRate\(0\.14\)/);
  assert.doesNotMatch(wheel, /review-wheel__stage:(?:hover|focus-within)/);
  assert.doesNotMatch(reviewPage, /<img\s+src=\{review\.avatarSrc\}/);
});

test("client and product case studies use real media with explicit evidence boundaries", async () => {
  const [component, hub, freeAudit, formesqueVideo, formesquePoster, shareCalImage, frontierFenceImage] = await Promise.all([
    read("src/components/CaseStudyPage.astro"),
    read("src/pages/case-studies/index.astro"),
    read("src/pages/free-audit.astro"),
    stat(new URL("../public/videos/case-studies/formesque-product-demo.mp4", import.meta.url)),
    stat(new URL("../public/images/case-studies/formesque-workflow.png", import.meta.url)),
    stat(new URL("../public/images/case-studies/sharecal-interface-prototype.png", import.meta.url)),
    stat(new URL("../public/images/case-studies/frontier-fence-cedar-privacy.webp", import.meta.url))
  ]);

  const productStudies = caseStudies.filter((study) => study.caseStudyType === "product");
  const frontierFence = caseStudies.find((study) => study.slug === "frontier-fence-digital-systems");

  assert.equal(caseStudies.length, 3);
  assert.equal(productStudies.length, 2);
  assert.ok(caseStudies.every((study) => Boolean(study.media)));
  assert.ok(frontierFence);
  assert.equal(frontierFence.caseStudyType, "client");
  assert.equal(frontierFence.subjectUrl, "https://www.frontierfenceutah.com/");
  assert.match(frontierFence.evidenceNote, /first external client/i);
  assert.match(frontierFence.media?.caption ?? "", /Frontier Fence's cedar fence work.*does not depict work performed by Velixon/i);
  assert.match(frontierFence.solution.map((item) => item.title).join(" "), /Project-aware estimate intake.*Ask Anna virtual fence guide/i);
  assert.equal(frontierFence.timeline?.length ?? 0, 0);
  assert.match(productStudies.find((study) => study.subject === "FormEsque")?.media?.caption ?? "", /illustrative data/i);
  assert.match(productStudies.find((study) => study.subject === "ShareCal")?.media?.caption ?? "", /prototype.*illustrative, seeded data/i);
  assert.doesNotMatch(caseStudies.map((study) => study.media?.caption).join(" "), /measured (sales|revenue|roi)/i);
  assert.match(component, /isClientCaseStudy/);
  assert.match(component, /datePublished: publishedTime/);
  assert.match(component, /about:\s*\{/);
  assert.match(hub, /External client work/);
  assert.match(hub, /Products designed and built by Velixon/);
  assert.match(freeAudit, /caseStudyType === "product"/);
  assert.match(component, /controls/);
  assert.match(component, /preload="metadata"/);
  assert.doesNotMatch(component, /\sautoplay(?:\s|>)/);
  assert.ok(formesqueVideo.size < 3_000_000, "FormEsque demonstration should stay below 3 MB");
  assert.ok(formesquePoster.size < 200_000, "FormEsque poster should stay below 200 KB");
  assert.ok(shareCalImage.size < 1_500_000, "ShareCal prototype image should stay below 1.5 MB");
  assert.ok(frontierFenceImage.size < 500_000, "Frontier Fence client image should stay below 500 KB");
});
