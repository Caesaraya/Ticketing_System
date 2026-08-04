import { Ticket, UserPlus, MessageSquare, Bell } from 'lucide-react';
import clsx from 'clsx';
import { NOTIFICATION_TYPES } from '../../data/notificationCenterDummy';

const TYPE_ICON = {
  [NOTIFICATION_TYPES.TICKET]: Ticket,
  [NOTIFICATION_TYPES.ASSIGNMENT]: UserPlus,
  [NOTIFICATION_TYPES.COMMENT]: MessageSquare,
  [NOTIFICATION_TYPES.SYSTEM]: Bell,
};

// One row in the Notification Center: type icon, title + message,
// time, and an unread dot. Marking as read is a simple callback — the
// page owns the actual read/unread state.
export default function NotificationCard({ type, read, title, message, time, onMarkRead }) {
  const Icon = TYPE_ICON[type] ?? Bell;

  return (
    <button
      type="button"
      onClick={onMarkRead}
      className={clsx(
        'flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors',
        read ? 'bg-transparent' : 'bg-blue-50/60 dark:bg-blue-500/5'
      )}
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        <Icon size={16} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
          {!read && <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" aria-label="Unread" />}
        </div>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{message}</p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{time}</p>
      </div>
    </button>
  );
}