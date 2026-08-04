import clsx from 'clsx';

import { TYPE_OPTIONS } from '../../constants/ticketOptions';

export default function TypeSelector({
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 p-1 dark:border-gray-700">
      {TYPE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(option.value)}
          className={clsx(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            value === option.value
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
            disabled &&
              'cursor-not-allowed opacity-60'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}