import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  getTicketComments,
  createTicketComment,
  updateTicketComment,
  deleteTicketComment,
} from '../services/ticketService';

export function useTicketComments(ticketId) {
  const [comments, setComments] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState(null);

  const loadComments =
    useCallback(async () => {
      if (!ticketId) {
        setComments([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data =
          await getTicketComments(
            ticketId
          );

        setComments(
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
    loadComments().catch(() => {});
  }, [loadComments]);

  const addComment =
    useCallback(
      async (content) => {
        setIsSubmitting(true);

        try {
          const comment =
            await createTicketComment(
              ticketId,
              content
            );

          setComments(
            (current) => [
              ...current,
              comment,
            ]
          );

          return comment;
        } finally {
          setIsSubmitting(false);
        }
      },
      [ticketId]
    );

  const editComment =
    useCallback(
      async (commentId, content) => {
        setIsSubmitting(true);

        try {
          const updated =
            await updateTicketComment(
              commentId,
              content
            );

          setComments(
            (current) =>
              current.map((comment) =>
                comment.id === commentId
                  ? updated
                  : comment
              )
          );

          return updated;
        } finally {
          setIsSubmitting(false);
        }
      },
      []
    );

  const removeComment =
    useCallback(
      async (commentId) => {
        setIsSubmitting(true);

        try {
          await deleteTicketComment(
            commentId
          );

          setComments(
            (current) =>
              current.filter(
                (comment) =>
                  comment.id !==
                  commentId
              )
          );
        } finally {
          setIsSubmitting(false);
        }
      },
      []
    );

  return {
    comments,
    isLoading,
    isSubmitting,
    error,
    loadComments,
    addComment,
    editComment,
    removeComment,
  };
}