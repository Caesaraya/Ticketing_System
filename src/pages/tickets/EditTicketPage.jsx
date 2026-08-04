import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import { toast } from 'sonner';

import Card from '../../components/ui/Card';

import TicketHeader from '../../components/tickets/TicketHeader';

import TicketForm from '../../components/tickets/TicketForm';

import {
  useTicket,
} from '../../hooks/useTicket';

import {
  useTicketActions,
} from '../../hooks/useTicketActions';

import {
  ROUTES,
} from '../../constants/routes';

export default function EditTicketPage() {
  const {
    id,
  } = useParams();

  const navigate =
    useNavigate();

  const {
    ticket,
    isLoading,
    error,
  } = useTicket(id);

  const {
    edit,
    isSubmitting,
  } = useTicketActions();

  if (isLoading) {
    return (
      <div className="p-6">
        Loading ticket...
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="p-6 text-sm text-red-600">
        Unable to load ticket.
      </div>
    );
  }

  if (
    ticket.status ===
    'DONE'
  ) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">
          This ticket is already completed and cannot be edited.
        </p>
      </div>
    );
  }

  const handleSubmit =
    async (data) => {
      try {
        await edit(
          id,
          data
        );

        toast.success(
          'Ticket updated successfully.'
        );

        navigate(
          `${ROUTES.TICKET_DETAIL}/${id}`
        );
      } catch (requestError) {
        toast.error(
          requestError?.message ??
            'Unable to update ticket.'
        );
      }
    };

  return (
    <div className="space-y-6">
      <TicketHeader
        breadcrumb={[
          {
            label: 'Tickets',
            to: ROUTES.USER_TICKETS,
          },
          {
            label:
              ticket.ticket_number,
          },
          {
            label:
              'Edit Ticket',
          },
        ]}
        title="Edit Ticket"
      />

      <Card className="mx-auto max-w-2xl p-6">
        <TicketForm
          defaultValues={{
            title:
              ticket.title,
            type:
              ticket.type,
            priority:
              ticket.priority,
            module:
              ticket.module ??
              '',
            description:
              ticket.description ??
              '',
          }}
          onSubmit={
            handleSubmit
          }
          onCancel={() =>
            navigate(-1)
          }
          isSubmitting={
            isSubmitting
          }
          submitLabel="Save Changes"
        />
      </Card>
    </div>
  );
}