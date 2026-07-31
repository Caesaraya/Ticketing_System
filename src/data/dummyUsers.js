import { ROLES } from '../constants/roles';

// Local dummy "database" the auth service authenticates against. This
// is the only file to remove/replace once a real users table exists
// behind the FastAPI backend — nothing outside authService.js imports
// it directly.
export const DUMMY_USERS = [
  { email: 'user@wssi.com', password: 'password123', name: 'user', role: ROLES.USER },
  { email: 'pm@wssi.com', password: 'password123', name: 'pm', role: ROLES.PM },
  { email: 'staff1@wssi.com', password: 'password123', name: 'staff1', role: ROLES.STAFF },
  { email: 'staff2@wssi.com', password: 'password123', name: 'staff2', role: ROLES.STAFF },
];