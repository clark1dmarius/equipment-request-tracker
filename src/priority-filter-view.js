import { filterRequestsByPriority } from "./request-store.js";

export function getPriorityFilterView(requests, selectedPriority = "All") {
  const visibleRequests = filterRequestsByPriority(requests, selectedPriority);
  const hasRequests = requests.length > 0;
  const hasVisibleRequests = visibleRequests.length > 0;

  const countText =
    selectedPriority === "All"
      ? `${requests.length} ${requests.length === 1 ? "request" : "requests"}`
      : `${visibleRequests.length} of ${requests.length} requests`;

  let emptyStateTitle = "";
  let emptyStateMessage = "";

  if (!hasRequests) {
    emptyStateTitle = "No requests yet";
    emptyStateMessage = "Add the first equipment request using the form.";
  } else if (!hasVisibleRequests) {
    emptyStateTitle = "No matching requests";
    emptyStateMessage = `No ${selectedPriority.toLowerCase()} priority requests are currently available.`;
  }

  return {
    visibleRequests,
    hasVisibleRequests,
    countText,
    emptyStateTitle,
    emptyStateMessage,
  };
}
