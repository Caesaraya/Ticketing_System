// Dummy data for the Staff Dashboard's "Upcoming Deadlines" widget.
// Replace with a real API call once the backend is ready. `tone` maps
// straight to PriorityIndicator's tone prop.
export const UPCOMING_DEADLINES = [
  {
    time: 'Today, 2:00 PM',
    title: 'Database Connection Timeout',
    subtitle: 'SLA Breach Warning (IT-4921)',
    tone: 'critical',
  },
  {
    time: 'Tomorrow, 10:00 AM',
    title: 'API Rate Limiting Issue',
    subtitle: 'Expected QA Sign-off (IT-4918)',
    tone: 'medium',
  },
  {
    time: 'Friday, 5:00 PM',
    title: 'Update SSL Certificates',
    subtitle: 'Scheduled Maintenance (IT-4905)',
    tone: 'low',
  },
];