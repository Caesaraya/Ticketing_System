import StatusBadge from './StatusBadge';

// One row inside the "My Recent Tickets" widget. Purely presentational
// — the parent page owns the data and just spreads a ticket object in.
export default function RecentTicketCard({ id, title, status, updatedAt }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-0 dark:border-gray-800">
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400">#{id}</p>
        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <StatusBadge status={status} />
        <span className="text-xs text-gray-400 dark:text-gray-500">{updatedAt}</span>
      </div>
    </div>
  );
}