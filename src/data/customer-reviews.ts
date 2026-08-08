export interface CustomerReview {
  name: string;
  quote: string;
  stars: number;
  angle: number;
  featuredQuote?: string;
  service?: string;
  language?: "en" | "es";
}

export const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Velixon&query_place_id=ChIJC_nek4KBTYcRYqmUGLpxdp8";

export const customerReviews: CustomerReview[] = [
  {
    name: "Chiggy Combs",
    quote: "Working with Velixon was one of the best decisions I made for my business. They built me a clean, professional website...",
    featuredQuote: "Working with Velixon was one of the best decisions I made for my business.",
    service: "Business website",
    stars: 5,
    angle: 280
  },
  {
    name: "Giada Ferrazzano",
    quote: "Velixon did an amazing job creating a website for my How to Be a Latina 101 book. From the beginning, they really...",
    featuredQuote: "Velixon did an amazing job creating a website for my How to Be a Latina 101 book.",
    service: "Author website",
    stars: 5,
    angle: 320
  },
  {
    name: "Mighty Movers",
    quote: "Velixon did a great job helping us through our rebrand at Mighty Movers. They updated our website, improved the overall...",
    featuredQuote: "Velixon did a great job helping us through our rebrand at Mighty Movers.",
    service: "Website & rebrand",
    stars: 5,
    angle: 240
  },
  {
    name: "Ready Relocation",
    quote: "Velixon did a wonderful job creating our logo for Ready Relocation. They really understood the vision and delivered...",
    featuredQuote: "Velixon did a wonderful job creating our logo for Ready Relocation.",
    service: "Logo & brand identity",
    stars: 5,
    angle: 40
  }
];

const featuredProofNames = new Set([
  "Chiggy Combs",
  "Giada Ferrazzano",
  "Mighty Movers",
  "Ready Relocation"
]);

export const featuredCustomerReviews = customerReviews.filter(
  (review): review is CustomerReview & { featuredQuote: string; service: string } =>
    featuredProofNames.has(review.name) && Boolean(review.featuredQuote && review.service)
);
