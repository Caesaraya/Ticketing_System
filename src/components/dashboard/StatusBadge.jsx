import clsx from 'clsx';

import {
  getStatusLabel,
} from '../../constants/workflow';

const STATUS_STYLES = {
  OPEN:
    'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',

  ASSIGNED:
    'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400',

  IN_PROGRESS:
    'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',

  QA:
    'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',

  DONE:
    'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
};

export default function StatusBadge({
  status,
}) {
  const style =
    STATUS_STYLES[status] ??
    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';

  return (
    <span
      className={clsx(
        'rounded-full px-2.5 py-1 text-xs font-medium',
        style
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}