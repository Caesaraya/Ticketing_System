import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';
import { NAVIGATION } from '../../constants/navigation';

// Renders whatever menu belongs to the logged-in role. No role-specific
// branching lives in this file — it's pure "map an array to links",
// which is what keeps it reusable as more menu items are added later.
export default function Sidebar() {
  const { role, logout } = useAuth();
  const items = NAVIGATION[role] ?? [];

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white">
          W
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Service Desk</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">IT Support Portal</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {items.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-200 px-3 py-4 dark:border-gray-800">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
