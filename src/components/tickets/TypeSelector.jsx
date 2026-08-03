import clsx from 'clsx';
import { TYPE_OPTIONS } from '../../constants/ticketOptions';

// Segmented pill control for the ticket's Request Type (Issue/Bug vs
// Feature Request), matching the Stitch Create Ticket screen. A plain
// <Select> would work functionally, but the design explicitly shows a
// two-button toggle, not a dropdown.
export default function TypeSelector({ value, onChange }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 p-1 dark:border-gray-700">
      {TYPE_OPTIONS.map((opt) => (
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