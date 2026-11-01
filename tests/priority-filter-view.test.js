import assert from "node:assert/strict";
import test from "node:test";

import { getPriorityFilterView } from "../src/priority-filter-view.js";

const requests = [
  { id: "high", priority: "High" },
  { id: "normal", priority: "Normal" },
  { id: "low", priority: "Low" },
  { id: "legacy" },
];

test("priority filter view preserves the full ordered list for All priorities", () => {
  const view = getPriorityFilterView(requests, "All");

  assert.deepEqual(
    view.visibleRequests.map((request) => request.id),
    ["high", "normal", "low", "legacy"],
  );
  assert.equal(view.hasVisibleRequests, true);
  assert.equal(view.countText, "4 requests");
});

test("priority filter view reports the filtered count for a selected priority", () => {
  const view = getPriorityFilterView(requests, "High");

  assert.deepEqual(view.visibleRequests.map((request) => request.id), ["high"]);
  assert.equal(view.hasVisibleRequests, true);
  assert.equal(view.countText, "1 of 4 requests");
});

test("priority filter view produces the required no-matches state", () => {
  const view = getPriorityFilterView([{ id: "normal", priority: "Normal" }], "High");

  assert.deepEqual(view.visibleRequests, []);
  assert.equal(view.hasVisibleRequests, false);
  assert.equal(view.countText, "0 of 1 requests");
  assert.equal(view.emptyStateTitle, "No matching requests");
  assert.equal(
    view.emptyStateMessage,
    "No high priority requests are currently available.",
  );
});

test("priority filter view preserves the original empty-list state", () => {
  const view = getPriorityFilterView([], "All");

  assert.equal(view.hasVisibleRequests, false);
  assert.equal(view.countText, "0 requests");
  assert.equal(view.emptyStateTitle, "No requests yet");
  assert.equal(
    view.emptyStateMessage,
    "Add the first equipment request using the form.",
  );
});
