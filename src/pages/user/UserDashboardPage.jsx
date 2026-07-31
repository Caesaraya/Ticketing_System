import { AlertCircle, Clock3, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { TICKET_STATS, RECENT_TICKETS } from '../../data/ticketsDummy';
import { RECENT_NOTIFICATIONS } from '../../data/notificationsDummy';

import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import DashboardGrid from '../../components/dashboard/DashboardGrid';
import StatCard from '../../components/dashboard/StatCard';
import DashboardSection from '../../components/dashboard/DashboardSection';
import RecentTicketCard from '../../components/dashboard/RecentTicketCard';
import ActivityCard from '../../components/dashboard/ActivityCard';
import EmptyDashboardState from '../../components/dashboard/EmptyDashboardState';

const STAT_ICONS = {
  red: AlertCircle,
  blue: Clock3,
  green: CheckCircle2,
};

export default function UserDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <WelcomeBanner
        name={user?.name ?? 'there'}
        subtitle="Here is an overview of your current support requests."
      />

      <DashboardGrid columns={3}>
        {TICKET_STATS.map((stat) => (
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
          <DashboardSection title="My Recent Tickets" actionLabel="View All">
            {RECENT_TICKETS.length === 0 ? (
              <EmptyDashboardState message="No recent tickets yet." />
            ) : (
              RECENT_TICKETS.map((ticket) => <RecentTicketCard key={ticket.id} {...ticket} />)
            )}
          </DashboardSection>
        </div>

        <DashboardSection title="Recent Notifications">
          {RECENT_NOTIFICATIONS.length === 0 ? (
            <EmptyDashboardState message="No notifications yet." />
          ) : (
            RECENT_NOTIFICATIONS.map((item, idx) => <ActivityCard key={idx} {...item} />)
          )}
        </DashboardSection>
      </div>
    </div>
  );
}