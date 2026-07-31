import { forwardRef } from 'react';
import clsx from 'clsx';

// Generic text input. Forwards ref so react-hook-form's register() works
// unchanged — LoginPage still calls {...register('email', {...})} exactly
// like Stage 1, only the rendered markup changed.
const Input = forwardRef(function Input({ icon: Icon, error, className, ...props }, ref) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      )}
      <input
        ref={ref}
        className={clsx(
          'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-1 dark:bg-gray-800 dark:text-gray-100',
          Icon && 'pl-9',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
          className
        )}
        {...props}
      />
    </div>
  );
});

export default Input;
