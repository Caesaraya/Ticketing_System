import clsx from 'clsx';


const PRIORITY_STYLES = {
  Critical: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
  High: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
  Medium: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  Low: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
};

export default function PriorityBadge({ priority }) {
  const style = PRIORITY_STYLES[priority] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';

  return <span className={clsx('rounded-full px-2.5 py-1 text-xs font-medium', style)}>{priority}</span>;
}