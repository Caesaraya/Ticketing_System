import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

// One row inside the Staff dashboard's "My Assigned Tickets" widget.
// Shows both a status and a priority badge, unlike Stage 3's
// RecentTicketCard (status only) or Stage 4's AssignmentRow (priority
// + an Assign action) — hence its own component rather than reusing
// either.
export default function AssignedTicketCard({ ticketId, summary, module, status, priority }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-0 dark:border-gray-800">
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400">{ticketId}</p>
        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{summary}</p>
        <p className="truncate text-xs text-gray-400 dark:text-gray-500">{module}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <StatusBadge status={status} />
        <PriorityBadge priority={priority} />
      </div>
    </div>
  );
}