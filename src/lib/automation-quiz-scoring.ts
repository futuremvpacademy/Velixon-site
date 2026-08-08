import {
  automationQuiz,
  type AutomationQuizAnswers,
  type AutomationQuizCategoryId
} from "../data/automation-quiz";

export interface AutomationQuizCategoryScore {
  id: AutomationQuizCategoryId;
  label: string;
  shortLabel: string;
  score: number;
  answeredQuestions: number;
  totalQuestions: number;
  recommendation: string;
}

export interface AutomationQuizResult {
  version: string;
  score: number;
  answeredQuestions: number;
  totalQuestions: number;
  complete: boolean;
  level: (typeof automationQuiz.levels)[number];
  categoryScores: AutomationQuizCategoryScore[];
  weaknesses: AutomationQuizCategoryScore[];
  recommendations: string[];
}

const getSelectedOption = (questionId: string, optionId: string | undefined) => {
  const question = automationQuiz.questions.find((item) => item.id === questionId);
  return question?.options.find((option) => option.id === optionId);
};

export const scoreAutomationQuiz = (answers: AutomationQuizAnswers): AutomationQuizResult => {
  const answeredQuestions = automationQuiz.questions.filter((question) =>
    Boolean(getSelectedOption(question.id, answers[question.id]))
  ).length;

  const earnedPoints = automationQuiz.questions.reduce((total, question) => {
    return total + (getSelectedOption(question.id, answers[question.id])?.points ?? 0);
  }, 0);

  const maximumPoints = automationQuiz.questions.length * automationQuiz.maximumPointsPerQuestion;
  const score = maximumPoints > 0 ? Math.round((earnedPoints / maximumPoints) * 100) : 0;
  const level = automationQuiz.levels.find((item) => score >= item.min) ?? automationQuiz.levels.at(-1)!;

  const categoryScores = automationQuiz.categories.map((category) => {
    const questions = automationQuiz.questions.filter((question) => question.categoryId === category.id);
    const categoryEarnedPoints = questions.reduce((total, question) => {
      return total + (getSelectedOption(question.id, answers[question.id])?.points ?? 0);
    }, 0);
    const categoryMaximumPoints = questions.length * automationQuiz.maximumPointsPerQuestion;
    const categoryAnsweredQuestions = questions.filter((question) =>
      Boolean(getSelectedOption(question.id, answers[question.id]))
    ).length;

    return {
      ...category,
      score: categoryMaximumPoints > 0 ? Math.round((categoryEarnedPoints / categoryMaximumPoints) * 100) : 0,
      answeredQuestions: categoryAnsweredQuestions,
      totalQuestions: questions.length
    };
  });

  const weaknesses = [...categoryScores]
    .sort((left, right) => left.score - right.score || left.label.localeCompare(right.label))
    .slice(0, 3);

  return {
    version: automationQuiz.version,
    score,
    answeredQuestions,
    totalQuestions: automationQuiz.questions.length,
    complete: answeredQuestions === automationQuiz.questions.length,
    level,
    categoryScores,
    weaknesses,
    recommendations: weaknesses.map((category) => category.recommendation)
  };
};
