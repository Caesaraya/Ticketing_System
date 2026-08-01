import { Circle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { STAFF_STATS } from '../../data/staffStatsDummy';
import { ASSIGNED_TICKETS } from '../../data/assignedTicketsDummy';
import { UPCOMING_DEADLINES } from '../../data/deadlinesDummy';

import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import DashboardGrid from '../../components/dashboard/DashboardGrid';
import StatCard from '../../components/dashboard/StatCard';
import DashboardSection from '../../components/dashboard/DashboardSection';
import AssignedTicketCard from '../../components/dashboard/AssignedTicketCard';
import DeadlineCard from '../../components/dashboard/DeadlineCard';
import EmptyDashboardState from '../../components/dashboard/EmptyDashboardState';

export default function StaffDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <WelcomeBanner
          name={user?.name ?? 'there'}
          subtitle="Here is your technical task overview for today."
        />
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <Circle size={8} className="fill-green-500 text-green-500" />
          System Status: Optimal
        </span>
      </div>

      <DashboardGrid columns={4}>
        {STAFF_STATS.map((stat) => (
          <StatCard
            key={stat.key}
            label={stat.label}
            value={stat.value}
            tone={stat.tone}
            caption={stat.caption}
          />
        ))}
      </DashboardGrid>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardSection title="My Assigned Tickets" actionLabel="View All">
            {ASSIGNED_TICKETS.length === 0 ? (
              <EmptyDashboardState message="No tickets assigned to you yet." />
            ) : (
              ASSIGNED_TICKETS.map((ticket) => (
                <AssignedTicketCard key={ticket.ticketId} {...ticket} />
              ))
            )}
          </DashboardSection>
        </div>

        <DashboardSection title="Upcoming Deadlines">
          {UPCOMING_DEADLINES.length === 0 ? (
            <EmptyDashboardState message="No upcoming deadlines." />
          ) : (
            UPCOMING_DEADLINES.map((deadline, idx) => <DeadlineCard key={idx} {...deadline} />)
          )}
        </DashboardSection>
      </div>
    </div>
  );
}