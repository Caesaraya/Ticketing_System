import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

import {
  buildTicketDetailPath,
} from '../../constants/routes';

import {
  getTickets,
} from '../../services/ticketService';

import TicketHeader from '../../components/tickets/TicketHeader';
import TicketToolbar from '../../components/tickets/TicketToolbar';
import FilterDropdown from '../../components/tickets/FilterDropdown';
import TicketTable from '../../components/tickets/TicketTable';
import TicketPagination from '../../components/tickets/TicketPagination';
import TicketEmptyState from '../../components/tickets/TicketEmptyState';

import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  TYPE_OPTIONS,
} from '../../constants/ticketOptions';

const PAGE_SIZE = 10;

function normalizeTicket(ticket) {
  return {
    ...ticket,

    id: String(ticket?.id ?? ''),

    title: ticket?.title ?? '-',

    type: ticket?.type ?? '-',

    priority: ticket?.priority ?? '-',

    status: ticket?.status ?? '-',

    assignee:
      ticket?.pic_name ??
      ticket?.pic?.name ??
      (ticket?.pic_id
        ? `PIC #${ticket.pic_id}`
        : 'Unassigned'),

    createdAt: ticket?.created_at
      ? new Date(
          ticket.created_at
        ).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : '-',
  };
}

export default function StaffTicketListPage() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] = useState(null);

  const [search, setSearch] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('');

  const [priorityFilter, setPriorityFilter] =
    useState('');

  const [typeFilter, setTypeFilter] =
    useState('');

  const [page, setPage] =
    useState(1);

  const loadTickets = useCallback(
    async () => {
      setIsLoading(true);
      setError(null);

      try {
        /*
         * Do NOT send a hardcoded user_id.
         *
         * The backend receives the JWT from apiClient
         * and determines the authenticated Staff IT.
         */
        const response =
          await getTickets({
            skip: 0,
            limit: 1000,
            sort_by: 'created_at',
            sort_order: 'desc',
          });

        const data = Array.isArray(response)
          ? response
          : Array.isArray(response?.items)
            ? response.items
            : [];

        setTickets(
          data.map(normalizeTicket)
        );
      } catch (requestError) {
        let message =
          'Failed to load assigned tickets.';

        if (
          requestError?.status === 403
        ) {
          message =
            'You do not have permission to view these tickets.';
        } else if (
          requestError?.status === 404
        ) {
          message =
            'Ticket endpoint was not found.';
        } else if (
          requestError?.status >= 500
        ) {
          message =
            'The server is currently unavailable.';
        } else if (
          requestError?.message?.includes(
            'Unable to reach'
          )
        ) {
          message =
            'Unable to connect to the backend.';
        }

        setError(message);
        setTickets([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const filteredTickets = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch =
        !query ||
        ticket.id
          .toLowerCase()
          .includes(query) ||
        ticket.title
          .toLowerCase()
          .includes(query) ||
        ticket.ticket_number
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        !statusFilter ||
        ticket.status === statusFilter;

      const matchesPriority =
        !priorityFilter ||
        ticket.priority === priorityFilter;

      const matchesType =
        !typeFilter ||
        ticket.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesType
      );
    });
  }, [
    tickets,
    search,
    statusFilter,
    priorityFilter,
    typeFilter,
  ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredTickets.length /
          PAGE_SIZE
      )
    );

  const safePage =
    Math.min(
      page,
      totalPages
    );

  const pageItems =
    filteredTickets.slice(
      (safePage - 1) *
        PAGE_SIZE,
      safePage *
        PAGE_SIZE
    );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleClear = () => {
    setSearch('');
    setStatusFilter('');
    setPriorityFilter('');
    setTypeFilter('');
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <TicketHeader
        breadcrumb={[
          { label: 'Tickets' },
          {
            label: 'My Assignments',
          },
        ]}
        title="My Assignments"
        trailing={
          <Button
            variant="secondary"
            icon={RefreshCw}
            onClick={loadTickets}
            disabled={isLoading}
          >
            Refresh
          </Button>
        }
      />

      <Card className="p-5">
        <TicketToolbar
          searchValue={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onClear={handleClear}
          filters={
            <>
              <FilterDropdown
                label="Status"
                value={statusFilter}
                onChange={(value) => {
                  setStatusFilter(value);
                  setPage(1);
                }}
                options={STATUS_OPTIONS}
              />

              <FilterDropdown
                label="Priority"
                value={priorityFilter}
                onChange={(value) => {
                  setPriorityFilter(value);
                  setPage(1);
                }}
                options={PRIORITY_OPTIONS}
              />

              <FilterDropdown
                label="Type"
                value={typeFilter}
                onChange={(value) => {
                  setTypeFilter(value);
                  setPage(1);
                }}
                options={TYPE_OPTIONS}
              />
            </>
          }
        />

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            <div className="flex items-center justify-between gap-4">
              <span>
                {error}
              </span>

              <button
                type="button"
                onClick={loadTickets}
                className="font-medium underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div className="mt-4">
          {!isLoading &&
          !error &&
          filteredTickets.length ===
            0 ? (
            <TicketEmptyState
              message="No tickets are assigned to you yet."
            />
          ) : (
            <TicketTable
              tickets={pageItems}
              isLoading={isLoading}
              renderActions={(ticket) => (
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      buildTicketDetailPath(
                        ticket.id
                      )
                    )
                  }
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                >
                  View
                </button>
              )}
            />
          )}
        </div>

        {!isLoading &&
          !error &&
          filteredTickets.length >
            0 && (
            <TicketPagination
              page={safePage}
              totalPages={totalPages}
              totalItems={
                filteredTickets.length
              }
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          )}
      </Card>
    </div>
  );
}