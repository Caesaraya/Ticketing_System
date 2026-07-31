import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center justify-end gap-4 border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
      <ThemeToggle />

      <button
        type="button"
        aria-label="Notifications"
        className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <Bell size={18} />
      </button>

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
          {user?.name?.[0]?.toUpperCase() ?? '?'}
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {user?.name ?? 'Guest'}
        </span>
      </div>
    </header>
  );
}
