import type { DirectoryGroup, SeoLandingData } from "./types";
import { contractorSolutionLandingPages } from "./solution-landings-contractors";
import { serviceBusinessSolutionLandingPages } from "./solution-landings-service-businesses";

export const solutionLandingPages: SeoLandingData[] = [
  {
    collection: "solutions",
    slug: "lead-sales-automation",
    name: "Lead & Sales Automation",
    eyebrow: "Revenue operations solution",
    metaTitle: "Lead & Sales Automation Systems | Velixon",
    metaDescription: "Connect lead capture, qualification, assignment, follow-up, CRM updates, proposals, and sales handoffs in one observable automation system.",
    headline: "Turn every qualified signal into an owned next action.",
    summary: "Velixon connects the path from first inquiry to sales handoff so leads are captured once, evaluated consistently, routed clearly, followed up appropriately, and reflected in a CRM your team can trust.",
    primaryKeyword: "lead automation",
    secondaryKeywords: ["sales automation", "sales pipeline automation", "lead follow-up automation", "CRM automation"],
    definition: "Lead and sales automation coordinates the repetitive work around a revenue process: collecting inquiries, matching or enriching records, applying qualification rules, assigning ownership, scheduling follow-up, capturing activity, updating pipeline state, and triggering the next approved step. It supports the sales team rather than replacing relationship judgment.",
    challengesTitle: "Revenue leaks when signals arrive faster than the process can respond.",
    challengesIntro: "Most lost momentum is not caused by a lack of software. It comes from disconnected intake channels, inconsistent qualification, personal follow-up habits, and CRM updates that happen after the selling work—or not at all.",
    challenges: [
      { title: "Leads enter through disconnected channels", description: "Website forms, calls, referrals, inboxes, social messages, and imports create separate records or informal notes with no consistent owner." },
      { title: "Qualification varies by person and workload", description: "Fit, urgency, service area, budget, or readiness criteria are applied inconsistently, making prioritization difficult to explain or improve." },
      { title: "Follow-up depends on memory", description: "A promising conversation goes quiet because the next action is not scheduled, a reply is buried, or the responsible seller assumes someone else owns it." },
      { title: "The CRM lags behind reality", description: "Salespeople recreate emails, call outcomes, meetings, and stage changes manually, so leaders manage from stale pipeline data and sellers resent the reporting burden." }
    ],
    capabilitiesTitle: "One connected path from signal to sales action.",
    capabilitiesIntro: "Velixon designs capture, record identity, qualification, communication, pipeline state, and human judgment as a coordinated revenue workflow.",
    capabilities: [
      { title: "Unified lead capture", description: "Normalize approved forms, calls, email events, imports, and referrals into a consistent lead record while checking for existing contacts or accounts." },
      { title: "Qualification and enrichment", description: "Apply explicit business criteria and approved data sources, preserving the evidence behind scores, categories, and recommended priority." },
      { title: "Ownership and routing", description: "Assign by territory, service, capacity, account relationship, or other policy; notify the owner and escalate unaccepted or aging leads." },
      { title: "Follow-up orchestration", description: "Schedule appropriate email, task, phone, or approved messaging steps while pausing on replies, opt-outs, bookings, disqualification, or human intervention." },
      { title: "CRM activity and stage hygiene", description: "Capture key events, enforce meaningful stage criteria, surface missing next actions, and keep source-of-truth records aligned with workflow behavior." },
      { title: "Sales-to-delivery handoff", description: "Translate a qualified or won opportunity into a complete operational packet with customer context, commitments, documents, ownership, and outstanding requirements." }
    ],
    outcomesTitle: "Make pipeline movement a system behavior, not a heroic habit.",
    outcomesIntro: "The aim is a faster and more accountable revenue process with less duplicate administration and clearer evidence about where opportunities advance or stall.",
    outcomes: [
      { title: "Faster owned response", description: "Route eligible inquiries to a named owner with usable context and a defined response expectation." },
      { title: "Consistent qualification", description: "Apply the same visible criteria across channels while giving sellers control over ambiguous or relationship-sensitive decisions." },
      { title: "Cleaner pipeline state", description: "Tie stages and next actions to real workflow events instead of relying entirely on end-of-week CRM cleanup." },
      { title: "Less avoidable leakage", description: "Surface aging leads, missing follow-up, unaccepted assignments, and stalled handoffs before they disappear from attention." }
    ],
    examplesTitle: "Revenue workflows that share one source of truth.",
    examplesIntro: "The communication mix and qualification policy should reflect your audience, consent requirements, sales motion, and CRM—not a generic sequence template.",
    examples: [
      { title: "Inbound inquiry to booked discovery", description: "Validate and deduplicate the inquiry, apply fit rules, assign the appropriate seller, present scheduling, and create follow-up until the lead replies or reaches a defined stop state." },
      { title: "Missed-call recovery", description: "Create or match a lead from the call event, send an approved acknowledgment when appropriate, collect context through a callback or form, and assign the next action." },
      { title: "Aging pipeline review", description: "Identify opportunities without recent activity or a future action, summarize relevant context, and route them for a human decision to advance, nurture, pause, or close." },
      { title: "Accepted proposal handoff", description: "Detect the approved agreement, verify required fields and documents, update the CRM, create delivery or onboarding records, and notify both teams with consistent context." }
    ],
    idealForTitle: "Lead and sales automation is a strong fit when…",
    idealFor: [
      "Inbound demand arrives through several channels or at times your sales team cannot respond consistently.",
      "Qualification and assignment rules can be stated clearly enough to test.",
      "Sellers spend meaningful time recreating activity or chasing routine next steps.",
      "Pipeline reporting is difficult to trust because stages and ownership are not connected to workflow events.",
      "The business can define consent, frequency, opt-out, and human-review rules for automated communication."
    ],
    processIntro: "We align automation with the sales motion and customer experience, then measure workflow states rather than celebrating message volume.",
    process: [
      { label: "01", title: "Revenue workflow audit", description: "Map lead sources, qualification, response expectations, CRM records, sales stages, follow-up patterns, disqualification, and delivery handoff." },
      { label: "02", title: "Lifecycle and policy design", description: "Define identity, source attribution, fit criteria, ownership, stage transitions, communication permissions, stop conditions, and exception paths." },
      { label: "03", title: "System and content build", description: "Connect intake, CRM, calendars, communication, and delivery systems; create approved templates, tasks, alerts, and operator views." },
      { label: "04", title: "Scenario validation", description: "Test duplicates, existing customers, out-of-area inquiries, no replies, reschedules, opt-outs, reassignment, rejected proposals, and integration failures." },
      { label: "05", title: "Measured rollout", description: "Release by lead source or team, monitor response ownership, qualification overrides, follow-up completion, pipeline quality, and customer feedback." }
    ],
    technology: ["HubSpot", "Salesforce", "Custom CRM", "Twilio", "Resend", "Google Calendar", "Calendly", "n8n", "Make", "REST APIs"],
    technologyNote: "The system may extend your current CRM or replace a narrow spreadsheet-based pipeline. Channel and platform choices follow the audience, consent policy, source-of-truth model, sales volume, and the team that will operate the workflow.",
    roi: {
      title: "Estimate value from the response and handoff gaps you can observe.",
      description: "Use actual lead volume, response behavior, administrative effort, and progression data. Keep revenue assumptions separate from direct labor savings so the business case remains understandable.",
      formula: "Estimated opportunity = recoverable sales admin + value of improved eligible-lead follow-through − system and communication cost",
      factors: ["Qualified inquiries by source and period", "Median time to owned response and unworked-lead rate", "Sales hours spent on data entry, routing, reminders, and reporting", "Current stage progression and reasons opportunities stall", "CRM, communication, enrichment, automation, and support cost"],
      disclaimer: "Automation cannot guarantee meetings, conversion, revenue, or customer fit. Forecasts should use conservative scenarios based on your own funnel data."
    },
    faqs: [
      { question: "What parts of the sales process should be automated?", answer: "Good candidates include capture, deduplication, approved enrichment, assignment, scheduling, reminders, activity capture, stage checks, follow-up tasks, and internal handoffs. Relationship strategy, negotiation, nuanced qualification, and consequential commitments should remain with accountable people." },
      { question: "Can lead automation work with our existing CRM?", answer: "Usually, if the CRM exposes the needed records and actions through supported APIs or automation features. Discovery verifies plan access, fields, ownership, authentication, rate limits, and whether the CRM should remain the source of truth or share responsibility with another application." },
      { question: "How do you prevent automated follow-up from feeling like spam?", answer: "Use the audience’s context and permission, keep frequency and sequence length bounded, stop immediately on replies or opt-outs, avoid pretending an automated message was manually written, and give salespeople visibility and control. Applicable marketing and privacy requirements should be reviewed for each channel." },
      { question: "Can AI qualify leads?", answer: "AI can summarize unstructured needs or recommend a category when grounded in explicit criteria. Deterministic rules are often better for hard requirements such as service area or minimum project type. High-value or ambiguous leads should be reviewed by a salesperson, and the evidence behind the recommendation should remain visible." },
      { question: "How do you handle duplicate leads and existing customers?", answer: "The workflow needs an identity strategy using stable platform IDs plus approved matching fields. Potential matches can be merged automatically only when confidence and consequences support it; otherwise they should enter a review queue. Existing customer or open-opportunity rules prevent inappropriate nurture sequences." },
      { question: "What should we measure after launch?", answer: "Track owned response time, unassigned and aging leads, qualification overrides, follow-up completion, booking or reply by eligible cohort, stage data completeness, handoff exceptions, opt-outs, system failures, and seller adoption. Use measures to diagnose the workflow, not to claim automation caused every downstream sale." }
    ],
    related: [
      { href: "/services/custom-crm/", label: "Service", title: "Custom CRM Development", description: "Build a customer and pipeline system around your actual revenue lifecycle." },
      { href: "/services/workflow-automation/", label: "Service", title: "Workflow Automation", description: "Connect reliable triggers, states, and handoffs across the complete sales process." },
      { href: "/services/voice-ai/", label: "Service", title: "Voice AI & AI Receptionists", description: "Capture, qualify, schedule, and route calls within a governed phone experience." },
      { href: "/solutions/appointment-call-automation/", label: "Solution", title: "Appointment & Call Automation", description: "Coordinate call handling, calendar rules, reminders, rescheduling, and staff handoff." },
      { href: "/integrations/hubspot/", label: "Integration", title: "HubSpot Integration", description: "Connect lead ownership, pipeline stages, activities, and follow-up to the operating workflow." },
      { href: "/guides/automate-sales-pipeline/", label: "Guide", title: "How to Automate Your Sales Pipeline", description: "Map the rules, records, handoffs, and measurement needed for responsible sales automation." }
    ],
    reviewedDate: "July 2026"
  },
  {
    collection: "solutions",
    slug: "appointment-call-automation",
    name: "Appointment & Call Automation",
    eyebrow: "Scheduling operations solution",
    metaTitle: "Appointment & Call Automation Systems | Velixon",
    metaDescription: "Connect AI call handling, scheduling rules, calendars, confirmations, reminders, rescheduling, CRM updates, and staff escalation.",
    headline: "From incoming call to confirmed appointment—without the calendar chaos.",
    summary: "Velixon connects phone and digital intake with real availability, qualification rules, confirmations, reminders, rescheduling, customer records, and staff handoffs.",
    primaryKeyword: "appointment automation",
    secondaryKeywords: ["appointment scheduling automation", "AI call automation", "calendar automation", "AI appointment booking"],
    definition: "Appointment and call automation coordinates how a customer requests time, how eligibility and availability are checked, how a booking is recorded, and how confirmations, reminders, changes, and follow-up reach both the customer and the operating team. Voice AI can support the phone channel while the underlying scheduling rules remain shared across channels.",
    challengesTitle: "Booking is simple only when the rules are simple.",
    challengesIntro: "Real scheduling involves appointment types, service areas, staff skills, travel, buffers, lead time, capacity, customer eligibility, and changes. Automating only the calendar click can create more exceptions than it removes.",
    challenges: [
      { title: "Calls and requests wait for office availability", description: "Customers reach voicemail, wait for a callback, or exchange several messages before the team can collect details and offer a valid time." },
      { title: "Availability is spread across systems", description: "Personal calendars, dispatch boards, CRM fields, job durations, and informal knowledge all influence whether a slot is actually bookable." },
      { title: "Reminders are disconnected from status", description: "Generic messages continue after cancellation or fail to include the preparation, location, forms, and change options relevant to the appointment." },
      { title: "Changes create manual repair work", description: "Rescheduling, reassignment, no-shows, late arrivals, or capacity changes require staff to update several records and notify multiple people." }
    ],
    capabilitiesTitle: "One scheduling policy across phone, web, and staff workflows.",
    capabilitiesIntro: "Velixon turns availability, eligibility, communication, and downstream records into a coordinated appointment lifecycle.",
    capabilities: [
      { title: "Structured intake and qualification", description: "Collect appointment type, customer or lead identity, location, urgency, prerequisites, and other approved details before offering time." },
      { title: "Rule-based availability", description: "Apply staff skills, service area, duration, buffers, working hours, lead time, capacity, and booking-window constraints to eligible slots." },
      { title: "Voice and digital booking", description: "Offer a consistent scheduling workflow through an AI phone agent, web form, portal, or staff interface without creating parallel calendars." },
      { title: "Confirmation and reminders", description: "Send approved email or message content tied to current booking status, required preparation, location, change options, and consent policy." },
      { title: "Rescheduling and cancellation", description: "Validate change rules, release or reserve capacity, update connected records, notify affected parties, and preserve the appointment history." },
      { title: "CRM and operations handoff", description: "Create or update customer, lead, job, case, or dispatch records with the information the assigned employee needs before the appointment begins." }
    ],
    outcomesTitle: "Make every booking operable, not merely confirmed.",
    outcomesIntro: "The workflow should reduce coordination while improving the completeness and reliability of the appointment record.",
    outcomes: [
      { title: "Faster access to valid time", description: "Offer eligible availability after required information is collected instead of beginning a multi-message coordination loop." },
      { title: "Fewer avoidable booking errors", description: "Apply consistent duration, service, location, buffer, capacity, and prerequisite rules across channels." },
      { title: "Cleaner changes and handoffs", description: "Keep calendars, CRM or job records, notifications, and employee context synchronized through reschedules and cancellations." },
      { title: "Visible demand and capacity", description: "Measure requests, eligible bookings, unavailable demand, changes, no-shows, and routing exceptions by appointment type." }
    ],
    examplesTitle: "Appointment workflows built around real operating constraints.",
    examplesIntro: "These patterns can combine voice, forms, portals, email, and messaging while preserving one source of truth for appointment state.",
    examples: [
      { title: "AI receptionist to qualified booking", description: "Answer the call, identify the requested service, collect required details, apply eligibility rules, offer valid slots, confirm the choice, and update the CRM." },
      { title: "Estimate or consultation scheduling", description: "Route qualified leads by territory or specialty, respect travel and duration rules, collect preparation details, and create the assigned salesperson’s briefing." },
      { title: "Service reminder and change flow", description: "Send status-aware reminders, let customers confirm or request a change, release or reassign capacity, and notify operations when human review is needed." },
      { title: "Cancellation and waitlist recovery", description: "Detect newly available time, identify eligible and consented waitlist customers, offer the slot in a controlled order, and close the offer when booked." }
    ],
    idealForTitle: "Appointment and call automation is a strong fit when…",
    idealFor: [
      "Your team spends substantial time answering routine booking calls or coordinating availability.",
      "Appointment types, eligibility, durations, and assignment rules can be documented.",
      "Missed calls or after-hours requests create delayed response and manual follow-up.",
      "Calendar changes require repeated updates across customer, CRM, dispatch, or staff systems.",
      "The business can define channel consent, opt-out, privacy, transfer, and escalation requirements."
    ],
    processIntro: "We model appointment state and operational constraints before choosing the phone, calendar, and messaging technology.",
    process: [
      { label: "01", title: "Scheduling and call audit", description: "Review call intents, appointment types, calendars, staff and territory rules, booking volume, changes, no-shows, communication, and downstream records." },
      { label: "02", title: "Policy and state design", description: "Define eligibility, required data, availability rules, confirmation, reminders, rescheduling, cancellation, transfer, consent, and exception ownership." },
      { label: "03", title: "Channel and integration build", description: "Connect voice or digital intake, calendar availability, CRM or dispatch records, notifications, and employee handoff interfaces." },
      { label: "04", title: "Scenario and load validation", description: "Test simultaneous booking attempts, stale availability, time zones, daylight saving, reschedules, no matches, no-shows, tool failure, and human takeover." },
      { label: "05", title: "Limited-hours rollout", description: "Launch by appointment type, channel, location, or time window; monitor completion, overrides, customer friction, and staff workload before expansion." }
    ],
    technology: ["Twilio", "OpenAI", "Google Calendar", "Microsoft 365", "Calendly", "CRM APIs", "Dispatch APIs", "Resend", "Webhooks", "PostgreSQL"],
    technologyNote: "Calendar and communication capabilities vary by provider and plan. The system should maintain an explicit appointment state and use provider APIs as interfaces, preventing a single calendar event or message from becoming the only record of the workflow.",
    roi: {
      title: "Measure the full appointment lifecycle.",
      description: "Estimate intake and coordination labor, then model eligible booking coverage and avoidable change handling. Keep the assumed value of recovered appointments separate from direct cost savings.",
      formula: "Appointment opportunity = recoverable coordination + value of eligible recovered bookings − voice, messaging, calendar, and support cost",
      factors: ["Requests and calls by appointment type and time", "Current handling time, callback delay, and booking completion", "Reschedule, cancellation, no-show, and double-book correction workload", "Percentage of requests that meet automatable rules", "Telephony, messaging, calendar, integration, review, and maintenance cost"],
      disclaimer: "Booking, attendance, conversion, and revenue depend on customer and operational factors beyond automation. No specific result is guaranteed."
    },
    faqs: [
      { question: "Can an AI phone agent book appointments directly?", answer: "Yes, when the agent can access a controlled availability function and the workflow defines eligibility, appointment type, required fields, confirmation, and escalation. The booking action should be narrow, validated, and recorded in the system of truth rather than granting the model broad calendar access." },
      { question: "Can the same scheduling rules work on the phone and website?", answer: "Yes. The channel can collect information differently while calling the same underlying eligibility and availability services. This prevents a phone agent, web form, and employee interface from offering conflicting time based on separate rule implementations." },
      { question: "How do you avoid double booking?", answer: "Use the calendar or scheduling system’s supported hold and booking semantics, recheck availability at confirmation, apply idempotency to repeated requests, and define how simultaneous attempts are resolved. Exact behavior depends on the provider APIs and cannot be assumed before review." },
      { question: "Can reminders be sent by email, SMS, or WhatsApp?", answer: "Potentially, subject to the recipient’s consent, channel rules, provider access, geography, and your policies. Messages should identify the business, include relevant appointment details, honor opt-outs, and stop or change when the appointment state changes." },
      { question: "What happens when a customer asks for an unavailable or complex time?", answer: "The system can offer eligible alternatives, collect preferred windows, create a callback request, or transfer the caller with context. It should not invent availability or override protected constraints. Repeated unavailable demand can be reported for staffing or service design decisions." },
      { question: "Can automation handle rescheduling and cancellations?", answer: "Yes for policy-compliant changes. The workflow can verify the booking, apply notice and eligibility rules, update capacity, notify affected parties, and preserve history. Exceptions such as fees, special resources, or urgent service may need human review." }
    ],
    related: [
      { href: "/services/voice-ai/", label: "Service", title: "Voice AI & AI Receptionists", description: "Create the governed phone experience for intake, qualification, booking, and transfer." },
      { href: "/solutions/lead-sales-automation/", label: "Solution", title: "Lead & Sales Automation", description: "Connect scheduled discovery or estimates to ownership, CRM activity, and follow-up." },
      { href: "/solutions/customer-service-automation/", label: "Solution", title: "Customer Service Automation", description: "Coordinate service requests, case context, updates, and human escalation around appointments." },
      { href: "/integrations/google-workspace/", label: "Integration", title: "Google Workspace Integration", description: "Connect governed Calendar availability and events to customer and operating records." },
      { href: "/services/workflow-automation/", label: "Service", title: "Workflow Automation", description: "Design reliable state changes, retries, notifications, and exception queues." },
      { href: "/case-studies/sharecal-collaborative-scheduling-platform/", label: "Case study", title: "ShareCal Scheduling Case Study", description: "See how Velixon designed a shared scheduling product around availability, participation, and change." }
    ],
    reviewedDate: "July 2026"
  },
  {
    collection: "solutions",
    slug: "document-finance-automation",
    name: "Document & Finance Automation",
    eyebrow: "Back-office operations solution",
    metaTitle: "Document, Proposal & Invoice Automation | Velixon",
    metaDescription: "Automate document intake, data extraction, proposals, approvals, signatures, invoice readiness, accounting handoffs, and exception review.",
    headline: "Move documents and money with fewer manual handoffs.",
    summary: "Velixon connects the evidence, approvals, records, and communications behind proposals, documents, invoices, and finance operations—while keeping consequential decisions reviewable.",
    primaryKeyword: "document automation",
    secondaryKeywords: ["invoice automation", "proposal automation", "financial process automation", "document workflow automation"],
    definition: "Document and finance automation coordinates how business information is collected, validated, generated, approved, signed, recorded, and handed to billing or accounting. It may use templates, rules, OCR or AI extraction, e-signature, integrations, and human review while preserving source documents and an auditable process history.",
    challengesTitle: "Back-office delays often begin with missing or mismatched evidence.",
    challengesIntro: "The visible task may be generating an invoice or proposal, but completion depends on accurate customer data, scope, approvals, source documents, completion records, terms, and a reliable handoff between operating systems.",
    challenges: [
      { title: "Documents arrive incomplete and unstructured", description: "Employees inspect emails and attachments, identify the customer or job, re-enter fields, and chase missing information before the process can begin." },
      { title: "Templates drift across the business", description: "Old language, pricing, branding, or approval rules remain in copied documents because there is no governed source for generation." },
      { title: "Completion and billing are disconnected", description: "Finance waits for operations to assemble evidence, confirm scope changes, and translate job or project state into invoice-ready data." },
      { title: "Exceptions surface after a record is posted", description: "Duplicates, mismatched totals, missing purchase orders, or unapproved changes are discovered during reconciliation instead of before the financial action." }
    ],
    capabilitiesTitle: "A controlled path from source document to financial record.",
    capabilitiesIntro: "Velixon combines structured intake, validation, generation, approvals, signature, integration, and exception handling around the source systems your teams already use.",
    capabilities: [
      { title: "Document intake and classification", description: "Receive approved files or submissions, associate them with the correct entity, identify document type, and route unsupported or unreadable items." },
      { title: "Data extraction and validation", description: "Extract relevant fields with OCR, AI, or templates, then check required values, formats, totals, duplicates, and source-record consistency before use." },
      { title: "Proposal and document generation", description: "Populate governed templates from approved CRM, project, pricing, or customer data with version and approval controls." },
      { title: "Review, approval, and signature", description: "Route documents by thresholds or policy, assemble reviewer context, capture decisions, and connect supported e-signature events to the lifecycle." },
      { title: "Invoice-readiness workflow", description: "Confirm completion criteria, change approvals, supporting evidence, customer terms, tax or accounting fields, and responsible owner before billing handoff." },
      { title: "Accounting integration and exception queue", description: "Create or update permitted financial records, preserve cross-system identifiers, return status, and surface rejected or mismatched items for correction." }
    ],
    outcomesTitle: "Improve throughput without weakening financial control.",
    outcomesIntro: "The system should reduce repetitive preparation and follow-up while preserving approval authority, source evidence, and a clear correction path.",
    outcomes: [
      { title: "Faster document preparation", description: "Reuse validated customer, scope, pricing, and project data through governed templates instead of repeated copying." },
      { title: "Earlier exception detection", description: "Flag missing evidence, duplicates, mismatches, and policy requirements before a proposal, invoice, or financial record advances." },
      { title: "Clear approval ownership", description: "Route review with the relevant context, threshold, deadline, and captured decision rather than relying on scattered email chains." },
      { title: "Stronger process history", description: "Preserve source documents, versions, approvals, signatures, integration events, and correction actions in an understandable lifecycle." }
    ],
    examplesTitle: "Document and finance workflows with explicit controls.",
    examplesIntro: "Automation prepares and coordinates the work; authorized people and financial systems retain the decisions and controls appropriate to the business.",
    examples: [
      { title: "Qualified opportunity to proposal", description: "Validate CRM and scope data, generate the correct template, route pricing or terms exceptions, issue for signature, and return the outcome to the opportunity." },
      { title: "Completed job to invoice readiness", description: "Confirm work status, approved changes, completion evidence, customer billing fields, and purchase-order requirements before creating the accounting handoff." },
      { title: "Inbound document processing", description: "Classify an attachment, extract required fields, match the vendor, customer, project, or case, validate totals or identifiers, and queue uncertainty for review." },
      { title: "Recurring finance packet", description: "Collect defined source records, reconcile required totals, generate a review package, capture approval, and archive the final artifact with its inputs." }
    ],
    idealForTitle: "Document and finance automation is a strong fit when…",
    idealFor: [
      "Employees repeatedly copy approved information into proposals, forms, invoices, or recurring reports.",
      "A financial handoff depends on evidence and status scattered across operations systems, emails, or files.",
      "Document volume and variation are high enough to justify structured intake and exception review.",
      "Approval authority, required evidence, and source-of-truth ownership can be documented.",
      "Accounting, CRM, project, signature, or storage systems provide supported integration access."
    ],
    processIntro: "We map control points and evidence before automating preparation, then validate financial actions against normal and exceptional scenarios.",
    process: [
      { label: "01", title: "Document and control audit", description: "Inventory document types, sources, volumes, templates, records, approvals, signatures, accounting actions, exceptions, retention, and current reconciliation." },
      { label: "02", title: "Data and lifecycle design", description: "Define canonical fields, document states, required evidence, version rules, approval thresholds, authorized actions, and exception ownership." },
      { label: "03", title: "Template and workflow build", description: "Implement intake, extraction, validation, generation, review interfaces, notifications, signature events, integrations, and audit history." },
      { label: "04", title: "Control scenario testing", description: "Test missing and conflicting fields, duplicate files, altered totals, rejected approvals, expired signatures, partial completion, sync failures, and corrections." },
      { label: "05", title: "Controlled operational rollout", description: "Launch one document type or business unit, reconcile automated outputs with existing controls, monitor exception quality, and expand after owner approval." }
    ],
    technology: ["OCR", "OpenAI", "Anthropic", "PDF generation", "E-signature APIs", "QuickBooks", "Xero", "Stripe", "Supabase", "Secure file storage"],
    technologyNote: "The appropriate tools depend on document quality, volume, sensitivity, template complexity, accounting platform, signature provider, and retention rules. AI extraction should be validated before driving consequential records, and accounting controls remain the business’s responsibility.",
    roi: {
      title: "Estimate document value with correction and review included.",
      description: "Measure preparation, chasing, review, correction, and delay by document type. Apply a realistic automation and review rate rather than assuming every document follows the ideal path.",
      formula: "Document opportunity = recoverable preparation and follow-up + reduced correction and delay − review, platform, and support cost",
      factors: ["Documents by type, source, and period", "Preparation, validation, approval, and chasing time", "Incomplete, duplicate, rejected, and corrected document frequency", "Operational or cash-flow impact of delayed completion", "Extraction, signature, storage, accounting, integration, review, and maintenance cost"],
      disclaimer: "This is an operational planning model, not accounting, tax, legal, or financial advice and not a guarantee of savings or faster payment."
    },
    faqs: [
      { question: "What documents can be automated?", answer: "Candidates include proposals, agreements, intake forms, work orders, completion packets, invoices, statements, recurring reports, and structured submissions. Suitability depends on source quality, variation, required judgment, legal or financial consequence, and whether the necessary data and approvals can be defined." },
      { question: "Can AI extract data from PDFs and emailed attachments?", answer: "Yes, but accuracy varies with layout, scan quality, handwriting, tables, and document variation. Extracted values should be validated through formats, totals, cross-references, confidence or policy rules, and human review before consequential use. The original document should remain available as evidence." },
      { question: "Can proposals be generated from our CRM?", answer: "Yes, if the CRM contains approved and sufficiently complete customer, scope, pricing, and ownership data. The workflow can select a governed template, populate fields, route exceptions, issue for signature through a supported provider, and return status to the source record." },
      { question: "Can invoice automation connect to QuickBooks or Xero?", answer: "Potentially, depending on the product edition, permissions, current API capabilities, and the records required. Discovery confirms supported customers, items, taxes, projects, invoices, payments, attachments, and status events. Velixon does not invent unsupported accounting-platform capabilities." },
      { question: "Does automation approve or pay invoices automatically?", answer: "Only if the business explicitly authorizes that scope and appropriate controls can be implemented. Many organizations should automate intake, matching, validation, and approval preparation while leaving posting, payment, or exceptions to authorized people and established financial controls." },
      { question: "How is document history preserved?", answer: "The design can retain source files, generated versions, template version, extracted fields, validation results, approvals, signature events, system identifiers, and correction history according to the agreed retention and access policy. Requirements should be defined with legal, finance, and security stakeholders where applicable." }
    ],
    related: [
      { href: "/services/workflow-automation/", label: "Service", title: "Workflow Automation", description: "Coordinate intake, review, approval, notifications, exceptions, and downstream state." },
      { href: "/services/business-process-automation/", label: "Service", title: "Business Process Automation", description: "Align document and finance controls with the complete operating lifecycle." },
      { href: "/services/ai-automation/", label: "Service", title: "AI Automation", description: "Apply governed classification and extraction to unstructured documents." },
      { href: "/integrations/quickbooks/", label: "Integration", title: "QuickBooks Integration", description: "Connect approved operational records to customer, invoice, payment, and accounting workflows." },
      { href: "/resources/custom-software-roi-cost/", label: "Guide", title: "Custom Software ROI & Cost", description: "Build a realistic investment case using workflow-specific cost and value assumptions." },
      { href: "/integrations/stripe/", label: "Integration", title: "Stripe Integration", description: "Connect payment events and customer billing state to the complete document lifecycle." }
    ],
    reviewedDate: "July 2026"
  },
  {
    collection: "solutions",
    slug: "customer-service-automation",
    name: "Customer Service Automation",
    eyebrow: "Service operations solution",
    metaTitle: "Customer Service Automation & AI Support | Velixon",
    metaDescription: "Connect customer intake, AI-assisted answers, routing, service records, updates, and human escalation across email, chat, SMS, and portals.",
    headline: "Resolve routine service work without losing the human handoff.",
    summary: "Velixon creates a connected service system that understands incoming requests, assembles approved context, completes low-risk steps, and gives your team a clear queue for everything that needs judgment.",
    primaryKeyword: "customer service automation",
    secondaryKeywords: ["AI customer support", "customer support automation", "automated customer service", "service workflow automation"],
    definition: "Customer service automation uses structured intake, routing rules, approved knowledge, AI assistance, workflow actions, notifications, and self-service interfaces to resolve or advance service requests. A production system keeps human escalation available and records what the customer asked, what the system did, and who owns the next step.",
    challengesTitle: "Customers feel the gaps between channels, teams, and records.",
    challengesIntro: "A fast auto-reply does not create a good service experience if the request is misclassified, the answer lacks account context, or the next employee has to ask the customer to repeat everything.",
    challenges: [
      { title: "Requests enter without enough context", description: "Emails and messages omit identifiers, urgency, location, product, or prior history, so employees begin by gathering information instead of resolving the issue." },
      { title: "The same questions are answered inconsistently", description: "Policies and product knowledge are scattered across documents, inboxes, and individual experience, causing response quality to depend on who receives the request." },
      { title: "Routing hides the customer journey", description: "Requests are forwarded between people or channels without a shared case state, ownership, promised update, or complete activity history." },
      { title: "Automation lacks a graceful escape", description: "Customers become trapped in scripted flows because uncertainty, emotion, sensitivity, or a failed system action does not trigger human assistance." }
    ],
    capabilitiesTitle: "A service workflow with context, action, and accountability.",
    capabilitiesIntro: "Velixon combines channel intake, customer records, knowledge, case state, approved automation, and human work queues into one operable service design.",
    capabilities: [
      { title: "Omnichannel request capture", description: "Normalize approved email, form, chat, SMS, WhatsApp, phone, and portal events into a consistent case or service record." },
      { title: "Triage and priority rules", description: "Identify the request type, customer, severity indicators, required information, and responsible team using visible criteria and review paths." },
      { title: "Grounded response assistance", description: "Retrieve approved knowledge and account context to draft or deliver bounded answers, citing the source internally and escalating uncertainty." },
      { title: "Case and workflow actions", description: "Create tasks, request missing information, update status, schedule service, notify owners, and trigger permitted downstream steps." },
      { title: "Self-service portal", description: "Let customers view eligible status, supply documents or details, manage routine requests, and understand the next expected action." },
      { title: "Human escalation workspace", description: "Present the issue, history, attempted actions, relevant records, sentiment or urgency signals, and recommended next step to the employee taking over." }
    ],
    outcomesTitle: "Automate the predictable; improve the exceptional.",
    outcomesIntro: "The system should reduce repetitive handling while giving employees better context for the requests that actually require empathy, judgment, or authority.",
    outcomes: [
      { title: "Faster initial triage", description: "Convert unstructured requests into an owned case, required information, and appropriate priority without waiting for manual sorting." },
      { title: "More consistent answers", description: "Ground routine responses in approved and maintained sources rather than personal memory or unreviewed model knowledge." },
      { title: "Fewer repeated explanations", description: "Carry customer identity, history, collected details, and attempted resolution into the human handoff." },
      { title: "Visible service demand", description: "Track request themes, aging, transfers, missing knowledge, resolution paths, and recurring exceptions to guide improvement." }
    ],
    examplesTitle: "Service workflows that know when to escalate.",
    examplesIntro: "Each workflow sets a supported scope, authoritative knowledge, permitted actions, and a clear exit to a responsible person.",
    examples: [
      { title: "Shared inbox triage", description: "Match the customer, classify the request, gather account context, draft a grounded response, assign priority, and route sensitive or uncertain cases to a person." },
      { title: "Service request intake", description: "Collect location, issue details, availability, images or documents, check required information, create a work record, and explain what happens next." },
      { title: "Order or project status", description: "Verify the requester using an approved method, retrieve eligible status, answer common questions, and open a case when the record does not explain the situation." },
      { title: "Post-service follow-up", description: "Confirm completion, request structured feedback, route unresolved concerns into a recovery queue, and record the outcome against the customer or job." }
    ],
    idealForTitle: "Customer service automation is a strong fit when…",
    idealFor: [
      "A significant portion of incoming requests follow recognizable categories and information requirements.",
      "Approved service knowledge and customer records can be accessed with appropriate permissions.",
      "Employees repeat triage, data gathering, status explanation, or routing work across channels.",
      "The business can define escalation for uncertainty, sensitivity, urgency, and customer preference.",
      "You want to measure resolution quality and demand patterns—not only deflection or message volume."
    ],
    processIntro: "We design from the customer’s intent and the employee’s escalation experience, then release automation only for scenarios the business can support responsibly.",
    process: [
      { label: "01", title: "Service demand analysis", description: "Review request types, channels, volume, handling paths, knowledge sources, customer records, service expectations, and current escalations." },
      { label: "02", title: "Resolution and escalation design", description: "Define supported intents, required identity and context, approved answers and actions, priority rules, handoff triggers, and ownership." },
      { label: "03", title: "Knowledge and system build", description: "Prepare governed knowledge, connect channels and records, create case states, build assistance or self-service, and add operator queues." },
      { label: "04", title: "Service scenario testing", description: "Test unclear language, missing records, frustrated customers, sensitive requests, policy exceptions, conflicting knowledge, failed actions, and channel changes." },
      { label: "05", title: "Controlled coverage expansion", description: "Launch with a limited intent set, review resolution and escalation quality, fill knowledge gaps, and add coverage from evidence." }
    ],
    technology: ["OpenAI", "Anthropic", "Email APIs", "Twilio", "WhatsApp Business Platform", "CRM APIs", "Supabase", "Vector search", "n8n", "Customer portals"],
    technologyNote: "Channel availability and messaging rules depend on provider policies, geography, user consent, and business context. Velixon confirms current technical access during discovery and designs a channel-neutral case model so service history remains coherent.",
    roi: {
      title: "Balance handling efficiency with resolution quality.",
      description: "Estimate repetitive service work that can be resolved or prepared, while accounting for review, escalations, knowledge maintenance, and the cost of incorrect automation.",
      formula: "Service opportunity = recoverable routine handling + reduced repeat-contact and routing cost − review, channel, and system cost",
      factors: ["Requests by intent, channel, and complexity", "Median handling, queue, and transfer time", "Repeat-contact and reopened-case frequency", "Percentage eligible for self-service, assistance, or automation", "Channel, model, knowledge, integration, quality-review, and support cost"],
      disclaimer: "Automation can affect service quality positively or negatively. This planning model does not guarantee savings, resolution, satisfaction, or retention."
    },
    faqs: [
      { question: "What customer service tasks can be automated?", answer: "Common candidates include request capture, identity or record matching, categorization, required-information collection, routine status, grounded FAQs, scheduling, notifications, case creation, and follow-up. Complaints, vulnerable customers, safety issues, complex exceptions, or consequential decisions should have direct human paths." },
      { question: "Can AI answer customers using our own information?", answer: "Yes, through a retrieval and knowledge workflow that selects approved sources and provides relevant context to the model. Source ownership, freshness, access, conflict rules, and escalation for missing evidence are essential. A model should not improvise policy or account facts beyond available records." },
      { question: "Will customer service automation replace our support team?", answer: "The system is designed to reduce repetitive triage and information handling while improving the context available to employees. Human teams remain responsible for judgment, empathy, exceptions, sensitive situations, and service ownership. Staffing decisions belong to the business and should not be inferred from an automation demo." },
      { question: "Can email, SMS, WhatsApp, and web chat share the same service history?", answer: "They can feed a shared case model if identity, consent, channel policy, provider access, and message threading are designed carefully. Not every channel exposes the same capabilities, and customers may need to be moved to a secure portal for sensitive information." },
      { question: "How do you prevent incorrect AI answers?", answer: "Limit supported topics, ground responses in approved sources, validate structured actions, require human review for consequential responses, expose uncertainty and missing context, and monitor real failure cases. No AI system is error-free, so automation authority must match the cost of an error." },
      { question: "Which service metrics matter after automation?", answer: "Useful measures include time to owned response, resolution path, repeat contact, reopen rate, transfer quality, case age, unresolved intent, knowledge gaps, automation overrides, customer feedback, and system errors. Deflection alone can hide poor experiences, so it should not be the sole success measure." }
    ],
    related: [
      { href: "/services/ai-automation/", label: "Service", title: "AI Automation", description: "Combine grounded interpretation with governed workflow actions and human review." },
      { href: "/services/ai-agents/", label: "Service", title: "AI Agents", description: "Build a bounded service agent with approved tools, knowledge, and escalation." },
      { href: "/services/dashboards-portals/", label: "Service", title: "Dashboards & Portals", description: "Give customers secure self-service and employees an actionable service view." },
      { href: "/solutions/appointment-call-automation/", label: "Solution", title: "Appointment & Call Automation", description: "Connect calls, calendars, reminders, confirmations, and staff handoffs." },
      { href: "/services/api-integrations/", label: "Service", title: "API Integrations", description: "Unify service channels with CRM, scheduling, order, and operations records." }
    ],
    reviewedDate: "July 2026"
  },
  ...contractorSolutionLandingPages,
  ...serviceBusinessSolutionLandingPages
];

