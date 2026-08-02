import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PriorityBadge from '../dashboard/PriorityBadge';
import StatusBadge from '../dashboard/StatusBadge';

// Top-of-page header for Ticket Detail: back link + id/title + badges
// + created date. Identical for every role — only `backTo` changes
// (each role's own Ticket List route).
export default function TicketDetailHeader({ backTo, id, title, priority, status, createdAt }) {
  return (
    <div>
      <Link
        to={backTo}
        className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <ArrowLeft size={16} />
        Back to Ticket List
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {id} — {title}
        </h1>
        <PriorityBadge priority={priority} />
        <StatusBadge status={status} />
      </div>
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Created {createdAt}</p>
    </div>
  );
}