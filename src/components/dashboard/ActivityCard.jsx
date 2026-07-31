
export default function ActivityCard({ time, message }) {
  return (
    <div className="border-b border-gray-100 py-3 last:border-0 dark:border-gray-800">
      <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{time}</p>
      <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
}