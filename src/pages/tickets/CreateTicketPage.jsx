import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { ROUTES, DASHBOARD_BY_ROLE } from '../../constants/routes';
import { ROLES } from '../../constants/roles';

import Card from '../../components/ui/Card';
import TicketHeader from '../../components/tickets/TicketHeader';
import TicketForm from '../../components/tickets/TicketForm';

const LIST_ROUTE_BY_ROLE = {
  [ROLES.USER]: ROUTES.USER_TICKETS,
  [ROLES.PM]: ROUTES.PM_TICKETS,
};

export default function CreateTicketPage() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backTo = LIST_ROUTE_BY_ROLE[role] ?? DASHBOARD_BY_ROLE[role];

  // Dummy submission only: builds a temporary ticket object client-side,
  // shows success feedback, and navigates back — nothing is persisted
  // and no request is made. Swapping this for a real
  // `axios.post('/tickets', data)` call is the only change needed once
  // the backend exists.
  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    const dummyTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: data.title,
      type: data.type,
      priority: data.priority,
      category: data.category,
      description: data.description,
      status: 'Open',
      reporter: user?.name ?? 'unknown',
      assignee: null,
      createdAt: 'Just now',
      attachmentName: data.attachment?.name ?? null,
    };

    await new Promise((resolve) => setTimeout(resolve, 400));

    toast.success(`Ticket ${dummyTicket.id} created`);
    setIsSubmitting(false);
    navigate(backTo);
  };

  return (
    <div className="space-y-6">
      <TicketHeader
        breadcrumb={[{ label: 'Tickets', to: backTo }, { label: 'Create New Ticket' }]}
        title="Submit a Request"
      />

      <Card className="mx-auto max-w-2xl p-6">
        <TicketForm onSubmit={handleSubmit} onCancel={() => navigate(backTo)} isSubmitting={isSubmitting} />
      </Card>
    </div>
  );
}