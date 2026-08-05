import {
  Bell,
  Check,
} from 'lucide-react';

import clsx from 'clsx';

function formatDate(value) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

export default function NotificationCard({
  id,
  message,
  is_read,
  created_at,
  onMarkRead,
}) {
  const handleClick = async () => {
    if (is_read) {
      return;
    }

    await onMarkRead?.(id);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        'flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors',
        is_read
          ? 'bg-transparent'
          : 'bg-blue-50/60 dark:bg-blue-500/5'
      )}
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        <Bell size={16} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className={clsx(
              'text-sm',
              is_read
                ? 'font-normal text-gray-600 dark:text-gray-300'
                : 'font-medium text-gray-900 dark:text-gray-100'
            )}
          >
            {message}
          </p>

          {!is_read && (
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-blue-600"
              aria-label="Unread"
            />
          )}
        </div>

        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          {formatDate(created_at)}
        </p>
      </div>

      {is_read && (
        <span
          className="mt-1 shrink-0 text-gray-400 dark:text-gray-500"
          title="Read"
        >
          <Check size={15} />
        </span>
      )}
    </button>
  );
}