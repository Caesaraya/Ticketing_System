import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  getNotifications,
  markNotificationAsRead,
} from '../services/notificationService';

export function useNotifications() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] =
    useState(true);
  const [error, setError] = useState('');

  const loadNotifications =
    useCallback(async () => {
      setIsLoading(true);
      setError('');

      try {
        const response =
          await getNotifications({
            skip: 0,
            limit: 20,
          });

        setData(
          Array.isArray(response)
            ? response
            : []
        );
      } catch (err) {
        setError(
          err?.message ||
            'Failed to load notifications.'
        );
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const markAsRead = useCallback(
    async (notificationId) => {
      try {
        const updated =
          await markNotificationAsRead(
            notificationId
          );

        setData((current) =>
          current.map((notification) =>
            notification.id ===
            notificationId
              ? {
                  ...notification,
                  ...(updated || {}),
                  is_read: true,
                }
              : notification
          )
        );

        return updated;
      } catch (err) {
        throw err;
      }
    },
    []
  );

  return {
    data,
    isLoading,
    error,
    retry: loadNotifications,
    markAsRead,
  };
}