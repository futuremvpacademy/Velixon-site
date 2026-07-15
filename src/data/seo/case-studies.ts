import type { CaseStudyData } from "./types";

export const caseStudies: CaseStudyData[] = [
  {
    slug: "formesque-proposal-to-payment-platform",
    metaTitle: "FormEsque Proposal-to-Payment Platform Case Study | Velixon",
    metaDescription: "See how Velixon designed FormEsque as a connected proposal, signature, customer, invoicing, and payment workflow for service businesses.",
    headline: "FormEsque connects the commercial workflow from proposal to payment.",
    summary: "FormEsque is a Velixon-owned software product designed to replace disconnected proposal, signature, customer, invoice, and payment handoffs with one traceable operating flow.",
    subject: "FormEsque",
    engagementType: "Velixon product case study",
    evidenceLabel: "First-party product evidence",
    evidenceNote: "FormEsque is a product designed and developed by Velixon. This case study describes the product architecture and intended operational value. It does not present invented client metrics or imply results that have not been independently measured.",
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
    slug: "sharecal-collaborative-scheduling-platform",
    metaTitle: "ShareCal Collaborative Scheduling Product Case Study | Velixon",
    metaDescription: "See how Velixon designed ShareCal as a collaborative scheduling product for shared plans, availability, events, and clearer coordination.",
    headline: "ShareCal makes shared time visible, current, and easier to coordinate.",
    summary: "ShareCal is a Velixon-owned product direction centered on a simple operational problem: individual calendars are good at recording personal events, but shared plans still fragment across texts, screenshots, and repeated questions.",
    subject: "ShareCal",
    engagementType: "Velixon product case study",
    evidenceLabel: "First-party product evidence",
    evidenceNote: "ShareCal is a product designed by Velixon. This page documents the product problem, experience direction, and engineering approach without presenting unverified adoption or ROI statistics.",
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
