import { useAuth } from '../../context/AuthContext';
import { SHARED_TICKETS } from '../../data/ticketsSharedDummy';
import TicketListView from '../../components/tickets/TicketListView';

// Staff only sees tickets assigned to them — View only, no Assign
// action (assignment is PM-only).
export default function StaffTicketListPage() {
  const { user } = useAuth();

  const myAssignedTickets = SHARED_TICKETS.filter((ticket) => ticket.assignee === user?.name);

  return (
    <TicketListView
      tickets={myAssignedTickets}
      breadcrumb={[{ label: 'Tickets' }, { label: 'My Assignments' }]}
      title="My Assignments"
      emptyMessage="No tickets are assigned to you yet."
      showAssignAction={false}
    />
  );
}