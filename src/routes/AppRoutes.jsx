import {
  Routes,
  Route,
} from 'react-router-dom';

import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';

import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

import ProtectedRoute from './ProtectedRoute';
import RootRedirect from './RootRedirect';

import LoginPage from '../pages/auth/LoginPage';

import UserDashboardPage
  from '../pages/user/UserDashboardPage';

import UserTicketListPage
  from '../pages/user/UserTicketListPage';

import PMDashboardPage
  from '../pages/pm/PMDashboardPage';

import PMTicketListPage
  from '../pages/pm/PMTicketListPage';

import StaffDashboardPage
  from '../pages/staff/StaffDashboardPage';

import StaffTicketListPage
  from '../pages/staff/StaffTicketListPage';

import TicketDetailPage
  from '../pages/tickets/TicketDetailPage';

import CreateTicketPage
  from '../pages/tickets/CreateTicketPage';

import NotificationsPage
  from '../pages/NotificationsPage';

import ProfilePage
  from '../pages/ProfilePage';

import SettingsPage
  from '../pages/SettingsPage';

import UnauthorizedPage
  from '../pages/UnauthorizedPage';

import NotFoundPage
  from '../pages/NotFoundPage';

import RegisterPage
  from '../pages/auth/RegisterPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* =====================================================
          ROOT
      ====================================================== */}

      <Route
        path={ROUTES.HOME}
        element={<RootRedirect />}
      />

{/* =====================================================
    AUTH
====================================================== */}

<Route element={<AuthLayout />}>
  <Route
    path={ROUTES.LOGIN}
    element={<LoginPage />}
  />

  <Route
    path={ROUTES.REGISTER}
    element={<RegisterPage />}
  />
</Route>

      {/* =====================================================
          USER
      ====================================================== */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              ROLES.USER,
            ]}
          />
        }
      >
        <Route element={<MainLayout />}>
          <Route
            path={ROUTES.USER_DASHBOARD}
            element={
              <UserDashboardPage />
            }
          />

          <Route
            path={ROUTES.USER_TICKETS}
            element={
              <UserTicketListPage />
            }
          />
        </Route>
      </Route>

      {/* =====================================================
          PM IT
      ====================================================== */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              ROLES.PM_IT,
            ]}
          />
        }
      >
        <Route element={<MainLayout />}>
          <Route
            path={ROUTES.PM_DASHBOARD}
            element={
              <PMDashboardPage />
            }
          />

          <Route
            path={ROUTES.PM_TICKETS}
            element={
              <PMTicketListPage />
            }
          />
        </Route>
      </Route>

      {/* =====================================================
          STAFF IT
      ====================================================== */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              ROLES.STAFF_IT,
            ]}
          />
        }
      >
        <Route element={<MainLayout />}>
          <Route
            path={ROUTES.STAFF_DASHBOARD}
            element={
              <StaffDashboardPage />
            }
          />

          <Route
            path={ROUTES.STAFF_TICKETS}
            element={
              <StaffTicketListPage />
            }
          />
        </Route>
      </Route>

      {/* =====================================================
          CREATE TICKET
          USER + PM IT
      ====================================================== */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              ROLES.USER,
              ROLES.PM_IT,
            ]}
          />
        }
      >
        <Route element={<MainLayout />}>
          <Route
            path={ROUTES.CREATE_TICKET}
            element={
              <CreateTicketPage />
            }
          />
        </Route>
      </Route>

      {/* =====================================================
          TICKET DETAIL + SHARED PAGES
          ALL AUTHENTICATED ROLES
      ====================================================== */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              ROLES.USER,
              ROLES.PM_IT,
              ROLES.STAFF_IT,
            ]}
          />
        }
      >
        <Route element={<MainLayout />}>
          <Route
            path={ROUTES.TICKET_DETAIL}
            element={
              <TicketDetailPage />
            }
          />

          <Route
            path={ROUTES.NOTIFICATIONS}
            element={
              <NotificationsPage />
            }
          />

          <Route
            path={ROUTES.PROFILE}
            element={
              <ProfilePage />
            }
          />

          <Route
            path={ROUTES.SETTINGS}
            element={
              <SettingsPage />
            }
          />
        </Route>
      </Route>

      {/* =====================================================
          UNAUTHORIZED
      ====================================================== */}

      <Route
        path={ROUTES.UNAUTHORIZED}
        element={
          <UnauthorizedPage />
        }
      />

      {/* =====================================================
          404
      ====================================================== */}

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}