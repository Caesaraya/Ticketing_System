import { useCallback, useEffect, useState } from 'react';
import { getDashboardSummary } from '../services/dashboardService';

export function useDashboardSummary() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const summary = await getDashboardSummary();
      setData(summary);
    } catch (requestError) {
      setError(requestError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    isLoading,
    error,
    retry: load,
  };
}