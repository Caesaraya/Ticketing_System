import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import ThemeToggle from '../ui/ThemeToggle';
import AvatarMenu from './AvatarMenu';
import LogoutModal from './LogoutModal';

// Bell now navigates to the real Notification Center; the static
// avatar block is replaced by AvatarMenu (Profile/Settings/Logout).
// Topbar itself stays presentation-only — it just owns the boolean
// for whether the logout confirmation is open.
export default function Topbar() {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center justify-end gap-4 border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
      <ThemeToggle />

      <button
        type="button"
        aria-label="Notifications"
        onClick={() => navigate(ROUTES.NOTIFICATIONS)}
        className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <Bell size={18} />
      </button>

      <AvatarMenu onLogoutClick={() => setIsLogoutModalOpen(true)} />

      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </header>
  );
}