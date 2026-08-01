// Dummy data for the PM Dashboard's "Recent Activity" widget. Kept
// separate from Stage 3's notificationsDummy.js since the content is
// PM-specific (team/system events, not personal notifications) even
// though it renders through the same ActivityCard component.
export const PM_RECENT_ACTIVITY = [
  { time: '10 mins ago', message: 'Mark T. resolved #TK-3998' },
  { time: '45 mins ago', message: 'System escalated #TK-4032 to Critical' },
  { time: '2 hours ago', message: "Lisa K. commented on #TK-4015: \"I've restarted the server, monitoring load now...\"" },
  { time: '3 hours ago', message: 'David W. created #TK-4031' },
];