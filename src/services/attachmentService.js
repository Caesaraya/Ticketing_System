import { api } from './apiClient';

export function getAttachments(ticketId, params = {}) {
  const searchParams = new URLSearchParams();

  if (params.skip !== undefined) {
    searchParams.set('skip', String(params.skip));
  }

  if (params.limit !== undefined) {
    searchParams.set('limit', String(params.limit));
  }

  const query = searchParams.toString();

  return api.get(
    `/tickets/${ticketId}/attachments${query ? `?${query}` : ''}`
  );
}

export function uploadAttachment(ticketId, file) {
  const formData = new FormData();

  formData.append('file', file);

  return api.post(
    `/tickets/${ticketId}/attachments`,
    formData
  );
}

export function downloadAttachment(attachmentId) {
  return api.getBlob(
    `/attachments/${attachmentId}/download`
  );
}