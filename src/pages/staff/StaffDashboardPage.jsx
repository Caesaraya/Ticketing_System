import {
  Circle,
  AlertCircle,
  Clock3,
  Search,
  CheckCircle2,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useDashboardSummary } from '../../hooks/useDashboardSummary';

import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import DashboardGrid from '../../components/dashboard/DashboardGrid';
import StatCard from '../../components/dashboard/StatCard';
import DashboardSection from '../../components/dashboard/DashboardSection';
import EmptyDashboardState from '../../components/dashboard/EmptyDashboardState';
import DashboardState from '../../components/dashboard/DashboardState';

const STAT_ICONS = {
  open: AlertCircle,
  inProgress: Clock3,
  qa: Search,
  done: CheckCircle2,
};

export default function StaffDashboardPage() {
  const { user } = useAuth();

  const {
    data,
    isLoading,
    error,
    retry,
  } = useDashboardSummary();

  const stats = [
    {
      key: 'open',
      label: 'My Open Tickets',
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
      key: 'qa',
      label: 'In QA',
      value: data?.qa_count ?? 0,
      tone: 'purple',
    },
    {
      key: 'done',
      label: 'Done Tickets',
      value: data?.done_count ?? 0,
      tone: 'green',
    },
  ];

  return (
    <DashboardState
      isLoading={isLoading}
      error={error}
      onRetry={retry}
    >
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <WelcomeBanner
            name={user?.name ?? 'there'}
            subtitle="Here is your technical task overview for today."
          />

          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <Circle
              size={8}
              className="fill-green-500 text-green-500"
            />

            System Status: Optimal
          </span>
        </div>

        <DashboardGrid columns={4}>
          {stats.map((stat) => (
            <StatCard
              key={stat.key}
              label={stat.label}
              value={stat.value}
              tone={stat.tone}
              caption={
                stat.key === 'done'
                  ? 'All done tickets in your scope'
                  : undefined
              }
              icon={STAT_ICONS[stat.key]}
            />
          ))}
        </DashboardGrid>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardSection
              title="My Assigned Tickets"
              actionLabel="View All"
            >
              <EmptyDashboardState
                message="Assigned ticket data will be connected with the Ticket API in the next stage."
              />
            </DashboardSection>
          </div>

          <DashboardSection title="Upcoming Deadlines">
            <EmptyDashboardState
              message="Deadline data will be connected with the Ticket API in the next stage."
            />
          </DashboardSection>
        </div>
      </div>
    </DashboardState>
  );
}