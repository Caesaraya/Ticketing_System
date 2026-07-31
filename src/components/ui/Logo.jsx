import { Ticket } from 'lucide-react';
import clsx from 'clsx';

const SIZES = {
  sm: { box: 'h-9 w-9 rounded-lg', icon: 16 },
  md: { box: 'h-11 w-11 rounded-xl', icon: 20 },
  lg: { box: 'h-14 w-14 rounded-2xl', icon: 26 },
};

// Brand mark used wherever the product icon appears (today: only the
// Login card). Sized via a `size` prop instead of duplicating the
// blue-square markup at every call site.
export default function Logo({ size = 'md', className }) {
  const { box, icon } = SIZES[size];
  return (
    <div className={clsx('flex items-center justify-center bg-blue-600 text-white', box, className)}>
      <Ticket size={icon} />
    </div>
  );
}
