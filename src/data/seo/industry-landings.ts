import type { DirectoryGroup, SeoLandingData } from "./types";
import { additionalIndustryLandingPages } from "./industry-landings-additional";

export const industryLandingPages: SeoLandingData[] = [
  {
    collection: "industries",
    slug: "construction",
    name: "Construction Automation",
    eyebrow: "Construction systems",
    metaTitle: "Construction Automation & Custom Software | Velixon",
    metaDescription: "Velixon builds construction automation, field-to-office workflows, dashboards, CRM systems, and integrations for growing contractors.",
    headline: "Connect the jobsite, office, customer, and cash flow.",
    summary: "Velixon builds construction software and automation around the full project lifecycle—from inquiry and estimating through mobilization, field documentation, change approval, closeout, and invoice readiness.",
    primaryKeyword: "construction automation company",
    secondaryKeywords: ["construction workflow automation", "contractor software development", "construction CRM development", "construction business automation"],
    definition: "Construction automation connects project events, records, people, and software so approved work moves forward without repeated entry or constant status chasing. It can coordinate estimating, job setup, field reporting, change management, customer communication, closeout, and billing while preserving the human decisions that control scope, safety, quality, and cost.",
    definitionLabel: "For contractors",
    challengesTitle: "Construction work changes quickly; disconnected records do not.",
    challengesIntro: "The operational risk often sits between estimating, project management, the field, accounting, and the customer. A reliable system keeps those handoffs visible without forcing crews to become data-entry specialists.",
    challenges: [
      { title: "Estimate details vanish after award", description: "Scope, exclusions, production assumptions, customer selections, and site details are recreated when a sold project becomes an active job, introducing delay before work begins." },
      { title: "Field evidence arrives too late", description: "Photos, daily notes, material issues, completion evidence, and customer decisions live across texts, camera rolls, email, and paper until the office needs them urgently." },
      { title: "Changes move faster than approvals", description: "Verbal requests and incomplete change records can separate work performed from scope, authorization, schedule impact, and the amount that should be billed." },
      { title: "Billing readiness is hard to see", description: "Accounting cannot confidently invoice when completion criteria, approvals, cost details, or supporting documents remain scattered across teams and tools." }
    ],
    capabilitiesTitle: "Build one traceable project flow from lead to closeout.",
    capabilitiesIntro: "The system can extend the construction software you already use or provide a focused operational layer where generic platforms leave high-value gaps.",
    capabilities: [
      { title: "Construction CRM and estimating handoff", description: "Capture job type, service area, site context, decision-makers, estimate status, and scope data once, then carry approved information into project setup." },
      { title: "Award-to-mobilization workflow", description: "Create the job record, confirm contract and deposit milestones, collect selections and access details, assign owners, and surface prerequisites before scheduling." },
      { title: "Mobile field documentation", description: "Give crews a focused way to submit daily notes, tagged photos, quantities, blockers, safety acknowledgments, and completion evidence against the correct job." },
      { title: "Change request and approval system", description: "Document the request, pricing basis, schedule effect, customer authorization, downstream tasks, and billing status as one controlled record." },
      { title: "Project and production dashboards", description: "Show schedule readiness, open decisions, aging approvals, field exceptions, closeout status, and invoice blockers with links to source records." },
      { title: "Accounting and customer integrations", description: "Synchronize approved customers, projects, invoice-ready milestones, payments, notifications, and documents with explicit source-of-truth rules." }
    ],
    outcomesTitle: "Give every role the next useful piece of project context.",
    outcomesIntro: "Construction automation should shorten the time between events while making scope, ownership, and exceptions easier to inspect.",
    outcomes: [
      { title: "Faster project activation", description: "Reduce the administrative gap between signed work and a job that is actually ready for scheduling, procurement, and field execution." },
      { title: "Defensible change history", description: "Keep requests, approvals, supporting evidence, amounts, and schedule implications connected instead of reconstructing them after the work." },
      { title: "Cleaner field-to-office handoffs", description: "Route structured field updates to the people responsible for purchasing, scheduling, customer communication, or billing." },
      { title: "Earlier invoice readiness", description: "Make missing closeout evidence and approvals visible before they delay a progress bill or final invoice." }
    ],
    examplesTitle: "Construction workflows designed around real project events.",
    examplesIntro: "Each workflow begins with a dependable event and ends with an owner, traceable record, or measurable next action.",
    examples: [
      { title: "Qualified inquiry to site visit", description: "Check service area and job fit, capture project context, create the opportunity, assign an estimator, offer eligible time windows, and keep unbooked leads visible." },
      { title: "Signed proposal to job launch", description: "Verify approval and deposit state, generate the project record, transfer scope details, request missing selections, and create mobilization tasks by job type." },
      { title: "Daily field report to exception queue", description: "Collect job-tagged notes and photos, identify blockers or missing materials, alert the responsible owner, and retain the resolution alongside the report." },
      { title: "Field change to customer authorization", description: "Turn a documented condition into priced scope, route internal review, collect customer approval, update project commitments, and mark the change for billing." },
      { title: "Completion evidence to invoice readiness", description: "Confirm checklist items, required photos, signoff, punch items, and approved changes before handing a complete billing package to accounting." },
      { title: "Warranty request to service history", description: "Match the customer and project, capture evidence, verify coverage criteria for human review, schedule the right response, and preserve the outcome on the asset or job." }
    ],
    idealForTitle: "Construction automation is a strong fit when…",
    idealFor: [
      "The same customer, scope, or job information is entered into estimating, project, field, and accounting tools more than once.",
      "Project managers spend a meaningful part of the day asking for updates or reorganizing field evidence.",
      "Change approvals, selections, closeout records, or invoice prerequisites regularly age without a clear owner.",
      "Your company has outgrown a spreadsheet workflow but does not need to replace every established construction platform.",
      "Leadership needs operational visibility across projects without relying on a manually assembled weekly report."
    ],
    processIntro: "We observe the project lifecycle across office and field roles, then automate the handoffs with the highest measurable delay or rework.",
    process: [
      { label: "01", title: "Project lifecycle audit", description: "Map lead, estimate, contract, mobilization, production, change, closeout, and billing states using real projects and exception cases." },
      { label: "02", title: "Record and responsibility design", description: "Define project identifiers, source systems, required evidence, approvals, role access, offline constraints, and the owner of each exception." },
      { label: "03", title: "Field and office prototype", description: "Test the highest-frequency screens and actions with estimators, project managers, field users, and accounting before building the full workflow." },
      { label: "04", title: "Integration and scenario testing", description: "Connect approved platforms and test duplicates, weak connectivity, rejected changes, missing documents, sync failures, and reopened work." },
      { label: "05", title: "Phased project rollout", description: "Launch by team, branch, or job type; monitor adoption and exception queues; and expand after the workflow is stable." }
    ],
    technology: ["Procore APIs", "Buildertrend", "QuickBooks", "HubSpot", "Google Workspace", "Microsoft 365", "Twilio", "Supabase", "PostgreSQL", "Mobile web apps"],
    technologyNote: "Platform connections depend on the customer's subscription, API access, and vendor terms. Automation can support safety documentation and recordkeeping, but it does not replace a contractor's safety program, OSHA obligations, licensed supervision, contract review, or jobsite judgment.",
    roi: {
      title: "Measure construction ROI at the handoffs.",
      description: "Use actual project volume and administrative effort, then value only the portion a designed workflow can reasonably reduce. Keep revenue acceleration separate from guaranteed savings.",
      formula: "Annual opportunity = recoverable admin time + reduced rework + value of shorter approval and billing delay − annual system cost",
      factors: ["Projects, estimates, changes, and closeouts processed per month", "Median office and field minutes spent re-entering or locating information", "Frequency and cost of avoidable scope, documentation, or scheduling rework", "Average days lost waiting for selections, approvals, closeout evidence, or invoice preparation", "Software, integration, training, support, and process-owner cost"],
      disclaimer: "This is a planning model, not a promise of margin, revenue, schedule, or safety improvement. Validate assumptions against representative projects and financial records."
    },
    faqs: [
      { question: "Can Velixon integrate with Procore, Buildertrend, or our accounting software?", answer: "Potentially. Discovery verifies the product edition, API or webhook access, authentication, rate limits, fields, and permitted use before an integration is promised. The existing platform can remain the source of truth while a focused workflow solves the gaps around it." },
      { question: "Do we need to replace our construction management platform?", answer: "Usually not. A custom intake app, field interface, change workflow, dashboard, or integration may create more value with less disruption. Replacement is considered only when the core platform cannot support a durable operational requirement." },
      { question: "Will field crews have to complete long forms?", answer: "They should not. Field interfaces should be role-specific, mobile-friendly, and limited to information needed at that project event. Prototypes are tested with actual users and realistic connectivity before rollout." },
      { question: "Can automation manage construction safety compliance?", answer: "It can help distribute current forms, capture acknowledgments, route incidents, retain evidence, and flag missing records. It cannot determine that a site is safe, replace training or competent-person duties, or guarantee compliance with OSHA, state, contract, or insurer requirements." },
      { question: "How do you prevent duplicate jobs or conflicting records?", answer: "The design defines stable identifiers, match rules, idempotent actions, source ownership for each field, sync direction, and a visible exception queue. Conflicts that cannot be resolved safely are assigned for human review." },
      { question: "What is the best first construction workflow to automate?", answer: "Choose a frequent handoff with clear inputs and a visible downstream result, such as sold-job activation, change authorization, daily field exceptions, or closeout readiness. Baseline its current delay and rework before selecting technology." }
    ],
    related: [
      { href: "/services/business-process-automation/", label: "Service", title: "Business Process Automation", description: "Design dependable multi-role processes with visible states and exception ownership." },
      { href: "/services/custom-crm/", label: "Service", title: "Custom CRM Development", description: "Connect contractor leads, estimates, customers, jobs, and service history." },
      { href: "/services/workflow-automation/", label: "Service", title: "Workflow Automation", description: "Move approved work across office and field systems without duplicate entry." },
      { href: "/industries/home-services/", label: "Industry", title: "Home Services Automation", description: "Explore dispatch, estimate, technician, and customer-service workflows." },
      { href: "/guides/how-contractors-can-use-ai/", label: "Guide", title: "How Contractors Can Use AI", description: "See where AI can responsibly support intake, estimates, projects, field coordination, and follow-up." },
      { href: "/integrations/quickbooks/", label: "Integration", title: "QuickBooks Integration", description: "Connect job and completion records to governed invoice and accounting handoffs." }
    ],
    reviewedDate: "July 2026"
  },
  {
    collection: "industries",
    slug: "home-services",
    name: "Home Services Automation",
    eyebrow: "Home service systems",
    metaTitle: "Home Services Automation & AI Systems | Velixon",
    metaDescription: "Velixon builds home service automation for intake, dispatch, estimating, technician workflows, memberships, follow-up, and reporting.",
    headline: "Turn every call, visit, estimate, and follow-up into one service flow.",
    summary: "Build a connected operating system for HVAC, plumbing, electrical, roofing, landscaping, moving, fencing, and other field-service businesses where response speed and field execution shape the customer experience.",
    primaryKeyword: "home services automation",
    secondaryKeywords: ["field service automation", "contractor CRM automation", "home service AI receptionist", "service business software"],
    definition: "Home services automation coordinates customer intake, qualification, booking, dispatch, field updates, estimates, approvals, payment, maintenance, and follow-up across the systems a service company already uses. The goal is reliable response and cleaner handoffs—not removing technicians or dispatchers from decisions that require local knowledge.",
    definitionLabel: "For field service teams",
    challengesTitle: "The customer journey begins before a technician ever arrives.",
    challengesIntro: "Revenue and trust can be lost when an inquiry goes unanswered, the wrong job is booked, dispatch lacks context, or the office cannot see what happened in the field.",
    challenges: [
      { title: "Calls arrive when the office cannot answer", description: "After-hours, peak-season, and simultaneous calls become voicemail or incomplete notes even when the customer has an urgent, high-fit request." },
      { title: "Booking ignores real job constraints", description: "A calendar slot looks available but the required trade, skill, territory, duration, equipment, or travel window makes the appointment impractical." },
      { title: "Technicians and office staff see different context", description: "Property details, prior work, customer concerns, photos, estimates, and promised follow-up are split across the field platform, inbox, text messages, and memory." },
      { title: "Unsold work and memberships go quiet", description: "Open estimates, deferred options, expiring plans, seasonal service, and warranty follow-up depend on manual lists that become stale during busy periods." }
    ],
    capabilitiesTitle: "Connect response, dispatch, field work, and customer follow-through.",
    capabilitiesIntro: "Velixon can add focused automation around an established field-service platform or build a custom operational layer for a specialized service model.",
    capabilities: [
      { title: "AI phone and web intake", description: "Capture the caller's request, property, urgency, service area, availability, and safety escalation needs, then transfer or create a reviewable booking request." },
      { title: "Constraint-aware scheduling", description: "Use service type, skill, territory, duration, route, existing commitments, and business rules to offer appropriate windows rather than any empty slot." },
      { title: "Technician job workspace", description: "Present customer context, prior visits, equipment or asset history, checklists, photos, options, approvals, and required completion records in one mobile flow." },
      { title: "Estimate decision workflows", description: "Send approved options, track delivery and customer action, schedule useful reminders, record declines, and return questions to the responsible employee." },
      { title: "Membership and recurring service automation", description: "Track plan status, equipment, included visits, renewal windows, scheduling readiness, and account exceptions without relying on a seasonal spreadsheet." },
      { title: "Service performance dashboards", description: "Measure response, booking, dispatch exceptions, estimate aging, callback reasons, membership readiness, and invoice status from defined source records." }
    ],
    outcomesTitle: "Respond faster without making the operation brittle.",
    outcomesIntro: "The system should increase service capacity while preserving dispatcher control, technician judgment, and a clear path for unusual or urgent situations.",
    outcomes: [
      { title: "More complete first contact", description: "Give the team structured context before it calls back or dispatches, even when the original inquiry arrives outside office hours." },
      { title: "Fewer avoidable booking corrections", description: "Apply explicit coverage, skill, job-type, and time-window rules before a customer is promised an appointment." },
      { title: "Consistent estimate follow-up", description: "Keep unsold opportunities visible and contact customers according to approved timing and channel preferences." },
      { title: "Stronger customer history", description: "Preserve service, property, asset, estimate, communication, and warranty context for the next employee or visit." }
    ],
    examplesTitle: "Home service workflows that protect response time and field capacity.",
    examplesIntro: "These patterns are tailored around service territory, urgency, technician capability, customer permission, and the platform that owns the job record.",
    examples: [
      { title: "Missed call to qualified callback", description: "Respond immediately by approved channel, capture the service need and property context, identify urgent safety language, and place the inquiry in the correct callback queue." },
      { title: "AI receptionist to dispatcher review", description: "Answer common questions, gather structured intake, offer only policy-approved windows, and transfer emergencies, sensitive complaints, or uncertain jobs to a person." },
      { title: "Booked job to technician readiness", description: "Validate address and job type, attach prior history, request photos when useful, assign required skill tags, and surface missing information before dispatch." },
      { title: "Completed visit to estimate follow-up", description: "Confirm the estimate was delivered, schedule consent-aware reminders, capture customer questions, and notify the salesperson or technician when human follow-up is needed." },
      { title: "Membership due to route-ready work", description: "Identify eligible accounts, confirm equipment and service requirements, group opportunities by territory, and move accepted windows into the scheduling system." },
      { title: "Callback to quality review", description: "Match the prior job, classify the reason without assigning blame, alert the correct manager, track resolution, and add the result to service history." }
    ],
    idealForTitle: "Home services automation is a strong fit when…",
    idealFor: [
      "Peak call volume, after-hours demand, or missed calls create a measurable response gap.",
      "Dispatchers correct appointments because booking lacks territory, skill, duration, or equipment context.",
      "Technicians and office staff repeatedly request information that should already be attached to the job.",
      "Open estimates, memberships, maintenance visits, or warranty follow-up are managed with manual lists.",
      "The company has multiple crews, branches, or service lines that need shared standards with local control."
    ],
    processIntro: "We map the customer and job lifecycle with dispatchers, technicians, and office owners before automating the moments that affect a promise to the customer.",
    process: [
      { label: "01", title: "Call and job analysis", description: "Review representative calls, booking reasons, job types, territories, schedules, callbacks, and lost handoffs without collecting more personal data than the analysis requires." },
      { label: "02", title: "Policy and escalation map", description: "Define what the system may answer or book, urgent conditions, transfer rules, channel consent, schedule constraints, and the person who owns each exception." },
      { label: "03", title: "Service-flow prototype", description: "Test intake, dispatch, technician, and follow-up interfaces using real scenarios from routine maintenance through urgent and out-of-area requests." },
      { label: "04", title: "Platform integration", description: "Connect approved field-service, phone, messaging, payment, and accounting systems with duplicate prevention and visible failure handling." },
      { label: "05", title: "Seasonal rollout and tuning", description: "Launch within a defined service line or territory, compare response and correction rates, and tune scripts and rules before peak-volume expansion." }
    ],
    technology: ["ServiceTitan APIs", "Housecall Pro", "Jobber", "QuickBooks", "Twilio", "Google Calendar", "Microsoft 365", "Stripe", "Supabase", "Mobile web apps"],
    technologyNote: "Vendor API availability varies by plan and partnership access. Phone, SMS, and email workflows must follow applicable consent, identification, opt-out, recording, emergency, and quiet-hour requirements. The customer remains responsible for trade licensing, dispatch policy, pricing, safety, and customer commitments.",
    roi: {
      title: "Model value from calls, jobs, and coordination—not hype.",
      description: "Baseline the actual response gap, booking correction load, administrative time, and follow-up completion rate. Do not value every missed call as a won job.",
      formula: "Annual opportunity = recoverable response value + dispatch and admin capacity + preventable rework − system and operating cost",
      factors: ["Qualified inquiries by hour and current answered or callback rate", "Booking corrections, unproductive trips, and dispatch minutes per job", "Office and technician time spent locating or re-entering context", "Eligible estimates or maintenance accounts that receive no timely follow-up", "Phone, messaging, platform, model, support, and training cost"],
      disclaimer: "Results vary by demand, service mix, capacity, territory, pricing, customer choice, and adoption. Treat conversion assumptions as scenarios, not guarantees."
    },
    faqs: [
      { question: "Can an AI receptionist book home service appointments?", answer: "Yes, within a carefully defined policy. It should verify service area and job type, use real scheduling constraints, identify transfer conditions, make clear that it is an automated system when required, and route uncertainty or urgent safety concerns to a person." },
      { question: "Will automation replace our dispatchers?", answer: "The useful goal is to reduce repetitive intake, copying, and routine follow-up so dispatchers can manage capacity, exceptions, customer needs, and field realities. Dispatch authority and escalation rules remain explicit." },
      { question: "Can Velixon work with ServiceTitan, Jobber, or Housecall Pro?", answer: "Potentially. Access differs by product, subscription, API program, and use case. Discovery confirms the supported connection and source-of-truth rules before scope is committed." },
      { question: "How should emergency calls be handled?", answer: "The business must define service-specific emergency language and escalation. Automation should avoid diagnosis, present approved emergency guidance only, and transfer or direct the caller according to documented policy rather than improvising." },
      { question: "Can the system text every unbooked lead or open estimate?", answer: "Messaging should be based on documented consent, purpose, identity, channel preference, opt-out, and timing rules. Velixon can implement those controls, but the business should have counsel review its obligations for the jurisdictions and campaigns involved." },
      { question: "What should a home service company automate first?", answer: "Start where volume and delay are measurable: missed-call intake, booking validation, sold-estimate activation, job-readiness checks, or consent-aware estimate follow-up. Choose one service line and compare before-and-after exception rates." }
    ],
    related: [
      { href: "/services/voice-ai/", label: "Service", title: "Voice AI Systems", description: "Build governed phone intake, routing, booking, and escalation." },
      { href: "/services/custom-crm/", label: "Service", title: "Custom CRM Development", description: "Connect customers, properties, equipment, estimates, jobs, and service history." },
      { href: "/services/workflow-automation/", label: "Service", title: "Workflow Automation", description: "Coordinate bookings, dispatch, field updates, approvals, and follow-up." },
      { href: "/industries/construction/", label: "Industry", title: "Construction Automation", description: "Explore project, field, change, closeout, and billing workflows." },
      { href: "/integrations/twilio/", label: "Integration", title: "Twilio Integration", description: "Connect governed call and messaging events to intake, booking, dispatch, and follow-up." }
    ],
    reviewedDate: "July 2026"
  },
  {
    collection: "industries",
    slug: "professional-services",
    name: "Professional Services Automation",
    eyebrow: "Professional service systems",
    metaTitle: "Professional Services Automation & Software | Velixon",
    metaDescription: "Velixon builds professional services automation for intake, proposals, engagements, delivery, approvals, knowledge, and billing operations.",
    headline: "Productize the operation without flattening the expertise.",
    summary: "Connect business development, scoping, staffing, delivery, client communication, and billing so consultants and specialized firms spend less time coordinating the work around their judgment.",
    primaryKeyword: "professional services automation",
    secondaryKeywords: ["consulting workflow automation", "professional services software", "client onboarding automation", "professional services CRM"],
    definition: "Professional services automation coordinates the commercial and operational work around an expert engagement: qualification, scoping, proposal approval, staffing, kickoff, deliverables, client decisions, time or milestone capture, billing, and renewal. It should make expertise easier to deliver consistently without pretending that professional judgment can be reduced to a generic workflow.",
    definitionLabel: "For expert-led firms",
    challengesTitle: "Expert work is valuable; the coordination around it is often improvised.",
    challengesIntro: "Growing firms develop operational drag when pipeline promises, project scope, staffing decisions, client materials, delivery status, and billing evidence live in different systems.",
    challenges: [
      { title: "Sales context does not reach delivery", description: "Client goals, assumptions, exclusions, stakeholders, and promised timing are summarized again at kickoff, creating an early opportunity for scope drift." },
      { title: "Capacity planning uses stale signals", description: "Leaders staff from a spreadsheet that does not reflect proposal probability, actual project state, specialist availability, or work waiting on a client." },
      { title: "Deliverables and decisions lack one history", description: "Drafts, comments, approvals, meeting notes, and client choices accumulate across documents and messages without a dependable engagement timeline." },
      { title: "Billing depends on a late reconstruction", description: "Time, milestones, expenses, acceptance, and out-of-scope requests are reconciled near invoice time instead of being captured as delivery progresses." }
    ],
    capabilitiesTitle: "Connect the client lifecycle around the firm’s delivery model.",
    capabilitiesIntro: "The system can support project-based, retainer, subscription, milestone, or hybrid engagements with role-specific views for sales, delivery, finance, and the client.",
    capabilities: [
      { title: "Qualification and opportunity design", description: "Capture fit, need, urgency, stakeholders, buying process, confidentiality requirements, and the next responsible action in a structured pipeline." },
      { title: "Scope and proposal workflow", description: "Build approved service options, assumptions, exclusions, pricing inputs, internal reviews, e-signature, and handoff data into one traceable process." },
      { title: "Engagement activation", description: "Create the project, permissions, team, milestones, client requests, kickoff brief, communication rhythm, and billing setup from approved commercial records." },
      { title: "Capacity and work-in-progress views", description: "Combine qualified pipeline, active commitments, blocked work, role demand, and specialist availability without presenting uncertain forecasts as facts." },
      { title: "Client portal and decision log", description: "Give clients a secure place for requests, files, deliverables, decisions, approvals, status, and next steps with appropriate access boundaries." },
      { title: "Delivery-to-billing controls", description: "Connect time, milestones, acceptance, approved changes, expenses, and invoice readiness so finance receives complete supporting context." }
    ],
    outcomesTitle: "Scale the client experience and protect delivery focus.",
    outcomesIntro: "Automation should remove administrative friction while making scope, responsibility, and client decisions more explicit.",
    outcomes: [
      { title: "Cleaner sales-to-delivery transfer", description: "Start an engagement with approved scope, assumptions, client context, and ownership instead of a second discovery exercise." },
      { title: "More credible capacity signals", description: "Separate likely pipeline from committed work and show blockers that affect when specialist capacity is actually available." },
      { title: "Fewer invisible scope changes", description: "Turn client requests and delivery discoveries into a documented decision before they become unplanned work." },
      { title: "Earlier billing evidence", description: "Capture milestone, time, expense, and acceptance records during delivery rather than assembling them after period end." }
    ],
    examplesTitle: "Professional service workflows that respect expert judgment.",
    examplesIntro: "Velixon automates repeatable coordination and drafting while keeping final advice, quality, and client commitments with qualified people.",
    examples: [
      { title: "Qualified opportunity to scoped workshop", description: "Collect business context, screen fit, obtain confidentiality acknowledgments, assign a lead, schedule the right discovery format, and prepare a structured brief." },
      { title: "Approved proposal to engagement workspace", description: "Carry scope, stakeholders, milestones, commercial terms, and required client materials into project setup without duplicate entry." },
      { title: "Client request to scope decision", description: "Capture the request, link it to the engagement, evaluate effort and timing, route approval, and preserve the accepted decision before work proceeds." },
      { title: "Meeting to accountable next steps", description: "Create a reviewable summary, extract decisions and actions, assign owners and due dates, and attach source notes without treating an AI draft as authoritative." },
      { title: "Milestone completion to invoice readiness", description: "Confirm delivery evidence and acceptance, identify approved changes or expenses, and send finance a complete billing record." },
      { title: "Engagement close to knowledge capture", description: "Record reusable methods, lessons, outcomes, permissions, follow-up dates, and renewal opportunities while respecting client confidentiality." }
    ],
    idealForTitle: "Professional services automation is a strong fit when…",
    idealFor: [
      "The firm has repeatable engagement patterns but each project still needs expert tailoring.",
      "Sales, delivery, and finance use different records for scope, project state, and billing readiness.",
      "Senior professionals spend material time preparing status, chasing inputs, or reconstructing decisions.",
      "Clients would benefit from a secure, consistent view of requests, deliverables, approvals, and next steps.",
      "Growth is constrained by coordination and capacity visibility rather than a lack of market demand."
    ],
    processIntro: "We protect the firm’s delivery model first, then standardize only the coordination that is truly repeatable.",
    process: [
      { label: "01", title: "Engagement-system audit", description: "Trace representative opportunities and projects from first contact through collection, including scope exceptions and client-delayed work." },
      { label: "02", title: "Service and permission model", description: "Define engagement types, stage criteria, roles, confidentiality boundaries, required approvals, client access, and system ownership." },
      { label: "03", title: "Role-based prototype", description: "Test sales, practitioner, project lead, finance, and client views with the tasks each role performs most frequently." },
      { label: "04", title: "Integration and migration", description: "Connect CRM, documents, project, signature, accounting, and communication tools; migrate only validated records needed for the new workflow." },
      { label: "05", title: "Engagement-based rollout", description: "Launch on selected new engagements, compare administrative load and exception rates, and expand without disrupting active client commitments." }
    ],
    technology: ["HubSpot", "Salesforce", "Microsoft 365", "Google Workspace", "ClickUp", "Monday.com", "DocuSign", "QuickBooks", "Xero", "Stripe", "Supabase"],
    technologyNote: "The architecture must match confidentiality, retention, client-contract, professional-standard, and data-residency requirements. Automation can organize research and create drafts, but licensed or accountable professionals must review advice, conclusions, representations, and client commitments.",
    roi: {
      title: "Value professional-services automation through capacity and cycle time.",
      description: "Separate recoverable coordination time from expert work that remains necessary. Include adoption and knowledge-maintenance cost in the model.",
      formula: "Annual opportunity = recoverable coordination capacity + reduced delivery and billing delay + retired tool cost − system ownership cost",
      factors: ["Opportunities and engagements processed by type", "Professional and administrative hours spent on recurring coordination", "Average delays caused by missing inputs, approvals, staffing, or scope decisions", "Billing adjustments and time spent reconstructing invoice evidence", "Licensing, implementation, training, governance, support, and knowledge upkeep"],
      disclaimer: "This framework does not guarantee utilization, realization, revenue, client retention, or quality. Confirm assumptions with time, project, and finance data."
    },
    faqs: [
      { question: "Can automation work when every client engagement is different?", answer: "Yes, if the system separates the repeatable operating frame from the expert work. Intake, approvals, permissions, status, decisions, and billing evidence can be structured while scope, methods, and deliverables remain configurable." },
      { question: "Can AI write client deliverables?", answer: "It may help create bounded drafts from approved sources, but output must be reviewed for accuracy, confidentiality, professional standards, bias, citations, and contractual requirements. The responsible professional remains accountable for what is delivered." },
      { question: "How can a portal protect confidential client information?", answer: "The design can use role-based access, least privilege, separate client workspaces, audit events, secure authentication, retention rules, and vendor review. Exact safeguards must follow the firm's contracts, risk assessment, and applicable obligations." },
      { question: "Do we need a full professional services automation platform?", answer: "Not necessarily. A custom engagement layer, proposal workflow, client portal, or billing-readiness process may solve the most expensive gap while established CRM, document, project, and accounting tools remain in place." },
      { question: "Can the system forecast staffing demand?", answer: "It can present scenario-based demand using pipeline probability, role needs, commitments, and known availability. Forecasts remain uncertain and should show assumptions rather than presenting a single number as guaranteed workload." },
      { question: "What is the safest first workflow for a consulting firm?", answer: "A strong starting point is proposal-to-kickoff, client input collection, scope-change approval, or milestone-to-billing because each has clear records and accountable owners without automating the professional conclusion itself." }
    ],
    related: [
      { href: "/services/business-process-automation/", label: "Service", title: "Business Process Automation", description: "Model multi-role client workflows, approvals, and exceptions." },
      { href: "/services/custom-crm/", label: "Service", title: "Custom CRM Development", description: "Shape pipeline and relationship records around a specialized sales cycle." },
      { href: "/services/ai-automation/", label: "Service", title: "AI Automation", description: "Add governed interpretation and drafting to approved professional workflows." },
      { href: "/industries/law-firms/", label: "Industry", title: "Law Firm Automation", description: "Explore legal intake, matter, deadline, document, and billing workflows." },
      { href: "/resources/custom-software-roi-cost/", label: "Guide", title: "Custom Software ROI and Cost", description: "Build a practical business case for owned operational software." }
    ],
    reviewedDate: "July 2026"
  },
  {
    collection: "industries",
    slug: "law-firms",
    name: "Law Firm Automation",
    eyebrow: "Legal operations systems",
    metaTitle: "Law Firm Automation & Custom Legal Software | Velixon",
    metaDescription: "Velixon builds law firm automation for intake, conflicts, matter opening, documents, deadlines, client updates, and billing workflows.",
    headline: "Reduce matter administration without outsourcing legal judgment.",
    summary: "Build governed workflows around intake, conflict review, engagement, matter setup, document collection, deadlines, client communication, and billing—while keeping lawyers responsible for confidentiality, accuracy, strategy, and advice.",
    primaryKeyword: "law firm automation",
    secondaryKeywords: ["legal workflow automation", "law firm AI automation", "custom legal software", "legal intake automation"],
    definition: "Law firm automation coordinates repeatable legal operations using forms, rules, integrations, documents, notifications, and carefully bounded AI assistance. It can prepare information and move approved administrative work, but it must not make unsupervised legal judgments, expose client information, or turn a generated answer into authority.",
    definitionLabel: "For legal teams",
    challengesTitle: "Legal operations carry consequences that generic automation does not understand.",
    challengesIntro: "A useful system reduces administrative load while reinforcing conflict, confidentiality, supervision, deadline, accuracy, and client-communication responsibilities.",
    challenges: [
      { title: "Intake data is incomplete or overexposed", description: "Prospective clients share sensitive narratives through inconsistent channels before the firm has established need-to-know access or completed conflict review." },
      { title: "Matter opening has hidden dependencies", description: "Conflict disposition, engagement terms, payment conditions, responsible attorney, practice-specific fields, retention, and system permissions must align before work begins." },
      { title: "Deadlines live across several sources", description: "Court rules, orders, correspondence, calendars, matter plans, and attorney decisions require human interpretation, yet administrative tracking is often fragmented." },
      { title: "AI drafts can look more reliable than they are", description: "Generated summaries, research, citations, or communications may omit material facts, invent authority, or use confidential data in ways that violate duties and client expectations." }
    ],
    capabilitiesTitle: "Design legal operations around review, evidence, and authority.",
    capabilitiesIntro: "Velixon builds narrow systems with explicit permission, approval, source, and escalation boundaries rather than a general-purpose autonomous legal agent.",
    capabilities: [
      { title: "Secure prospective-client intake", description: "Collect practice-specific facts, parties, urgency, jurisdiction, referral source, and communication permission while limiting unnecessary sensitive information." },
      { title: "Conflict review workspace", description: "Normalize names and relationships, search approved records, present possible matches, record reviewer disposition, and block downstream steps until the responsible person decides." },
      { title: "Engagement and matter activation", description: "Generate approved engagement materials, collect signatures and payment prerequisites, assign roles, create the matter, and apply access and retention rules." },
      { title: "Document and request workflows", description: "Issue structured client requests, track receipt and completeness, route privileged materials appropriately, and keep source files connected to the matter." },
      { title: "Deadline support with human confirmation", description: "Capture candidate dates and source documents, route them to qualified reviewers, require explicit confirmation, and synchronize approved events with redundant controls." },
      { title: "Reviewable AI assistance", description: "Summarize or draft from permitted matter sources with citations back to those sources, restricted tool use, visible uncertainty, and attorney approval before reliance or delivery." }
    ],
    outcomesTitle: "Create administrative leverage with responsible supervision.",
    outcomesIntro: "The target is a clearer matter lifecycle and better-prepared work—not an automated substitute for the lawyer-client relationship.",
    outcomes: [
      { title: "Faster qualified intake review", description: "Give the intake team a complete, practice-specific record and visible conflict status without asking prospects for the same information repeatedly." },
      { title: "Controlled matter opening", description: "Prevent work from silently bypassing engagement, payment, role, access, retention, or practice requirements." },
      { title: "Traceable client requests", description: "Show what was requested, received, reviewed, outstanding, and communicated with links to matter records." },
      { title: "Safer use of AI drafts", description: "Keep approved sources, reviewer identity, edits, and final disposition attached to model-assisted work." }
    ],
    examplesTitle: "Legal workflows that keep a qualified person in control.",
    examplesIntro: "These systems organize evidence and recurring administration. They do not decide conflicts, deadlines, legal positions, or advice.",
    examples: [
      { title: "Prospect intake to attorney review", description: "Route practice-specific intake, identify urgent or adverse-party signals, create a limited-access prospect record, and assign the right reviewer without promising representation." },
      { title: "Conflict candidate to documented disposition", description: "Search normalized parties and relationships, surface possible matches with sources, require reviewer notes, and unlock engagement only after an authorized decision." },
      { title: "Signed engagement to secured matter", description: "Verify required signatures and payment state, create the matter, assign the team, apply matter-level access, and launch approved client requests." },
      { title: "Client document request to completeness review", description: "Send a tailored checklist, accept secure uploads, flag missing or unreadable items, preserve version history, and notify the responsible team member." },
      { title: "Source document to deadline confirmation", description: "Extract a candidate date and cited source passage, route it to a qualified reviewer, record confirmation, and add the approved deadline with reminders." },
      { title: "Matter activity to invoice prebill", description: "Collect time or milestone evidence, expenses, approved fee arrangements, and narrative drafts for lawyer and billing review before an invoice is finalized." }
    ],
    idealForTitle: "Law firm automation is a strong fit when…",
    idealFor: [
      "Intake volume is high enough that lawyers receive incomplete or poorly routed prospective matters.",
      "Matter opening requires repeated checks across conflict, engagement, payment, document, and practice systems.",
      "Clients and staff spend significant time asking what information is still needed or what happens next.",
      "The firm wants AI assistance but needs explicit confidentiality, source, review, and supervision controls.",
      "Current legal software handles core records but leaves a specialized practice workflow fragmented."
    ],
    processIntro: "We begin with the firm's professional duties, practice rules, and threat model, then automate only the bounded work the firm can supervise.",
    process: [
      { label: "01", title: "Legal operations and duty review", description: "Map intake, conflicts, engagement, matter, documents, deadlines, communication, and billing with firm leadership and qualified ethics or compliance owners." },
      { label: "02", title: "Data and authority boundaries", description: "Define permitted data, vendors, retention, matter access, privileged sources, tool actions, required reviewers, and events the system may never decide." },
      { label: "03", title: "Representative-matter prototype", description: "Test ordinary, urgent, conflicted, incomplete, highly confidential, and adversarial scenarios before any production connection is enabled." },
      { label: "04", title: "Secure integration and validation", description: "Connect approved practice, document, signature, payment, email, and calendar systems; verify permissions, logs, fallbacks, and record ownership." },
      { label: "05", title: "Supervised rollout", description: "Launch to selected users or matter types, audit outputs and exceptions, document training, and expand only after the responsible lawyers accept the controls." }
    ],
    technology: ["Clio APIs", "MyCase", "Lawmatics", "Microsoft 365", "Google Workspace", "DocuSign", "Stripe", "Secure client portals", "Role-based access", "Audit logging"],
    technologyNote: "Technology selection and data use must follow the firm's jurisdiction-specific ethics rules, court rules, client agreements, confidentiality duties, retention policy, and vendor review. ABA Formal Opinion 512 identifies competence, confidentiality, communication, supervision, candor, and reasonable-fee considerations for generative AI; the firm and its counsel remain responsible for applying them.",
    roi: {
      title: "Measure legal automation without valuing unsupervised advice.",
      description: "Focus on administrative handling, cycle time, completeness, and preventable rework. Do not count attorney review that remains professionally necessary as eliminated labor.",
      formula: "Annual opportunity = recoverable intake and matter administration + reduced rework and collection delay − governance and system cost",
      factors: ["Prospects and matters processed by practice area", "Staff and attorney time spent on repeatable administrative handling", "Incomplete intake, missing-document, or matter-opening exception rates", "Prebill correction and collection-preparation effort", "Security, vendor review, training, evaluation, supervision, support, and retention cost"],
      disclaimer: "Automation cannot guarantee case outcomes, deadline compliance, ethics compliance, client satisfaction, utilization, or collection. Validate controls with qualified counsel and firm policy owners."
    },
    faqs: [
      { question: "Can AI provide legal advice to our clients?", answer: "Velixon does not position a model as a lawyer. A firm may design attorney-supervised tools for approved informational or drafting tasks, but legal conclusions, advice, strategy, representations, and client communications require the firm's qualified review under applicable rules." },
      { question: "How do you protect privilege and confidential information?", answer: "The architecture can minimize collected data, restrict matter access, separate environments, review vendor data use and retention, require approved sources, log actions, and prevent sensitive inputs from reaching unapproved models. The firm must define and approve the applicable safeguards." },
      { question: "Can automation perform conflict checks?", answer: "It can normalize parties, search approved records, identify possible matches, and document the workflow. An authorized person should make and record the conflict determination because name similarity and relationship context require legal and factual judgment." },
      { question: "Can AI calculate court deadlines?", answer: "A system can extract candidate dates, show the source, apply firm-approved rules, and prepare a review queue. It should not be the sole authority for a deadline; qualified personnel must verify the governing source and confirmed calendar entry." },
      { question: "Will the system integrate with our practice management software?", answer: "Potentially. Discovery reviews supported APIs, subscription access, matter permissions, field ownership, document handling, rate limits, and vendor terms before recommending a connection." },
      { question: "What is a responsible first law firm automation?", answer: "Prospective-client intake, document request tracking, engagement-to-matter setup, or prebill preparation can create clear administrative value while leaving conflicts, deadlines, advice, and substantive legal work under direct human control." }
    ],
    related: [
      { href: "/services/ai-automation/", label: "Service", title: "Governed AI Automation", description: "Add approval, source, permission, and evaluation controls around model-assisted work." },
      { href: "/services/business-process-automation/", label: "Service", title: "Business Process Automation", description: "Connect intake, review, approval, documents, and billing with explicit state." },
      { href: "/services/custom-crm/", label: "Service", title: "Custom CRM Development", description: "Model prospective clients, relationships, matters, and specialized intake." },
      { href: "/industries/professional-services/", label: "Industry", title: "Professional Services Automation", description: "Explore engagement, delivery, client, and billing systems for expert firms." },
      { href: "/resources/high-value-ai-automation-workflows/", label: "Guide", title: "Evaluate AI Automation Workflows", description: "Score potential workflows against value, data, reliability, and risk." }
    ],
    reviewedDate: "July 2026"
  },
  ...additionalIndustryLandingPages
];

