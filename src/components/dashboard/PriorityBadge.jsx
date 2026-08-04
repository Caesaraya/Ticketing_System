import clsx from 'clsx';

const PRIORITY_STYLES = {
  CRITICAL:
    'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',

  HIGH:
    'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',

  MEDIUM:
    'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',

  LOW:
    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
};

const PRIORITY_LABELS = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

export default function PriorityBadge({
  priority,
}) {
  const style =
    PRIORITY_STYLES[priority] ??
    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';

  return (
    <span
      className={clsx(
        'rounded-full px-2.5 py-1 text-xs font-medium',
        style
      )}
    >
      {PRIORITY_LABELS[priority] ??
        priority}
    </span>
  );
}