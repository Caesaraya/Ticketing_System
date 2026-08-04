import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import {
  ROUTES,
  DASHBOARD_BY_ROLE,
} from '../constants/routes';

export default function RootRedirect() {
  const {
    isAuthenticated,
    isInitializing,
    role,
  } = useAuth();

  if (isInitializing) {
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

  if (
    isAuthenticated &&
    DASHBOARD_BY_ROLE[role]
  ) {
    return (
      <Navigate
        to={DASHBOARD_BY_ROLE[role]}
        replace
      />
    );
  }

  return (
    <Navigate
      to={ROUTES.LOGIN}
      replace
    />
  );
}