import clsx from 'clsx';

// Avatar + name for a ticket's assignee column, with a distinct
// "Unassigned" state (dashed circle) matching the "All Tickets" table.
export default function AssigneeAvatar({ name, size = 'sm' }) {
  const dimension = size === 'sm' ? 'h-6 w-6 text-[10px]' : 'h-8 w-8 text-xs';

  if (!name) {
    return (
      <span className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
        <span
          className={clsx(
            'flex items-center justify-center rounded-full border border-dashed border-gray-300 dark:border-gray-700',
            dimension
          )}
        />
        Unassigned
      </span>
    );
  }

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <span className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
      <span
        className={clsx(
          'flex items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200',
          dimension
        )}
      >
        {initials}
      </span>
      {name}
    </span>
  );
}