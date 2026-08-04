import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '../../context/AuthContext';

import {
  ROUTES,
  DASHBOARD_BY_ROLE,
} from '../../constants/routes';

import { ROLES } from '../../constants/roles';

import {
  createTicket,
} from '../../services/ticketService';

import {
  uploadAttachment,
} from '../../services/attachmentService';

import Card from '../../components/ui/Card';
import TicketHeader from '../../components/tickets/TicketHeader';
import TicketForm from '../../components/tickets/TicketForm';
import AttachmentUploader from '../../components/tickets/AttachmentUploader';

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

  const [attachment, setAttachment] =
    useState(null);

  const backTo =
    LIST_ROUTE_BY_ROLE[role] ??
    DASHBOARD_BY_ROLE[role] ??
    ROUTES.HOME;

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const createdTicket =
        await createTicket({
          type:
            data.type?.toUpperCase() === 'FEATURE'
              ? 'FEATURE'
              : 'BUG',

          title: data.title,

          description:
            data.description,

          priority:
            data.priority?.toUpperCase(),

          module:
            data.category,
        });

      /*
       * Ticket harus dibuat terlebih dahulu karena
       * endpoint attachment membutuhkan ticket_id.
       */
      if (
        attachment &&
        createdTicket?.id
      ) {
        try {
          await uploadAttachment(
            createdTicket.id,
            attachment
          );
        } catch (attachmentError) {
          console.error(
            'Attachment upload failed:',
            attachmentError
          );

          toast.warning(
            'Ticket was created, but the attachment could not be uploaded.'
          );
        }
      }

      toast.success(
        `Ticket ${
          createdTicket.ticket_number ??
          createdTicket.id
        } created`
      );

      navigate(backTo);
    } catch (error) {
      toast.error(
        getErrorMessage(error)
      );
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

        <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-800">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Attachment
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Attach a screenshot or document related to this ticket.
            </p>
          </div>

          <AttachmentUploader
            file={attachment}
            onChange={setAttachment}
          />
        </div>
      </Card>
    </div>
  );
}