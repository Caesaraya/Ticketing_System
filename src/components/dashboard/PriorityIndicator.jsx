import clsx from 'clsx';

const TONE_DOT = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-blue-500',
  low: 'bg-gray-400',
};

// A small colored dot used to flag urgency at a glance (e.g. next to
// an upcoming deadline). Deliberately just the dot — no label — so it
// can sit inline with text in different layouts without extra markup.
export default function PriorityIndicator({ tone = 'low', className }) {
  return (
    <span
      className={clsx('mt-1 h-2.5 w-2.5 shrink-0 rounded-full', TONE_DOT[tone] ?? TONE_DOT.low, className)}
    />
  );
}