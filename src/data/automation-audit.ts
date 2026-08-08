export const automationAuditOfferName = "Free Business Systems Audit";
export const automationAuditTagline = "Smarter Systems. Better Business.";
export const automationAuditPrimaryCta = "Request Your Free Audit";
export const automationAuditSecondaryCta = "See What You Receive";
export const automationAuditFormAnchor = "#book-audit";

export const automationAuditHeroVariants = {
  A: {
    id: "A",
    headline: "Request Your Free Business Systems Audit",
    subheadline:
      "Tell us where work is slowing down. Within 3 business days, you will receive a personalized one-page scorecard and 3 prioritized recommendations.",
    primaryCta: automationAuditPrimaryCta,
    secondaryCta: automationAuditSecondaryCta
  },
  B: {
    id: "B",
    headline: "Find the Workflow Slowing You Down",
    subheadline:
      "Request a focused review and receive a personalized one-page scorecard with 3 prioritized recommendations within 3 business days.",
    primaryCta: automationAuditPrimaryCta,
    secondaryCta: automationAuditSecondaryCta
  },
  C: {
    id: "C",
    headline: "Get Clear Next Steps for a Better System",
    subheadline:
      "Share the main bottleneck. Within 3 business days, we will send a personalized one-page scorecard and 3 prioritized recommendations.",
    primaryCta: automationAuditPrimaryCta,
    secondaryCta: automationAuditSecondaryCta
  }
} as const;

export type AutomationAuditHeroVariant = keyof typeof automationAuditHeroVariants;
export const defaultAutomationAuditHeroVariant: AutomationAuditHeroVariant = "A";
export const automationAuditHeroVariantOptions = Object.values(automationAuditHeroVariants);

export const automationAuditReassurance =
  "No obligation. Your personalized audit arrives within 3 business days. After delivery, an optional 20-minute strategy call can be arranged manually by email.";

export const automationAuditCredibilityPoints = [
  "Personalized one-page scorecard",
  "3 prioritized recommendations",
  "Delivered within 3 business days"
] as const;

export const automationWorkflowStages = [
  "Lead captured",
  "CRM updated",
  "Follow-up sent",
  "Proposal created",
  "Signature collected",
  "Invoice generated",
  "Payment recorded"
] as const;

export const automationAuditPainPoints = [
  {
    id: "slow-follow-up",
    title: "Slow follow-up",
    description:
      "When inquiries wait hours or days for a response, buyers can move on before your team has a chance to start the conversation."
  },
  {
    id: "duplicate-entry",
    title: "Duplicate data entry",
    description:
      "Copying the same customer and job details between inboxes, spreadsheets, and software consumes paid time and creates more opportunities for mistakes."
  },
  {
    id: "delayed-estimates",
    title: "Delayed estimates and proposals",
    description:
      "Manual preparation and approval steps slow the path from a qualified lead to a decision and make every busy period harder to manage."
  },
  {
    id: "customer-status-gaps",
    title: "Customers wait for updates",
    description:
      "When status updates depend on someone remembering to send them, customers have to ask what is happening and staff must reconstruct the answer."
  },
  {
    id: "disconnected-software",
    title: "Software does not communicate",
    description:
      "Separate applications create broken handoffs, conflicting records, and extra work whenever information needs to move from one system to another."
  },
  {
    id: "limited-visibility",
    title: "Owners cannot clearly see what is happening",
    description:
      "Without one dependable view of leads, work, ownership, and next actions, decisions rely on meetings, memory, and manual reporting."
  }
] as const;

export const beforeVelixonWorkflow = [
  "Disconnected systems",
  "Manual entry",
  "Missed follow-ups",
  "Delayed proposals",
  "Unclear ownership",
  "Repetitive work"
] as const;

export const afterVelixonWorkflow = [
  "One connected workflow",
  "Automatic lead routing",
  "Consistent follow-up",
  "Faster proposal workflows",
  "Clear accountability",
  "Real-time visibility"
] as const;

export const automationSolutions = [
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "Connect tools and remove repetitive administrative work from dependable, repeatable processes.",
    outcome: "Give the team fewer manual handoffs and a clearer next action."
  },
  {
    id: "ai-automations",
    title: "AI Automations",
    description:
      "Use AI where it is appropriate for lead qualification, internal assistance, document processing, customer communication, and operational workflows.",
    outcome: "Help people review information and move routine work forward with defined human oversight."
  },
  {
    id: "crm-sales-systems",
    title: "CRM and Sales Systems",
    description: "Create clear pipelines, automatic follow-up, reminders, task assignment, and practical reporting.",
    outcome: "Make lead ownership and sales activity easier to see and manage."
  },
  {
    id: "custom-business-software",
    title: "Custom Business Software",
    description:
      "Build internal portals, dashboards, quoting systems, scheduling tools, customer portals, and specialized applications around the real workflow.",
    outcome: "Replace workarounds with a maintainable system designed for the operation."
  },
  {
    id: "website-lead-systems",
    title: "Website and Lead Systems",
    description: "Build websites and landing pages that capture, qualify, route, and follow up with leads.",
    outcome: "Create a clearer path from first visit to the right next conversation."
  },
  {
    id: "integrations",
    title: "Integrations",
    description:
      "Connect supported platforms such as Stripe, QuickBooks, Gmail, Google Calendar, Supabase, Twilio, Zapier, Make, n8n, CRMs, and internal systems.",
    outcome: "Keep information moving between the tools the business depends on."
  }
] as const;

