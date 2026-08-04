import { useCallback, useState } from 'react';

import {
  assignTicket,
} from '../services/ticketService';

export function useTicketActions() {
  const [isAssigning, setIsAssigning] = useState(false);
  const [actionError, setActionError] = useState(null);

  const assign = useCallback(async (ticketId, picId) => {
    setIsAssigning(true);
    setActionError(null);

    try {
      const updatedTicket = await assignTicket(
        ticketId,
        picId
      );

      return updatedTicket;
    } catch (error) {
      let message = 'Failed to assign ticket.';

      if (error?.status === 403) {
        message =
          'You do not have permission to assign this ticket.';
      } else if (error?.status === 404) {
        message =
          'Ticket or selected PIC was not found.';
      } else if (error?.status === 422) {
        message =
          'The assignment data is invalid.';
      } else if (error?.status >= 500) {
        message =
          'The server could not process the assignment.';
      } else if (
        error?.message &&
        error.message.includes('Unable to reach')
      ) {
        message =
          'Unable to connect to the backend.';
      }

      setActionError(message);

      throw error;
    } finally {
      setIsAssigning(false);
    }
  }, []);

  const clearActionError = useCallback(() => {
    setActionError(null);
  }, []);

  return {
    assignTicket: assign,

    isAssigning,

    actionError,

    clearActionError,
  };
}