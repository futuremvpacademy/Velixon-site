export interface ChecklistItem {
  id: string;
  label: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
}

export interface ChecklistDefinition {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  categories: ChecklistCategory[];
}

export const checklists = [
  {
    slug: "website-conversion",
    title: "Website Conversion Checklist",
    shortTitle: "Website Conversion",
    description: "Review the website elements that help visitors understand, trust, and contact your business across mobile usability, conversion, accessibility, and measurement.",
    intro: "Use this checklist on both desktop and a real phone. Check an item only when it works clearly for a first-time visitor—not merely because the element exists.",
    categories: [
      {
        id: "clarity",
        title: "Message and clarity",
        description: "A visitor should quickly understand what you do, who it is for, and what to do next.",
        items: [
          { id: "clear-offer", label: "The primary offer is clear without scrolling." },
          { id: "specific-audience", label: "The page explains who the service is for and what problem it solves." },
          { id: "primary-action", label: "One primary action is more prominent than secondary links." }
        ]
      },
      {
        id: "mobile-usability",
        title: "Mobile usability",
        description: "The mobile experience should remain readable, fast, and easy to act on.",
        items: [
          { id: "mobile-layout", label: "Text, images, forms, and buttons fit without horizontal scrolling." },
          { id: "tap-targets", label: "Links and controls are easy to tap without accidental clicks." },
          { id: "mobile-speed", label: "Important content appears quickly on a typical mobile connection." }
        ]
      },
      {
        id: "trust-conversion",
        title: "Trust and conversion",
        description: "Calls to action work best when the next step feels credible and low-friction.",
        items: [
          { id: "trust-evidence", label: "Real reviews, project evidence, credentials, or process details support key claims." },
          { id: "contact-options", label: "Contact or booking options are easy to find and work correctly." },
          { id: "form-friction", label: "The main form asks only for information needed at that stage." }
        ]
      },
      {
        id: "measurement-accessibility",
        title: "Measurement and accessibility",
        description: "A reliable website is measurable and usable by more people.",
        items: [
          { id: "analytics", label: "Analytics records meaningful visits and conversion actions with appropriate consent." },
          { id: "conversion-tracking", label: "Form submissions, calls, bookings, or purchases can be traced to their source." },
          { id: "accessible-basics", label: "Headings, labels, keyboard focus, contrast, links, and image alternatives are usable." }
        ]
      }
    ]
  },
  {
    slug: "lead-follow-up",
    title: "Lead Follow-Up Checklist",
    shortTitle: "Lead Follow-Up",
    description: "Review whether every qualified lead receives a timely, owned, and measurable response across capture, follow-up cadence, pipeline visibility, and reporting.",
    intro: "Follow one recent lead from its original source through the final outcome. Use actual records where possible instead of answering from memory.",
    categories: [
      {
        id: "capture",
        title: "Capture and ownership",
        description: "Every lead needs a reliable record and an accountable next owner.",
        items: [
          { id: "all-sources", label: "Website forms, calls, messages, referrals, and campaigns enter a visible process." },
          { id: "source-recorded", label: "The original lead source is recorded consistently." },
          { id: "owner-assigned", label: "Every qualified lead has a named owner and required next action." }
        ]
      },
      {
        id: "first-response",
        title: "First response",
        description: "Speed matters only when the response is useful and reaches the right person.",
        items: [
          { id: "response-standard", label: "A realistic response-time standard is defined and measured." },
          { id: "confirmation", label: "New inquiries receive an appropriate confirmation with clear expectations." },
          { id: "missed-call", label: "Missed calls create a visible callback task or approved follow-up." }
        ]
      },
      {
        id: "cadence",
        title: "Follow-up cadence",
        description: "A consistent cadence prevents promising leads from depending on memory.",
        items: [
          { id: "cadence-defined", label: "The number, timing, and channels of follow-up attempts are defined." },
          { id: "human-context", label: "Automated messages preserve context and provide a human path when needed." },
          { id: "stop-rules", label: "Follow-up stops for documented outcomes, consent choices, or escalation reasons." }
        ]
      },
      {
        id: "pipeline-measurement",
        title: "Pipeline and measurement",
        description: "The team should be able to see where leads stall and why they are lost.",
        items: [
          { id: "stages", label: "Pipeline stages have clear entry, exit, and ownership rules." },
          { id: "lost-reasons", label: "Lost-lead reasons are recorded using a useful, consistent set of choices." },
          { id: "conversion-reviewed", label: "Response time, contact rate, appointments, and close rate are reviewed by source." }
        ]
      }
    ]
  },
  {
    slug: "business-automation",
    title: "Business Automation Checklist",
    shortTitle: "Business Automation",
    description: "Evaluate whether a recurring workflow is ready for responsible automation across process fit, exceptions, data quality, ownership, monitoring, and measurement.",
    intro: "Choose one repeated workflow and evaluate it end to end. A narrow, well-understood process is a stronger automation candidate than a broad collection of disconnected tasks.",
    categories: [
      {
        id: "workflow-fit",
        title: "Workflow fit",
        description: "Strong candidates are repeated, observable, and important enough to improve.",
        items: [
          { id: "repeated-volume", label: "The workflow happens often enough for consistency to matter." },
          { id: "clear-trigger", label: "The starting event and successful completion state are clear." },
          { id: "baseline", label: "Current time, delay, errors, rework, or completion can be measured." }
        ]
      },
      {
        id: "rules-exceptions",
        title: "Rules and exceptions",
        description: "Automation needs explicit decisions and a safe path for uncertainty.",
        items: [
          { id: "decision-rules", label: "Routine decisions can be described with approved rules or criteria." },
          { id: "exceptions", label: "Common missing, conflicting, and unusual cases are documented." },
          { id: "human-review", label: "A qualified person owns review, correction, and escalation." }
        ]
      },
      {
        id: "data-systems",
        title: "Data and systems",
        description: "Reliable automation depends on trustworthy inputs and clear system boundaries.",
        items: [
          { id: "source-of-truth", label: "Each important field has an agreed source of truth." },
          { id: "system-access", label: "Required systems provide appropriate, authorized integration access." },
          { id: "data-quality", label: "Missing, duplicate, stale, and invalid data can be detected and handled." }
        ]
      },
      {
        id: "ownership-measurement",
        title: "Ownership and measurement",
        description: "Production automation needs an owner after the initial launch.",
        items: [
          { id: "operating-owner", label: "A business owner is accountable for workflow policy and outcomes." },
          { id: "monitoring", label: "Failures, retries, exceptions, and unusual volume become visible." },
          { id: "success-review", label: "Results are compared with the original baseline and reviewed over time." }
        ]
      }
    ]
  },
  {
    slug: "operations",
    title: "Operations Checklist",
    shortTitle: "Operations",
    description: "Review scheduling, handoffs, information quality, process consistency, workload visibility, and resilience across the daily operations of your business.",
    intro: "Use a recent customer, job, appointment, or project as the test case. Check each item only when the process works during normal work and common exceptions.",
    categories: [
      {
        id: "scheduling",
        title: "Scheduling and coordination",
        description: "The right people need a shared and current view of committed work.",
        items: [
          { id: "shared-schedule", label: "The current schedule has one reliable source of truth." },
          { id: "availability", label: "Availability, assignment, location, and prerequisites are checked before confirmation." },
          { id: "changes", label: "Delays, cancellations, and rescheduling update everyone who needs to know." }
        ]
      },
      {
        id: "handoffs",
        title: "Handoffs and ownership",
        description: "Work should not disappear between teams, inboxes, or systems.",
        items: [
          { id: "next-owner", label: "Each stage has a clear owner and required next action." },
          { id: "handoff-complete", label: "Required information is checked before work moves to the next stage." },
          { id: "exceptions-visible", label: "Blocked, overdue, and incomplete handoffs are visible and escalated." }
        ]
      },
      {
        id: "information-consistency",
        title: "Information and consistency",
        description: "Teams need the same current information and a practical standard process.",
        items: [
          { id: "customer-record", label: "Customer and job information is stored in an agreed location." },
          { id: "duplicate-entry", label: "Important information does not need to be re-entered across multiple systems." },
          { id: "standard-work", label: "Recurring steps, approvals, and completion requirements are documented." }
        ]
      },
      {
        id: "resilience-improvement",
        title: "Resilience and improvement",
        description: "A healthy operation can continue when people, volume, or conditions change.",
        items: [
          { id: "shared-knowledge", label: "Critical process knowledge is not held by only one employee." },
          { id: "workload-visibility", label: "Leaders can see workload, aging work, delays, and unresolved exceptions." },
          { id: "review-cycle", label: "The team regularly reviews bottlenecks, rework, customer friction, and process changes." }
        ]
      }
    ]
  }
] satisfies ChecklistDefinition[];

export const getChecklistBySlug = (slug: string) => checklists.find((checklist) => checklist.slug === slug);
