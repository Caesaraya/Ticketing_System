// The ticket status workflow, matching the original business
// requirement (OPEN → ASSIGNED → IN PROGRESS → QA → DONE, no skipping
// stages, DONE is locked) and the same 5 stages TicketTimeline has
// visualized since Stage 8. This is the single source of truth for
// what transition is allowed next — UI components ask this instead of
// hardcoding their own rules.
export const STATUS_FLOW = ['Open', 'Assigned', 'In Progress', 'QA', 'Done'];

// Returns the array of statuses that `current` may move to. Today
// that's always zero or one entry (strictly sequential, no skipping),
// but returning an array keeps the door open for branching workflows
// later without changing the caller's shape.
export function getAllowedNextStatuses(current) {
  const index = STATUS_FLOW.indexOf(current);
  if (index === -1 || index === STATUS_FLOW.length - 1) {
    return [];
  }
  return [STATUS_FLOW[index + 1]];
}

export function isStatusLocked(current) {
  return current === STATUS_FLOW[STATUS_FLOW.length - 1];
}