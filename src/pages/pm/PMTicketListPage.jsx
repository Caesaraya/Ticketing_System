import { SHARED_TICKETS } from '../../data/ticketsSharedDummy';
import TicketListView from '../../components/tickets/TicketListView';

// PM sees every ticket, no ownership filter, and gets the Assign
// action in addition to View — assignment itself stays a placeholder
// (no assignment logic in this stage).
export default function PMTicketListPage() {
  return (
    <TicketListView
      tickets={SHARED_TICKETS}
      breadcrumb={[{ label: 'Tickets' }, { label: 'All Tickets' }]}
      title="All Tickets"
      emptyMessage="No tickets match your filters."
      showAssignAction
    />
  );
}