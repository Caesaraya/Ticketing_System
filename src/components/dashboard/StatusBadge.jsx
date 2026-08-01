import clsx from 'clsx';

// Status keys here match the dummy dashboard data ('Open', 'In
// Progress', 'Resolved'). When the full ticket workflow
// (OPEN/ASSIGNED/IN_PROGRESS/QA/DONE) is built in a later stage, extend
// STATUS_STYLES rather than creating a second badge component.
const STATUS_STYLES = {
  Open: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
  'In Progress': 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  QA: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  Resolved: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';}