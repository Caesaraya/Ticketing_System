import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES, DASHBOARD_BY_ROLE } from '../constants/routes';

// Handles "/" — sends a logged-in user straight to their own dashboard
// instead of making them see a landing page, and sends everyone else
// to Login. Kept as its own component (rather than inline logic in
// AppRoutes) so it's independently testable.
export default function RootRedirect() {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated && DASHBOARD_BY_ROLE[role]) {
    return <Navigate to={DASHBOARD_BY_ROLE[role]} replace />;
  }

  return <Navigate to={ROUTES.LOGIN} replace />;
}
