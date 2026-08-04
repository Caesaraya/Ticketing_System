import { LoaderCircle, RefreshCw } from 'lucide-react';

export default function DashboardState({
  isLoading,
  error,
  onRetry,
  children,
}) {
  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <LoaderCircle className="animate-spin" size={24} />
          Loading dashboard data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-red-200 bg-white px-6 text-center dark:border-red-900/50 dark:bg-gray-900">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Unable to load dashboard data.
        </p>

        <p className="mt-1 max-w-md text-xs text-gray-500 dark:text-gray-400">
          Check the backend connection and try again. The dashboard data
          could not be retrieved.
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  return children;
}