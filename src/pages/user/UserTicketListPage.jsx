import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { ROUTES } from '../../constants/routes';

import { useTickets } from '../../hooks/useTickets';

import TicketListView from '../../components/tickets/TicketListView';
import Button from '../../components/ui/Button';

export default function UserTicketListPage() {
  const navigate = useNavigate();

  const {
    tickets,

    page,
    pageSize,

    search,
    status,
    priority,
    type,

    sortBy,
    sortOrder,

    isLoading,
    error,
    hasNextPage,

    setSearch,
    setStatus,
    setPriority,
    setType,

    setSortBy,
    setSortOrder,

    clearFilters,

    nextPage,
    previousPage,

    retry,
  } = useTickets();

  return (
    <TicketListView
      tickets={tickets}
      breadcrumb={[
        {
          label: 'Tickets',
        },
        {
          label: 'My Tickets',
        },
      ]}
      title="My Tickets"
      emptyMessage="You haven't created any tickets yet."
      showAssignAction={false}
      headerAction={
        <Button
          icon={Plus}
          onClick={() =>
            navigate(ROUTES.CREATE_TICKET)
          }
        >
          Create Ticket
        </Button>
      }

      searchValue={search}
      onSearchChange={setSearch}

      statusFilter={status}
      onStatusChange={setStatus}

      priorityFilter={priority}
      onPriorityChange={setPriority}

      typeFilter={type}
      onTypeChange={setType}

      sortBy={sortBy}
      onSortByChange={setSortBy}

      sortOrder={sortOrder}
      onSortOrderChange={setSortOrder}

      onClear={clearFilters}

      page={page}
      pageSize={pageSize}
      hasNextPage={hasNextPage}
      onPrevious={previousPage}
      onNext={nextPage}

      isLoading={isLoading}
      error={error}
      onRetry={retry}
    />
  );
}