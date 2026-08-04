import { useCallback, useEffect, useState } from 'react';
import { getTicketById } from '../services/ticketService';

export function useTicketDetail(ticketId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!ticketId) {
      setData(null);
      setError(new Error('Ticket ID is required.'));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const ticket = await getTicketById(ticketId);
      setData(ticket);
    } catch (requestError) {
      setData(null);
      setError(requestError);
    } finally {
      setIsLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    ticket: data,
    isLoading,
    error,
    retry: load,
  };
}