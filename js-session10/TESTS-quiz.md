# TESTS-quiz.md — Test Matrix

Run in headless Chromium (Playwright) against the served site. Results below are actual outputs.

| Test Scenario | Expected | Actual | Status |
|---|---|---|---|
| Theme toggle (extra) | Dark on + 'Light Mode', then off + 'Dark Mode' | True/Light Mode, False/Dark Mode | PASS |
| All 5 correct | 5/5 score | Your final score is 5 / 5 | PASS |
| All 5 wrong | 0/5 score | Your final score is 0 / 5 | PASS |
| 3 correct, 2 wrong | 3/5 score | Your final score is 3 / 5 | PASS |
| Double-click | Score +1 max, advance exactly one question | Question 2 of 5, Score: 1 | PASS |
| Triple-click spam (extra) | Still only +1, Q2 | Question 2 of 5, Score: 1 | PASS |
| After Q4 | Show Q5 | Question 5 of 5 | PASS |
| Reload page | Reset to Q1, Score: 0 | Question 1 of 5, Score: 0 | PASS |

## Bug found and fixed during testing

Initial version reset `answered = false` inside `showQuestion()`, which ran synchronously right after the first click. A double-click on Q1 therefore
registered a second answer on Q2 (observed: `Question 3 of 5`, `Score: 2` after one double-click).
Fix: `answered` now stays `true` while feedback is shown, and the next question is rendered after a 500 ms delay (`setTimeout`). The guard clause now works as intended.
