import assert from "node:assert/strict";
import test from "node:test";
import { automationQuiz, type AutomationQuizAnswers } from "../src/data/automation-quiz";
import { scoreAutomationQuiz } from "../src/lib/automation-quiz-scoring";

const answersAt = (position: "first" | "last") => Object.fromEntries(
  automationQuiz.questions.map((question) => [
    question.id,
    position === "first" ? question.options[0].id : question.options.at(-1)!.id
  ])
) as AutomationQuizAnswers;

test("automation quiz returns Early Stage at the minimum score", () => {
  const result = scoreAutomationQuiz(answersAt("first"));
  assert.equal(result.complete, true);
  assert.equal(result.score, 0);
  assert.equal(result.level.label, "Early Stage");
  assert.equal(result.categoryScores.length, 5);
  assert.equal(result.weaknesses.length, 3);
});

test("automation quiz returns Optimized at the maximum score", () => {
  const result = scoreAutomationQuiz(answersAt("last"));
  assert.equal(result.complete, true);
  assert.equal(result.score, 100);
  assert.equal(result.level.label, "Optimized");
  assert.ok(result.categoryScores.every((category) => category.score === 100));
});

test("automation quiz does not mark a partial answer set complete", () => {
  const firstQuestion = automationQuiz.questions[0];
  const result = scoreAutomationQuiz({ [firstQuestion.id]: firstQuestion.options[0].id });
  assert.equal(result.complete, false);
  assert.equal(result.answeredQuestions, 1);
  assert.equal(result.totalQuestions, 10);
});
