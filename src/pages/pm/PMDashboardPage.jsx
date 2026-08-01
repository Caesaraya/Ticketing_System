import { Ticket, AlertCircle, UserCheck, Clock3, Search, CheckCircle2 } from 'lucide-react';
import { PM_STATS, TICKET_VOLUME_TRENDS, PRIORITY_DISTRIBUTION } from '../../data/pmStatsDummy';
import { NEEDS_ASSIGNMENT } from '../../data/assignmentsDummy';
import { PM_RECENT_ACTIVITY } from '../../data/pmActivityDummy';

import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import DashboardGrid from '../../components/dashboard/DashboardGrid';
import StatCard from '../../components/dashboard/StatCard';
import DashboardSection from '../../components/dashboard/DashboardSection';
import TicketVolumeChart from '../../components/dashboard/TicketVolumeChart';
import PriorityDistributionChart from '../../components/dashboard/PriorityDistributionChart';
import AssignmentRow from '../../components/dashboard/AssignmentRow';
import ActivityCard from '../../components/dashboard/ActivityCard';
import EmptyDashboardState from '../../components/dashboard/EmptyDashboardState';

const STAT_ICONS = {
  total: Ticket,
  open: AlertCircle,
  assigned: UserCheck,
  inProgress: Clock3,
  qa: Search,
  done: CheckCircle2,
};

export default function PMDashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeBanner title="Dashboard" subtitle="Overview of IT Support metrics and activities." />

      <DashboardGrid columns={6}>
        {PM_STATS.map((stat) => (
          <StatCard
            key={stat.key}
            label={stat.label}
            value={stat.value}
            tone={stat.tone}
            caption={stat.caption}
            icon={STAT_ICONS[stat.key]}
          />
        ))}
      </DashboardGrid>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TicketVolumeChart data={TICKET_VOLUME_TRENDS} />
        </div>
        <PriorityDistributionChart data={PRIORITY_DISTRIBUTION.data} total={PRIORITY_DISTRIBUTION.total} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardSection title="Needs Assignment" actionLabel="View All">
            {NEEDS_ASSIGNMENT.length === 0 ? (
              <EmptyDashboardState message="No tickets waiting for assignment." />
            ) : (
              NEEDS_ASSIGNMENT.map((ticket) => <AssignmentRow key={ticket.id} {...ticket} />)
            )}
          </DashboardSection>
        </div>

        <DashboardSection title="Recent Activity">
          {PM_RECENT_ACTIVITY.length === 0 ? (
            <EmptyDashboardState message="No recent activity." />
          ) : (
            PM_RECENT_ACTIVITY.map((item, idx) => <ActivityCard key={idx} {...item} />)
          )}
        </DashboardSection>
      </div>
    </div>
  );
}