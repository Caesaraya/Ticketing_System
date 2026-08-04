import {
  useState,
} from 'react';

import {
  Pencil,
  Trash2,
  Send,
  X,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

export default function TicketComments({
  comments,
  isLoading,
  isSubmitting,
  onAdd,
  onEdit,
  onDelete,
}) {
  const { user } = useAuth();

  const [content, setContent] =
    useState('');

  const [editingId, setEditingId] =
    useState(null);

  const [editingContent, setEditingContent] =
    useState('');

  const currentUserId =
    user?.id ??
    user?.user_id;

  const submitComment =
    async (event) => {
      event.preventDefault();

      if (!content.trim()) {
        return;
      }

      await onAdd(content);

      setContent('');
    };

  const startEditing =
    (comment) => {
      setEditingId(comment.id);
      setEditingContent(
        comment.content ?? ''
      );
    };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingContent('');
  };

  const saveEditing =
    async (commentId) => {
      if (!editingContent.trim()) {
        return;
      }

      await onEdit(
        commentId,
        editingContent
      );

      cancelEditing();
    };

  const canEditComment =
    (comment) => {
      if (!currentUserId) {
        return false;
      }

      return (
        Number(comment.author_id) ===
        Number(currentUserId)
      );
    };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Comments
        </h2>

        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          Discuss this ticket with the team.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />

              <div className="mt-3 h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 py-8 text-center dark:border-gray-700">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            No comments yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => {
            const ownComment =
              canEditComment(
                comment
              );

            const isEditing =
              editingId ===
              comment.id;

            return (
              <div
                key={comment.id}
                className="rounded-lg border border-gray-100 p-4 dark:border-gray-800"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                      User #{comment.author_id}
                    </p>

                    <p className="mt-0.5 text-[11px] text-gray-400">
                      {formatCommentDate(
                        comment.timestamp
                      )}
                    </p>
                  </div>

                  {ownComment &&
                    !isEditing && (
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            startEditing(
                              comment
                            )
                          }
                          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-800"
                          title="Edit comment"
                        >
                          <Pencil
                            size={14}
                          />
                        </button>

                        <button
                          type="button"
                          disabled={
                            isSubmitting
                          }
                          onClick={() =>
                            onDelete(
                              comment.id
                            )
                          }
                          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800"
                          title="Delete comment"
                        >
                          <Trash2
                            size={14}
                          />
                        </button>
                      </div>
                    )}
                </div>

                {isEditing ? (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={
                        editingContent
                      }
                      onChange={(event) =>
                        setEditingContent(
                          event.target.value
                        )
                      }
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={
                          cancelEditing
                        }
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <X size={14} />
                        Cancel
                      </button>

                      <button
                        type="button"
                        disabled={
                          isSubmitting
                        }
                        onClick={() =>
                          saveEditing(
                            comment.id
                          )
                        }
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
                    {comment.content}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <form
        onSubmit={submitComment}
        className="space-y-2"
      >
        <textarea
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          rows={3}
          placeholder="Write a comment..."
          disabled={isSubmitting}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !content.trim()
            }
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={15} />

            {isSubmitting
              ? 'Sending...'
              : 'Add Comment'}
          </button>
        </div>
      </form>
    </div>
  );
}

function formatCommentDate(
  value
) {
  if (!value) {
    return '-';
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleString(
    'en-GB',
    {
      dateStyle: 'medium',
      timeStyle: 'short',
    }
  );
}