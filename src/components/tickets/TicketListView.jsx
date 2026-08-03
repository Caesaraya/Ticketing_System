import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Card from '../ui/Card';
import Button from '../ui/Button';
import TicketHeader from './TicketHeader';
import TicketToolbar from './TicketToolbar';
import FilterDropdown from './FilterDropdown';
import TicketTable from './TicketTable';
import TicketPagination from './TicketPagination';
import TicketActions from './TicketActions';
import TicketEmptyState from './TicketEmptyState';
import { buildTicketDetailPath } from '../../constants/routes';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../constants/ticketOptions';

const PAGE_SIZE = 5;

// Shared container for every role's Ticket List. Holds the only bits
// that differ between User/PM/Staff as props (tickets, whether the
// Assign action shows, the empty-state message, breadcrumb/title) and
// owns the search/filter/pagination/dummy-loading UI state itself —
// so that state and the surrounding layout exist in exactly one place
// instead of being copy-pasted into three page files.
export default function TicketListView({
  tickets,
  breadcrumb,
  title,
  emptyMessage,
  showAssignAction = false,
  headerAction,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [page, setPage] = useState(1);

  // Dummy loading state only — no real request is made. Simulates the
  // shape of a future API call so pages don't need to change when one
  // is wired up.
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [tickets]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch =
        !query ||
        ticket.id.toLowerCase().includes(query) ||
        ticket.title.toLowerCase().includes(query) ||
        (ticket.assignee ?? '').toLowerCase().includes(query);

      const matchesStatus = !statusFilter || ticket.status === statusFilter;
      const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePriorityChange = (value) => {
    setPriorityFilter(value);
    setPage(1);
  };

  const handleClear = () => {
    setSearch('');
    setStatusFilter('');
    setPriorityFilter('');
    setPage(1);
  };

  const renderActions = (ticket) => (
    <TicketActions
      onView={() => navigate(buildTicketDetailPath(ticket.id))}
      onAssign={showAssignAction ? () => toast.info('Coming soon') : undefined}
    />
  );

  return (
    <div className="space-y-6">
      <TicketHeader breadcrumb={breadcrumb} title={title} trailing={headerAction} />

      <Card className="p-5">
        <TicketToolbar
          searchValue={search}
          onSearchChange={handleSearchChange}
          onClear={handleClear}
          filters={
            <>
              <FilterDropdown
                label="Status"
                value={statusFilter}
                onChange={handleStatusChange}
                options={STATUS_OPTIONS}
              />
              <FilterDropdown
                label="Priority"
                value={priorityFilter}
                onChange={handlePriorityChange}
                options={PRIORITY_OPTIONS}
              />
            </>
          }
        />

        <div className="mt-4">
          {!isLoading && filtered.length === 0 ? (
            <TicketEmptyState message={emptyMessage} />
          ) : (
            <TicketTable tickets={pageItems} isLoading={isLoading} renderActions={renderActions} />
          )}
        </div>

        {!isLoading && filtered.length > 0 && (
          <TicketPagination
            page={page}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        )}
      </Card>
    </div>
  );
}