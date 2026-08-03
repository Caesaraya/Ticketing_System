import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import { SHARED_TICKETS } from '../../data/ticketsSharedDummy';
import TicketListView from '../../components/tickets/TicketListView';
import Button from '../../components/ui/Button';

// User only sees tickets they reported themselves — no Assign action,
// consistent with the "View Ticket" only requirement for this role.
export default function UserTicketListPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const myTickets = SHARED_TICKETS.filter((ticket) => ticket.reporter === user?.name);

  return (
    <TicketListView
      tickets={myTickets}
      breadcrumb={[{ label: 'Tickets' }, { label: 'My Tickets' }]}
      title="My Tickets"
      emptyMessage="You haven't created any tickets yet."
      showAssignAction={false}
      headerAction={
        <Button icon={Plus} onClick={() => navigate(ROUTES.CREATE_TICKET)}>
          Create Ticket
        </Button>
      }
    />
  );
}