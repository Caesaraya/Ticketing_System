import { toast } from 'sonner';
import PriorityBadge from './PriorityBadge';

// One row inside the PM dashboard's "Needs Assignment" widget. The
// Assign button is a placeholder (toast) — actual ticket assignment is
// out of scope for this stage (no ticket editing yet).
export default function AssignmentRow({ id, title, reporter, priority }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-0 dark:border-gray-800">
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400">#{id}</p>
        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{reporter}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <PriorityBadge priority={priority} />
        <button
          type="button"
          onClick={() => toast.info('Coming soon')}
          className="rounded-lg border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Assign
        </button>
      </div>
    </div>
  );
}