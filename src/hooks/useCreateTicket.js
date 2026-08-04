import {
  useCallback,
  useState,
} from 'react';

import {
  createTicket,
} from '../services/ticketService';

export function useCreateTicket() {
  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(null);

  const submit = useCallback(
    async (data) => {
      setIsSubmitting(true);
      setError(null);

      try {
        return await createTicket(
          data
        );
      } catch (requestError) {
        setError(requestError);
        throw requestError;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return {
    submit,
    isSubmitting,
    error,
  };
}