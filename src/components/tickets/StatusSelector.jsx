import Button from '../ui/Button';
import StatusBadge from '../dashboard/StatusBadge';
import { getAllowedNextStatuses } from '../../constants/workflow';

// Shows the current status plus a button for each allowed next step
// (per the workflow transition map) — invalid transitions are simply
// never offered as buttons, rather than being validated after the
// fact. Used by both PM and Staff (the same rule applies to both;
// only the surrounding panel differs).
export default function StatusSelector({ status, onAdvance }) {
  const nextOptions = getAllowedNextStatuses(status);

  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        Current status
        <StatusBadge status={status} />
      </div>

      {nextOptions.length === 0 ? (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          This ticket is Done — no further status changes.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {nextOptions.map((next) => (
            <Button key={next} variant="secondary" onClick={() => onAdvance(next)}>
              Move to {next}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}