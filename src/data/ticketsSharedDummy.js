// Shared dummy ticket data for the Ticket module (Stage 6 foundation,
// Stage 7 list pages, Stage 8 detail page). Replace with a real API
// call (e.g. GET /tickets, GET /tickets/:id) once the backend is
// ready — keep the same shape.
//
// `reporter` and `assignee` use the same account names as
// src/data/dummyUsers.js ('user', 'pm', 'staff1', 'staff2') so the
// User/Staff Ticket List pages can filter "mine"/"assigned to me"
// against the logged-in dummy user's name.
//
// Stage 8 adds detail-only fields (`description`, `category`,
// `timelineStage`, `history`, `comments`, `attachments`) directly onto
// the same records — TicketRow/TicketTable/TicketCard simply ignore
// the fields they don't use, so nothing from Stage 6/7 breaks.
export const SHARED_TICKETS = [
  {
    id: 'TKT-1042',
    title: 'Database connection timeout on production',
    type: 'Bug',
    priority: 'Critical',
    status: 'Open',
    reporter: 'user',
    assignee: 'staff1',
    createdAt: '2h ago',
    category: 'Infrastructure',
    description:
      'Intermittent connection timeouts on the primary production database cluster starting this morning. API response latency is spiking and the backend error logs show repeated connection errors.',
    timelineStage: 'Open',
    history: [
      { time: '2 hrs ago', message: 'user created TKT-1042' },
    ],
    comments: [
      {
        author: 'staff1',
        time: '1 hr ago',
        message: "I've checked the AWS health dashboard, no reported incidents. Looking into the DB instance metrics now.",
      },
    ],
    attachments: [{ name: 'error_logs_0830.pdf', size: '1.2 MB' }],
  },
  {
    id: 'TKT-1041',
    title: 'Implement OAuth2 login flow',
    type: 'Feature',
    priority: 'High',
    status: 'In Progress',
    reporter: 'pm',
    assignee: 'staff2',
    createdAt: 'Yesterday',
    category: 'Authentication',
    description:
      'Add OAuth2-based login as an alternative to the existing dummy login, so users can sign in with a corporate identity provider.',
    timelineStage: 'In Progress',
    history: [
      { time: 'Yesterday', message: 'pm created TKT-1041' },
      { time: 'Yesterday', message: 'System assigned TKT-1041 to staff2' },
      { time: '4 hrs ago', message: 'staff2 changed status from Assigned to In Progress' },
    ],
    comments: [
      { author: 'staff2', time: '4 hrs ago', message: 'Starting on the provider config today.' },
    ],
    attachments: [],
  },
  {
    id: 'TKT-1040',
    title: 'Update dependency react-router-dom v6',
    type: 'Task',
    priority: 'Low',
    status: 'Open',
    reporter: 'user',
    assignee: null,
    createdAt: 'Oct 24',
    category: 'Maintenance',
    description: 'Bump react-router-dom to the latest v6 release and verify no breaking changes affect existing routes.',
    timelineStage: 'Open',
    history: [{ time: 'Oct 24', message: 'user created TKT-1040' }],
    comments: [],
    attachments: [],
  },
  {
    id: 'TKT-1039',
    title: 'Fix typo in user onboarding email',
    type: 'Bug',
    priority: 'Medium',
    status: 'Resolved',
    reporter: 'staff1',
    assignee: 'staff1',
    createdAt: 'Oct 23',
    category: 'Content',
    description: 'The onboarding welcome email has a typo in the second paragraph ("recieve" instead of "receive").',
    timelineStage: 'Done',
    history: [
      { time: 'Oct 23', message: 'staff1 created TKT-1039' },
      { time: 'Oct 23', message: 'staff1 changed status from Open to Done' },
    ],
    comments: [
      { author: 'staff1', time: 'Oct 23', message: 'Fixed and redeployed the email template.' },
    ],
    attachments: [],
  },
  {
    id: 'TKT-1038',
    title: 'Request for new monitor',
    type: 'Task',
    priority: 'Low',
    status: 'In Progress',
    reporter: 'user',
    assignee: 'staff2',
    createdAt: '1 day ago',
    category: 'Hardware',
    description: 'Requesting a second monitor for the workstation to improve productivity on multi-window tasks.',
    timelineStage: 'In Progress',
    history: [
      { time: '1 day ago', message: 'user created TKT-1038' },
      { time: '1 day ago', message: 'System assigned TKT-1038 to staff2' },
    ],
    comments: [],
    attachments: [],
  },
  {
    id: 'TKT-1037',
    title: 'API rate limiting issue on payment gateway',
    type: 'Bug',
    priority: 'Medium',
    status: 'QA',
    reporter: 'staff2',
    assignee: 'staff2',
    createdAt: '2 days ago',
    category: 'Payments',
    description: 'Payment gateway service is rejecting requests intermittently due to rate limiting under peak load.',
    timelineStage: 'QA',
    history: [
      { time: '2 days ago', message: 'staff2 created TKT-1037' },
      { time: '1 day ago', message: 'staff2 changed status from In Progress to QA' },
    ],
    comments: [
      { author: 'staff2', time: '1 day ago', message: 'Fix deployed to staging, waiting on QA sign-off.' },
    ],
    attachments: [{ name: 'rate_limit_config.png', size: '340 KB' }],
  },
];