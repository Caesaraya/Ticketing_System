import clsx from 'clsx';

import TimelineItem from './TimelineItem';

import {
  STATUS_FLOW,
  getStatusLabel,
} from '../../constants/workflow';

export default function TicketTimeline({
  currentStage,
}) {
  const currentIndex =
    STATUS_FLOW.indexOf(currentStage);

  return (
    <div className="flex items-start">
      {STATUS_FLOW.map((stage, index) => {
        const state =
          index < currentIndex
            ? 'done'
            : index === currentIndex
              ? 'active'
              : 'upcoming';

        return (
          <div
            key={stage}
            className="flex flex-1 items-center last:flex-none"
          >
            <TimelineItem
              label={getStatusLabel(stage)}
              state={state}
            />

            {index <
              STATUS_FLOW.length - 1 && (
              <span
                className={clsx(
                  'mx-2 mt-[-18px] h-0.5 flex-1',
                  index < currentIndex
                    ? 'bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}