import {
  RequestValidationError,
  appendRequest,
  createRequest,
  filterRequestsByPriority,
  loadRequests,
  saveRequests,
} from "./request-store.js";

const form = document.querySelector("#request-form");
const message = document.querySelector("#form-message");
const neededByInput = document.querySelector("#needed-by");
const count = document.querySelector("#request-count");
const emptyState = document.querySelector("#empty-state");
const emptyStateTitle = document.querySelector("#empty-state-title");
const emptyStateMessage = document.querySelector("#empty-state-message");
const priorityFilter = document.querySelector("#priority-filter");
const tableWrapper = document.querySelector("#request-table-wrapper");
const tableBody = document.querySelector("#request-table-body");

let requests = loadRequests();

neededByInput.min = new Date().toISOString().slice(0, 10);
renderRequests();

priorityFilter.addEventListener("change", renderRequests);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearFieldErrors();
  setMessage("");

  const input = Object.fromEntries(new FormData(form).entries());

  try {
    const request = createRequest(input);
    requests = appendRequest(requests, request);
    saveRequests(requests);
    form.reset();
    neededByInput.min = new Date().toISOString().slice(0, 10);
    setMessage("Request added.");
    renderRequests();
    document.querySelector("#requester").focus();
  } catch (error) {
    if (error instanceof RequestValidationError) {
      showFieldErrors(error.errors);
      setMessage("Complete all required fields.", true);
      return;
    }

    setMessage("The request could not be saved. Try again.", true);
    console.error(error);
  }
});

function renderRequests() {
  const selectedPriority = priorityFilter.value;
  const visibleRequests = filterRequestsByPriority(requests, selectedPriority);
  const hasRequests = requests.length > 0;
  const hasVisibleRequests = visibleRequests.length > 0;

  if (selectedPriority === "All") {
    count.textContent = `${requests.length} ${requests.length === 1 ? "request" : "requests"}`;
  } else {
    count.textContent = `${visibleRequests.length} of ${requests.length} requests`;
  }

  emptyState.hidden = hasVisibleRequests;
  tableWrapper.hidden = !hasVisibleRequests;

  if (!hasRequests) {
    emptyStateTitle.textContent = "No requests yet";
    emptyStateMessage.textContent = "Add the first equipment request using the form.";
  } else if (!hasVisibleRequests) {
    emptyStateTitle.textContent = "No matching requests";
    emptyStateMessage.textContent = `No ${selectedPriority.toLowerCase()} priority requests are currently available.`;
  }

  tableBody.replaceChildren(...visibleRequests.map(createRequestRow));
}

function createRequestRow(request) {
  const row = document.createElement("tr");
  const values = [
    request.requester,
    request.department,
    request.equipment,
    request.priority ?? "—",
    formatDate(request.neededBy),
    request.reason,
    formatDateTime(request.createdAt),
  ];

  for (const value of values) {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.append(cell);
  }

  return row;
}

function formatDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function formatDateTime(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function showFieldErrors(errors) {
  const firstInvalidField = Object.keys(errors)[0];

  for (const fieldName of Object.keys(errors)) {
    form.elements[fieldName]?.setAttribute("aria-invalid", "true");
  }

  form.elements[firstInvalidField]?.focus();
}

function clearFieldErrors() {
  for (const element of form.elements) {
    element.removeAttribute?.("aria-invalid");
  }
}

function setMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}
