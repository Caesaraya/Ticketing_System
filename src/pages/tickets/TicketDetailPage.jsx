import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';
import { SHARED_TICKETS } from '../../data/ticketsSharedDummy';

import Card from '../../components/ui/Card';
import TicketDetailHeader from '../../components/tickets/TicketDetailHeader';
import TicketTimeline from '../../components/tickets/TicketTimeline';
import TicketInfoCard from '../../components/tickets/TicketInfoCard';
import CommentCard from '../../components/tickets/CommentCard';
import AttachmentCard from '../../components/tickets/AttachmentCard';
import ActivityCard from '../../components/dashboard/ActivityCard';
import AssigneeAvatar from '../../components/tickets/AssigneeAvatar';
import TicketActionPanel from '../../components/tickets/TicketActionPanel';
import TicketEmptyState from '../../components/tickets/TicketEmptyState';

const BACK_ROUTE_BY_ROLE = {
  [ROLES.USER]: ROUTES.USER_TICKETS,
  [ROLES.PM]: ROUTES.PM_TICKETS,
  [ROLES.STAFF]: ROUTES.STAFF_TICKETS,
};

// Placeholder action labels per role. Every button just shows a
// "Coming soon" toast (see TicketActionPanel) — no business logic.
const ACTIONS_BY_ROLE = {
  [ROLES.USER]: [],
  [ROLES.PM]: ['Assign Ticket', 'Change Priority', 'Change Status'],
  [ROLES.STAFF]: ['Start Progress', 'Mark Waiting', 'Mark Completed'],
};

// One shared Ticket Detail page for every role. Layout and components
// are identical regardless of who's viewing it — only the back
// destination and the action panel's buttons change, both derived
// from the logged-in user's role.
export default function TicketDetailPage() {
  const { id } = useParams();
  const { role } = useAuth();

  const ticket = SHARED_TICKETS.find((t) => t.id === id);

  if (!ticket) {
    return <TicketEmptyState message={`Ticket ${id} was not found.`} />;
  }

  return (
    <div className="space-y-6">
      <TicketDetailHeader
        backTo={BACK_ROUTE_BY_ROLE[role]}
        id={ticket.id}
        title={ticket.title}
        priority={ticket.priority}
        status={ticket.status}
        createdAt={ticket.createdAt}
      />

      <Card className="p-5">
        <TicketTimeline currentStage={ticket.timelineStage} />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Description</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{ticket.description}</p>
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Attachments ({ticket.attachments.length})
            </h2>
            {ticket.attachments.length === 0 ? (
              <TicketEmptyState message="No attachments." />
            ) : (
              <div className="space-y-2">
                {ticket.attachments.map((file) => (
                  <AttachmentCard key={file.name} {...file} />
                ))}
              </div>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Activity History</h2>
            {ticket.history.length === 0 ? (
              <TicketEmptyState message="No activity yet." />
            ) : (
              ticket.history.map((item, idx) => <ActivityCard key={idx} {...item} />)
            )}
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Comments ({ticket.comments.length})
            </h2>
            {ticket.comments.length === 0 ? (
              <TicketEmptyState message="No comments yet." />
            ) : (
              ticket.comments.map((comment, idx) => <CommentCard key={idx} {...comment} />)
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <TicketInfoCard
            title="Ticket Details"
            rows={[
              { label: 'Category', value: ticket.category },
              { label: 'Reporter', value: <AssigneeAvatar name={ticket.reporter} /> },
              { label: 'Assignee', value: <AssigneeAvatar name={ticket.assignee} /> },
              { label: 'Created', value: ticket.createdAt },
            ]}
          />

          <TicketActionPanel actions={ACTIONS_BY_ROLE[role]} />
        </div>
      </div>
    </div>
  );
}