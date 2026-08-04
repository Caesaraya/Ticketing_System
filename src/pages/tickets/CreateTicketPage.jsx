import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '../../context/AuthContext';

import {
  ROUTES,
  DASHBOARD_BY_ROLE,
  buildTicketDetailPath,
} from '../../constants/routes';

import { ROLES } from '../../constants/roles';

import { createTicket } from '../../services/ticketService';

import Card from '../../components/ui/Card';
import TicketHeader from '../../components/tickets/TicketHeader';
import TicketForm from '../../components/tickets/TicketForm';

const LIST_ROUTE_BY_ROLE = {
  [ROLES.USER]: ROUTES.USER_TICKETS,
  [ROLES.PM]: ROUTES.PM_TICKETS,
};

function getErrorMessage(error) {
  const status = error?.status;

  if (status === 403) {
    return 'You do not have permission to create a ticket.';
  }

  if (status === 422) {
    return (
      error?.message ||
      'Please check the ticket information and try again.'
    );
  }

  if (status >= 500) {
    return 'The server is currently unavailable. Please try again later.';
  }

  if (
    error?.message
      ?.toLowerCase()
      .includes('unable to reach')
  ) {
    return 'Unable to connect to the Ticketing System backend.';
  }

  return (
    error?.message ||
    'Failed to create ticket. Please try again.'
  );
}

export default function CreateTicketPage() {
  const { role } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const backTo =
    LIST_ROUTE_BY_ROLE[role] ??
    DASHBOARD_BY_ROLE[role] ??
    ROUTES.HOME;

  const handleSubmit = async (data) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      type: data.type,
      title: data.title.trim(),
      description: data.description.trim(),
      priority: data.priority,
      module: data.module,
    };

    try {
      const createdTicket =
        await createTicket(payload);

      if (!createdTicket?.id) {
        throw new Error(
          'Ticket was created but the server did not return a ticket ID.'
        );
      }

      const ticketLabel =
        createdTicket.ticket_number ??
        `#${createdTicket.id}`;

      toast.success(
        `Ticket ${ticketLabel} created successfully.`
      );

      navigate(
        buildTicketDetailPath(
          createdTicket.id
        )
      );
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <TicketHeader
        breadcrumb={[
          {
            label: 'Tickets',
            to: backTo,
          },
          {
            label: 'Create New Ticket',
          },
        ]}
        title="Submit a Request"
      />

      <Card className="mx-auto max-w-2xl p-6">
        <TicketForm
          onSubmit={handleSubmit}
          onCancel={() => navigate(backTo)}
          isSubmitting={isSubmitting}
          submitLabel="Submit Ticket"
        />
      </Card>
    </div>
  );
}