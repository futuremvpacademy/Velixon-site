import type { CaseStudyData } from "./types";

export const caseStudies: CaseStudyData[] = [
  {
    caseStudyType: "client",
    slug: "frontier-fence-digital-systems",
    metaTitle: "Frontier Fence Digital Systems Case Study | Velixon",
    metaDescription: "See how Velixon improved Frontier Fence's customer-facing website, estimate intake, project guidance, and business document and workflow infrastructure.",
    headline: "Frontier Fence strengthened the path from project research to estimate request.",
    summary: "Frontier Fence was Velixon's first external client. Velixon improved the company's website and digital systems alongside the business document and workflow infrastructure that supports its customer-facing processes.",
    subject: "Frontier Fence",
    engagementType: "External client case study",
    evidenceLabel: "Authorized client work",
    evidenceNote: "Frontier Fence was Velixon's first external client. This case study is limited to authorized engagement facts and features visible on the live Frontier Fence website. It does not claim that Velixon performed the fence installation shown or publish unverified performance metrics.",
    subjectUrl: "https://www.frontierfenceutah.com/",
    datePublished: "2026-08-08",
    dateModified: "2026-08-08",
    media: {
      type: "image",
      src: "/images/case-studies/frontier-fence-cedar-privacy.webp",
      alt: "Cedar privacy fence beside a residential driveway, published in Frontier Fence's live project gallery as a Sandy, Utah installation.",
      eyebrow: "Live client-site evidence",
      title: "A real project image inside the customer-facing gallery.",
      caption: "This image is published by Frontier Fence on its live website and documents the gallery experience available to customers. It shows Frontier Fence's cedar fence work; it does not depict work performed by Velixon or a measured business result.",
      width: 1400,
      height: 1050,
      demoHref: "https://www.frontierfenceutah.com/",
      demoLabel: "Visit the live Frontier Fence website"
    },
    problem: [
      "Frontier Fence needed improvements to its digital systems and customer-facing processes.",
      "The engagement covered the website and digital paths customers use to research fence options, see relevant work, understand project requirements, and request an estimate.",
      "It also covered the business document and workflow infrastructure supporting those customer-facing processes.",
      "No verified baseline or performance metric is available, so this case study focuses on authorized scope and capabilities visible on the live site."
    ],
    solution: [
      { title: "Structured service discovery", description: "Dedicated fence-type and service-area paths help customers move from a broad need to information relevant to the material, property, and location they are researching." },
      { title: "Project gallery", description: "Real Frontier Fence project photography gives customers a visual way to compare materials, applications, and finished work before requesting an estimate." },
      { title: "Project-aware estimate intake", description: "The estimate form collects project address, fence type, estimated footage, a short message, and optional photos so customers can share useful context in one request." },
      { title: "Consent and policy context", description: "The estimate path presents contact consent alongside links to website terms and the privacy notice, while separate policy and accessibility pages remain available from the site." },
      { title: "Planning and cost guidance", description: "Payment, material, cost, gate-planning, and replacement guides give customers reusable information before they commit to an estimate request." },
      { title: "Ask Anna virtual fence guide", description: "The live site includes Ask Anna as a clearly labeled virtual fence guide for customers who need help navigating project questions." }
    ],
    technology: [
      "Fence-type and service-area navigation",
      "Client project gallery",
      "Estimate request with optional photo upload",
      "Contact consent and privacy links",
      "Payment, material, and cost guides",
      "Project policy, terms, and accessibility pages",
      "Ask Anna virtual fence guide"
    ],
    impact: [
      { title: "Clearer service discovery", description: "Customers can move through fence types, locations, examples, and project guidance without relying on one undifferentiated service page." },
      { title: "Richer estimate context", description: "The request flow can collect the property and project details Frontier asks for, with photos available when they help explain the site." },
      { title: "Reusable customer guidance", description: "Cost, material, payment, policy, and planning information stays available for customers to review on their own schedule." },
      { title: "Visible support path", description: "Ask Anna adds a labeled virtual-guide entry point alongside direct call and estimate options." }
    ],
    roiFramework: "No client performance metric is published for this engagement. The evidence boundary is the authorized engagement history, the current live-site features, and the client-owned project image shown above.",
    related: [
      { title: "Business Infrastructure", description: "Strengthen the documents, systems, and operating paths behind customer-facing work.", href: "/services/business-infrastructure/", label: "Service" },
      { title: "Workflow Automation", description: "Connect repeatable work across people, forms, records, and dependable next actions.", href: "/services/workflow-automation/", label: "Service" },
      { title: "Custom Software Development", description: "Build maintainable digital systems around a defined business workflow.", href: "/services/custom-software/", label: "Service" }
    ]
  },
  {
    caseStudyType: "product",
    slug: "formesque-proposal-to-payment-platform",
    metaTitle: "FormEsque Proposal-to-Payment Platform Case Study | Velixon",
    metaDescription: "See how Velixon designed FormEsque as a connected proposal, signature, customer, invoicing, and payment workflow for service businesses.",
    headline: "FormEsque connects the commercial workflow from proposal to payment.",
    summary: "FormEsque is a Velixon-owned software product designed to replace disconnected proposal, signature, customer, invoice, and payment handoffs with one traceable operating flow.",
    subject: "FormEsque",
    engagementType: "Velixon product case study",
    evidenceLabel: "First-party product evidence",
    evidenceNote: "FormEsque is a product designed and developed by Velixon. This case study describes the product architecture and intended operational value. It does not present invented client metrics or imply results that have not been independently measured.",
    subjectUrl: "https://formesque.com/",
    media: {
      type: "video",
      src: "/videos/case-studies/formesque-product-demo.mp4",
      poster: "/images/case-studies/formesque-workflow.png",
      alt: "A silent FormEsque product demonstration showing a connected proposal, signature, invoice, and payment-record workflow.",
      eyebrow: "Product demonstration",
      title: "See the connected workflow in motion.",
      caption: "This 15-second product demonstration uses illustrative data and real FormEsque interface captures. It does not show a client account, a measured client result, or active payment collection.",
      demoHref: "https://formesque.com/demo",
      demoLabel: "Open the illustrative demo"
    },
    problem: [
      "A proposal can be created in one tool, signed in another, invoiced somewhere else, and reconciled manually after payment.",
      "Customer details, status, documents, and financial records can drift when every handoff creates another copy of the same job.",
      "Teams need to know what was viewed, approved, signed, invoiced, paid, voided, or archived without reconstructing the history from email.",
      "The system must preserve signed documents and audit history even when ordinary records are removed from active work queues."
    ],
    solution: [
      { title: "Structured proposal creation", description: "A consistent proposal workflow connects customer information, scope, pricing, and approval status instead of treating the document as an isolated file." },
      { title: "Digital signing and history", description: "Signature events become part of the job record so the business can retain signed-document context and a clear state history." },
      { title: "Invoice lifecycle", description: "A signed commercial record can feed the next financial step while preserving boundaries between approval, invoicing, payment, voiding, and archive states." },
      { title: "Customer and job context", description: "The interface keeps the customer, proposal, documents, and transaction flow connected so staff do not need to reconstruct the relationship manually." },
      { title: "Recovery-aware lifecycle", description: "Recently deleted and archive-oriented behaviors reduce the risk of destroying business history during routine cleanup." },
      { title: "Operational visibility", description: "Status-driven views help the team see where work is waiting, which action occurred, and what the appropriate next step should be." }
    ],
    technology: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Authentication", "Digital signatures", "Payment workflows", "Audit-oriented state modeling"],
    timeline: [
      { label: "01", title: "Model the commercial lifecycle", description: "Define the entities, state transitions, ownership, and history required from the first proposal through signature, invoice, payment, archive, and recovery." },
      { label: "02", title: "Design the operating interface", description: "Shape the experience around the decisions staff make every day: create, send, review, sign, invoice, collect, find, and recover." },
      { label: "03", title: "Connect the pipeline", description: "Implement data and workflow boundaries so each completed event can reliably enable the next one without erasing prior evidence." },
      { label: "04", title: "Verify lifecycle behavior", description: "Test the happy path alongside void, deletion, restore, archive, and synchronization paths where operational software commonly fails." },
      { label: "05", title: "Improve from real use", description: "Continue refining usability, workflow rules, and system reliability as the product encounters more operating scenarios." }
    ],
    impact: [
      { title: "Fewer disconnected handoffs", description: "The workflow is designed so proposal, signature, invoice, and payment context travel together instead of being rebuilt by staff." },
      { title: "Clearer operational state", description: "Status and history help users determine what happened and what should happen next without relying on memory." },
      { title: "Safer record handling", description: "Recovery and archive behavior protect important commercial history from ordinary cleanup actions." },
      { title: "A stronger system of record", description: "Customer-facing documents and internal operations share the same structured business context." }
    ],
    roiFramework: "Measure time spent preparing and chasing proposals, duplicate data entry, signature-to-invoice delay, missed follow-up, reconciliation effort, and the cost of recovering lost context. Compare those baselines with the connected workflow after adoption.",
    related: [
      { title: "Document & Finance Automation", description: "Connect proposals, approvals, documents, invoices, and payment status.", href: "/solutions/document-finance-automation/", label: "Solution" },
      { title: "Custom SaaS Development", description: "Engineer a product with durable workflows and ownership.", href: "/services/custom-saas/", label: "Service" },
      { title: "Stripe Integration", description: "Connect payment events to the operating system.", href: "/integrations/stripe/", label: "Integration" }
    ]
  },
  {
    caseStudyType: "product",
    slug: "sharecal-collaborative-scheduling-platform",
    metaTitle: "ShareCal Collaborative Scheduling Product Case Study | Velixon",
    metaDescription: "See how Velixon designed ShareCal as a collaborative scheduling product for shared plans, availability, events, and clearer coordination.",
    headline: "ShareCal makes shared time visible, current, and easier to coordinate.",
    summary: "ShareCal is a Velixon-owned product direction centered on a simple operational problem: individual calendars are good at recording personal events, but shared plans still fragment across texts, screenshots, and repeated questions.",
    subject: "ShareCal",
    engagementType: "Velixon product case study",
    evidenceLabel: "First-party product evidence",
    evidenceNote: "ShareCal is a product designed by Velixon. This page documents the product problem, experience direction, and engineering approach without presenting unverified adoption or ROI statistics.",
    subjectUrl: "https://sharecal.app/",
    media: {
      type: "image",
      src: "/images/case-studies/sharecal-interface-prototype.png",
      alt: "ShareCal interface prototype showing an all-calendars view with illustrative scheduled items.",
      eyebrow: "Interface prototype",
      title: "See the shared-calendar experience direction.",
      caption: "This is a real ShareCal interface prototype shown with illustrative, seeded data. Names, events, availability, and feature states are not customer records or evidence that every displayed integration is production-ready.",
      width: 1067,
      height: 873,
      demoHref: "https://sharecal.app/",
      demoLabel: "Visit the ShareCal preview"
    },
    problem: [
      "Personal calendars do not automatically create a clear shared view for families, teams, or groups with overlapping plans.",
      "Important changes get repeated across messages, screenshots, and separate calendar invitations, creating outdated copies.",
      "People need to understand both the event and who is involved without exposing unrelated private calendar information.",
      "Scheduling experiences become harder—not easier—when the interface prioritizes features over the quick question: when are we available?"
    ],
    solution: [
      { title: "Shared schedule views", description: "A collaborative calendar presents relevant plans in one place so participants can understand the current shared picture." },
      { title: "Clear event participation", description: "Event context and participant relationships are designed to remain understandable as schedules change." },
      { title: "Availability-centered decisions", description: "The product direction prioritizes coordination and overlap rather than simply duplicating a traditional personal calendar." },
      { title: "Privacy-aware sharing", description: "The experience can distinguish the information a group needs from unrelated personal schedule details." },
      { title: "Current shared state", description: "A connected record reduces the outdated screenshots and message fragments created by manual coordination." },
      { title: "Responsive interaction", description: "The interface is designed for the mobile moments where people most often check, share, and adjust plans." }
    ],
    technology: ["React", "TypeScript", "Responsive web application", "Calendar data modeling", "Realtime-ready architecture", "Authentication", "Permission design", "Notification workflows"],
    timeline: [
      { label: "01", title: "Define the coordination problem", description: "Separate shared scheduling needs from the feature assumptions inherited from personal calendar products." },
      { label: "02", title: "Model people, groups, and events", description: "Design data relationships that can express participation, visibility, changes, and availability without collapsing privacy boundaries." },
      { label: "03", title: "Prototype the shared view", description: "Test whether a person can answer who, what, and when quickly on desktop and mobile." },
      { label: "04", title: "Design change behavior", description: "Specify how updates, cancellations, notifications, and stale information behave when several people depend on the same plan." },
      { label: "05", title: "Refine the product loop", description: "Use feedback and product learning to reduce coordination effort while keeping the interaction focused." }
    ],
    impact: [
      { title: "Less schedule reconstruction", description: "The product is designed to reduce the need to piece together the current plan from multiple conversations." },
      { title: "Faster availability checks", description: "A shared view makes the coordination question visible instead of requiring another round of messages." },
      { title: "Fewer outdated copies", description: "Connected event state can replace screenshots and manually repeated changes." },
      { title: "Clearer participation", description: "People can understand which plans are shared and who needs the information." }
    ],
    roiFramework: "For a team or organization, baseline the number of scheduling messages, reschedules, missed changes, coordination time, and meeting delays. For personal groups, use time saved and avoided confusion as experience measures rather than inventing a financial return.",
    related: [
      { title: "Appointment & Call Automation", description: "Connect availability, qualification, booking, reminders, and follow-up.", href: "/solutions/appointment-call-automation/", label: "Solution" },
      { title: "Custom SaaS Development", description: "Turn a focused operating problem into a maintainable product.", href: "/services/custom-saas/", label: "Service" },
      { title: "Google Workspace Integration", description: "Connect calendar and workspace events with business workflows.", href: "/integrations/google-workspace/", label: "Integration" }
    ]
  }
];
