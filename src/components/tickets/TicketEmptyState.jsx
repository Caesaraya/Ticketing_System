import { Inbox } from 'lucide-react';

// Shown when a ticket table/list has zero results (empty search,
// empty filter, or genuinely no tickets). Distinct from the
// dashboard's EmptyDashboardState — this one is table/list-shaped.
export default function TicketEmptyState({ message = 'No tickets found.' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <Inbox size={28} className="text-gray-300 dark:text-gray-700" />
      <p className="text-sm text-gray-400 dark:text-gray-500">{message}</p>
    </div>
  );
}