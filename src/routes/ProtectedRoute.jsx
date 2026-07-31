import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

// Route-level guard. Not logged in -> Login. Logged in but wrong role
// -> Unauthorized. Otherwise renders the nested route via <Outlet />.
// This is the ONLY place role-checking logic lives; pages never check
// `role` themselves.
export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
}
