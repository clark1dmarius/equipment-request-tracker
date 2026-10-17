# Priority Filter Specification

## Goal

Give managers a faster way to focus on equipment requests that need attention by filtering the existing request list using the Priority information already stored with each request.

## User Need

Managers need to quickly narrow the request list to High, Normal, or Low priority items without editing, deleting, or otherwise changing the requests that have already been saved.

## Functional Rules

1. The Equipment requests section must include a visible Priority filter.
2. The filter choices must be All priorities, High, Normal, and Low.
3. All priorities must be selected when the application first loads.
4. Selecting High must show only requests whose stored priority is High.
5. Selecting Normal must show only requests whose stored priority is Normal.
6. Selecting Low must show only requests whose stored priority is Low.
7. Selecting All priorities must show the complete request list in its existing order.
8. A legacy request with no Priority value must remain visible under All priorities and must not be assigned or rewritten to a priority by the filter.
9. If requests exist but none match the selected priority, the application must show a clear no-matches message instead of an empty table.
10. Filtering is display-only. It must not save, edit, delete, reorder, or otherwise mutate request data.
11. Existing request creation, Priority selection, local-storage behavior, and validation must continue to work.

## Constraints

- Use the existing Priority information introduced in Exercise 5.
- Continue using browser local storage; do not add a database.
- Do not add login or authentication.
- Preserve existing locally stored requests, including legacy requests that do not have a Priority field.
- Use the existing plain HTML, CSS, and JavaScript structure.
- Avoid unrelated interface or architecture changes.

## Acceptance Criteria

1. **Default view:** Given saved requests exist, when the application first loads, then All priorities is selected and every saved request is displayed.
2. **High filter:** Given requests with multiple priorities exist, when High is selected, then only requests with a stored Priority of High are displayed.
3. **Normal filter:** Given requests with multiple priorities exist, when Normal is selected, then only requests with a stored Priority of Normal are displayed.
4. **Low filter:** Given requests with multiple priorities exist, when Low is selected, then only requests with a stored Priority of Low are displayed.
5. **No matches:** Given requests exist but none match the selected priority, when that priority is selected, then the request table is hidden and a clear message states that no requests match the selected priority.
6. **Legacy preservation:** Given a previously saved request has no Priority field, when All priorities is selected, then that request remains visible and its stored data is unchanged.
7. **Preservation and order:** Given a filter is applied and then changed back to All priorities, then all original requests reappear in the same order and no request has been edited, deleted, or rewritten.
8. **Existing behavior:** Given the filter feature is present, when a user creates a new request with Low, Normal, or High priority, then the request is saved and the existing creation behavior still works.

## Out of Scope

- Login or user accounts
- Database storage
- Editing requests
- Deleting requests
- New priority values
- Priority-based sorting or reordering
- Persisting the selected filter between browser sessions
- Filtering by fields other than Priority


## Verification Results

- **AC1 — Pass:** Confirmed the default control is **All priorities** and the full request list is rendered on initial load.
- **AC2 — Pass:** Selecting **High** displays only High-priority requests.
- **AC3 — Pass:** Selecting **Normal** displays only Normal-priority requests.
- **AC4 — Pass:** Selecting **Low** displays only Low-priority requests.
- **AC5 — Pass:** When a selected priority has no matches, the table is hidden and the **No matching requests** message is shown.
- **AC6 — Pass:** Automated tests confirm legacy requests without a Priority field are preserved and remain available under **All priorities**.
- **AC7 — Pass:** Automated tests confirm filtering returns a separate view without mutating or reordering the original request list; returning to **All priorities** restores the full order.
- **AC8 — Pass:** Existing request creation tests continue to pass for default Normal priority, selected priority, validation, save/load behavior, and legacy data.

### Test Summary

- `npm test`: **10 passed, 0 failed**.
- Browser verification: confirmed High, Normal, Low, and All-priority views update correctly and the filtered request count reflects the visible results.
