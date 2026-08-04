import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  getTicketById,
} from '../services/ticketService';

export function useTicket(ticketId) {
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTicket = useCallback(async () => {
    if (!ticketId) {
      setTicket(null);
      setError(
        new Error('Ticket ID is required.')
      );
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getTicketById(ticketId);

      setTicket(data);

      return data;
    } catch (requestError) {
      setTicket(null);
      setError(requestError);
      throw requestError;
    } finally {
      setIsLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    loadTicket().catch(() => {});
  }, [loadTicket]);

  const retry = useCallback(() => {
    return loadTicket();
  }, [loadTicket]);

  return {
    ticket,
    isLoading,
    error,
    retry,
  };
}