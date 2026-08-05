import { ROLES } from './roles';

export const ROUTES = Object.freeze({
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

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

export function buildTicketDetailPath(id) {
  if (
    id === undefined ||
    id === null ||
    id === ''
  ) {
    return ROUTES.TICKET_DETAIL;
  }

  return `/tickets/${id}`;
}

export const DASHBOARD_BY_ROLE = Object.freeze({
  [ROLES.USER]:
    ROUTES.USER_DASHBOARD,

  [ROLES.PM_IT]:
    ROUTES.PM_DASHBOARD,

  [ROLES.STAFF_IT]:
    ROUTES.STAFF_DASHBOARD,
});

export const TICKET_LIST_BY_ROLE = Object.freeze({
  [ROLES.USER]:
    ROUTES.USER_TICKETS,

  [ROLES.PM_IT]:
    ROUTES.PM_TICKETS,

  [ROLES.STAFF_IT]:
    ROUTES.STAFF_TICKETS,
});