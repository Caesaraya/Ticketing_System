import clsx from 'clsx';
import TimelineItem from './TimelineItem';

const STAGES = ['Open', 'Assigned', 'In Progress', 'QA', 'Done'];

// The full workflow stepper. Derives each step's visual state from
// where `currentStage` sits in the fixed 5-stage sequence — no state
// of its own, purely a function of the prop it's given.
export default function TicketTimeline({ currentStage }) {
  const currentIndex = STAGES.indexOf(currentStage);

  return (
    <div className="flex items-start">
      {STAGES.map((stage, index) => {
        const state = index < currentIndex ? 'done' : index === currentIndex ? 'active' : 'upcoming';
        return (
          <div key={stage} className="flex flex-1 items-center last:flex-none">
            <TimelineItem label={stage} state={state} />
            {index < STAGES.length - 1 && (
              <span
                className={clsx(
                  'mx-2 mt-[-18px] h-0.5 flex-1',
                  index < currentIndex ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}