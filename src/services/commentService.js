import { api } from './apiClient';

export async function getTicketComments(
  ticketId,
  params = {}
) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  const searchParams = new URLSearchParams();

  if (params.skip !== undefined) {
    searchParams.set(
      'skip',
      String(params.skip)
    );
  }

  if (params.limit !== undefined) {
    searchParams.set(
      'limit',
      String(params.limit)
    );
  }

  const query = searchParams.toString();

  return api.get(
    `/tickets/${ticketId}/comments${
      query ? `?${query}` : ''
    }`
  );
}

export async function createComment(
  ticketId,
  content
) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  if (!content?.trim()) {
    throw new Error(
      'Comment content is required.'
    );
  }

  return api.post(
    `/tickets/${ticketId}/comments`,
    {
      content: content.trim(),
    }
  );
}

export async function updateComment(
  commentId,
  content
) {
  if (!commentId) {
    throw new Error(
      'Comment ID is required.'
    );
  }

  if (!content?.trim()) {
    throw new Error(
      'Comment content is required.'
    );
  }

  return api.patch(
    `/comments/${commentId}`,
    {
      content: content.trim(),
    }
  );
}