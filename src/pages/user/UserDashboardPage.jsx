import {
  AlertCircle,
  Clock3,
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
  red: AlertCircle,
  blue: Clock3,
  green: CheckCircle2,
};

export default function UserDashboardPage() {
  const { user } = useAuth();

  const {
    data,
    isLoading,
    error,
    retry,
  } = useDashboardSummary();

  const stats = [
    {
      label: 'Open Tickets',
      value: data?.open_count ?? 0,
      tone: 'red',
    },
    {
      label: 'In Progress',
      value: data?.in_progress_count ?? 0,
      tone: 'blue',
    },
    {
      label: 'Done',
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
        <WelcomeBanner
          name={user?.name ?? 'there'}
          subtitle="Here is an overview of your current support requests."
        />

        <DashboardGrid columns={3}>
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              tone={stat.tone}
              icon={STAT_ICONS[stat.tone]}
            />
          ))}
        </DashboardGrid>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardSection
              title="My Recent Tickets"
              actionLabel="View All"
            >
              <EmptyDashboardState
                message="Recent ticket data will be connected with the Ticket API in the next stage."
              />
            </DashboardSection>
          </div>

          <DashboardSection title="Recent Notifications">
            <EmptyDashboardState
              message="Notification data will be connected in a later API integration stage."
            />
          </DashboardSection>
        </div>
      </div>
    </DashboardState>
  );
}