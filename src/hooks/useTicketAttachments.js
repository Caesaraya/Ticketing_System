import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  getTicketAttachments,
  uploadTicketAttachment,
  downloadTicketAttachment,
} from '../services/ticketService';

export function useTicketAttachments(
  ticketId
) {
  const [attachments, setAttachments] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isUploading, setIsUploading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const loadAttachments =
    useCallback(async () => {
      if (!ticketId) {
        setAttachments([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data =
          await getTicketAttachments(
            ticketId
          );

        setAttachments(
          Array.isArray(data)
            ? data
            : []
        );

        return data;
      } catch (requestError) {
        setError(requestError);
        throw requestError;
      } finally {
        setIsLoading(false);
      }
    }, [ticketId]);

  useEffect(() => {
    loadAttachments().catch(() => {});
  }, [loadAttachments]);

  const upload =
    useCallback(
      async (file) => {
        setIsUploading(true);

        try {
          const attachment =
            await uploadTicketAttachment(
              ticketId,
              file
            );

          setAttachments(
            (current) => [
              ...current,
              attachment,
            ]
          );

          return attachment;
        } finally {
          setIsUploading(false);
        }
      },
      [ticketId]
    );

  const download =
    useCallback(
      async (attachmentId) => {
        return downloadTicketAttachment(
          attachmentId
        );
      },
      []
    );

  return {
    attachments,
    isLoading,
    isUploading,
    error,
    loadAttachments,
    upload,
    download,
  };
}