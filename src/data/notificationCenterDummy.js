// Dummy data for the Notification Center.
//
// These roles intentionally match the backend RoleEnum:
// USER, PM_IT, STAFF_IT.
//
// Replace this data with GET /notifications in a later API stage.

export const NOTIFICATION_TYPES = {
  TICKET: 'ticket',
  ASSIGNMENT: 'assignment',
  COMMENT: 'comment',
  SYSTEM: 'system',
};

export const NOTIFICATIONS = [
  {
    id: 'ntf-1',
    type: NOTIFICATION_TYPES.COMMENT,
    read: false,
    title: 'New comment on TKT-1042',
    message:
      'staff1 commented on the database timeout ticket you reported.',
    time: 'Just now',
    roles: ['USER'],
  },

  {
    id: 'ntf-2',
    type: NOTIFICATION_TYPES.ASSIGNMENT,
    read: false,
    title: 'Ticket assigned to you',
    message:
      'TKT-1038 "Request for new monitor" was assigned to you.',
    time: '1 hr ago',
    roles: ['STAFF_IT'],
  },

  {
    id: 'ntf-3',
    type: NOTIFICATION_TYPES.TICKET,
    read: true,
    title: 'New ticket needs assignment',
    message:
      'TKT-4032 "Jira Integration API Endpoint Error" is waiting for assignment.',
    time: 'Yesterday',
    roles: ['PM_IT'],
  },

  {
    id: 'ntf-4',
    type: NOTIFICATION_TYPES.SYSTEM,
    read: true,
    title: 'Ticket resolved',
    message:
      'TKT-1039 "Fix typo in user onboarding email" was marked Done.',
    time: 'Oct 23',
    roles: ['USER', 'PM_IT', 'STAFF_IT'],
  },
];