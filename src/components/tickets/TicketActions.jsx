import { Eye, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

// Row-level action(s) for a ticket. `onAssign` is optional — when
// given (PM's Ticket List), an Assign button renders next to View;
// User/Staff Ticket List omit it and only get View. Both default to a
// "Coming soon" toast since Ticket Detail and assignment logic don't
// exist yet.
export default function TicketActions({ onView, onAssign }) {
  const handleView = onView ?? (() => toast.info('Coming soon'));

  return (
    <span className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={handleView}
        aria-label="View ticket"
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
      >
        <Eye size={16} />
      </button>
      {onAssign && (
        <button
          type="button"
          onClick={onAssign}
          aria-label="Assign ticket"
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <UserPlus size={16} />
        </button>
      )}
    </span>
  );
}