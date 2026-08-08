export type SeoCollection = "services" | "solutions" | "industries" | "integrations" | "locations";

export interface SeoCard {
  title: string;
  description: string;
}

export interface SeoLink extends SeoCard {
  href: string;
  label?: string;
}

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoProcessStep extends SeoCard {
  label: string;
}

export interface SeoRoiModel {
  title: string;
  description: string;
  formula: string;
  factors: string[];
  disclaimer: string;
}

export interface SeoLandingData {
  collection: SeoCollection;
  slug: string;
  name: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  summary: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  definition: string;
  definitionLabel?: string;
  sources?: Array<{ title: string; href: string }>;
  challengesTitle: string;
  challengesIntro: string;
  challenges: SeoCard[];
  capabilitiesTitle: string;
  capabilitiesIntro: string;
  capabilities: SeoCard[];
  outcomesTitle: string;
  outcomesIntro: string;
  outcomes: SeoCard[];
  examplesTitle: string;
  examplesIntro: string;
  examples: SeoCard[];
  idealForTitle: string;
  idealFor: string[];
  processIntro: string;
  process: SeoProcessStep[];
  technology: string[];
  technologyNote: string;
  roi?: SeoRoiModel;
  faqs: SeoFaq[];
  related: SeoLink[];
  reviewedDate?: string;
}

export interface DirectoryGroup {
  title: string;
  description: string;
  items: SeoLink[];
}

export interface ComparisonRow {
  factor: string;
  optionA: string;
  optionB: string;
  guidance: string;
}

export interface ComparisonData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  summary: string;
  optionAName: string;
  optionBName: string;
  verdict: string;
  verdictLabel: string;
  rows: ComparisonRow[];
  optionABestFor: string[];
  optionBBestFor: string[];
  considerations: SeoCard[];
  decisionSteps: SeoProcessStep[];
  faqs: SeoFaq[];
  related: SeoLink[];
  keywords: string[];
  sources: Array<{ title: string; href: string }>;
}

export interface GuideSection {
  id: string;
  title: string;
  answer?: string;
  paragraphs: string[];
  bullets?: string[];
  steps?: SeoProcessStep[];
}

export interface GuideData {
  slug: string;
  title: string;
  metaDescription: string;
  headline: string;
  summary: string;
  category: string;
  readTime: string;
  topics: string[];
  takeaways: string[];
  sections: GuideSection[];
  faqs: SeoFaq[];
  related: SeoLink[];
  datePublished: string;
  dateModified: string;
  sources: Array<{ title: string; href: string }>;
}

export interface CaseStudyMedia {
  type: "video" | "image";
  src: string;
  poster?: string;
  alt: string;
  eyebrow: string;
  title: string;
  caption: string;
  width?: number;
  height?: number;
  demoHref?: string;
  demoLabel?: string;
}

export interface CaseStudyData {
  caseStudyType: "client" | "product";
  slug: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  summary: string;
  subject: string;
  engagementType: string;
  evidenceLabel: string;
  evidenceNote: string;
  subjectUrl?: string;
  datePublished?: string;
  dateModified?: string;
  media?: CaseStudyMedia;
  problem: string[];
  solution: SeoCard[];
  technology: string[];
  timeline?: SeoProcessStep[];
  impact: SeoCard[];
  roiFramework: string;
  related: SeoLink[];
}
