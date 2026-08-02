import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

// Compact pill-styled filter built on a native <select> — same
// browser-native approach as ui/Select, just styled to match the
// toolbar pills in the Stitch "All Tickets" screen. No open/close
// state to manage: props in (value/options), onChange out.
export default function FilterDropdown({ label, value, onChange, options, className }) {
  return (
    <div className={clsx('relative inline-flex', className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}