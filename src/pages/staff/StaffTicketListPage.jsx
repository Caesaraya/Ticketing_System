import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { ROUTES } from '../../constants/routes';

import TicketListView from '../../components/tickets/TicketListView';
import Button from '../../components/ui/Button';

export default function UserTicketListPage() {
  const navigate = useNavigate();

  return (
    <TicketListView
      breadcrumb={[
        { label: 'Tickets' },
        { label: 'My Tickets' },
      ]}
      title="My Tickets"
      emptyMessage="You haven't created any tickets yet."
      showAssignAction={false}
      headerAction={
        <Button
          icon={Plus}
          onClick={() =>
            navigate(
              ROUTES.CREATE_TICKET
            )
          }
        >
          Create Ticket
        </Button>
      }
    />
  );
}