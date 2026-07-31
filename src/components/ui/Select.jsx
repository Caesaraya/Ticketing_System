import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

// Native <select> underneath (no extra JS dropdown logic to maintain)
// with a custom chevron so it matches Input/PasswordInput visually.
const Select = forwardRef(function Select({ error, className, children, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={clsx(
          'w-full appearance-none rounded-lg border bg-white px-3 py-2.5 pr-9 text-sm text-gray-900 transition-colors focus:outline-none focus:ring-1 dark:bg-gray-800 dark:text-gray-100',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
});

export default Select;
