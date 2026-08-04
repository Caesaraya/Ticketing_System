import clsx from 'clsx';

const OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
];

// Segmented All/Unread toggle for the Notification Center. Kept as
// its own small component (rather than reusing tickets/TypeSelector)
// since that one is tightly coupled to ticket type options — this is
// a plain, domain-agnostic 2-option toggle.
export default function NotificationFilter({ value, onChange }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 p-1 dark:border-gray-700">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={clsx(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            value === opt.value
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}