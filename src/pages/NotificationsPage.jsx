import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { NOTIFICATIONS } from '../data/notificationCenterDummy';

import Card from '../components/ui/Card';
import NotificationCard from '../components/notifications/NotificationCard';
import NotificationFilter from '../components/notifications/NotificationFilter';
import TicketEmptyState from '../components/tickets/TicketEmptyState';

// Shared across all three roles. Notifications are filtered to the
// logged-in role via each dummy item's `roles` list, and "read" state
// lives in local component state only (no persistence — a refresh
// resets everyone back to the dummy data's original read/unread mix).
export default function NotificationsPage() {
  const { role } = useAuth();
  const [readIds, setReadIds] = useState(() => new Set(NOTIFICATIONS.filter((n) => n.read).map((n) => n.id)));
  const [filter, setFilter] = useState('all');

  const myNotifications = useMemo(
    () => NOTIFICATIONS.filter((n) => n.roles.includes(role)),
    [role]
  );

  const visible = useMemo(() => {
    const withReadState = myNotifications.map((n) => ({ ...n, read: readIds.has(n.id) }));
    return filter === 'unread' ? withReadState.filter((n) => !n.read) : withReadState;
  }, [myNotifications, readIds, filter]);

  const handleMarkRead = (id) => {
    setReadIds((prev) => new Set(prev).add(id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h1>
        <NotificationFilter value={filter} onChange={setFilter} />
      </div>

      <Card className="p-3">
        {visible.length === 0 ? (
          <TicketEmptyState message={filter === 'unread' ? 'No unread notifications.' : 'No notifications yet.'} />
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {visible.map((notification) => (
              <NotificationCard
                key={notification.id}
                {...notification}
                onMarkRead={() => handleMarkRead(notification.id)}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}