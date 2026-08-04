// Dummy data for the full Notification Center page. This is a
// separate, richer shape ({ id, type, read, title, message, time,
// roles }) from the shallow { time, message } widgets already used by
// the dashboards (notificationsDummy.js, pmActivityDummy.js) — those
// stay as they are; this file is not a duplicate of them, it backs a
// different feature (a filterable, markable-read notification list).
// Replace with a real API call (e.g. GET /notifications) once the
// backend exists.
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
    message: 'staff1 commented on the database timeout ticket you reported.',
    time: 'Just now',
    roles: ['USER'],
  },
  {
    id: 'ntf-2',
    type: NOTIFICATION_TYPES.ASSIGNMENT,
    read: false,
    title: 'Ticket assigned to you',
    message: 'TKT-1038 "Request for new monitor" was assigned to you.',
    time: '1 hr ago',
    roles: ['STAFF'],
  },
  {
    id: 'ntf-3',
    type: NOTIFICATION_TYPES.TICKET,
    read: true,
    title: 'New ticket needs assignment',
    message: 'TKT-4032 "Jira Integration API Endpoint Error" is waiting for assignment.',
    time: 'Yesterday',
    roles: ['PM'],
  },
  {
    id: 'ntf-4',
    type: NOTIFICATION_TYPES.SYSTEM,
    read: true,
    title: 'Ticket resolved',
    message: 'TKT-1039 "Fix typo in user onboarding email" was marked Done.',
    time: 'Oct 23',
    roles: ['USER', 'PM', 'STAFF'],
  },
];