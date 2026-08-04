import Button from '../ui/Button';
import StatusBadge from '../dashboard/StatusBadge';

import {
  getAllowedNextStatuses,
  getStatusLabel,
} from '../../constants/workflow';

export default function StatusSelector({
  status,
  onAdvance,
  disabled = false,
  isUpdating = false,
}) {
  const nextOptions =
    getAllowedNextStatuses(status);

  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        Current status

        <StatusBadge status={status} />
      </div>

      {nextOptions.length === 0 ? (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {status === 'DONE'
            ? 'This ticket is Done and can no longer be changed.'
            : 'No valid next status is available.'}
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {nextOptions.map((next) => (
            <Button
              key={next}
              variant="secondary"
              disabled={
                disabled || isUpdating
              }
              isLoading={isUpdating}
              onClick={() => onAdvance(next)}
            >
              Move to {getStatusLabel(next)}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}