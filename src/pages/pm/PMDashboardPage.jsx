import {
  Ticket,
  AlertCircle,
  UserCheck,
  Clock3,
  Search,
  CheckCircle2,
} from 'lucide-react';

import { useDashboardSummary } from '../../hooks/useDashboardSummary';

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

export default function PMDashboardPage() {
  const {
    data,
    isLoading,
    error,
    retry,
  } = useDashboardSummary();

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
      key: 'assigned',
      label: 'Assigned',
      value: data?.assigned_count ?? 0,
      tone: 'purple',
    },
    {
      key: 'inProgress',
      label: 'In Progress',
      value: data?.in_progress_count ?? 0,
      tone: 'blue',
    },
    {
      key: 'qa',
      label: 'QA Review',
      value: data?.qa_count ?? 0,
      tone: 'amber',
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
          subtitle="Overview of IT Support metrics and activities."
        />

        <DashboardGrid columns={6}>
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardSection
              title="Needs Assignment"
              actionLabel="View All"
            >
              <EmptyDashboardState
                message="Assignment list data will be connected with the Ticket API in the next stage."
              />
            </DashboardSection>
          </div>

          <DashboardSection title="Recent Activity">
            <EmptyDashboardState
              message="Activity data will be connected in a later API integration stage."
            />
          </DashboardSection>
        </div>
      </div>
    </DashboardState>
  );
}