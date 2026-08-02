import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

// Purely presentational pagination control. The parent page owns page
// state and passes the current values in plus a callback — this
// component fires no requests and holds no state of its own.
export default function TicketPagination({ page, totalPages, totalItems, pageSize, onPageChange }) {
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between pt-4 text-sm text-gray-500 dark:text-gray-400">
      <p>
        Showing {from} to {to} of {totalItems} tickets
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="rounded-lg p-1.5 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-gray-800"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={clsx(
              'h-7 w-7 rounded-lg text-xs font-medium',
              p === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            )}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="rounded-lg p-1.5 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-gray-800"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}