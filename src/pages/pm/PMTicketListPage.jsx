import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { SHARED_TICKETS } from '../../data/ticketsSharedDummy';
import TicketListView from '../../components/tickets/TicketListView';
import Button from '../../components/ui/Button';

// PM sees every ticket, no ownership filter, and gets the Assign
// action in addition to View — assignment itself stays a placeholder
// (no assignment logic in this stage).
export default function PMTicketListPage() {
  const navigate = useNavigate();

  return (
    <TicketListView
      tickets={SHARED_TICKETS}
      breadcrumb={[{ label: 'Tickets' }, { label: 'All Tickets' }]}
      title="All Tickets"
      emptyMessage="No tickets match your filters."
      showAssignAction
      headerAction={
        <Button icon={Plus} onClick={() => navigate(ROUTES.CREATE_TICKET)}>
          Create Ticket
        </Button>
      }
    />
  );
}