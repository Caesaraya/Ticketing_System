import clsx from 'clsx';

const COLUMN_STYLES = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  6: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
};

// Thin responsive-grid wrapper so stat-card rows on every dashboard use
// the same breakpoints instead of each page inventing its own grid
// classes.
export default function DashboardGrid({ columns = 3, className, children }) {
  return (
    <div className={clsx('grid grid-cols-1 gap-4', COLUMN_STYLES[columns], className)}>
      {children}
    </div>
  );
}