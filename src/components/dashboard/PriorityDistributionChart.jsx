import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

import Card from '../ui/Card';

const COLORS = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#3b82f6',
  Low: '#9ca3af',
};

export default function PriorityDistributionChart({
  data,
  total,
}) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Priority Distribution
        </h2>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Current ticket distribution
        </p>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.label}
                  fill={
                    COLORS[entry.label] ??
                    '#9ca3af'
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {total}
          </p>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            Total
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
        {data.map((entry) => (
          <span
            key={entry.label}
            className="flex items-center gap-1.5"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  COLORS[entry.label] ??
                  '#9ca3af',
              }}
            />

            {entry.label}
          </span>
        ))}
      </div>
    </Card>
  );
}