import { Bug, Sparkles, ListTodo } from 'lucide-react';
import clsx from 'clsx';

const TYPE_CONFIG = {
  Bug: { icon: Bug, style: 'text-red-500' },
  Feature: { icon: Sparkles, style: 'text-blue-500' },
  Task: { icon: ListTodo, style: 'text-gray-500' },
};

// Icon + label for a ticket's type (Bug / Feature / Task). Sibling to
// StatusBadge/PriorityBadge but rendered as icon+text rather than a
// pill, matching the "All Tickets" table in the Stitch design.
export default function TicketTypeBadge({ type }) {
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.Task;
  const Icon = config.icon;

  return (
    <span className={clsx('inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300')}>
      <Icon size={14} className={config.style} />
      {type}
    </span>
  );
}