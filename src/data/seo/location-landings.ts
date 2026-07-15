import type { DirectoryGroup, SeoLandingData } from "./types";
import { phaseOneLocationLandingPages } from "./location-landings-phase-one";

export const locationLandingPages: SeoLandingData[] = [
  {
    collection: "locations",
    slug: "utah",
    name: "AI Automation Agency in Utah",
    eyebrow: "Utah service area",
    metaTitle: "AI Automation Agency in Utah | Custom Systems | Velixon",
    metaDescription: "Velixon serves Utah businesses with AI automation, custom software, CRM, workflow, voice AI, portals, dashboards, and integrations.",
    headline: "AI automation for Utah businesses ready to scale the system.",
    summary: "Velixon designs custom AI, workflow automation, and business software for Utah organizations—from field and professional services to advanced manufacturing, life sciences, healthcare, finance, fintech, and technology teams.",
    primaryKeyword: "AI automation agency in Utah",
    secondaryKeywords: ["Utah AI automation company", "business automation Utah", "custom AI software Utah", "AI consulting Utah"],
    definition: "An AI automation agency serving Utah maps a company's real workflow, connects approved business systems, and builds governed software that can interpret information, move routine work, and surface exceptions. Local relevance comes from understanding the region's operating sectors and service expectations—not from repeating a city name or claiming an office that does not exist.",
    definitionLabel: "What local service means",
    challengesTitle: "Utah growth can expose the limits of an improvised operating stack.",
    challengesIntro: "The right system depends on whether the company coordinates field crews, regulated client records, multi-entity finance, production work, software customers, or teams spread across the Wasatch Front and the rest of the state.",
    challenges: [
      { title: "Fast-growing teams inherit manual handoffs", description: "A process that worked through founder knowledge and shared spreadsheets becomes a daily coordination burden as customers, employees, locations, and service lines increase." },
      { title: "Statewide operations cross different realities", description: "Territory, travel, connectivity, seasonality, branch ownership, and local scheduling constraints can make a one-size national workflow impractical for Utah field and service organizations." },
      { title: "Target industries carry different risk", description: "Utah's technology, life-sciences, healthcare, advanced-manufacturing, finance, fintech, and aerospace organizations require different data, security, traceability, and human-review boundaries." },
      { title: "Software subscriptions do not form one system", description: "CRM, accounting, phone, forms, calendars, documents, project tools, and databases may each work while employees still move the record between them manually." }
    ],
    capabilitiesTitle: "Build the operating layer the Utah business actually needs.",
    capabilitiesIntro: "Velixon can begin with a focused workflow assessment, then build the smallest maintainable system that improves one valuable flow without forcing a broad replacement.",
    capabilities: [
      { title: "Utah operations assessment", description: "Map a representative workflow, branch or territory differences, systems, data sensitivity, constraints, exceptions, and a measurable baseline before selecting technology." },
      { title: "AI intake and employee assistance", description: "Classify requests, extract approved information, prepare grounded drafts, and route work with permissions, source context, evaluation, and human approval." },
      { title: "Field and project automation", description: "Connect leads, estimates, scheduling, field evidence, approvals, customer updates, closeout, and billing for construction and service businesses." },
      { title: "Regulated administrative workflows", description: "Design minimum-necessary, review-centered systems for healthcare, finance, legal, and other sensitive operations without automating professional judgment." },
      { title: "Manufacturing and supply workflows", description: "Support quote-to-order, readiness, quality exceptions, maintenance coordination, supplier documents, and production visibility through approved integrations." },
      { title: "Custom CRM, portal, and dashboard systems", description: "Build customer, employee, partner, or operational interfaces around durable records, role permissions, audit history, and integrations." }
    ],
    outcomesTitle: "Create capacity without losing Utah-specific operating context.",
    outcomesIntro: "A valuable local engagement produces a system the team can own, supervise, and adapt as locations, customers, policies, and markets change.",
    outcomes: [
      { title: "Faster response across service areas", description: "Capture complete requests and route them by approved territory, capability, urgency, and ownership rules." },
      { title: "Less branch and department reconciliation", description: "Use shared identifiers and source-of-truth rules while preserving the differences that a location or business unit genuinely needs." },
      { title: "More controlled AI adoption", description: "Start with a bounded workflow, defined data access, human review, and an evaluation plan instead of an open-ended AI employee mandate." },
      { title: "Owned operational leverage", description: "Build a maintainable system around the company's durable process rather than accumulating another disconnected subscription." }
    ],
    examplesTitle: "Utah automation opportunities grounded in the regional economy.",
    examplesIntro: "The Governor's Office of Economic Opportunity identifies technology, advanced manufacturing, life sciences and healthcare, finance and fintech, and aerospace and defense among Utah's targeted industries. These examples address concrete workflows within those and other major local operating sectors.",
    examples: [
      { title: "Contractor estimate to production", description: "Carry approved scope, property context, selections, schedule prerequisites, field records, changes, completion evidence, and invoice readiness through one job lifecycle." },
      { title: "Advanced-manufacturing exception flow", description: "Connect work-order readiness, material constraints, supplier documentation, quality events, responsible review, and shipment status without bypassing plant controls." },
      { title: "Healthcare administrative intake", description: "Collect minimum-necessary appointment or referral information through approved channels and route clinical, urgent, or sensitive content to qualified staff." },
      { title: "Finance and fintech client onboarding", description: "Coordinate identity, entity, agreements, documents, risk or compliance review, account setup, and service activation with traceable approval." },
      { title: "SaaS customer onboarding and support", description: "Connect contract state, workspace provisioning, identity, data migration, training, support context, usage signals, and renewal readiness." },
      { title: "Multi-territory home service intake", description: "Qualify calls and forms by service, Utah coverage, technician capability, urgency, availability, and human escalation before a booking promise." }
    ],
    idealForTitle: "A Utah-focused automation engagement is a strong fit when…",
    idealFor: [
      "The company serves Utah customers, operates Utah teams or facilities, or needs workflows that reflect state and regional service realities.",
      "A valuable process crosses two or more employees, systems, departments, branches, or customer touchpoints.",
      "Leadership can provide representative records and process owners while protecting sensitive information during discovery.",
      "The first project has a measurable baseline and can be bounded without trying to automate every operation at once.",
      "The organization wants to own a maintainable system and assign people to govern it after launch."
    ],
    processIntro: "Velixon can deliver discovery and implementation remotely for Utah teams, with any on-site work discussed and scoped explicitly rather than assumed from a location page.",
    process: [
      { label: "01", title: "Utah workflow assessment", description: "Identify the process, affected locations or territories, users, systems, constraints, data classifications, exception patterns, and current measures." },
      { label: "02", title: "Business case and guardrails", description: "Define the target outcome, baseline, source records, permissions, prohibited actions, human approvals, security responsibilities, and realistic ROI range." },
      { label: "03", title: "Representative prototype", description: "Test routine and Utah-specific edge cases with the employees who own the workflow before committing to full integration." },
      { label: "04", title: "Production build and connection", description: "Implement the application, automation, or AI layer with supported APIs, visible exceptions, audit events, and documented recovery." },
      { label: "05", title: "Controlled Utah rollout", description: "Launch by workflow, team, location, territory, or customer cohort; compare evidence; and expand only after the system is stable." }
    ],
    technology: ["OpenAI", "Anthropic", "Google Gemini", "n8n", "Make", "Zapier", "Supabase", "PostgreSQL", "HubSpot", "QuickBooks", "Twilio", "Microsoft 365", "Google Workspace"],
    technologyNote: "Technology depends on the workflow, data, risk, vendor access, and ownership model. This page identifies Utah as an area Velixon serves; it does not claim a walk-in office or physical address in Utah. Remote meetings are available, and any on-site work, travel, availability, or location requirement must be confirmed in the project scope.",
    roi: {
      title: "Build a Utah automation case from local operating evidence.",
      description: "Use actual Utah team, customer, branch, project, or facility volume. Separate software-addressable coordination from travel, labor, market, regulatory, and physical constraints that remain.",
      formula: "Annual opportunity = recoverable handling and coordination + reduced information-driven delay and rework − implementation and ownership cost",
      factors: ["Workflow volume by Utah team, territory, branch, facility, service, or customer type", "Fully loaded employee time spent entering, locating, routing, checking, and reporting", "Delay or rework attributable specifically to missing or disconnected information", "Human review, professional judgment, branch control, and exception effort that remains", "Software, model, integration, security, training, support, travel, and governance cost"],
      disclaimer: "This is a planning framework, not a guarantee of Utah market growth, jobs, revenue, savings, compliance, or operational outcomes. Validate assumptions with company records."
    },
    faqs: [
      { question: "Does Velixon have a physical office in Utah?", answer: "This page does not claim a physical or walk-in Utah office. It identifies Utah as a service area for project-based AI automation and custom software. Confirm meeting format, on-site needs, travel, and availability directly for the proposed engagement." },
      { question: "Can Velixon serve businesses outside the Wasatch Front?", answer: "Yes, projects can be delivered remotely to Utah organizations. A statewide field or branch workflow should explicitly account for territory, travel, connectivity, and local process differences. Any on-site work is agreed case by case." },
      { question: "Which Utah industries are a strong fit for automation?", answer: "Strong fit depends on workflow rather than industry label. Utah's technology, advanced manufacturing, healthcare and life sciences, finance and fintech, aerospace, construction, field service, and professional firms can all have high-value processes when volume, rules, data, risk, and outcomes are clear." },
      { question: "Can you work with our existing Utah software vendor or IT provider?", answer: "Yes. Velixon can define responsibilities with internal IT, managed providers, software vendors, and security or compliance teams. Discovery confirms access, environments, change control, support ownership, and incident communication before production work." },
      { question: "Can Velixon help us apply for Utah grants or incentives?", answer: "Velixon does not promise eligibility, funding, or tax treatment. The system business case can document scope and expected operational value, but the company should work with the relevant Utah program and qualified legal, tax, or grant advisors." },
      { question: "What should a Utah company automate first?", answer: "Choose a frequent workflow with a measurable delay or handling burden, reliable source data, an accountable owner, and manageable consequences. A narrow Utah team or service line often provides better evidence than a statewide, company-wide launch." }
    ],
    related: [
      { href: "/locations/salt-lake-city/", label: "Utah market", title: "AI Automation in Salt Lake City", description: "Explore systems for Salt Lake City's finance, healthcare, logistics, manufacturing, and growth businesses." },
      { href: "/industries/construction/", label: "Industry", title: "Construction Automation", description: "Connect estimating, projects, field evidence, changes, closeout, and billing." },
      { href: "/industries/manufacturing/", label: "Industry", title: "Manufacturing Automation", description: "Build exception-aware production, quality, maintenance, and supplier workflows." },
      { href: "/services/ai-automation/", label: "Service", title: "AI Automation", description: "Design governed AI workflows with approved data, tools, and review." },
      { href: "/services/custom-crm/", label: "Service", title: "Custom CRM Development", description: "Build customer and operational records around the Utah business model." }
    ],
    reviewedDate: "July 2026"
  },
  {
    collection: "locations",
    slug: "salt-lake-city",
    name: "AI Automation Agency in Salt Lake City",
    eyebrow: "Salt Lake City service area",
    metaTitle: "AI Automation Agency in Salt Lake City | Velixon",
    metaDescription: "Velixon serves Salt Lake City businesses with AI automation, custom software, CRM, voice AI, portals, dashboards, and integrations.",
    headline: "AI automation for Salt Lake City's connected economy.",
    summary: "Build custom systems for the operational handoffs inside Salt Lake City finance, healthcare, life sciences, logistics, distribution, manufacturing, outdoor products, gaming, professional services, and growing local businesses.",
    primaryKeyword: "AI automation agency in Salt Lake City",
    secondaryKeywords: ["Salt Lake City AI automation", "business automation Salt Lake City", "custom software Salt Lake City", "AI consulting Salt Lake City"],
    definition: "An AI automation agency serving Salt Lake City designs software around the records, customers, systems, and risk of a local operation. The city's economic development department highlights industries including outdoor products, life sciences, healthcare, finance, logistics, manufacturing, distribution, and gaming; each requires a different automation boundary and measure of value.",
    definitionLabel: "Salt Lake City context",
    sources: [
      {
        title: "Salt Lake City Department of Economic Development — Business Development",
        href: "https://www.slc.gov/ed/business-development/"
      }
    ],
    challengesTitle: "A regional hub creates more connections—and more handoffs to manage.",
    challengesIntro: "Salt Lake City businesses may serve neighborhood customers, the Wasatch Front, statewide operations, or national markets. Systems must support that reach without erasing local service, facility, and compliance constraints.",
    challenges: [
      { title: "Growth adds systems faster than architecture", description: "Sales, service, finance, operations, and support adopt useful products independently, leaving employees to reconcile the customer or work record between them." },
      { title: "Multi-location work lacks shared state", description: "Headquarters, branches, warehouses, clinics, facilities, field teams, and partners need common identifiers and measures while retaining role and location control." },
      { title: "High-value sectors handle sensitive context", description: "Finance, healthcare, life sciences, and professional organizations need data minimization, permission, source, approval, retention, and vendor controls before AI is useful." },
      { title: "Physical and digital operations diverge", description: "Logistics, distribution, manufacturing, outdoor products, and local services can have accurate software records that still lag material, inventory, field, or facility reality." }
    ],
    capabilitiesTitle: "Connect Salt Lake City customer and operational workflows.",
    capabilitiesIntro: "Velixon starts with the highest-value handoff and can integrate established platforms, build a focused application, or combine deterministic automation with carefully governed AI.",
    capabilities: [
      { title: "Local customer intake and routing", description: "Qualify requests by service, location, account, urgency, language, capacity, and approved rules before assigning a person or offering a next step." },
      { title: "Finance and professional workflows", description: "Coordinate secure onboarding, documents, questions, approvals, recurring service, reporting, and billing while retaining qualified review." },
      { title: "Healthcare and life-science administration", description: "Build minimum-necessary intake, referral, document, request, project, or quality-support workflows around approved vendors and role access." },
      { title: "Logistics and distribution exceptions", description: "Connect order, inventory, warehouse, carrier, delivery, customer, and finance events so missing or conflicting state reaches an accountable queue." },
      { title: "Manufacturing and facility operations", description: "Support work readiness, quality events, maintenance coordination, supplier records, and operational dashboards without bypassing plant controls." },
      { title: "Outdoor, retail, and product systems", description: "Connect wholesale and direct customers, orders, inventory context, service, warranty, content, and support across approved commerce and operations tools." }
    ],
    outcomesTitle: "Help a Salt Lake City team operate as one system.",
    outcomesIntro: "Local relevance should appear in the workflow and constraints—not in unsupported claims about proximity, physical offices, or guaranteed market results.",
    outcomes: [
      { title: "More consistent regional service", description: "Route customers and work through explicit location, service, capacity, and escalation rules across Salt Lake City and connected markets." },
      { title: "Faster cross-system exceptions", description: "Send inconsistent orders, records, documents, inventory, or approvals to a visible owner instead of a silent failure." },
      { title: "Safer AI in sensitive sectors", description: "Limit data and tool access, preserve sources, require qualified approval, and evaluate the workflow before expanding authority." },
      { title: "Better multi-location visibility", description: "Use common definitions and source-linked dashboards while preserving facility, branch, account, or role permissions." }
    ],
    examplesTitle: "Salt Lake City workflows with genuine local-sector relevance.",
    examplesIntro: "These examples reflect industries identified by Salt Lake City economic development and the operational patterns of a regional business hub.",
    examples: [
      { title: "Distribution order exception", description: "Match order, inventory, warehouse, carrier, delivery promise, and customer records; route quantity, address, damage, delay, or billing mismatches to the right team." },
      { title: "Healthcare referral administration", description: "Track minimum-necessary referral information, records, authorization state, patient outreach, appointment readiness, and human escalation through approved systems." },
      { title: "Financial client onboarding", description: "Coordinate entity and authorized contacts, agreements, secure documents, required review, account or engagement setup, and status communication." },
      { title: "Outdoor-products wholesale workflow", description: "Connect retailer or distributor onboarding, catalog and price context, order requirements, inventory signals, fulfillment exceptions, service, and warranty history." },
      { title: "Manufacturing readiness and quality", description: "Surface material, document, tooling, supplier, or revision blockers and route quality events to authorized personnel with source evidence." },
      { title: "Multi-location customer support", description: "Match parent account and location, retrieve approved service history, classify the request, assign regional ownership, and keep the customer updated." }
    ],
    idealForTitle: "A Salt Lake City automation engagement is a strong fit when…",
    idealFor: [
      "The company serves Salt Lake City customers, operates a local team or facility, or coordinates work across the surrounding regional economy.",
      "The target workflow crosses customer, branch, warehouse, clinic, facility, field, professional, or finance roles.",
      "The business can identify authoritative records and a person responsible for each exception and approval.",
      "Sensitive or regulated work can be bounded by purpose, minimum data, approved vendors, and qualified review.",
      "The team wants a maintainable system with evidence of value rather than a generic AI demonstration."
    ],
    processIntro: "Projects can be delivered remotely, with Salt Lake City on-site work discussed only when it materially helps discovery, rollout, or training and is explicitly included in scope.",
    process: [
      { label: "01", title: "Salt Lake City operations review", description: "Map the customer and work lifecycle, local facilities or service areas, systems, sensitive data, ownership, constraints, and representative exception cases." },
      { label: "02", title: "Architecture and value boundary", description: "Define the first measurable outcome, source systems, permissions, branch or facility rules, human approvals, security controls, and total ownership cost." },
      { label: "03", title: "Local-sector scenario prototype", description: "Test common and high-consequence cases with employees who understand the customer, facility, professional, warehouse, or production reality." },
      { label: "04", title: "Supported integration and build", description: "Connect approved systems, implement application and workflow logic, and make synchronization failures and uncertain AI outputs visible." },
      { label: "05", title: "Team or facility rollout", description: "Launch to a bounded Salt Lake City user group or operation, measure handling and exceptions, and expand after owners accept the evidence." }
    ],
    technology: ["OpenAI", "Anthropic", "Google Gemini", "n8n", "Make", "Zapier", "Supabase", "PostgreSQL", "HubSpot", "Salesforce", "QuickBooks", "Twilio", "Microsoft 365", "Google Workspace"],
    technologyNote: "The stack depends on sector risk, source-system access, security requirements, latency, volume, and ownership. This page describes Salt Lake City as a service area and does not represent that Velixon maintains a physical or walk-in office in the city. Confirm remote, on-site, travel, and availability requirements directly.",
    roi: {
      title: "Value Salt Lake City automation at the operating constraint.",
      description: "Use local team, facility, customer, order, engagement, or service data. Include multi-location coordination and security cost while excluding physical constraints the software cannot change.",
      formula: "Annual opportunity = recoverable local coordination + reduced information-driven delay and rework + retired tool cost − system ownership cost",
      factors: ["Workflow volume by Salt Lake City customer, team, facility, location, or service line", "Time spent matching, routing, entering, checking, escalating, and reporting", "Exceptions and delay specifically attributable to disconnected information or unclear ownership", "Qualified review, facility control, physical handling, and customer decision time that remains", "Software, model, integration, security, training, support, travel, and process-governance cost"],
      disclaimer: "No local page can guarantee demand, regional growth, jobs, revenue, savings, compliance, or operational performance. Validate the case with company records and accountable owners."
    },
    faqs: [
      { question: "Does Velixon have an office in Salt Lake City?", answer: "This page does not claim a physical or walk-in Salt Lake City office. It identifies the city as an area Velixon serves for project-based AI automation and custom software. Meeting, on-site, travel, and availability needs should be confirmed for the engagement." },
      { question: "Which Salt Lake City industries can Velixon support?", answer: "Fit depends on the workflow. Salt Lake City identifies outdoor products, life sciences, healthcare, finance, logistics, manufacturing, distribution, and gaming among key industries; Velixon also serves professional, technology, construction, field-service, and other growing organizations." },
      { question: "Can Velixon meet with our Salt Lake City team on site?", answer: "Potentially, when on-site discovery, facility observation, rollout, or training materially benefits the project. It is not implied by the location page and must be agreed based on need, access, travel, security, and availability." },
      { question: "Can automation connect warehouse, office, and customer systems?", answer: "Yes, when the products provide supported interfaces and the business defines source ownership. The design should handle delayed physical events, duplicates, partial fulfillment, stale inventory, carrier updates, and exception ownership instead of assuming every sync is correct." },
      { question: "Can you build for Salt Lake City healthcare or finance firms?", answer: "Velixon can build administrative and operational systems with data minimization, role access, approved vendors, logging, and qualified review. The organization remains responsible for determining and meeting HIPAA, financial, professional, contractual, and other obligations." },
      { question: "What should a Salt Lake City business automate first?", answer: "Choose a workflow where local customer or facility volume creates measurable handling or delay and where one team can own the first rollout. Intake routing, client onboarding, order exceptions, readiness, or document collection are often easier to evaluate than a broad AI-agent program." }
    ],
    related: [
      { href: "/locations/utah/", label: "Service area", title: "AI Automation in Utah", description: "Explore statewide automation for Utah field, technology, healthcare, finance, and manufacturing teams." },
      { href: "/industries/manufacturing/", label: "Industry", title: "Manufacturing Automation", description: "Connect production readiness, quality, maintenance, suppliers, and shipment review." },
      { href: "/industries/accounting-financial-services/", label: "Industry", title: "Accounting & Financial Services", description: "Build controlled onboarding, document, review, reporting, and billing workflows." },
      { href: "/services/ai-automation/", label: "Service", title: "AI Automation", description: "Design governed AI systems around approved data, tools, and review." },
      { href: "/services/business-process-automation/", label: "Service", title: "Business Process Automation", description: "Turn multi-team handoffs into visible, exception-aware workflows." }
    ],
    reviewedDate: "July 2026"
  },
  ...phaseOneLocationLandingPages
];

export const locationDirectory: DirectoryGroup[] = [
  {
    title: "Utah service areas that clear the unique-value standard",
    description: "These pages contain distinct regional and industry context. Velixon has intentionally not generated thin pages for every city or state.",
    items: [
      { href: "/locations/utah/", label: "Statewide", title: "AI Automation Agency in Utah", description: "Systems for Utah technology, healthcare, life sciences, finance, manufacturing, construction, and service organizations." },
      { href: "/locations/lehi/", label: "Lehi", title: "AI Automation & Custom Software in Lehi", description: "Systems for Utah County technology, professional, contractor, and service-business operations without a manufactured office claim." },
      { href: "/locations/salt-lake-city/", label: "Salt Lake City", title: "AI Automation Agency in Salt Lake City", description: "Automation for the city's finance, healthcare, logistics, distribution, manufacturing, outdoor, and growth economy." }
    ]
  }
];
