// Plain <hr> when no label, or a labeled "—— text ——" split when one is
// given (matches the "Or continue with" style divider in the Stitch
// login screen).
export default function Divider({ label }) {
  if (!label) {
    return <hr className="border-gray-200 dark:border-gray-800" />;
  }

  return (
    <div className="flex items-center gap-3">
      <hr className="flex-1 border-gray-200 dark:border-gray-800" />
      <span className="text-xs text-gray-400 dark:text-gray-500">{label}</span>
      <hr className="flex-1 border-gray-200 dark:border-gray-800" />
    </div>
  );
}
