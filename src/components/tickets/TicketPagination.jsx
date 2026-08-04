import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function TicketPagination({
  page,
  pageSize,
  currentItemCount,
  hasNextPage,
  onPrevious,
  onNext,
  isLoading = false,
}) {
  const from =
    currentItemCount === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const to =
    (page - 1) * pageSize +
    currentItemCount;

  return (
    <div className="flex items-center justify-between pt-4 text-sm text-gray-500 dark:text-gray-400">
      <p>
        {currentItemCount === 0
          ? 'No tickets'
          : `Showing ${from} to ${to}`}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrevious}
          disabled={
            page <= 1 || isLoading
          }
          aria-label="Previous page"
          className="rounded-lg p-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-gray-800"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="px-3 text-xs font-medium text-gray-600 dark:text-gray-300">
          Page {page}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={
            !hasNextPage || isLoading
          }
          aria-label="Next page"
          className="rounded-lg p-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-gray-800"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}