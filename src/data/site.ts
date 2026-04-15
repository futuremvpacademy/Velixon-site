export const siteContent = {
  companyName: "Velixon",
  logo: "/velixon-logo.png",
  cta: "Start Your Project",
  ctaHref: "/contact",
  secondaryCta: "View Pricing",
  secondaryCtaHref: "/pricing",
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],
  footerNav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],
  footer: {
    blurb: "Velixon designs modern websites for local businesses that need a stronger first impression, clearer messaging, and more customer inquiries.",
    designedBy: "Designed & Developed by Velixon",
    email: "Velixon.web@gmail.com",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/velixon.digital?igsh=cTdhYW9mMTM1dnhh&utm_source=qr" }
    ]
  },
  contactInfo: {
    email: "Velixon.web@gmail.com",
    phone: "801-602-5389"
  },
  home: {
    eyebrow: "SYSTEM",
    headline: "High-performance websites\ndesigned to scale",
    subheadline: "Built clean. Delivered fast.\nOptimized for performance.",
    primaryCta: "Get started",
    primaryCtaHref: "/contact",
    secondaryCta: "View pricing",
    secondaryCtaHref: "/pricing",
    heroPreview: {
      eyebrow: "SYSTEM",
      label: "Performance-focused build",
      title: "Sharp UI. Fast load. Better trust.",
      description:
        "A cleaner, faster website system built to look premium and guide people toward action.",
      metrics: [
        { value: "Fast", label: "lightweight delivery" },
        { value: "Clean", label: "structured layout system" },
        { value: "Focused", label: "conversion-first flow" }
      ],
      layers: ["Minimal layout", "Premium dark UI", "Soft purple glow"]
    }
  },
  homeServicesPreview: {
    eyebrow: "BUILD",
    title: "Core services",
    items: [
      {
        title: "Design",
        description: "Clean, structured layouts"
      },
      {
        title: "Development",
        description: "Fast, responsive builds"
      },
      {
        title: "Maintenance",
        description: "Ongoing updates and support"
      }
    ]
  },
  homePreviews: {
    services: {
      cta: "View Services",
      href: "/services"
    },
    work: {
      cta: "View Work",
      href: "/work"
    },
    pricing: {
      eyebrow: "Pricing preview",
      title: "Simple pricing that starts with a one-time build, then optional monthly support.",
      description:
        "Start with a $500 custom website build, then choose the level of updates and support your business needs.",
      bullets: ["$500 one-time build", "Monthly plans from $100/mo", "No contracts. Cancel anytime."],
      cta: "View Pricing",
      href: "/pricing"
    }
  },
  services: [
    {
      title: "Web Design",
      meta: "Best for new sites",
      description: "Custom website built to look modern, professional, and ready to convert.",
      outcome: "Outcome: stronger first impression and more leads"
    },
    {
      title: "Website Redesign",
      meta: "Best for outdated sites",
      description: "A cleaner rebuild that improves how your business looks and communicates.",
      outcome: "Outcome: better credibility and customer experience"
    },
    {
      title: "Mobile Optimization",
      meta: "Best for improving usability",
      description: "Make your site look sharp and work smoothly across all devices.",
      outcome: "Outcome: better experience on every screen"
    },
    {
      title: "Lead-Focused Websites",
      meta: "Best for lead generation",
      description: "Pages designed to guide visitors toward contact, booking, or action.",
      outcome: "Outcome: more calls, form fills, and qualified leads"
    }
  ],
  workPreview: {
    eyebrow: "Work preview",
    title: "A real redesign example that shows how Velixon sharpens presentation and trust.",
    description:
      "A focused before-and-after comparison showing how a dated website can be rebuilt into something cleaner, more premium, and easier to trust.",
    cardTag: "REDESIGN",
    cardAccent: "BEFORE + AFTER",
    cardTitle: "Before and after redesign",
    cardDescription:
      "A direct before-and-after comparison showing how a dated website can be turned into a cleaner, more premium, more conversion-focused direction."
  },
  mobileShowcase: {
    eyebrow: "Mobile Experience Upgrade",
    title: "Mobile Optimization",
    description: "A clearer mobile layout makes the redesign feel easier to trust, easier to navigate, and easier to act on.",
    image: "/images/mobile-optimization-before-after.png",
    items: [
      {
        label: "Before",
        alt: "Before redesign mobile website view",
        position: "left"
      },
      {
        label: "After",
        alt: "After redesign mobile website view",
        position: "right"
      }
    ]
  },
  walkthrough: {
    title: "Live Website Walkthrough",
    video: "/videos/velixon-walkthrough.mp4",
    description: "A real walkthrough showing the improved structure, flow, and experience."
  },
  pricingPlans: {
    eyebrow: "Pricing",
    title: "$500 to build. Then simple monthly plans to keep it running and improving.",
    description: "No contracts. Cancel anytime.",
    build: {
      title: "Website Build",
      price: "$500",
      cadence: "one-time",
      cta: "Start My Website",
      bullets: [
        "Fully custom website",
        "Modern, clean design",
        "Mobile optimized",
        "Built for lead generation (contact and conversion focused)",
        "Fast turnaround"
      ]
    },
    monthlyTitle: "Monthly Maintenance Plans",
    monthlyDescription: "1 request = a small update (text, image, or minor change)",
    sharedFeatures: [
      "Hosting and domain management",
      "Site security monitoring",
      "Uptime monitoring",
      "Secure site backups",
      "Regular maintenance checks",
      "Minor text updates",
      "Image replacements",
      "Content updates",
      "Site health check",
      "Bug monitoring",
      "Up to 3 update requests per month",
      "48–72 hour turnaround"
    ],
    plans: [
      {
        name: "Starter",
        price: "$100/mo",
        featured: false,
        cta: "Start My Website",
        description: "Basic ongoing website care",
        starterFeatures: []
      },
      {
        name: "Standard",
        price: "$175/mo",
        featured: true,
        cta: "Start My Website",
        description: "Best for growing businesses",
        standardFeatures: [
          "Site health monitoring",
          "Bug fixes and issue resolution",
          "Up to 6 update requests per month",
          "24–48 hour turnaround",
          "Priority edit requests",
          "Monthly improvements",
          "Performance optimization",
          "Basic SEO improvements",
          "Ongoing support"
        ]
      },
      {
        name: "Premium",
        price: "$250/mo",
        featured: false,
        cta: "Start My Website",
        description: "Full support and fastest service",
        standardFeatures: [
          "Site health monitoring",
          "Bug fixes and issue resolution",
          "Priority edit requests",
          "Performance optimization",
          "Basic SEO improvements",
          "Ongoing support"
        ],
        premiumFeatures: [
          "Up to 12 update requests per month",
          "Same-day priority turnaround",
          "Advanced bug detection and fixes",
          "Priority issue resolution",
          "Continuous site monitoring",
          "Advanced content updates",
          "Layout and section changes",
          "Page additions or redesigns",
          "Conversion optimization",
          "CTA and form optimization",
          "Continuous improvements"
        ]
      }
    ],
    allPlansTitle: "What’s included in all plans",
    allPlansFeatures: ["Hosting", "Security", "Backups", "Maintenance", "Content updates"]
  },
  closingCta: {
    eyebrow: "Ready when you are",
    title: "Ready to get your website?",
    description:
      "Get a clean, modern website built for your business, then let us handle the updates, fixes, and improvements.",
    trustLine: "Fast turnaround. Affordable pricing. No contracts.",
    primary: "Start My Website",
    primaryHref: "/contact",
    secondary: "Contact Velixon",
    secondaryHref: "/contact"
  },
  whyVelixon: {
    eyebrow: "Why Velixon",
    title: "Why small businesses choose Velixon.",
    description:
      "Velixon keeps the process simple, the design modern, and the website focused on what actually helps a small business get more leads.",
    items: [
      {
        title: "Affordable pricing",
        description: "Affordable without looking cheap."
      },
      {
        title: "Clean modern design",
        description: "Clean design that builds trust."
      },
      {
        title: "Fast turnaround",
        description: "Fast turnaround for small businesses."
      },
      {
        title: "Built for small business leads",
        description: "Built to help turn visitors into leads."
      }
    ]
  },
  results: {
    eyebrow: "What businesses get",
    title: "A website that makes your business easier to trust and easier to contact.",
    items: [
      {
        title: "Cleaner first impression",
        detail: "Your business looks more established from the first visit instead of losing trust with an outdated site."
      },
      {
        title: "More inquiries from your website",
        detail: "Clear structure and stronger calls-to-action make it easier for the right customers to reach out."
      },
      {
        title: "Stronger trust with new customers",
        detail: "Professional presentation helps people feel more confident choosing your business over local alternatives."
      },
      {
        title: "A site that reflects your actual quality",
        detail: "Your online presence finally matches the quality of the work you already deliver in real life."
      }
    ]
  },
  process: {
    eyebrow: "Simple process",
    title: "Simple process",
    steps: [
      {
        title: "Tell us about your business",
        description: "Share what you do, what you need, and the kind of customers you want to reach."
      },
      {
        title: "We design your site",
        description: "We create a clean, modern website built around trust, clarity, and lead generation."
      },
      {
        title: "You launch and start getting leads",
        description: "Once approved, your site goes live and starts working as a stronger first impression."
      }
    ]
  },
  finalCta: {
    eyebrow: "Ready to Get More Customers?",
    title: "Make your next website a smart business decision.",
    description:
      "If your current site feels outdated, unclear, or too weak to support your business properly, we can build something cleaner, stronger, and easier for customers to act on.",
    points: ["Simple process", "Fast launch", "Clear communication"],
    primary: "Start My Website",
    primaryHref: "/contact",
    secondary: "See Pricing",
    secondaryHref: "/pricing",
    helper: "We’ll respond quickly and map out the right site for you."
  },
  pages: {
    services: {
      hero: {
        eyebrow: "Services",
        title: "Web design services built for local businesses that need a stronger online presence.",
        description:
          "From full website builds to redesigns and focused landing pages, Velixon helps local businesses look more professional and generate more qualified inquiries."
      },
      breakdown: [
        {
          title: "Web Design",
          description: "Custom websites built to look modern, professional, and ready to convert.",
          meta: "Best for new sites",
          outcome: "Outcome: stronger first impression and more leads"
        },
        {
          title: "Website Redesign",
          description: "A cleaner rebuild that improves how your business looks and communicates.",
          meta: "Best for outdated sites",
          outcome: "Outcome: better credibility and customer experience"
        },
        {
          title: "Mobile Optimization",
          description: "Responsive improvements that make your site look sharp and work smoothly on every screen.",
          meta: "Best for improving usability",
          outcome: "Outcome: better experience across devices"
        },
        {
          title: "Lead-Focused Websites",
          description: "Pages designed to guide visitors toward contact, booking, and action.",
          meta: "Best for lead generation",
          outcome: "Outcome: more calls, form fills, and qualified leads"
        }
      ],
      fit: [
        {
          title: "Local service businesses",
          description: "A strong fit for businesses that need to look established and trustworthy when customers compare local options."
        },
        {
          title: "Teams that need speed",
          description: "Built for owners who want a straightforward process, quick communication, and a fast path to launch."
        },
        {
          title: "Businesses ready to improve quality",
          description: "Ideal for businesses that know their current site is holding back trust, clarity, or lead generation."
        }
      ],
      cta: {
        eyebrow: "Start with clarity",
        title: "Choose the right website build for where your business is now.",
        description:
          "Whether you need a full site, a redesign, or a focused landing page, we’ll recommend the clearest option and keep the process moving.",
        points: ["Clear recommendation", "Fast communication", "Built around your goals"],
        primary: "Start My Website",
        primaryHref: "/contact",
        secondary: "See Pricing",
        secondaryHref: "/pricing",
        helper: "We’ll respond quickly and map out the right site for you."
      }
    },
    results: {
      hero: {
        eyebrow: "Results",
        title: "What businesses actually get from a better website.",
        description:
          "A stronger website should help your business look more credible, explain its value faster, and make the next step easier for customers."
      },
      details: [
        {
          title: "A clearer first impression",
          description: "Customers understand what you do faster and feel more confident that your business is legitimate and professional."
        },
        {
          title: "Better lead flow",
          description: "Calls-to-action, forms, and page structure work together to make inquiries easier to generate and easier to follow up."
        },
        {
          title: "A site that matches your quality",
          description: "Your online presence reflects the level of service you actually provide instead of underselling your business."
        },
        {
          title: "Less friction for new customers",
          description: "Visitors can understand your offer quickly, trust what they see, and know exactly how to reach out."
        }
      ],
      cta: {
        eyebrow: "Ready for a stronger site?",
        title: "A better website should make your business easier to trust and easier to choose.",
        description:
          "If your current site feels weak, unclear, or dated, we can build something that supports real customer decisions more effectively.",
        points: ["Practical improvements", "Clear messaging", "Built to convert"],
        primary: "Get My Website",
        primaryHref: "/contact",
        secondary: "View Services",
        secondaryHref: "/services",
        helper: "We’ll respond quickly and map out the right site for you."
      }
    },
    process: {
      hero: {
        eyebrow: "Process",
        title: "A straightforward process built to keep things moving.",
        description:
          "You should know what happens next, how decisions get made, and how quickly your website can move from idea to launch without unnecessary back-and-forth."
      },
      details: [
        {
          title: "Clear starting point",
          description: "We begin with your business, your goals, and what your website needs to do for the people visiting it."
        },
        {
          title: "Focused build process",
          description: "The site is designed around clear messaging, modern presentation, and a direct path to inquiry."
        },
        {
          title: "Simple launch",
          description: "Once everything is approved, your site goes live and starts working as a stronger first impression for the business."
        }
      ]
    },
    pricing: {
      hero: {
        eyebrow: "Pricing",
        title: "Clear pricing without the agency-style guesswork.",
        description:
          "One clear website build fee, then simple monthly plans if you want Velixon to keep everything running and improving."
      },
      cta: {
        eyebrow: "Clear next step",
        title: "Tell us what you need and we’ll recommend the right scope.",
        description:
          "If you want a clearer idea of budget and fit, send a quick overview and we’ll point you toward the right type of site.",
        points: ["Flexible scope", "Clear recommendation", "No hidden fees"],
        primary: "Start My Website",
        primaryHref: "/contact",
        secondary: "View Services",
        secondaryHref: "/services",
        helper: "We’ll respond quickly and map out the right site for you."
      }
    },
    about: {
      hero: {
        eyebrow: "About",
        title: "A focused web design partner for small businesses that need a stronger online presence.",
        description:
          "Velixon exists to help small businesses look more professional online with clean design, practical pricing, and websites built to generate real leads."
      },
      story: [
        {
          title: "Built for small businesses",
          description: "Velixon is designed around what small businesses actually need: a better first impression, a clear next step, and a site that feels modern."
        },
        {
          title: "Premium look, practical process",
          description: "The goal is a website that feels polished and high-end without dragging clients through agency-style complexity."
        }
      ],
      difference: [
        {
          title: "Affordable without looking cheap",
          description: "Pricing stays clear and accessible while the design still feels premium and trustworthy."
        },
        {
          title: "Fast, focused communication",
          description: "Projects stay moving with direct communication, clean recommendations, and a process that feels easy to follow."
        },
        {
          title: "Built to help generate leads",
          description: "Everything from messaging to layout is shaped around helping more visitors become real customers."
        }
      ]
    },
    contact: {
      hero: {
        eyebrow: "Contact",
        title: "Tell us about your project",
        description:
          "Share what your business does, what kind of site you need, and where your current website or marketing feels weak right now."
      },
      helper:
        "Send a short overview and we’ll respond quickly with the clearest next step for your site.",
      whatToSend: [
        {
          title: "What your business does",
          description: "A few lines about your business, service area, and the type of customers you want to reach."
        },
        {
          title: "What kind of site you need",
          description: "Let us know if you need a new website, a redesign, or a focused landing page."
        },
        {
          title: "What matters most",
          description: "Tell us if your priority is speed, stronger trust, more leads, or a better overall first impression."
        }
      ],
      nextSteps: [
        {
          title: "Quick reply",
          description: "We’ll review your message and reply with the clearest next step for your business."
        },
        {
          title: "Clear direction",
          description: "If the fit is right, we’ll outline the scope, timing, and the most sensible way to move forward."
        }
      ]
    }
  }
};

export const seo = {
  title: "Velixon | High-Performance Websites",
  description:
    "Velixon builds clean, modern websites for local businesses that need stronger trust, clearer messaging, and more leads."
};
