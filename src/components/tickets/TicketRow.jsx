import TicketTypeBadge from './TicketTypeBadge';
import StatusBadge from '../dashboard/StatusBadge';
import PriorityBadge from '../dashboard/PriorityBadge';
import AssigneeAvatar from './AssigneeAvatar';

// One row of the ticket table. Purely presentational — receives a
// ticket object and renders it. Reuses StatusBadge/PriorityBadge from
// components/dashboard/ rather than duplicating them here. `actions`
// is optional — when omitted (Stage 6 usage), no actions column
// renders at all.
export default function TicketRow({ id, title, type, priority, status, assignee, createdAt, actions }) {
  return (
    <tr className="border-b border-gray-100 last:border-0 dark:border-gray-800">
      <td className="whitespace-nowrap py-3 pr-4 text-sm font-medium text-blue-600">{id}</td>
      <td className="max-w-xs truncate py-3 pr-4 text-sm font-medium text-gray-900 dark:text-gray-100">
        {title}
      </td>
      <td className="whitespace-nowrap py-3 pr-4">
        <TicketTypeBadge type={type} />
      </td>
      <td className="whitespace-nowrap py-3 pr-4">
        <PriorityBadge priority={priority} />
      </td>
      <td className="whitespace-nowrap py-3 pr-4">
        <StatusBadge status={status} />
      </td>
      <td className="whitespace-nowrap py-3 pr-4">
        <AssigneeAvatar name={assignee} />
      </td>
      <td className="whitespace-nowrap py-3 pr-4 text-xs text-gray-400 dark:text-gray-500">{createdAt}</td>
      {actions && <td className="whitespace-nowrap py-3 text-right">{actions}</td>}
    </tr>
  );
}