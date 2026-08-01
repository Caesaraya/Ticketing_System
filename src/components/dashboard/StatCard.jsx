import clsx from 'clsx';
import Card from '../ui/Card';

const TONE_STYLES = {
  red: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
};

// Built on top of the existing `Card` primitive instead of duplicating
// border/rounded/shadow classes. Any dashboard (User/PM/Staff) can drop
// this in with a different label/value/tone/icon/caption.
export default function StatCard({ label, value, icon: Icon, tone = 'gray', caption }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {label}
        </p>
        {Icon && (
          <span
            className={clsx(
              'flex h-7 w-7 items-center justify-center rounded-full',
              TONE_STYLES[tone]
            )}
          >
            <Icon size={14} />
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
      {caption && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{caption}</p>}
    </Card>
  );
}