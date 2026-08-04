// Dummy per-account profile fields that don't already live on the
// auth user object (name/email/role come from dummyUsers.js /
// AuthContext). Keyed by the same account name used everywhere else
// ('user', 'pm', 'staff1', 'staff2'). Replace with a real
// GET /users/:id profile call once the backend exists.
export const PROFILE_DETAILS = {
  user: { department: 'Marketing', phone: '+62 812-0000-1111', joinedDate: 'Jan 12, 2025' },
  pm: { department: 'IT Support', phone: '+62 812-0000-2222', joinedDate: 'Mar 3, 2024' },
  staff1: { department: 'IT Support', phone: '+62 812-0000-3333', joinedDate: 'Jun 18, 2024' },
  staff2: { department: 'IT Support', phone: '+62 812-0000-4444', joinedDate: 'Sep 25, 2024' },
};