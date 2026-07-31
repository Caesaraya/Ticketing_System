import { forwardRef } from 'react';

// Checkbox + its own label in one control, since every checkbox in the
// Stitch designs ("Remember me", etc.) is always rendered with an
// inline label right next to it.
const Checkbox = forwardRef(function Checkbox({ label, id, ...props }, ref) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
        {...props}
      />
      {label}
    </label>
  );
});

export default Checkbox;
