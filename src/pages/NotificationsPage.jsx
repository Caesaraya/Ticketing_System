import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { toast } from 'sonner';

import {
  getNotifications,
  markNotificationAsRead,
} from '../services/notificationService';

import Card from '../components/ui/Card';
import NotificationCard from '../components/notifications/NotificationCard';
import NotificationFilter from '../components/notifications/NotificationFilter';
import TicketEmptyState from '../components/tickets/TicketEmptyState';

function getErrorMessage(error) {
  if (error?.status === 403) {
    return 'You do not have permission to view notifications.';
  }

  if (error?.status === 404) {
    return 'Notification service was not found.';
  }

  if (error?.status === 422) {
    return (
      error?.message ||
      'The notification request is invalid.'
    );
  }

  if (error?.status >= 500) {
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
    'Failed to load notifications.'
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState([]);

  const [filter, setFilter] =
    useState('all');

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [
    markingReadId,
    setMarkingReadId,
  ] = useState(null);

  const loadNotifications =
    useCallback(async () => {
      setIsLoading(true);
      setError('');

      try {
        const data =
          await getNotifications({
            skip: 0,
            limit: 20,
          });

        setNotifications(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        setNotifications([]);
        setError(
          getErrorMessage(err)
        );
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const visibleNotifications =
    useMemo(() => {
      if (filter === 'unread') {
        return notifications.filter(
          (notification) =>
            !notification.is_read
        );
      }

      return notifications;
    }, [
      notifications,
      filter,
    ]);

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !notification.is_read
      ).length,
    [notifications]
  );

  const handleMarkRead = async (
    notificationId
  ) => {
    if (
      markingReadId !== null
    ) {
      return;
    }

    const notification =
      notifications.find(
        (item) =>
          Number(item.id) ===
          Number(notificationId)
      );

    if (
      !notification ||
      notification.is_read
    ) {
      return;
    }

    setMarkingReadId(
      notificationId
    );

    try {
      const updated =
        await markNotificationAsRead(
          notificationId
        );

      setNotifications(
        (current) =>
          current.map(
            (item) =>
              Number(item.id) ===
              Number(notificationId)
                ? {
                    ...item,
                    ...(updated ?? {}),
                    is_read: true,
                  }
                : item
          )
      );
    } catch (err) {
      toast.error(
        getErrorMessage(
          err
        )
      );
    } finally {
      setMarkingReadId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {unreadCount > 0
              ? `${unreadCount} unread notification${
                  unreadCount > 1
                    ? 's'
                    : ''
                }`
              : 'You have no unread notifications.'}
          </p>
        </div>

        <NotificationFilter
          value={filter}
          onChange={setFilter}
        />
      </div>

      <Card className="p-3">
        {isLoading ? (
          <div className="flex min-h-[240px] items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading notifications...
            </p>
          </div>
        ) : error ? (
          <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm text-red-500">
              {error}
            </p>

            <button
              type="button"
              onClick={loadNotifications}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : visibleNotifications.length ===
          0 ? (
          <TicketEmptyState
            message={
              filter === 'unread'
                ? 'No unread notifications.'
                : 'No notifications yet.'
            }
          />
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {visibleNotifications.map(
              (notification) => (
                <NotificationCard
                  key={notification.id}
                  {...notification}
                  onMarkRead={
                    handleMarkRead
                  }
                />
              )
            )}
          </div>
        )}
      </Card>
    </div>
  );
}