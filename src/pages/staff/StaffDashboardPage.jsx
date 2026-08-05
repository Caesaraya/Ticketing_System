import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Ticket,
  AlertCircle,
  Clock3,
  Search,
  CheckCircle2,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

import { useDashboardSummary } from '../../hooks/useDashboardSummary';

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

function getPriorityClass(priority) {
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

function getErrorMessage(error) {
  if (error?.status === 403) {
    return 'You do not have permission to view tickets.';
  }

  if (error?.status === 404) {
    return 'Ticket data could not be found.';
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
    'Failed to load assigned tickets.'
  );
}

export default function StaffDashboardPage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    data,
    isLoading,
    error,
    retry,
  } = useDashboardSummary();

  const [
    assignedTickets,
    setAssignedTickets,
  ] = useState([]);

  const [
    isTicketsLoading,
    setIsTicketsLoading,
  ] = useState(true);

  const [
    ticketsError,
    setTicketsError,
  ] = useState('');

  const loadAssignedTickets =
    useCallback(async () => {
      if (!user?.id) {
        setAssignedTickets([]);
        setIsTicketsLoading(false);
        return;
      }

      setIsTicketsLoading(true);
      setTicketsError('');

      try {
        const response = await getTickets({
          skip: 0,
          limit: 50,
          sort_by: 'created_at',
          sort_order: 'desc',
        });

        const tickets = Array.isArray(response)
          ? response
          : [];

        const myTickets = tickets.filter(
          (ticket) =>
            Number(ticket.pic_id) ===
            Number(user.id)
        );

        setAssignedTickets(myTickets);
      } catch (error) {
        setTicketsError(
          getErrorMessage(error)
        );
      } finally {
        setIsTicketsLoading(false);
      }
    }, [user?.id]);

  useEffect(() => {
    loadAssignedTickets();
  }, [loadAssignedTickets]);

  const stats = [
    {
      key: 'total',
      label: 'Total Tickets',
      value: data?.total_tickets ?? 0,
      tone: 'gray',
    },
    {
      key: 'open',
      label: 'Open',
      value: data?.open_count ?? 0,
      tone: 'red',
    },
    {
      key: 'inProgress',
      label: 'In Progress',
      value: data?.in_progress_count ?? 0,
      tone: 'blue',
    },
    {
      key: 'done',
      label: 'Done',
      value: data?.done_count ?? 0,
      tone: 'green',
    },
  ];

  const priorityData = (
    data?.by_priority ?? []
  ).map((item) => ({
    label:
      PRIORITY_LABELS[item.priority] ??
      item.priority,
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
          subtitle="Overview of your assigned IT support tickets."
        />

        <DashboardGrid columns={2}>
          {stats.map((stat) => (
            <StatCard
              key={stat.key}
              label={stat.label}
              value={stat.value}
              tone={stat.tone}
              icon={STAT_ICONS[stat.key]}
            />
          ))}
        </DashboardGrid>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StatusDistributionChart
            data={data?.by_status ?? []}
          />

          <PriorityDistributionChart
            data={priorityData}
            total={data?.total_tickets ?? 0}
          />
        </div>

        <DashboardSection
          title="My Assigned Tickets"
        >
          <div className="max-h-[360px] overflow-y-auto pr-1">
            {isTicketsLoading ? (
              <div className="flex min-h-[180px] items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Loading assigned tickets...
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
                    loadAssignedTickets
                  }
                  className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : assignedTickets.length ===
              0 ? (
              <div className="flex min-h-[180px] items-center justify-center">
                <EmptyDashboardState
                  message="You do not have any assigned tickets."
                />
              </div>
            ) : (
              <div className="space-y-3">
                {assignedTickets.map(
                  (ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {ticket.ticket_number ??
                              `#${ticket.id}`}
                          </span>

                          <span
                            className={`text-xs font-medium ${getPriorityClass(
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

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {ticket.status}
                        </p>
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
                        className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                      >
                        View
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </DashboardSection>
      </div>
    </DashboardState>
  );
}