export const industryDirectory: DirectoryGroup[] = [
  {
    title: "Field, project, and property operations",
    description: "Connect customer demand to work performed across offices, jobsites, properties, technicians, vendors, and accounting.",
    items: [
      { href: "/industries/construction/", label: "Construction", title: "Construction Automation", description: "Coordinate estimating, mobilization, field evidence, changes, closeout, and invoice readiness." },
      { href: "/industries/home-services/", label: "Field service", title: "Home Services Automation", description: "Connect calls, booking, dispatch, technicians, estimates, memberships, and follow-up." },
      { href: "/industries/property-management/", label: "Real estate operations", title: "Property Management Automation", description: "Organize leasing, resident requests, vendors, inspections, turnovers, renewals, and owner reporting." }
    ]
  },
  {
    title: "Regulated and confidential client operations",
    description: "Reduce recurring administration while protecting professional judgment, sensitive records, review authority, and sector-specific obligations.",
    items: [
      { href: "/industries/law-firms/", label: "Legal", title: "Law Firm Automation", description: "Support intake, conflicts, matter setup, documents, deadline review, client updates, and billing." },
      { href: "/industries/healthcare-practices/", label: "Healthcare", title: "Healthcare Practice Automation", description: "Improve appointment readiness, administrative routing, referrals, records, recalls, and billing support." },
      { href: "/industries/accounting-financial-services/", label: "Financial operations", title: "Accounting & Financial Services", description: "Control client onboarding, secure documents, recurring close, review, reporting, and billing workflows." }
    ]
  },
  {
    title: "Expert delivery and complex production",
    description: "Build systems around specialized services and controlled production where context, capacity, exceptions, and traceability matter.",
    items: [
      { href: "/industries/professional-services/", label: "Expert firms", title: "Professional Services Automation", description: "Connect pipeline, scope, staffing, client decisions, delivery, and billing without flattening expertise." },
      { href: "/industries/manufacturing/", label: "Production", title: "Manufacturing Automation", description: "Connect quoting, readiness, production exceptions, quality, maintenance, suppliers, and shipping review." }
    ]
  }
];
