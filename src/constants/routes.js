import { ROLES } from './roles';

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

  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  UNAUTHORIZED: '/unauthorized',
});

export const buildTicketDetailPath = (
  id
) => `/tickets/${id}`;

export const DASHBOARD_BY_ROLE =
  Object.freeze({
    [ROLES.USER]:
      ROUTES.USER_DASHBOARD,

    [ROLES.PM_IT]:
      ROUTES.PM_DASHBOARD,

    [ROLES.STAFF_IT]:
      ROUTES.STAFF_DASHBOARD,
  });