export const solutionDirectory: DirectoryGroup[] = [
  {
    title: "Revenue and appointment systems",
    description: "Connect first response, qualification, scheduling, follow-up, pipeline state, and operational handoff without turning customer communication into an opaque sequence.",
    items: [
      { href: "/solutions/lead-sales-automation/", label: "Revenue operations", title: "Lead & Sales Automation", description: "Capture, qualify, assign, follow up, update CRM state, and hand won work to delivery." },
      { href: "/solutions/appointment-call-automation/", label: "Scheduling operations", title: "Appointment & Call Automation", description: "Coordinate phone and web intake, availability, confirmations, changes, reminders, and staff context." }
    ]
  },
  {
    title: "Customer and back-office systems",
    description: "Give service and finance teams structured intake, approved automation, visible exceptions, and human ownership across communication and records.",
    items: [
      { href: "/solutions/customer-service-automation/", label: "Service operations", title: "Customer Service Automation", description: "Unify requests, grounded answers, case actions, self-service, and escalation across approved channels." },
      { href: "/solutions/document-finance-automation/", label: "Back-office operations", title: "Document & Finance Automation", description: "Connect extraction, generation, evidence, approvals, signatures, invoice readiness, and accounting handoffs." }
    ]
  },
  {
    title: "Contractor and service-business systems",
    description: "Connect customer demand to delivery, field or project work, communication, documents, and billing while preserving accountable judgment and industry-specific workflow.",
    items: [
      { href: "/solutions/contractors/", label: "Contractor operations", title: "AI Automation for Contractors", description: "Connect lead intake, estimates, jobs, field evidence, changes, closeout, and invoice readiness." },
      { href: "/solutions/service-businesses/", label: "Service operations", title: "AI Automation for Service Businesses", description: "Coordinate inquiry, CRM, scheduling or projects, customer communication, service delivery, and billing handoffs." }
    ]
  }
];
