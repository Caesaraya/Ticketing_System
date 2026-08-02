import { Check } from 'lucide-react';
import clsx from 'clsx';

// One step of the ticket workflow stepper (Open/Assigned/In
// Progress/QA/Done). `state` is derived by the parent TicketTimeline
// by comparing this step's position to the ticket's current stage.
export default function TimelineItem({ label, state }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className={clsx(
          'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold',
          state === 'done' && 'border-blue-600 bg-blue-600 text-white',
          state === 'active' && 'border-blue-600 bg-white text-blue-600 dark:bg-gray-900',
          state === 'upcoming' &&
            'border-gray-200 bg-white text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-600'
        )}
      >
        {state === 'done' ? <Check size={14} /> : <span className="h-2 w-2 rounded-full bg-current" />}
      </span>
      <span
        className={clsx(
          'text-xs font-medium',
          state === 'upcoming' ? 'text-gray-300 dark:text-gray-600' : 'text-gray-700 dark:text-gray-200'
        )}
      >
        {label}
      </span>
    </div>
  );
}