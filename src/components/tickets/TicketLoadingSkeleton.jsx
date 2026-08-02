// Placeholder rows shown while ticket data is being fetched. Prepared
// now (no API exists yet) so future pages can just flip a boolean once
// real fetching is wired up — no new component needed then.
export default function TicketLoadingSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
      ))}
    </div>
  );
}