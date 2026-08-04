import { api } from './apiClient';

export function getTickets(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ''
    ) {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();

  return api.get(
    `/tickets${query ? `?${query}` : ''}`
  );
}

export function getTicketById(ticketId) {
  return api.get(`/tickets/${encodeURIComponent(ticketId)}`);
}

export function createTicket(payload) {
  return api.post('/tickets', payload);
}

export function updateTicket(ticketId, payload) {
  return api.patch(`/tickets/${ticketId}`, payload);
}

export function updateTicketStatus(ticketId, status) {
  return api.patch(`/tickets/${ticketId}/status`, {
    status,
  });
}

export function assignTicket(ticketId, picId) {
  return api.patch(`/tickets/${ticketId}/assign`, {
    pic_id: picId,
  });
}

export function updateTicketPriority(
  ticketId,
  priority
) {
  return api.patch(`/tickets/${ticketId}/priority`, {
    priority,
  });
}