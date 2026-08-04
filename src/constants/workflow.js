export const STATUS_FLOW = [
  'OPEN',
  'ASSIGNED',
  'IN_PROGRESS',
  'QA',
  'DONE',
];

export const STATUS_LABELS = Object.freeze({
  OPEN: 'Open',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  QA: 'QA',
  DONE: 'Done',
});

export function getStatusLabel(status) {
  return STATUS_LABELS[status] ?? status;
}

export function getAllowedNextStatuses(current) {
  const index = STATUS_FLOW.indexOf(current);

  if (
    index === -1 ||
    index === STATUS_FLOW.length - 1
  ) {
    return [];
  }

  return [STATUS_FLOW[index + 1]];
}

export function isStatusLocked(status) {
  return status === 'DONE';
}