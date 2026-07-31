import clsx from 'clsx';

// The one card surface used everywhere: white/dark-slate panel, subtle
// border, subtle shadow, generous rounding — matches every card in the
// Stitch screens (login card, stat cards, ticket detail sections).
export default function Card({ className, children, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