export const automationAuditProcess = [
  {
    number: "01",
    title: "Share the bottleneck",
    description: "Send the essentials about your business and the main process or system slowing work down.",
    expectation: "The request takes about 2 minutes and does not require revenue, budget, software, or call-scheduling details."
  },
  {
    number: "02",
    title: "Velixon reviews the system",
    description: "We assess the bottleneck and the public business information available from the details you provide.",
    expectation: "We may email a concise clarification if the request needs more context."
  },
  {
    number: "03",
    title: "Receive your audit",
    description: "Within 3 business days, you receive a personalized one-page scorecard and 3 prioritized recommendations.",
    expectation: "The audit is free and does not require a purchase or meeting."
  },
  {
    number: "04",
    title: "Choose what happens next",
    description: "Review the recommendations on your own or reply to the delivery email to request an optional 20-minute strategy call.",
    expectation: "Velixon arranges optional calls manually after delivery. Implementation is scoped separately only if you want help."
  }
] as const;

export const automationAuditProcessNote =
  "The personalized one-page scorecard and 3 prioritized recommendations arrive within 3 business days. Optional 20-minute strategy calls are arranged manually by email after delivery.";

export const automationAuditCapabilityProof = [
  {
    title: "Automated lead routing",
    description: "Assign inquiries by clear rules and give the right person a visible next action."
  },
  {
    title: "Faster proposal workflows",
    description: "Reduce the manual steps between qualified opportunity, prepared proposal, approval, and follow-up."
  },
  {
    title: "Connected scheduling and invoicing",
    description: "Carry approved customer and job context into the next operational and financial steps."
  },
  {
    title: "Reduced duplicate data entry",
    description: "Move approved information between supported systems without asking staff to retype the same details."
  },
  {
    title: "Centralized operational visibility",
    description: "Bring status, ownership, and exceptions into one clear view for the people responsible for the work."
  }
] as const;

export const automationAuditProofDisclaimer =
  "These are examples of systems Velixon can design and implement. They are not presented as measured client outcomes.";

export const automationAuditGoodFit = [
  "Your team repeats the same administrative tasks",
  "Leads are not consistently followed up with",
  "You use multiple disconnected applications",
  "Your growth is creating operational problems",
  "You need a system built around your workflow",
  "You are prepared to invest in improving operations"
] as const;

export const automationAuditNotFit = [
  "You only want the cheapest website possible",
  "You are unwilling to change inefficient processes",
  "You want unsupported overnight revenue promises",
  "You do not have a clear business problem to solve"
] as const;

export const automationAuditFaqs = [
  {
    question: "What happens during the free audit?",
    answer:
      "We review the main bottleneck and the public business information available from the details you provide. Within 3 business days, we email a personalized one-page scorecard and 3 prioritized recommendations."
  },
  {
    question: "Is the audit actually free?",
    answer:
      "Yes. The Free Business Systems Audit is free. No purchase or meeting is required. After delivery, you may reply to the audit email to request an optional 20-minute strategy call, which Velixon arranges manually."
  },
  {
    question: "What kinds of businesses do you work with?",
    answer:
      "Velixon is best suited to growing service businesses and professional operations with repeatable workflows, multiple tools, and a clear operational problem to improve."
  },
  {
    question: "What can Velixon automate?",
    answer:
      "Common opportunities include lead capture and routing, follow-up, scheduling, document handling, proposals, invoicing handoffs, notifications, reporting, and repetitive internal tasks."
  },
  {
    question: "Can you work with our existing software?",
    answer:
      "Often, yes. We review what should remain, what can be connected, and what may need to change based on supported access, workflow fit, and long-term maintainability."
  },
  {
    question: "Do you build custom applications?",
    answer:
      "Yes. Velixon builds internal portals, dashboards, quoting and scheduling tools, customer portals, specialized workflows, and other custom business applications."
  },
  {
    question: "How much does implementation cost?",
    answer:
      "Cost depends on scope, integrations, data, user roles, risk, and support needs. The audit is free; any paid implementation is scoped clearly before work begins."
  },
  {
    question: "How long does a project take?",
    answer:
      "Timing varies with complexity. A focused workflow can move faster than a multi-system application, and realistic milestones are defined after the dependencies are understood."
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Ongoing monitoring, maintenance, and improvement can be included when the system and business need continued support. The responsibilities are defined in the project scope."
  },
  {
    question: "Will automation replace my employees?",
    answer:
      "The goal is usually to reduce repetitive administrative work and give employees better information. Staffing decisions remain with your business, and important decisions should retain appropriate human oversight."
  },
  {
    question: "How do you protect business data?",
    answer:
      "Do not submit passwords, customer records, payment data, health information, or other sensitive material in the audit. Before implementation, data scope, access, storage, providers, and security requirements are defined for the specific system."
  },
  {
    question: "What happens after the audit?",
    answer:
      "You can act on the recommendations yourself, reply to the delivery email to request a manually arranged optional 20-minute strategy call, ask Velixon to scope implementation, or take no further action. There is no implementation obligation."
  }
] as const;

export const automationAuditFinalCta = {
  headline: "Stop Letting Manual Work Control Your Growth",
  supportingText:
    "Request your personalized one-page scorecard and 3 prioritized recommendations. We will email them within 3 business days.",
  cta: automationAuditPrimaryCta,
  reassurance: "No obligation. No required call. After delivery, an optional 20-minute strategy call can be arranged manually by email."
} as const;
