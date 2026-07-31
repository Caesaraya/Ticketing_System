import { ROLES } from './roles';

// Single source of truth for every route path in the app.
export const ROUTES = Object.freeze({
  HOME: '/',
  LOGIN: '/login',
  USER_DASHBOARD: '/user/dashboard',
  PM_DASHBOARD: '/pm/dashboard',
  STAFF_DASHBOARD: '/staff/dashboard',
  UNAUTHORIZED: '/unauthorized',
});

// Where each role should land after login / when hitting "/".
// Kept next to ROUTES (not duplicated in LoginPage and RootRedirect).
export const DASHBOARD_BY_ROLE = Object.freeze({
  [ROLES.USER]: ROUTES.USER_DASHBOARD,
  [ROLES.PM]: ROUTES.PM_DASHBOARD,
  [ROLES.STAFF]: ROUTES.STAFF_DASHBOARD,
});
