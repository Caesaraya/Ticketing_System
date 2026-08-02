import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Generic page header for any Ticket page: breadcrumb trail + title +
// an optional trailing action (e.g. a future "Create Ticket" button),
// wired up by whichever page uses this.
export default function TicketHeader({ breadcrumb = [], title, trailing }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        {breadcrumb.length > 0 && (
          <nav className="mb-1 flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            {breadcrumb.map((crumb, idx) => (
              <span key={crumb.label} className="flex items-center gap-1">
                {idx > 0 && <ChevronRight size={12} />}
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-gray-600 dark:hover:text-gray-300">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
      </div>
      {trailing}
    </div>
  );
}