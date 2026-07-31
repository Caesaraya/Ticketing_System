import { Routes, Route } from 'react-router-dom';
import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';

import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import RootRedirect from './RootRedirect';

import LoginPage from '../pages/auth/LoginPage';
import UserDashboardPage from '../pages/user/UserDashboardPage';
import PMDashboardPage from '../pages/pm/PMDashboardPage';
import StaffDashboardPage from '../pages/staff/StaffDashboardPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';

// Every route in the app in one place. Adding a Stage 2 page means
// adding one <Route> here plus the page component — layouts, guards,
// and role checks are already wired.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<RootRedirect />} />

      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.USER_DASHBOARD} element={<UserDashboardPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.PM]} />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.PM_DASHBOARD} element={<PMDashboardPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.STAFF]} />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.STAFF_DASHBOARD} element={<StaffDashboardPage />} />
        </Route>
      </Route>

      <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
