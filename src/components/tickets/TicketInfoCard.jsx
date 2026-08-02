import Card from '../ui/Card';

// Generic label/value card for the Ticket Detail sidebar (Reporter,
// Assignee, Category, Created/Updated dates, etc). One reusable shell
// instead of a separate component per field group.
export default function TicketInfoCard({ title, rows }) {
  return (
    <Card className="p-5">
      <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      <dl className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4">
            <dt className="text-xs text-gray-400 dark:text-gray-500">{row.label}</dt>
            <dd className="text-sm font-medium text-gray-700 dark:text-gray-200">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}