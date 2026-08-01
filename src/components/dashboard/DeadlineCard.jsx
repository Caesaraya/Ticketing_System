import PriorityIndicator from './PriorityIndicator';

// One row inside the Staff dashboard's "Upcoming Deadlines" widget: an
// urgency dot, a due time, a ticket title, and a short subtitle (e.g.
// "SLA Breach Warning").
export default function DeadlineCard({ time, title, subtitle, tone = 'low' }) {
  return (
    <div className="flex items-start gap-3 border-b border-gray-100 py-3 last:border-0 dark:border-gray-800">
      <PriorityIndicator tone={tone} />
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400">{time}</p>
        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
        <p className="truncate text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}