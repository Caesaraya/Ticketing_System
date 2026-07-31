import { LayoutDashboard } from 'lucide-react';
import { ROLES } from './roles';
import { ROUTES } from './routes';

// Sidebar menu items per role. Sidebar.jsx has zero knowledge of roles —
// it just renders whatever array it's handed. Adding a new page for a
// role later (Stage 2+) means adding one entry here, not touching the
// Sidebar component.
export const NAVIGATION = Object.freeze({
  [ROLES.USER]: [
    { label: 'Dashboard', path: ROUTES.USER_DASHBOARD, icon: LayoutDashboard },
  ],
  [ROLES.PM]: [
    { label: 'Dashboard', path: ROUTES.PM_DASHBOARD, icon: LayoutDashboard },
  ],
  [ROLES.STAFF]: [
    { label: 'Dashboard', path: ROUTES.STAFF_DASHBOARD, icon: LayoutDashboard },
  ],
});
