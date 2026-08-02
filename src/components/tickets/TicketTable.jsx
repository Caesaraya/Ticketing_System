import TicketRow from './TicketRow';
import TicketEmptyState from './TicketEmptyState';
import TicketLoadingSkeleton from './TicketLoadingSkeleton';

const COLUMNS = ['ID', 'Title', 'Type', 'Priority', 'Status', 'Assignee', 'Created'];

// Generic ticket table shell. Future pages (User/PM/Staff Ticket List)
// just pass their filtered/sorted ticket array in — this component
// owns no filtering/sorting/pagination logic, only rendering.
// `renderActions(ticket)`, when given, adds an "Actions" column and
// feeds each row's actions — omit it to render exactly as Stage 6 did.
export default function TicketTable({ tickets, isLoading = false, renderActions }) {
  if (isLoading) {
    return <TicketLoadingSkeleton rows={5} />;
  }

  if (!tickets || tickets.length === 0) {
    return <TicketEmptyState />;
  }

  const columns = renderActions ? [...COLUMNS, 'Actions'] : COLUMNS;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            {columns.map((col) => (
              <th
                key={col}
                className="whitespace-nowrap pb-3 pr-4 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketRow
              key={ticket.id}
              {...ticket}
              actions={renderActions ? renderActions(ticket) : undefined}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}