import type { SeoLandingData } from "./types";

export const phaseOneServiceLandingPages: SeoLandingData[] = [
  {
    collection: "services",
    slug: "ai-integrations",
    name: "AI Integration Services",
    eyebrow: "AI integration services",
    metaTitle: "AI Integration Services for Business Software | Velixon",
    metaDescription: "Velixon integrates AI into business software, data, and workflows with grounded context, secure tools, human review, evaluation, and monitoring.",
    headline: "Integrate AI into the systems where work already happens.",
    summary: "Velixon adds useful AI capabilities to existing applications and operations—connecting approved business context, permissioned actions, evaluation, and human review so the integration can move beyond a disconnected demo.",
    primaryKeyword: "AI integration services",
    secondaryKeywords: ["AI integration company", "custom AI integrations", "AI API integration services", "AI software integration", "AI implementation services"],
    definition: "AI integration connects a model to the software, data, users, and operating controls required for a real business task. The model may interpret language or prepare a recommendation, while the surrounding application verifies identity, retrieves approved context, validates output, controls actions, records events, and routes uncertainty to a person.",
    challengesTitle: "An AI feature is only as useful as the system around it.",
    challengesIntro: "A model can produce an impressive response in isolation. Production value depends on whether the feature has the right context, can act through supported interfaces, respects permissions, and remains observable when inputs or vendors change.",
    challenges: [
      {
        title: "Business context is fragmented",
        description: "Policies, customer records, documents, product data, and operating knowledge live across tools with different owners, access rules, identifiers, and levels of quality."
      },
      {
        title: "The prototype has no production boundary",
        description: "A prompt demonstrates an answer but does not define which users may invoke it, what data it may use, which actions it may take, or who resolves uncertainty."
      },
      {
        title: "Quality is judged by memorable examples",
        description: "Teams remember a few strong outputs without testing ordinary, incomplete, conflicting, adversarial, or sensitive cases against explicit acceptance criteria."
      },
      {
        title: "Model behavior is disconnected from operations",
        description: "Failures, latency, cost, overrides, source gaps, and downstream errors are invisible, leaving employees to discover problems after a customer or record is affected."
      }
    ],
    capabilitiesTitle: "Build the application, data, and control layers around the model.",
    capabilitiesIntro: "Velixon designs the complete integration path—from an approved user request to grounded output, controlled action, evidence, and a recoverable exception.",
    capabilities: [
      {
        title: "AI readiness and workflow design",
        description: "Define the user, task, source context, authority, prohibited behavior, review path, measurable outcome, and responsible release boundary before selecting a model."
      },
      {
        title: "Grounded knowledge and retrieval",
        description: "Connect approved documents, structured records, and application state with access-aware retrieval, source references, freshness rules, and explicit behavior when evidence is missing."
      },
      {
        title: "Embedded copilots and product features",
        description: "Add drafting, summarization, extraction, search, recommendation, or assistance inside the application where users already have identity, context, and a clear next action."
      },
      {
        title: "Permissioned tools and actions",
        description: "Expose narrowly defined application functions so AI can prepare or perform approved work while deterministic code enforces authorization, validation, limits, and idempotency."
      },
      {
        title: "Model selection and routing",
        description: "Choose models according to task quality, latency, context, privacy, availability, and operating cost, with structured interfaces that reduce unnecessary vendor coupling."
      },
      {
        title: "Evaluation and AI operations",
        description: "Create representative test cases, quality measures, release checks, monitoring, feedback, version history, and escalation paths so the integration can be improved from evidence."
      }
    ],
    outcomesTitle: "Turn AI from an isolated interaction into an accountable capability.",
    outcomesIntro: "A well-designed integration helps people complete valuable work while preserving the business rules and evidence required to trust the result.",
    outcomes: [
      {
        title: "Useful context at the point of work",
        description: "Give users answers, drafts, and recommendations grounded in the approved records and workflow state relevant to the task."
      },
      {
        title: "Faster handling without hidden authority",
        description: "Reduce reading, extraction, and first-draft effort while keeping approval and consequential actions with the appropriate role."
      },
      {
        title: "More consistent product behavior",
        description: "Use structured output, validation, evaluation, and deterministic controls instead of relying on an unconstrained conversation to operate the business."
      },
      {
        title: "An integration that can be operated",
        description: "Make quality, usage, cost, latency, failures, overrides, and exceptions visible enough for responsible ownership after launch."
      }
    ],
    examplesTitle: "AI integration patterns that solve a complete task.",
    examplesIntro: "The right pattern depends on data rights, vendor interfaces, consequence, and user workflow. These examples describe system boundaries rather than guaranteed outcomes.",
    examples: [
      {
        title: "CRM research and next-action assistant",
        description: "Summarize approved account history, identify missing context, prepare a follow-up brief, and let the authorized user confirm any CRM update or customer communication."
      },
      {
        title: "Document intake and review queue",
        description: "Extract candidate fields from submitted documents, validate required information against application rules, show source evidence, and route uncertain items to a qualified reviewer."
      },
      {
        title: "Support workspace assistant",
        description: "Retrieve permissioned product and account context, prepare a source-grounded response, suggest the correct category, and escalate sensitive or unsupported requests."
      },
      {
        title: "Operations knowledge inside an internal tool",
        description: "Help employees find the relevant procedure, compare it with current record state, and initiate a controlled workflow without turning a general chat interface into the system of record."
      },
      {
        title: "AI features inside a SaaS product",
        description: "Add tenant-aware extraction, drafting, search, classification, or recommendations with usage limits, administration, evaluation, and clear separation between customer data."
      },
      {
        title: "Conversation-to-workflow handoff",
        description: "Turn an approved call or message summary into structured intake, verify identity and required fields, and pass the work into scheduling, service, or follow-up systems with human escalation."
      }
    ],
    idealForTitle: "AI integration is a strong fit when…",
    idealFor: [
      "A valuable user task includes recurring language, document, call, or knowledge work that deterministic rules alone cannot handle well.",
      "The business can identify approved source information, representative examples, responsible reviewers, and actions the integration must never take on its own.",
      "The existing application or workflow provides a clear place for AI assistance rather than requiring users to adopt another disconnected interface.",
      "Required systems expose supported data or API access and the organization can define source-of-truth ownership.",
      "Leadership is prepared to measure quality and operational value, fund ongoing evaluation, and govern changes after launch."
    ],
    processIntro: "Velixon begins with the user decision and operating boundary, then verifies whether the model, data, integrations, and controls can support it in production.",
    process: [
      {
        label: "01",
        title: "Define the task and authority",
        description: "Map the user, trigger, desired outcome, approved context, decision rules, prohibited behavior, human approvals, failure impact, and measurable baseline."
      },
      {
        label: "02",
        title: "Verify data and interfaces",
        description: "Review source quality, permissions, retention, vendor documentation, API access, authentication, rate limits, model constraints, and environment requirements."
      },
      {
        label: "03",
        title: "Build an evaluation-ready prototype",
        description: "Implement the smallest complete interaction and test it against representative normal, difficult, incomplete, conflicting, and sensitive cases."
      },
      {
        label: "04",
        title: "Engineer the production integration",
        description: "Add identity, access-aware retrieval, structured output, application controls, tool permissions, observability, exception handling, and a safe fallback."
      },
      {
        label: "05",
        title: "Release, measure, and govern",
        description: "Launch with bounded users or authority, monitor quality and value, review overrides and failures, version behavior, and expand only when evidence supports it."
      }
    ],
    technology: ["OpenAI", "Anthropic", "Model APIs", "Structured outputs", "Retrieval systems", "PostgreSQL", "Supabase", "Vector search when appropriate", "Application APIs", "Event queues", "Observability", "Evaluation suites"],
    technologyNote: "The best architecture may use one model, several task-specific models, or no generative model for parts of the workflow. Velixon selects technology after confirming data rights, quality needs, latency, consequence, integration support, and long-term operating ownership.",
    roi: {
      title: "Value the completed task after review and operation.",
      description: "Compare the current workflow with the assisted workflow using representative cases, including the time required to verify output, resolve exceptions, and operate the integration.",
      formula: "AI integration opportunity = handling and capacity value + improved completion or response value − build, review, usage, support, and risk cost",
      factors: [
        "Task volume, current touch time, delay, backlog, and completion rate",
        "Quality targets, reviewer effort, correction rate, and escalation frequency",
        "Integration, data preparation, security, and application work",
        "Model, infrastructure, communication, monitoring, and vendor usage",
        "Ongoing evaluation, support, workflow change, and fallback ownership"
      ],
      disclaimer: "AI quality and business value vary by task, data, users, vendors, and operating controls. This framework does not guarantee savings, accuracy, revenue, availability, or a particular project cost."
    },
    faqs: [
      {
        question: "What is the difference between AI integration and AI automation?",
        answer: "AI integration adds a model-powered capability to software, data, or a user workflow. AI automation is broader when that capability participates in a process that routes, decides, updates systems, and moves work toward an outcome. An integration may assist a user without taking an automated action."
      },
      {
        question: "Can Velixon add AI to software we already use?",
        answer: "Potentially. Discovery verifies whether the application provides supported APIs, extensions, webhooks, data exports, or another appropriate integration surface. The design must also respect user identity, permissions, vendor terms, data rights, rate limits, and the system that owns each record."
      },
      {
        question: "Do we need to move all company data into a vector database?",
        answer: "No. Structured records usually belong in their authoritative database, and many tasks can retrieve them through ordinary queries or application APIs. Vector search can help with selected unstructured content, but it should be used only when retrieval quality, access control, freshness, and operating cost justify it."
      },
      {
        question: "How do you prevent an AI integration from taking the wrong action?",
        answer: "The application should expose limited tools, verify the user and record, validate inputs and allowed state changes, require confirmation for consequential work, use idempotency where actions can repeat, and route uncertainty to a person. The model should not be the final authorization layer."
      },
      {
        question: "Can an AI integration use more than one model provider?",
        answer: "Yes when the operating case justifies it. A structured model interface can route tasks by quality, context, latency, availability, privacy, and cost. Multiple providers also add testing and support complexity, so redundancy should be designed around a real requirement rather than added automatically."
      },
      {
        question: "How is an AI integration tested?",
        answer: "Velixon can build a representative evaluation set covering normal, difficult, incomplete, conflicting, sensitive, and adversarial cases. Testing should measure task-specific quality, unsupported claims, tool selection, permission behavior, latency, cost, human overrides, and the safe handling of failures before authority expands."
      }
    ],
    related: [
      {
        href: "/services/ai-automation/",
        label: "Service",
        title: "AI Automation",
        description: "Connect AI interpretation to governed end-to-end business workflows."
      },
      {
        href: "/services/api-integrations/",
        label: "Service",
        title: "API Integration Services",
        description: "Build the secure, observable data and action pathways between systems."
      },
      {
        href: "/integrations/openai/",
        label: "Integration",
        title: "OpenAI Integration",
        description: "Explore production patterns for OpenAI models, tools, structured output, and evaluation."
      },
      {
        href: "/integrations/supabase/",
        label: "Integration",
        title: "Supabase Development",
        description: "Use governed application data, authentication, storage, and server-side logic around AI features."
      },
      {
        href: "/resources/how-much-does-ai-automation-cost/",
        label: "Guide",
        title: "How Much Does AI Automation Cost?",
        description: "Understand the complete production scope and first-year operating model."
      }
    ],
    reviewedDate: "July 2026"
  }
];
