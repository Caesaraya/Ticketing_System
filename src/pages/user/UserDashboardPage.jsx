import React from 'react';
import {
  Ticket,
  Clock3,
  CheckCircle2,
  Bell,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

import {
  getTickets,
} from '../../services/ticketService';

import {
  useNotifications,
} from '../../hooks/useNotifications';

import {
  buildTicketDetailPath,
} from '../../constants/routes';

import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import DashboardGrid from '../../components/dashboard/DashboardGrid';
import StatCard from '../../components/dashboard/StatCard';
import DashboardSection from '../../components/dashboard/DashboardSection';
import EmptyDashboardState from '../../components/dashboard/EmptyDashboardState';
import DashboardState from '../../components/dashboard/DashboardState';

import { useDashboardSummary } from '../../hooks/useDashboardSummary';

const STATUS_LABELS = {
  OPEN: 'Open',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  QA: 'QA Review',
  DONE: 'Done',
};

function formatDate(value) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function getStatusClass(status) {
  switch (status) {
    case 'DONE':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';

    case 'IN_PROGRESS':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';

    case 'ASSIGNED':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';

    case 'QA':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';

    case 'OPEN':
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
}

export default function UserDashboardPage() {
  const { user } = useAuth();

  const {
    data: summary,
    isLoading: summaryLoading,
    error: summaryError,
    retry: retrySummary,
  } = useDashboardSummary();

  const {
    data: notifications,
    isLoading: notificationsLoading,
    error: notificationsError,
    retry: retryNotifications,
    markAsRead,
  } = useNotifications();

  const [
    recentTickets,
    setRecentTickets,
  ] = React.useState([]);

  const [
    ticketsLoading,
    setTicketsLoading,
  ] = React.useState(true);

  const [
    ticketsError,
    setTicketsError,
  ] = React.useState('');

  const loadRecentTickets =
    React.useCallback(async () => {
      setTicketsLoading(true);
      setTicketsError('');

      try {
        const response =
          await getTickets({
            skip: 0,
            limit: 100,
          });

        const tickets = Array.isArray(
          response
        )
          ? response
          : [];

        const ownTickets =
          tickets
            .filter(
              (ticket) =>
                Number(
                  ticket.reporter_id
                ) === Number(user?.id)
            )
            .sort(
              (a, b) =>
                new Date(
                  b.updated_at ??
                    b.created_at
                ) -
                new Date(
                  a.updated_at ??
                    a.created_at
                )
            )
            .slice(0, 5);

        setRecentTickets(
          ownTickets
        );
      } catch (error) {
        setRecentTickets([]);

        setTicketsError(
          error?.message ||
            'Failed to load recent tickets.'
        );
      } finally {
        setTicketsLoading(false);
      }
    }, [user?.id]);

  React.useEffect(() => {
    if (user?.id) {
      loadRecentTickets();
    }
  }, [
    user?.id,
    loadRecentTickets,
  ]);

  const isLoading =
    summaryLoading ||
    ticketsLoading ||
    notificationsLoading;

  const error =
    summaryError ||
    ticketsError ||
    notificationsError;

  const retry = () => {
    retrySummary();
    loadRecentTickets();
    retryNotifications();
  };

  const stats = [
    {
      key: 'total',
      label: 'My Tickets',
      value:
        summary?.total_tickets ?? 0,
      tone: 'gray',
      icon: Ticket,
    },
    {
      key: 'open',
      label: 'Open',
      value:
        summary?.open_count ?? 0,
      tone: 'red',
      icon: Clock3,
    },
    {
      key: 'done',
      label: 'Done',
      value:
        summary?.done_count ?? 0,
      tone: 'green',
      icon: CheckCircle2,
    },
    {
      key: 'notifications',
      label: 'Notifications',
      value:
        notifications.filter(
          (item) => !item.is_read
        ).length,
      tone: 'blue',
      icon: Bell,
    },
  ];

  return (
    <DashboardState
      isLoading={isLoading}
      error={error}
      onRetry={retry}
    >
      <div className="space-y-6">
        <WelcomeBanner
          title="Dashboard"
          subtitle="Overview of your tickets and recent activities."
        />

        <DashboardGrid columns={4}>
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <StatCard
                key={stat.key}
                label={stat.label}
                value={stat.value}
                tone={stat.tone}
                icon={Icon}
              />
            );
          })}
        </DashboardGrid>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DashboardSection
            title="My Recent Tickets"
          >
            {recentTickets.length ===
            0 ? (
              <EmptyDashboardState
                message={
                  ticketsLoading
                    ? 'Loading recent tickets...'
                    : 'You do not have any recent tickets.'
                }
              />
            ) : (
              <div className="space-y-3">
                {recentTickets.map(
                  (ticket) => (
                    <a
                      key={ticket.id}
                      href={buildTicketDetailPath(
                        ticket.id
                      )}
                      className="block rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-400">
                            {
                              ticket.ticket_number
                            }
                          </p>

                          <p className="mt-1 truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {ticket.title}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Updated{' '}
                            {formatDate(
                              ticket.updated_at ??
                                ticket.created_at
                            )}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(
                            ticket.status
                          )}`}
                        >
                          {STATUS_LABELS[
                            ticket.status
                          ] ??
                            ticket.status}
                        </span>
                      </div>
                    </a>
                  )
                )}
              </div>
            )}
          </DashboardSection>

          <DashboardSection
            title="Recent Notifications"
          >
            {notifications.length ===
            0 ? (
              <EmptyDashboardState
                message={
                  notificationsLoading
                    ? 'Loading notifications...'
                    : 'No notifications yet.'
                }
              />
            ) : (
              <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                {notifications
                  .slice(0, 10)
                  .map(
                    (notification) => (
                      <button
                        key={
                          notification.id
                        }
                        type="button"
                        onClick={() => {
                          if (
                            !notification.is_read
                          ) {
                            markAsRead(
                              notification.id
                            ).catch(
                              () => {}
                            );
                          }
                        }}
                        className={`w-full rounded-lg border p-3 text-left transition ${
                          notification.is_read
                            ? 'border-gray-200 dark:border-gray-800'
                            : 'border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20'
                        } hover:bg-gray-50 dark:hover:bg-gray-800/50`}
                      >
                        <div className="flex gap-3">
                          <Bell
                            size={17}
                            className="mt-0.5 shrink-0 text-gray-400"
                          />

                          <div className="min-w-0">
                            <p
                              className={`text-sm ${
                                notification.is_read
                                  ? 'text-gray-600 dark:text-gray-300'
                                  : 'font-medium text-gray-900 dark:text-gray-100'
                              }`}
                            >
                              {
                                notification.message
                              }
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {formatDate(
                                notification.created_at
                              )}
                            </p>
                          </div>

                          {!notification.is_read && (
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                          )}
                        </div>
                      </button>
                    )
                  )}
              </div>
            )}
          </DashboardSection>
        </div>
      </div>
    </DashboardState>
  );
}