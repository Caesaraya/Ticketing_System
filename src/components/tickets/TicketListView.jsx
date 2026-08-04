import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Card from '../ui/Card';
import TicketHeader from './TicketHeader';
import TicketToolbar from './TicketToolbar';
import FilterDropdown from './FilterDropdown';
import TicketTable from './TicketTable';
import TicketPagination from './TicketPagination';
import TicketActions from './TicketActions';
import TicketEmptyState from './TicketEmptyState';

import {
  buildTicketDetailPath,
} from '../../constants/routes';

import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  TYPE_OPTIONS,
} from '../../constants/ticketOptions';

export default function TicketListView({
  tickets = [],
  breadcrumb,
  title,
  emptyMessage,
  showAssignAction = false,
  headerAction,

  searchValue = '',
  onSearchChange,

  statusFilter = '',
  onStatusChange,

  priorityFilter = '',
  onPriorityChange,

  typeFilter = '',
  onTypeChange,

  sortBy = 'created_at',
  onSortByChange,

  sortOrder = 'desc',
  onSortOrderChange,

  onClear,

  page = 1,
  pageSize = 10,
  hasNextPage = false,
  onPrevious,
  onNext,

  isLoading = false,
  error = null,
  onRetry,
}) {
  const navigate = useNavigate();

  const renderActions = (ticket) => (
    <TicketActions
      onView={() =>
        navigate(
          buildTicketDetailPath(ticket.id)
        )
      }
      onAssign={
        showAssignAction
          ? () => toast.info('Coming soon')
          : undefined
      }
    />
  );

  const hasFilters =
    searchValue ||
    statusFilter ||
    priorityFilter ||
    typeFilter;

  return (
    <div className="space-y-6">
      <TicketHeader
        breadcrumb={breadcrumb}
        title={title}
        trailing={headerAction}
      />

      <Card className="p-5">
        <TicketToolbar
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onClear={onClear}
          filters={
            <>
              <FilterDropdown
                label="Status"
                value={statusFilter}
                onChange={onStatusChange}
                options={STATUS_OPTIONS}
              />

              <FilterDropdown
                label="Priority"
                value={priorityFilter}
                onChange={onPriorityChange}
                options={PRIORITY_OPTIONS}
              />

              <FilterDropdown
                label="Type"
                value={typeFilter}
                onChange={onTypeChange}
                options={TYPE_OPTIONS}
              />

              <FilterDropdown
                label="Sort"
                value={sortBy}
                onChange={onSortByChange}
                options={[
                  {
                    value: 'created_at',
                    label: 'Created',
                  },
                  {
                    value: 'updated_at',
                    label: 'Updated',
                  },
                ]}
              />

              <FilterDropdown
                label="Order"
                value={sortOrder}
                onChange={onSortOrderChange}
                options={[
                  {
                    value: 'desc',
                    label: 'Newest first',
                  },
                  {
                    value: 'asc',
                    label: 'Oldest first',
                  },
                ]}
              />
            </>
          }
        />

        <div className="mt-4">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/40 dark:bg-red-950/20">
              <p className="text-sm font-medium text-red-700 dark:text-red-400">
                {error.status === 403
                  ? 'You do not have permission to view these tickets.'
                  : error.status === 404
                    ? 'Ticket data was not found.'
                    : error.status === 422
                      ? 'The ticket filters are invalid.'
                      : 'Unable to load tickets.'}
              </p>

              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="mt-3 text-sm font-medium text-blue-600 hover:underline"
                >
                  Try again
                </button>
              )}
            </div>
          ) : isLoading ? (
            <TicketTable
              tickets={[]}
              isLoading
              renderActions={renderActions}
            />
          ) : tickets.length === 0 ? (
            <TicketEmptyState
              message={
                hasFilters
                  ? 'No tickets match your filters.'
                  : emptyMessage
              }
            />
          ) : (
            <TicketTable
              tickets={tickets}
              isLoading={false}
              renderActions={renderActions}
            />
          )}
        </div>

        {!isLoading &&
          !error &&
          tickets.length > 0 && (
            <TicketPagination
              page={page}
              pageSize={pageSize}
              currentItemCount={tickets.length}
              hasNextPage={hasNextPage}
              onPrevious={onPrevious}
              onNext={onNext}
              isLoading={isLoading}
            />
          )}
      </Card>
    </div>
  );
}