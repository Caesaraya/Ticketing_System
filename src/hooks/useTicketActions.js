import { useCallback, useState } from 'react';

import {
  createTicket,
  updateTicket,
  updateTicketStatus,
  assignTicket,
  updateTicketPriority,
} from '../services/ticketService';

export function useTicketActions() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (action) => {
    setIsSubmitting(true);
    setError(null);

    try {
      return await action();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleCreateTicket = useCallback(
    (payload) => execute(() => createTicket(payload)),
    [execute]
  );

  const handleUpdateTicket = useCallback(
    (ticketId, payload) =>
      execute(() => updateTicket(ticketId, payload)),
    [execute]
  );

  const handleUpdateStatus = useCallback(
    (ticketId, status) =>
      execute(() => updateTicketStatus(ticketId, status)),
    [execute]
  );

  const handleAssignTicket = useCallback(
    (ticketId, picId) =>
      execute(() => assignTicket(ticketId, picId)),
    [execute]
  );

  const handleUpdatePriority = useCallback(
    (ticketId, priority) =>
      execute(() =>
        updateTicketPriority(ticketId, priority)
      ),
    [execute]
  );

  return {
    createTicket: handleCreateTicket,
    updateTicket: handleUpdateTicket,
    updateStatus: handleUpdateStatus,
    assignTicket: handleAssignTicket,
    updatePriority: handleUpdatePriority,
    isSubmitting,
    error,
    clearError: () => setError(null),
  };
}