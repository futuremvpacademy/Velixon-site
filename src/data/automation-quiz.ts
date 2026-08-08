export type AutomationQuizCategoryId =
  | "leads-response"
  | "follow-up-communication"
  | "scheduling-operations"
  | "documents-payments"
  | "data-integrations";

export interface AutomationQuizOption {
  id: string;
  label: string;
  points: number;
}

export interface AutomationQuizQuestion {
  id: string;
  categoryId: AutomationQuizCategoryId;
  prompt: string;
  context: string;
  options: AutomationQuizOption[];
}

export interface AutomationQuizCategory {
  id: AutomationQuizCategoryId;
  label: string;
  shortLabel: string;
  recommendation: string;
}

export interface AutomationQuizLevel {
  min: number;
  label: "Early Stage" | "Developing" | "Operational" | "Optimized";
  summary: string;
}

export const automationQuiz = {
  version: "2026.07.1",
  maximumPointsPerQuestion: 4,
  categories: [
    {
      id: "leads-response",
      label: "Lead Management and Response",
      shortLabel: "Leads and response",
      recommendation: "Centralize new leads, define ownership, and make response time visible before adding more acquisition channels."
    },
    {
      id: "follow-up-communication",
      label: "Follow-Up and Communication",
      shortLabel: "Follow-up",
      recommendation: "Create a consistent follow-up sequence with clear human ownership, useful customer updates, and a defined stopping point."
    },
    {
      id: "scheduling-operations",
      label: "Scheduling and Operations",
      shortLabel: "Operations",
      recommendation: "Document one recurring workflow, its handoffs, and its exceptions before automating the repetitive parts."
    },
    {
      id: "documents-payments",
      label: "Documents and Payments",
      shortLabel: "Documents and payments",
      recommendation: "Connect approved customer and job data to proposals, signatures, invoices, payments, and exception follow-up."
    },
    {
      id: "data-integrations",
      label: "Data, Reporting, and Integrations",
      shortLabel: "Data and integrations",
      recommendation: "Choose a reliable source of truth, remove duplicate entry, and connect systems around measurable workflow states."
    }
  ] satisfies AutomationQuizCategory[],
  levels: [
    {
      min: 75,
      label: "Optimized",
      summary: "Your core workflows are well connected and measured. The next gains are likely to come from targeted improvements, exception handling, and better visibility."
    },
    {
      min: 50,
      label: "Operational",
      summary: "You have dependable systems in several areas, with clear opportunities to connect remaining manual handoffs and improve consistency."
    },
    {
      min: 25,
      label: "Developing",
      summary: "Some useful systems are in place, but manual follow-up, disconnected tools, or inconsistent processes still create avoidable friction."
    },
    {
      min: 0,
      label: "Early Stage",
      summary: "Your best next step is to establish a few reliable foundations before attempting broad automation."
    }
  ] satisfies AutomationQuizLevel[],
  questions: [
    {
      id: "lead-record",
      categoryId: "leads-response",
      prompt: "Where are new leads stored and managed?",
      context: "Think about web forms, calls, referrals, messages, and any other lead source.",
      options: [
        { id: "scattered", label: "Across inboxes, phones, notes, or spreadsheets", points: 0 },
        { id: "mostly-manual", label: "Mostly in one place, but entered or updated manually", points: 1 },
        { id: "centralized", label: "In one central system with a consistent process", points: 3 },
        { id: "centralized-measured", label: "Centralized, assigned automatically, and measured by source and stage", points: 4 }
      ]
    },
    {
      id: "response-speed",
      categoryId: "leads-response",
      prompt: "How reliably does your business respond to a new lead?",
      context: "Choose the answer that reflects the normal process, including busy periods and missed calls.",
      options: [
        { id: "inconsistent", label: "Response time is inconsistent or not tracked", points: 0 },
        { id: "next-day", label: "Usually the next business day or later", points: 1 },
        { id: "same-day", label: "Usually within the same business day", points: 2 },
        { id: "hours", label: "Usually within a few hours", points: 3 },
        { id: "minutes", label: "Usually within minutes, with missed-lead safeguards", points: 4 }
      ]
    },
    {
      id: "follow-up-process",
      categoryId: "follow-up-communication",
      prompt: "What happens when a qualified lead does not respond?",
      context: "Consider reminders, ownership, cadence, and whether follow-up stops for a defined reason.",
      options: [
        { id: "ad-hoc", label: "Follow-up depends on someone remembering", points: 0 },
        { id: "manual-reminders", label: "People use personal reminders or notes", points: 1 },
        { id: "shared-process", label: "A shared process exists, but most actions are manual", points: 2 },
        { id: "partly-automated", label: "Reminders and some messages are automated", points: 3 },
        { id: "owned-measured", label: "The sequence is automated where appropriate, owned, and measured", points: 4 }
      ]
    },
    {
      id: "customer-updates",
      categoryId: "follow-up-communication",
      prompt: "How are customers kept informed after they book or approve work?",
      context: "Include confirmations, reminders, delays, changes, and completion updates.",
      options: [
        { id: "reactive", label: "Customers usually have to ask for updates", points: 0 },
        { id: "manual", label: "Employees send updates manually when they remember", points: 1 },
        { id: "templates", label: "Templates are used, but timing and status are manual", points: 2 },
        { id: "key-updates", label: "Key confirmations and reminders happen automatically", points: 3 },
        { id: "status-driven", label: "Useful updates are triggered by verified workflow status", points: 4 }
      ]
    },
    {
      id: "scheduling",
      categoryId: "scheduling-operations",
      prompt: "How connected is your scheduling process?",
      context: "Think about availability, assignment, reminders, rescheduling, and team visibility.",
      options: [
        { id: "messages", label: "Scheduling is coordinated through calls, texts, or separate calendars", points: 0 },
        { id: "single-calendar", label: "A shared calendar exists, but most coordination is manual", points: 1 },
        { id: "scheduling-tool", label: "A scheduling tool manages appointments or jobs", points: 2 },
        { id: "connected", label: "Scheduling connects to customer records and reminders", points: 3 },
        { id: "exception-aware", label: "Scheduling is connected, role-aware, and handles common exceptions", points: 4 }
      ]
    },
    {
      id: "repetitive-work",
      categoryId: "scheduling-operations",
      prompt: "How does your team handle repetitive administrative work?",
      context: "Examples include copying data, creating tasks, sending routine updates, and assembling reports.",
      options: [
        { id: "mostly-manual", label: "Most repetitive work is completed manually", points: 0 },
        { id: "individual-shortcuts", label: "Individuals use templates or personal shortcuts", points: 1 },
        { id: "some-standardization", label: "Several tasks are standardized but still require manual handoffs", points: 2 },
        { id: "key-automations", label: "High-volume tasks are automated with human review", points: 3 },
        { id: "managed-system", label: "Automation is documented, monitored, and improved over time", points: 4 }
      ]
    },
    {
      id: "proposals-signatures",
      categoryId: "documents-payments",
      prompt: "How are proposals, approvals, and signatures handled?",
      context: "Choose the closest match for the path from approved scope to a signed record.",
      options: [
        { id: "manual-documents", label: "Documents are recreated and sent manually", points: 0 },
        { id: "templates", label: "Templates exist, but data is copied into them", points: 1 },
        { id: "digital-signature", label: "Digital proposals or signatures are available", points: 2 },
        { id: "connected-records", label: "Documents use approved customer and scope data", points: 3 },
        { id: "traceable-flow", label: "Creation, approval, signature, storage, and status are connected", points: 4 }
      ]
    },
    {
      id: "invoices-payments",
      categoryId: "documents-payments",
      prompt: "How connected are invoicing and payment follow-up?",
      context: "Consider invoice creation, online payment, receipts, overdue reminders, and status visibility.",
      options: [
        { id: "manual", label: "Invoices and payment follow-up are mostly manual", points: 0 },
        { id: "accounting-only", label: "Accounting software is used, but handoffs are manual", points: 1 },
        { id: "online-payment", label: "Customers can receive invoices and pay online", points: 2 },
        { id: "automated-reminders", label: "Invoices, receipts, and reminders use reliable automation", points: 3 },
        { id: "workflow-connected", label: "Approved work, invoice state, payment, and exceptions are connected", points: 4 }
      ]
    },
    {
      id: "reporting",
      categoryId: "data-integrations",
      prompt: "How easily can leadership see what is happening in the business?",
      context: "Think about lead stages, response, workload, delays, conversion, and outstanding actions.",
      options: [
        { id: "manual-search", label: "Answers require asking people or searching across systems", points: 0 },
        { id: "manual-reports", label: "Reports are assembled manually in spreadsheets", points: 1 },
        { id: "system-reports", label: "Individual systems provide useful reports", points: 2 },
        { id: "shared-dashboard", label: "A shared dashboard covers the most important measures", points: 3 },
        { id: "trusted-operating-view", label: "Measures are trusted, connected to source records, and reviewed regularly", points: 4 }
      ]
    },
    {
      id: "integrations",
      categoryId: "data-integrations",
      prompt: "How well do your core software systems communicate?",
      context: "Consider customer, job, document, scheduling, accounting, and reporting data.",
      options: [
        { id: "disconnected", label: "Systems are disconnected and data is re-entered", points: 0 },
        { id: "exports", label: "Teams move data with exports, imports, or copy and paste", points: 1 },
        { id: "few-connections", label: "A few useful connections exist", points: 2 },
        { id: "mostly-connected", label: "Core systems share the data needed for common workflows", points: 3 },
        { id: "governed", label: "Connections have clear ownership, error handling, and monitoring", points: 4 }
      ]
    }
  ] satisfies AutomationQuizQuestion[]
} as const;

export type AutomationQuizQuestionId = (typeof automationQuiz.questions)[number]["id"];
export type AutomationQuizAnswers = Partial<Record<AutomationQuizQuestionId, string>>;
