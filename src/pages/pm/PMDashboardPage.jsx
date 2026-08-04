import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  Ticket,
  AlertCircle,
  UserCheck,
  Clock3,
  Search,
  CheckCircle2,
} from 'lucide-react';

import { useDashboardSummary } from '../../hooks/useDashboardSummary';

import { getActivityLogs } from '../../services/activityService';
import { getTickets } from '../../services/ticketService';

import { buildTicketDetailPath } from '../../constants/routes';

import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import DashboardGrid from '../../components/dashboard/DashboardGrid';
import StatCard from '../../components/dashboard/StatCard';
import DashboardSection from '../../components/dashboard/DashboardSection';
import PriorityDistributionChart from '../../components/dashboard/PriorityDistributionChart';
import StatusDistributionChart from '../../components/dashboard/StatusDistributionChart';
import EmptyDashboardState from '../../components/dashboard/EmptyDashboardState';
import DashboardState from '../../components/dashboard/DashboardState';

const STAT_ICONS = {
  total: Ticket,
  open: AlertCircle,
  assigned: UserCheck,
  inProgress: Clock3,
  qa: Search,
  done: CheckCircle2,
};

const PRIORITY_LABELS = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

function formatActivityDate(value) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function getActivityActionLabel(action) {
  if (!action) {
    return 'Activity';
  }

  return action
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function getActivityErrorMessage(error) {
  if (error?.status === 403) {
    return 'You do not have permission to view activity logs.';
  }

  if (error?.status >= 500) {
    return 'The server is currently unavailable.';
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
    'Failed to load activity logs.'
  );
}

function getTicketErrorMessage(error) {
  if (error?.status === 403) {
    return 'You do not have permission to view tickets.';
  }

  if (error?.status >= 500) {
    return 'The server is currently unavailable.';
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
    'Failed to load unassigned tickets.'
  );
}

function getTicketPriorityClass(priority) {
  switch (priority) {
    case 'CRITICAL':
      return 'text-red-600 dark:text-red-400';

    case 'HIGH':
      return 'text-orange-600 dark:text-orange-400';

    case 'MEDIUM':
      return 'text-yellow-600 dark:text-yellow-400';

    case 'LOW':
      return 'text-green-600 dark:text-green-400';

    default:
      return 'text-gray-600 dark:text-gray-300';
  }
}

export default function PMDashboardPage() {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    retry,
  } = useDashboardSummary();

  const [activities, setActivities] =
    useState([]);

  const [
    isActivityLoading,
    setIsActivityLoading,
  ] = useState(true);

  const [
    activityError,
    setActivityError,
  ] = useState('');

  const [
    unassignedTickets,
    setUnassignedTickets,
  ] = useState([]);

  const [
    isTicketsLoading,
    setIsTicketsLoading,
  ] = useState(true);

  const [
    ticketsError,
    setTicketsError,
  ] = useState('');

  const loadActivities = useCallback(
    async () => {
      setIsActivityLoading(true);
      setActivityError('');

      try {
        const response =
          await getActivityLogs({
            skip: 0,
            limit: 50,
          });

        const filteredActivities =
          Array.isArray(response)
            ? response.filter(
                (activity) =>
                  activity.action !==
                    'LOGIN' &&
                  activity.action !==
                    'LOGOUT'
              )
            : [];

        setActivities(
          filteredActivities
        );
      } catch (error) {
        setActivityError(
          getActivityErrorMessage(error)
        );
      } finally {
        setIsActivityLoading(false);
      }
    },
    []
  );

  const loadUnassignedTickets =
    useCallback(
      async () => {
        setIsTicketsLoading(true);
        setTicketsError('');

        try {
          /*
           * Backend endpoint:
           * GET /ticket
           *
           * We intentionally request a larger
           * page and filter pic_id on the
           * frontend because the backend's
           * pic_id parameter is for filtering
           * by a specific PIC, not for
           * "IS NULL".
           */
          const response =
            await getTickets({
              skip: 0,
              limit: 50,
              sort_by: 'created_at',
              sort_order: 'desc',
            });

          const tickets =
            Array.isArray(response)
              ? response
              : [];

          const unassigned =
            tickets.filter(
              (ticket) =>
                ticket.pic_id === null ||
                ticket.pic_id === undefined ||
                Number(ticket.pic_id) === 0
            );

          setUnassignedTickets(
            unassigned
          );
        } catch (error) {
          setTicketsError(
            getTicketErrorMessage(error)
          );
        } finally {
          setIsTicketsLoading(false);
        }
      },
      []
    );

  useEffect(() => {
    loadActivities();
    loadUnassignedTickets();
  }, [
    loadActivities,
    loadUnassignedTickets,
  ]);

  const stats = [
    {
      key: 'total',
      label: 'Total Tickets',
      value:
        data?.total_tickets ?? 0,
      tone: 'gray',
    },
    {
      key: 'open',
      label: 'Open',
      value:
        data?.open_count ?? 0,
      tone: 'red',
    },
    {
      key: 'assigned',
      label: 'Assigned',
      value:
        data?.assigned_count ?? 0,
      tone: 'purple',
    },
    {
      key: 'inProgress',
      label: 'In Progress',
      value:
        data?.in_progress_count ?? 0,
      tone: 'blue',
    },
    {
      key: 'qa',
      label: 'QA Review',
      value:
        data?.qa_count ?? 0,
      tone: 'amber',
    },
    {
      key: 'done',
      label: 'Done',
      value:
        data?.done_count ?? 0,
      tone: 'green',
    },
  ];

  const priorityData = (
    data?.by_priority ?? []
  ).map((item) => ({
    label:
      PRIORITY_LABELS[
        item.priority
      ] ?? item.priority,
    value: item.count,
  }));

  return (
    <DashboardState
      isLoading={isLoading}
      error={error}
      onRetry={retry}
    >
      <div className="space-y-6">
        <WelcomeBanner
          title="Dashboard"
          subtitle="Overview of IT Support metrics and activities."
        />

        <DashboardGrid columns={6}>
          {stats.map((stat) => (
            <StatCard
              key={stat.key}
              label={stat.label}
              value={stat.value}
              tone={stat.tone}
              icon={
                STAT_ICONS[stat.key]
              }
            />
          ))}
        </DashboardGrid>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StatusDistributionChart
            data={
              data?.by_status ?? []
            }
          />

          <PriorityDistributionChart
            data={priorityData}
            total={
              data?.total_tickets ?? 0
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardSection
              title="Needs Assignment"
              actionLabel="View All"
            >
              <div className="max-h-[320px] overflow-y-auto pr-1">
                {isTicketsLoading ? (
                  <div className="flex min-h-[180px] items-center justify-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Loading unassigned tickets...
                    </p>
                  </div>
                ) : ticketsError ? (
                  <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 text-center">
                    <p className="text-sm text-red-500">
                      {ticketsError}
                    </p>

                    <button
                      type="button"
                      onClick={
                        loadUnassignedTickets
                      }
                      className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      Retry
                    </button>
                  </div>
                ) : unassignedTickets.length ===
                  0 ? (
                  <div className="flex min-h-[180px] items-center justify-center">
                    <EmptyDashboardState
                      message="All tickets have been assigned."
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {unassignedTickets.map(
                      (ticket) => (
                        <div
                          key={ticket.id}
                          className="rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                  {ticket.ticket_number ??
                                    `#${ticket.id}`}
                                </span>

                                <span
                                  className={`text-xs font-medium ${getTicketPriorityClass(
                                    ticket.priority
                                  )}`}
                                >
                                  {PRIORITY_LABELS[
                                    ticket.priority
                                  ] ??
                                    ticket.priority}
                                </span>
                              </div>

                              <h3 className="mt-1 truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {ticket.title}
                              </h3>

                              <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <span>
                                  {ticket.type}
                                </span>

                                {ticket.module && (
                                  <>
                                    <span>
                                      •
                                    </span>

                                    <span>
                                      {
                                        ticket.module
                                      }
                                    </span>
                                  </>
                                )}

                                <span>
                                  •
                                </span>

                                <span>
                                  {ticket.status}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  buildTicketDetailPath(
                                    ticket.id
                                  )
                                )
                              }
                              className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                            >
                              Assign
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </DashboardSection>
          </div>

          <DashboardSection
            title="Recent Activity"
          >
            <div className="h-[320px] overflow-y-auto pr-1">
              {isActivityLoading ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Loading activities...
                  </p>
                </div>
              ) : activityError ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <p className="text-sm text-red-500">
                    {activityError}
                  </p>

                  <button
                    type="button"
                    onClick={
                      loadActivities
                    }
                    className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    Retry
                  </button>
                </div>
              ) : activities.length ===
                0 ? (
                <div className="flex h-full items-center justify-center">
                  <EmptyDashboardState
                    message="No recent activity."
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.map(
                    (activity) => (
                      <div
                        key={
                          activity.id
                        }
                        className="rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {getActivityActionLabel(
                                activity.action
                              )}
                            </p>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                              {
                                activity.description
                              }
                            </p>
                          </div>

                          <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                            {formatActivityDate(
                              activity.timestamp
                            )}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </DashboardSection>
        </div>
      </div>
    </DashboardState>
  );
}