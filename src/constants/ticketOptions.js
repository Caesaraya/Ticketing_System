// Single source of truth for ticket dropdown/selector options — used
// by TicketForm (Stage 9) and TicketListView (Stage 7's filters), so
// both read from the same list instead of each hardcoding its own.
export const PRIORITY_OPTIONS = [
  { value: 'Critical', label: 'Critical' },
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
];

export const STATUS_OPTIONS = [
  { value: 'Open', label: 'Open' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'QA', label: 'QA' },
  { value: 'Resolved', label: 'Resolved' },
];

// Matches the same 'Bug' | 'Feature' | 'Task' vocabulary TicketTypeBadge
// already uses — Stitch's "Request Type" (Issue/Bug vs Feature Request)
// maps directly onto it instead of introducing a separate concept.
export const TYPE_OPTIONS = [
  { value: 'Bug', label: 'Issue / Bug' },
  { value: 'Feature', label: 'Feature Request' },
];

// Matches the `category` field already used in ticketsSharedDummy.js
// (the ticket's affected module/system).
export const CATEGORY_OPTIONS = [
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Authentication', label: 'Authentication' },
  { value: 'Hardware', label: 'Hardware' },
  { value: 'Payments', label: 'Payments' },
  { value: 'Maintenance', label: 'Maintenance' },
  { value: 'Content', label: 'Content' },
];