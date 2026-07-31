import { Outlet } from 'react-router-dom';

// Shell for unauthenticated screens (just Login for now). Kept separate
// from MainLayout so a future "forgot password" or "register" page can
// reuse it without pulling in Sidebar/Topbar.
export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <Outlet />
    </div>
  );
}
