import clsx from 'clsx';

const VARIANTS = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400',
  secondary:
    'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
  ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
};

// One Button for the whole app. `type="button"` is the default so it
// never accidentally submits a form it's dropped into, but LoginPage's
// Sign In button passes type="submit" which overrides it via {...props}.
export default function Button({
  variant = 'primary',
  isLoading = false,
  icon: Icon,
  className,
  children,
  disabled,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {Icon && !isLoading && <Icon size={16} />}
      {isLoading ? 'Please wait...' : children}
    </button>
  );
}
