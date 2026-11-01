---
name: requirements-reviewer
description: Review a feature implementation against its specification before accepting the change. Use when asked to compare requirements, acceptance criteria, constraints, or a feature spec with implementation code and tests. This workflow is read-only unless the user explicitly asks for changes.
---

# Requirements Reviewer

Use this skill to determine whether an implementation actually matches its written specification.

## When this skill applies

Use this workflow when:
- a feature has a written specification, requirements document, or acceptance criteria;
- an implementation is ready for review before acceptance or merge;
- the user asks whether code satisfies a spec;
- a previous implementation needs a requirements-focused review.

Do not use this as a general style review. Keep the review centered on the specification and the feature under review.

## Evidence to examine

Read the relevant evidence before reaching conclusions:

1. The feature specification, especially:
   - goal and user need;
   - functional rules;
   - constraints;
   - acceptance criteria;
   - out-of-scope statements.
2. The implementation files that provide the feature.
3. Call sites and UI code needed to understand the feature's actual behavior.
4. Tests that claim to verify the feature.
5. Data storage, validation, and security behavior relevant to the feature.
6. Existing repository guidance that affects the change.

Do not assume a criterion is satisfied because a file or function has the expected name. Trace the behavior far enough to support the conclusion.

## Review workflow

1. Identify the exact specification and feature being reviewed.
2. Extract each acceptance criterion and relevant constraint.
3. Map each criterion to implementation evidence.
4. Map each criterion to test evidence, if any.
5. Separate confirmed behavior from assumptions or manual-only verification.
6. Check for behavior implemented outside the specification.
7. Check for data integrity or security concerns introduced or exposed by the feature.
8. Identify tests still needed.
9. Produce the review report without editing files.

## Required report

Report all of the following sections:

### Satisfied acceptance criteria
For each satisfied criterion:
- identify the criterion;
- explain why it is satisfied;
- cite evidence from the specification and implementation/tests.

### Gaps
List requirements or acceptance criteria that are not fully satisfied. If there are no confirmed gaps, say so.

### Unsupported behavior
Identify behavior present in the implementation that is not supported by the specification and explain whether it creates risk. If none matters, say so.

### Data or security concerns
Identify relevant storage, privacy, validation, authorization, or integrity concerns. Distinguish between a defect and an explicit project constraint.

### Tests still needed
Identify acceptance criteria or important edge cases that lack adequate automated or manual evidence.

### Overall assessment
State whether the feature:
- matches the specification;
- partially matches the specification; or
- does not match the specification.

## Evidence rules

Every material finding must cite evidence from both sides when available:
- specification path and section or line range;
- implementation or test path and line range.

Use concise citations such as:
- `docs/example-spec.md:34-40`
- `src/example.js:18-29`
- `tests/example.test.js:55-72`

If line numbers are unavailable, quote the smallest relevant snippet and name the file.

Do not invent evidence. If the repository does not contain enough information to verify a criterion, mark it as unverified.

## Read-only rule

Do not modify, create, delete, rename, or reformat files while performing the review unless the user explicitly asks for changes after seeing or acting on the findings.

A requirements review should report what is true before proposing or applying a fix.
