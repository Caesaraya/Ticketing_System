// One reusable stand-in for every not-yet-built page (dashboards,
// ticket list, etc). Keeps AppRoutes wired to real route components
// (so routing/guards can be tested now) without writing three nearly
// identical "coming soon" files.
export default function PlaceholderPage({ title }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 text-center dark:border-gray-700">
      <p className="text-sm font-medium text-gray-400 dark:text-gray-500">{title}</p>
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-600">
        Content arrives in a later stage.
      </p>
    </div>
  );
}
