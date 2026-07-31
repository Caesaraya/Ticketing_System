import { forwardRef, useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

// Same visual language as Input, plus a show/hide toggle. Kept as its
// own component (instead of an `Input` prop) because the eye-icon
// button and internal visibility state are specific to passwords only.
const PasswordInput = forwardRef(function PasswordInput({ error, className, ...props }, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Lock
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        ref={ref}
        type={visible ? 'text' : 'password'}
        className={clsx(
          'w-full rounded-lg border bg-white px-3 py-2.5 pl-9 pr-9 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-1 dark:bg-gray-800 dark:text-gray-100',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
          className
        )}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
});

export default PasswordInput;
