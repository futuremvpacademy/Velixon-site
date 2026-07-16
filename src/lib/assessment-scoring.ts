export const assessmentScoring = {
  version: "2026.07.2",
  thresholds: [
    { min: 80, label: "Priority lead", publicLabel: "High-leverage opportunity", route: "proposal" },
    { min: 60, label: "Sales qualified", publicLabel: "Strong automation opportunity", route: "booking" },
    { min: 30, label: "Marketing qualified", publicLabel: "Focused pilot opportunity", route: "guidance" },
    { min: 0, label: "Nurture", publicLabel: "Foundation-building opportunity", route: "resources" }
  ],
  weights: {
    teamSize: { solo: 2, "2-5": 5, "6-20": 8, "21-50": 10, "51-plus": 12 },
    leadVolume: { "0-10": 1, "11-50": 4, "51-200": 7, "201-500": 9, "500-plus": 11 },
    responseTime: { minutes: 1, hours: 5, "same-day": 8, "next-day": 10, inconsistent: 12 },
    hoursLost: { "0-5": 1, "6-10": 4, "11-20": 8, "21-40": 11, "40-plus": 14 },
    timeline: { exploring: 2, "3-6-months": 6, "1-3-months": 10, "within-month": 12 },
    budget: { guidance: 2, "under-10k": 3, "10k-25k": 7, "25k-50k": 11, "50k-plus": 14 },
    decisionMaker: { researching: 2, influencer: 5, yes: 8 },
    systems: { connected: 1, partial: 5, manual: 8 },
    challengeEach: 2,
    challengeMaximum: 12,
    objectiveEach: 1,
    objectiveMaximum: 5,
    assessmentCompletion: 4
  }
} as const;

export type AssessmentCategory = (typeof assessmentScoring.thresholds)[number]["label"];

export const getAssessmentCategory = (score: number) =>
  assessmentScoring.thresholds.find((threshold) => score >= threshold.min) ??
  assessmentScoring.thresholds[assessmentScoring.thresholds.length - 1];
