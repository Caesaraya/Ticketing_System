import { toast } from 'sonner';
import Card from '../ui/Card';


export default function DashboardSection({ title, actionLabel, onAction, children }) {
  const handleAction = onAction ?? (() => toast.info('Coming soon'));

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        {actionLabel && (
          <button
            type="button"
            onClick={handleAction}
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            {actionLabel}
          </button>
        )}
      </div>
      {children}
    </Card>
  );
}