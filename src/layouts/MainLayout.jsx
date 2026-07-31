import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

// Shell for every authenticated screen: Sidebar + Topbar + scrollable
// content area. Pages only ever render inside <Outlet /> — they never
// need to know a sidebar or topbar exists.
export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
