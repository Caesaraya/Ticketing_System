import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { getTickets } from '../services/ticketService';

const PAGE_SIZE = 10;

function normalizeTicket(ticket) {
  return {
    ...ticket,

    // UI menggunakan ID sebagai string.
    id: String(ticket.id),

    // Backend menggunakan ticket_number sebagai nomor ticket.
    ticketNumber: ticket.ticket_number,

    // Backend menggunakan uppercase enum.
    type: ticket.type,

    priority: ticket.priority,

    status: ticket.status,

    // UI lama menggunakan `assignee`.
    // Backend hanya mengembalikan pic_id pada endpoint list.
    assignee:
      ticket.pic_id !== null &&
      ticket.pic_id !== undefined
        ? `PIC #${ticket.pic_id}`
        : null,

    // UI lama menggunakan createdAt.
    createdAt: ticket.created_at,
  };
}

export function useTickets(initialParams = {}) {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState(
    initialParams.search ?? ''
  );

  const [status, setStatus] = useState(
    initialParams.status ?? ''
  );

  const [priority, setPriority] = useState(
    initialParams.priority ?? ''
  );

  const [type, setType] = useState(
    initialParams.type ?? ''
  );

  const [sortBy, setSortBy] = useState(
    initialParams.sort_by ?? 'created_at'
  );

  const [sortOrder, setSortOrder] = useState(
    initialParams.sort_order ?? 'desc'
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasNextPage, setHasNextPage] =
    useState(false);

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getTickets({
        skip: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        search,
        status,
        priority,
        type,
        sort_by: sortBy,
        sort_order: sortOrder,
      });

      const normalized =
        Array.isArray(response)
          ? response.map(normalizeTicket)
          : [];

      setTickets(normalized);

      // Backend tidak memberikan total count.
      // Jika jumlah hasil < PAGE_SIZE berarti tidak ada
      // halaman berikutnya.
      setHasNextPage(
        normalized.length === PAGE_SIZE
      );
    } catch (err) {
      setTickets([]);
      setHasNextPage(false);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [
    page,
    search,
    status,
    priority,
    type,
    sortBy,
    sortOrder,
  ]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const changeSearch = useCallback((value) => {
    setSearch(value);
    setPage(1);
  }, []);

  const changeStatus = useCallback((value) => {
    setStatus(value);
    setPage(1);
  }, []);

  const changePriority = useCallback((value) => {
    setPriority(value);
    setPage(1);
  }, []);

  const changeType = useCallback((value) => {
    setType(value);
    setPage(1);
  }, []);

  const changeSort = useCallback((value) => {
    setSortBy(value);
    setPage(1);
  }, []);

  const changeSortOrder = useCallback((value) => {
    setSortOrder(value);
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSearch('');
    setStatus('');
    setPriority('');
    setType('');
    setSortBy('created_at');
    setSortOrder('desc');
    setPage(1);
  }, []);

  const nextPage = useCallback(() => {
    if (!hasNextPage || isLoading) {
      return;
    }

    setPage((current) => current + 1);
  }, [hasNextPage, isLoading]);

  const previousPage = useCallback(() => {
    if (page <= 1 || isLoading) {
      return;
    }

    setPage((current) => current - 1);
  }, [page, isLoading]);

  return {
    tickets,

    page,
    pageSize: PAGE_SIZE,

    search,
    status,
    priority,
    type,

    sortBy,
    sortOrder,

    isLoading,
    error,
    hasNextPage,

    setSearch: changeSearch,
    setStatus: changeStatus,
    setPriority: changePriority,
    setType: changeType,

    setSortBy: changeSort,
    setSortOrder: changeSortOrder,

    clearFilters,

    nextPage,
    previousPage,

    retry: fetchTickets,
  };
}