import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

function AuthLoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400" />

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Checking your session...
        </p>
      </div>
    </div>
  );
}

export default function ProtectedRoute({
  allowedRoles,
}) {
  const {
    isAuthenticated,
    isInitializing,
    role,
  } = useAuth();

  if (isInitializing) {
    return <AuthLoadingState />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    return (
      <Navigate
        to={ROUTES.UNAUTHORIZED}
        replace
      />
    );
  }

  return <Outlet />;
}