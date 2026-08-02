import Card from '../ui/Card';
import TicketTypeBadge from './TicketTypeBadge';
import StatusBadge from '../dashboard/StatusBadge';
import PriorityBadge from '../dashboard/PriorityBadge';
import AssigneeAvatar from './AssigneeAvatar';

// Card-style alternative to TicketRow — same ticket shape, different
// layout. Useful for a future grid/kanban-style ticket view without
// duplicating any badge/avatar logic.
export default function TicketCard({ id, title, type, priority, status, assignee, createdAt }) {
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-blue-600">{id}</span>
        <TicketTypeBadge type={type} />
      </div>
      <p className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={priority} />
          <StatusBadge status={status} />
        </div>
        <AssigneeAvatar name={assignee} />
      </div>
      <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">{createdAt}</p>
    </Card>
  );
}