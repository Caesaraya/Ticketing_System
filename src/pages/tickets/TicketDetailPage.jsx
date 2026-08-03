import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';
import { PRIORITY_OPTIONS } from '../../constants/ticketOptions';
import { SHARED_TICKETS } from '../../data/ticketsSharedDummy';

import Card from '../../components/ui/Card';
import Select from '../../components/ui/Select';
import TicketDetailHeader from '../../components/tickets/TicketDetailHeader';
import TicketTimeline from '../../components/tickets/TicketTimeline';
import TicketInfoCard from '../../components/tickets/TicketInfoCard';
import CommentCard from '../../components/tickets/CommentCard';
import AttachmentCard from '../../components/tickets/AttachmentCard';
import ActivityCard from '../../components/dashboard/ActivityCard';
import AssigneeAvatar from '../../components/tickets/AssigneeAvatar';
import TicketActionPanel from '../../components/tickets/TicketActionPanel';
import TicketEmptyState from '../../components/tickets/TicketEmptyState';
import StatusSelector from '../../components/tickets/StatusSelector';
import AssignmentPanel from '../../components/tickets/AssignmentPanel';
import NoteComposer from '../../components/tickets/NoteComposer';

const BACK_ROUTE_BY_ROLE = {
  [ROLES.USER]: ROUTES.USER_TICKETS,
  [ROLES.PM]: ROUTES.PM_TICKETS,
  [ROLES.STAFF]: ROUTES.STAFF_TICKETS,
};

// One shared Ticket Detail page for every role. Layout is identical —
// only the back destination and what's inside the action panel change,
// both derived from the logged-in user's role. Everything workflow-
// related (status, priority, assignee, notes) lives in local state
// seeded from the dummy ticket record: no persistence, a refresh
// resets it back to the original dummy data, exactly as this stage
// asks for.
export default function TicketDetailPage() {
  const { id } = useParams();
  const { user, role } = useAuth();

  const ticket = SHARED_TICKETS.find((t) => t.id === id);

  const [status, setStatus] = useState(ticket?.timelineStage ?? 'Open');
  const [priority, setPriority] = useState(ticket?.priority ?? 'Medium');
  const [assignee, setAssignee] = useState(ticket?.assignee ?? null);
  const [internalNotes, setInternalNotes] = useState([]);
  const [workNotes, setWorkNotes] = useState([]);

  if (!ticket) {
    return <TicketEmptyState message={`Ticket ${id} was not found.`} />;
  }

  const handleAdvanceStatus = (next) => {
    setStatus(next);
    toast.success(`Status moved to ${next}`);
  };

  const handleAssign = (staffName) => {
    setAssignee(staffName);
    toast.success(staffName ? `Assigned to ${staffName}` : 'Ticket unassigned');
  };

  const handleAddInternalNote = (text) => {
    setInternalNotes((prev) => [...prev, { author: user?.name, time: 'Just now', message: text }]);
  };

  const handleAddWorkNote = (text) => {
    setWorkNotes((prev) => [...prev, { author: user?.name, time: 'Just now', message: text }]);
  };

  return (
    <div className="space-y-6">
      <TicketDetailHeader
        backTo={BACK_ROUTE_BY_ROLE[role]}
        id={ticket.id}
        title={ticket.title}
        priority={priority}
        status={status}
        createdAt={ticket.createdAt}
      />

      <Card className="p-5">
        <TicketTimeline currentStage={status} />
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

          {/* Internal notes are PM-only, per role permissions — never shown to User or Staff. */}
          {role === ROLES.PM && internalNotes.length > 0 && (
            <Card className="p-5">
              <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                Internal Notes ({internalNotes.length})
              </h2>
              {internalNotes.map((note, idx) => (
                <CommentCard key={idx} {...note} />
              ))}
            </Card>
          )}

          {/* Work notes are Staff-only, per role permissions. */}
          {role === ROLES.STAFF && workNotes.length > 0 && (
            <Card className="p-5">
              <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                Work Notes ({workNotes.length})
              </h2>
              {workNotes.map((note, idx) => (
                <CommentCard key={idx} {...note} />
              ))}
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <TicketInfoCard
            title="Ticket Details"
            rows={[
              { label: 'Category', value: ticket.category },
              { label: 'Reporter', value: <AssigneeAvatar name={ticket.reporter} /> },
              { label: 'Assignee', value: <AssigneeAvatar name={assignee} /> },
              { label: 'Created', value: ticket.createdAt },
            ]}
          />

          {/* User: view-only, no action panel at all. */}
          {role === ROLES.PM && (
            <TicketActionPanel>
              <StatusSelector status={status} onAdvance={handleAdvanceStatus} />

              <div>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Priority</p>
                <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  {PRIORITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>

              <AssignmentPanel assignee={assignee} onAssign={handleAssign} />

              <div>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Internal Note (PM only)</p>
                <NoteComposer
                  placeholder="Add a note visible only to PMs..."
                  buttonLabel="Add Internal Note"
                  onAdd={handleAddInternalNote}
                />
              </div>
            </TicketActionPanel>
          )}

          {role === ROLES.STAFF && (
            <TicketActionPanel>
              <StatusSelector status={status} onAdvance={handleAdvanceStatus} />

              <div>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Work Note</p>
                <NoteComposer
                  placeholder="Add a note about your progress on this ticket..."
                  buttonLabel="Add Work Note"
                  onAdd={handleAddWorkNote}
                />
              </div>
            </TicketActionPanel>
          )}
        </div>
      </div>
    </div>
  );
}