import { ROLES } from './roles';

// Single source of truth for every route path in the app.
export const ROUTES = Object.freeze({
  HOME: '/',
  LOGIN: '/login',
  USER_DASHBOARD: '/user/dashboard',
  PM_DASHBOARD: '/pm/dashboard',
  STAFF_DASHBOARD: '/staff/dashboard',
  USER_TICKETS: '/user/tickets',
  PM_TICKETS: '/pm/tickets',
  STAFF_TICKETS: '/staff/tickets',
  CREATE_TICKET: '/tickets/create',
  TICKET_DETAIL: '/tickets/:id',
  UNAUTHORIZED: '/unauthorized',
});

// Builds a real Ticket Detail link (e.g. buildTicketDetailPath('TKT-1042')
// -> '/tickets/TKT-1042'). Single place that knows the URL shape, so
// Ticket List pages don't each hand-construct the string themselves.
export const buildTicketDetailPath = (id) => `/tickets/${id}`;

// Where each role should land after login / when hitting "/".
// Kept next to ROUTES (not duplicated in LoginPage and RootRedirect).
export const DASHBOARD_BY_ROLE = Object.freeze({
  [ROLES.USER]: ROUTES.USER_DASHBOARD,
  [ROLES.PM]: ROUTES.PM_DASHBOARD,
  [ROLES.STAFF]: ROUTES.STAFF_DASHBOARD,
});