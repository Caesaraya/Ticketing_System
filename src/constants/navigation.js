import {
  LayoutDashboard,
  Ticket,
} from 'lucide-react';

import { ROLES } from './roles';
import { ROUTES } from './routes';

export const NAVIGATION =
  Object.freeze({
    [ROLES.USER]: [
      {
        label: 'Dashboard',
        path: ROUTES.USER_DASHBOARD,
        icon: LayoutDashboard,
      },
      {
        label: 'My Tickets',
        path: ROUTES.USER_TICKETS,
        icon: Ticket,
      },
    ],

    [ROLES.PM_IT]: [
      {
        label: 'Dashboard',
        path: ROUTES.PM_DASHBOARD,
        icon: LayoutDashboard,
      },
      {
        label: 'All Tickets',
        path: ROUTES.PM_TICKETS,
        icon: Ticket,
      },
    ],

    [ROLES.STAFF_IT]: [
      {
        label: 'Dashboard',
        path: ROUTES.STAFF_DASHBOARD,
        icon: LayoutDashboard,
      },
      {
        label: 'My Assignments',
        path: ROUTES.STAFF_TICKETS,
        icon: Ticket,
      },
    ],
  });