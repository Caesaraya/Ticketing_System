import { api } from './apiClient';

export async function uploadAttachment(ticketId, file) {
  if (!ticketId) {
    throw new Error('Ticket ID is required.');
  }

  if (!file) {
    throw new Error('Attachment file is required.');
  }

  const formData = new FormData();

  formData.append('file', file);

  return api.post(
    `/tickets/${ticketId}/attachments`,
    formData
  );
}

export async function getTicketAttachments(
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
    `/tickets/${ticketId}/attachments${
      query ? `?${query}` : ''
    }`
  );
}

export async function downloadAttachment(
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

export async function previewAttachment(
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