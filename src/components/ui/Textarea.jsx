import { forwardRef } from 'react';
import clsx from 'clsx';

// Multi-line counterpart to Input. Same visual language (border,
// radius, focus ring, error state) as the rest of the design system.
const Textarea = forwardRef(function Textarea({ error, className, rows = 4, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={clsx(
        'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-1 dark:bg-gray-800 dark:text-gray-100',
        error
          ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
        className
      )}
      {...props}
    />
  );
});

export default Textarea;