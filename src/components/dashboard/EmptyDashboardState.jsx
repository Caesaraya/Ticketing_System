// Shown inside a DashboardSection when its list is empty. Kept
// separate from the Stage 1 `PlaceholderPage` (that one fills an
// entire route/page; this one fills a widget's content area).
export default function EmptyDashboardState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <p className="text-sm text-gray-400 dark:text-gray-500">{message}</p>
    </div>
  );
}