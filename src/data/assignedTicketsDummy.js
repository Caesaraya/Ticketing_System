// Dummy data for the Staff Dashboard's "My Assigned Tickets" widget.
// Replace with a real API call (e.g. GET /tickets?assignee=me) once
// the backend is ready — shape stays the same.
export const ASSIGNED_TICKETS = [
  {
    ticketId: 'IT-4921',
    summary: 'Database Connection Timeout',
    module: 'Production Cluster A',
    status: 'In Progress',
    priority: 'High',
  },
  {
    ticketId: 'IT-4918',
    summary: 'API Rate Limiting Issue',
    module: 'Payment Gateway Service',
    status: 'QA',
    priority: 'Medium',
  },
  {
    ticketId: 'IT-4905',
    summary: 'Update SSL Certificates',
    module: 'Internal Tools Subdomain',
    status: 'Open',
    priority: 'Low',
  },
];