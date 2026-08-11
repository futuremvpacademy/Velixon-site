import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const ruleBody = (source: string, selector: string) => {
  const selectorStart = source.indexOf(selector);
  assert.notEqual(selectorStart, -1, `missing ${selector}`);
  const bodyStart = source.indexOf("{", selectorStart);
  const bodyEnd = source.indexOf("}", bodyStart);
  assert.ok(bodyStart > selectorStart && bodyEnd > bodyStart, `invalid ${selector} rule`);
  return source.slice(bodyStart + 1, bodyEnd);
};

test("decorative labels use plain text instead of pill-shaped bubbles", async () => {
  const [globalStyles, resourceStyles, roiStyles, opportunityCalculator] = await Promise.all([
    read("src/styles/global.css"),
    read("src/styles/resources.css"),
    read("src/styles/automation-roi-calculator.css"),
    read("src/components/OpportunityCalculator.astro")
  ]);

  const plainRules: Array<[string, string]> = [
    [globalStyles, ".eyebrow"],
    [globalStyles, ".hero-highlights span"],
    [globalStyles, ".preview-pill"],
    [globalStyles, ".preview-footer span"],
    [globalStyles, ".work-preview-tag {"],
    [globalStyles, ".pricing-plan-badge"],
    [globalStyles, ".pricing-preview-points span"],
    [globalStyles, ".final-cta-points span"],
    [globalStyles, ".contact-reassurance span"],
    [resourceStyles, ".resource-topic-list span"],
    [roiStyles, ".roi-model-label"],
    [roiStyles, ".roi-scenario-card header span"],
    [opportunityCalculator, ".vx-calculator-topline > span"]
  ];

  for (const [source, selector] of plainRules) {
    assert.doesNotMatch(
      ruleBody(source, selector),
      /(?:^|\s)(?:border(?:-radius)?|background|box-shadow|padding)\s*:/,
      `${selector} should not render decorative container chrome`
    );
  }

  const comparisonLabel = ruleBody(globalStyles, ".work-preview-compare-label");
  assert.match(comparisonLabel, /border-radius:\s*4px/);
  assert.doesNotMatch(comparisonLabel, /border-radius:\s*999px/);
});
