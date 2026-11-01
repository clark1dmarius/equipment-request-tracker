# Exercise 7 Requirements Review

## Scope

Reviewed the Exercise 6 priority-filter feature against `docs/priority-filter-spec.md` using the repository-scoped `requirements-reviewer` workflow.

## Satisfied acceptance criteria

The implementation satisfies the eight acceptance criteria in the specification:

- The filter provides **All priorities, High, Normal, and Low**, with **All priorities** selected by default (`docs/priority-filter-spec.md:13-19`; `index.html`, priority-filter select).
- High, Normal, and Low selections use the stored priority value and do not rewrite request data (`docs/priority-filter-spec.md:16-22`; `src/request-store.js`, `filterRequestsByPriority`).
- Legacy requests remain available in the All-priorities view and their stored data is preserved (`docs/priority-filter-spec.md:20-22`; `tests/request-store.test.js`, legacy and All-priorities tests).
- The implementation provides the required no-match state and message when requests exist but the selected priority has no matches (`docs/priority-filter-spec.md:21`; `src/priority-filter-view.js`, no-match view state).
- Existing request creation and local-storage behavior remain covered by the existing tests (`docs/priority-filter-spec.md:23`; `tests/request-store.test.js`).

## Gaps

No confirmed functional gap was found between the Exercise 6 specification and the implementation.

## Unsupported behavior

`filterRequestsByPriority` falls back to the complete list if called with a priority value outside All, High, Normal, or Low. The rendered UI does not provide an unsupported value, so this is not a current acceptance-criteria failure. No change was made for this low-risk internal fallback.

## Data or security concerns

The application stores request data in browser local storage and intentionally has no login or authentication. That means the data is available to anyone with access to the same browser profile. This is an explicit Exercise 6 constraint rather than a defect (`docs/priority-filter-spec.md`, Constraints). The application should therefore continue to use non-sensitive practice data.

## Tests still needed

### Most important finding

The original automated suite verified the filtering data helper, but the required **no-matches UI state** in AC5 was only supported by manual browser verification. The specification requires the table to be hidden and a clear no-matches message to be shown, while the original tests only exercised `filterRequestsByPriority`.

**Decision: ACCEPT.**

The finding is valid because the behavior existed in `src/app.js`, but there was no automated test of the view-state logic that determines the empty-state title/message and table visibility.

## Response to the finding

The view-state calculation was extracted into `src/priority-filter-view.js` without changing the visible feature behavior. Four focused automated tests were added in `tests/priority-filter-view.test.js` to verify:

1. the complete ordered list for All priorities;
2. filtered results and counts;
3. the required no-matches state and message;
4. the original no-requests state.

The application now consumes that same tested view-state helper. The updated suite passes **14 tests with 0 failures**.

## Overall assessment

**Matches the specification.** The Exercise 6 implementation satisfies the stated acceptance criteria, and the accepted Exercise 7 finding improved automated verification of the most important UI edge case without changing the requested feature.
