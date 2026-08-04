import { api } from './apiClient';

function buildQueryString(params = {}) {
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

  return query ? `?${query}` : '';
}

// ======================================================
// TICKET
// ======================================================

export function getTickets(params = {}) {
  const query = buildQueryString({
    skip: params.skip ?? 0,
    limit: params.limit ?? 5,
    search: params.search,
    status: params.status,
    priority: params.priority,
    type: params.type,
    pic_id: params.picId,
    sort_by: params.sortBy ?? 'created_at',
    sort_order: params.sortOrder ?? 'desc',
  });

  return api.get(`/tickets${query}`);
}

export function getTicketById(ticketId) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  return api.get(`/tickets/${ticketId}`);
}

export function createTicket(data) {
  return api.post('/tickets', {
    type: data.type,
    title: data.title,
    description: data.description || null,
    priority: data.priority,
    module: data.module || null,
  });
}

export function updateTicket(ticketId, data) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  return api.patch(`/tickets/${ticketId}`, {
    title: data.title,
    description: data.description,
    priority: data.priority,
    module: data.module,
  });
}

export function updateTicketStatus(ticketId, status) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  return api.patch(
    `/tickets/${ticketId}/status`,
    { status }
  );
}

export function assignTicket(ticketId, picId) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  return api.patch(
    `/tickets/${ticketId}/assign`,
    {
      pic_id: Number(picId),
    }
  );
}

export function updateTicketPriority(
  ticketId,
  priority
) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  return api.patch(
    `/tickets/${ticketId}/priority`,
    { priority }
  );
}

// ======================================================
// COMMENTS
// ======================================================

export function getTicketComments(
  ticketId,
  params = {}
) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  const query = buildQueryString({
    skip: params.skip ?? 0,
    limit: params.limit ?? 20,
  });

  return api.get(
    `/tickets/${ticketId}/comments${query}`
  );
}

export function createTicketComment(
  ticketId,
  content
) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  if (!content?.trim()) {
    throw new Error('Comment cannot be empty.');
  }

  return api.post(
    `/tickets/${ticketId}/comments`,
    {
      content: content.trim(),
    }
  );
}

export function updateTicketComment(
  commentId,
  content
) {
  if (!commentId) {
    throw new Error('Comment ID is required.');
  }

  if (!content?.trim()) {
    throw new Error('Comment cannot be empty.');
  }

  return api.patch(
    `/comments/${commentId}`,
    {
      content: content.trim(),
    }
  );
}

export function deleteTicketComment(
  commentId
) {
  if (!commentId) {
    throw new Error('Comment ID is required.');
  }

  return api.delete(
    `/comments/${commentId}`
  );
}

// ======================================================
// ATTACHMENTS
// ======================================================

export function getTicketAttachments(
  ticketId,
  params = {}
) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  const query = buildQueryString({
    skip: params.skip ?? 0,
    limit: params.limit ?? 20,
  });

  return api.get(
    `/tickets/${ticketId}/attachments${query}`
  );
}

export function uploadTicketAttachment(
  ticketId,
  file
) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  if (!file) {
    throw new Error('File is required.');
  }

  const formData = new FormData();

  formData.append('file', file);

  return api.post(
    `/tickets/${ticketId}/attachments`,
    formData
  );
}

export function downloadTicketAttachment(
  attachmentId
) {
  if (!attachmentId) {
    throw new Error(
      'Attachment ID is required.'
    );
  }

  return api.get(
    `/attachments/${attachmentId}/download`
  );
}