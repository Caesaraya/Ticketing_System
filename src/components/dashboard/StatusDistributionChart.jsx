import Card from '../ui/Card';

const STATUS_LABELS = {
  OPEN: 'Open',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  QA: 'QA',
  DONE: 'Done',
};

const STATUS_STYLES = {
  OPEN: 'bg-red-500',
  ASSIGNED: 'bg-purple-500',
  IN_PROGRESS: 'bg-blue-500',
  QA: 'bg-amber-500',
  DONE: 'bg-green-500',
};

export default function StatusDistributionChart({ data = [] }) {
  const total = data.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const rows = Object.keys(STATUS_LABELS).map((status) => ({
    status,
    label: STATUS_LABELS[status],
    count:
      data.find((item) => item.status === status)?.count ?? 0,
  }));

  return (
    <Card className="p-5">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Tickets by Status
        </h2>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Current ticket distribution
        </p>
      </div>

      <div className="space-y-4">
        {rows.map((row) => {
          const percentage =
            total > 0
              ? Math.round((row.count / total) * 100)
              : 0;

          return (
            <div key={row.status}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span
                    className={`h-2 w-2 rounded-full ${STATUS_STYLES[row.status]}`}
                  />

                  {row.label}
                </span>

                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {row.count}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className={`h-full rounded-full ${STATUS_STYLES[row.status]}`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}