import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-50 text-center dark:bg-gray-950">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">404 — Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400">The page you're looking for doesn't exist.</p>
      <Link to={ROUTES.HOME} className="text-sm font-medium text-blue-600 hover:underline">
        Back to home
      </Link>
    </div>
  );
}
