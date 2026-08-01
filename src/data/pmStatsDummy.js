// Dummy data for the PM Dashboard's stat row, ticket-volume line chart,
// and priority-distribution donut chart. Replace with real API calls
// (e.g. GET /dashboard/pm/summary) once the backend is ready.
export const PM_STATS = [
  { key: 'total', label: 'Total Tickets', value: '1,284', tone: 'gray', caption: '+12% vs last week' },
  { key: 'open', label: 'Open', value: 342, tone: 'red', caption: '+5 new today' },
  { key: 'assigned', label: 'Assigned', value: 854, tone: 'purple', caption: '' },
  { key: 'inProgress', label: 'In Progress', value: 156, tone: 'blue', caption: '' },
  { key: 'qa', label: 'QA Review', value: 45, tone: 'amber', caption: '' },
  { key: 'done', label: 'Done', value: 87, tone: 'green', caption: 'Avg res: 4.2 hrs' },
];

export const TICKET_VOLUME_TRENDS = [
  { day: 'Mon', resolved: 30, newTickets: 22 },
  { day: 'Tue', resolved: 42, newTickets: 28 },
  { day: 'Wed', resolved: 55, newTickets: 40 },
  { day: 'Thu', resolved: 63, newTickets: 35 },
  { day: 'Fri', resolved: 48, newTickets: 30 },
  { day: 'Sat', resolved: 25, newTickets: 15 },
  { day: 'Sun', resolved: 20, newTickets: 10 },
];

export const PRIORITY_DISTRIBUTION = {
  total: 342,
  data: [
    { label: 'Critical', value: 40 },
    { label: 'High', value: 90 },
    { label: 'Medium', value: 150 },
    { label: 'Low', value: 62 },
  ],
};