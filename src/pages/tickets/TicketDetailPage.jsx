import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import { toast } from 'sonner';

import { useAuth } from '../../context/AuthContext';

import { ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';

import {
  getTicketById,
  updateTicketStatus,
  assignTicket,
  updateTicketPriority,
} from '../../services/ticketService';

import {
  getUserById,
} from '../../services/userService';

import {
  getTicketComments,
  createComment,
} from '../../services/commentService';

import {
  getTicketAttachments,
  downloadAttachment,
  previewAttachment,
} from '../../services/attachmentService';

import Card from '../../components/ui/Card';
import Select from '../../components/ui/Select';

import TicketDetailHeader
  from '../../components/tickets/TicketDetailHeader';

import TicketTimeline
  from '../../components/tickets/TicketTimeline';

import TicketInfoCard
  from '../../components/tickets/TicketInfoCard';

import TicketEmptyState
  from '../../components/tickets/TicketEmptyState';

import TicketActionPanel
  from '../../components/tickets/TicketActionPanel';

import StatusSelector
  from '../../components/tickets/StatusSelector';

import AssignmentPanel
  from '../../components/tickets/AssignmentPanel';

import AssigneeAvatar
  from '../../components/tickets/AssigneeAvatar';

import AttachmentCard
  from '../../components/tickets/AttachmentCard';

import {
  PRIORITY_OPTIONS,
} from '../../constants/ticketOptions';

const BACK_ROUTE_BY_ROLE = {
  [ROLES.USER]:
    ROUTES.USER_TICKETS,

  [ROLES.PM_IT]:
    ROUTES.PM_TICKETS,

  [ROLES.STAFF_IT]:
    ROUTES.STAFF_TICKETS,
};

function formatDate(value) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function getErrorMessage(
  error,
  fallback
) {
  if (error?.status === 400) {
    return (
      error.message ||
      'This ticket change is not allowed.'
    );
  }

  if (error?.status === 401) {
    return 'Your session has expired. Please login again.';
  }

  if (error?.status === 403) {
    return (
      'You do not have permission to perform this action.'
    );
  }

  if (error?.status === 404) {
    return (
      'The requested data was not found.'
    );
  }

  if (error?.status === 422) {
    return (
      error.message ||
      'The submitted data is invalid.'
    );
  }

  if (error?.status >= 500) {
    return (
      'The server encountered an error. Please try again later.'
    );
  }

  if (
    error?.message
      ?.toLowerCase()
      .includes('unable to reach')
  ) {
    return (
      'Unable to connect to the Ticketing System backend.'
    );
  }

  return (
    error?.message ||
    fallback
  );
}

export default function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    user,
    role,
  } = useAuth();

  const [ticket, setTicket] =
    useState(null);

  const [reporterName, setReporterName] =
    useState('');

  const [assigneeName, setAssigneeName] =
    useState('');

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [
    updatingStatus,
    setUpdatingStatus,
  ] = useState(false);

  const [
    updatingPriority,
    setUpdatingPriority,
  ] = useState(false);

  const [
    updatingAssignment,
    setUpdatingAssignment,
  ] = useState(false);

  /*
   * COMMENTS
   */
  const [comments, setComments] =
    useState([]);

  const [
    commentAuthors,
    setCommentAuthors,
  ] = useState({});

  const [
    isLoadingComments,
    setIsLoadingComments,
  ] = useState(false);

  const [
    commentError,
    setCommentError,
  ] = useState('');

  const [
    commentContent,
    setCommentContent,
  ] = useState('');

  const [
    isSubmittingComment,
    setIsSubmittingComment,
  ] = useState(false);

  /*
   * USER dan STAFF_IT boleh membuat komentar.
   * PM_IT hanya dapat melihat komentar.
   */
  const canComment =
    role === ROLES.USER ||
    role === ROLES.STAFF_IT;

  /*
   * ATTACHMENTS
   */
  const [attachments, setAttachments] =
    useState([]);

  const [
    isLoadingAttachments,
    setIsLoadingAttachments,
  ] = useState(false);

  const [
    attachmentError,
    setAttachmentError,
  ] = useState('');

  /*
   * LOAD TICKET
   */
  const loadTicket = useCallback(
    async () => {
      setIsLoading(true);
      setError('');

      try {
        const data =
          await getTicketById(id);

        setTicket(data);

        /*
         * Reporter
         */
        if (data?.reporter_id) {
          try {
            const reporter =
              await getUserById(
                data.reporter_id
              );

            setReporterName(
              reporter?.username ??
                reporter?.name ??
                `User #${data.reporter_id}`
            );
          } catch {
            setReporterName(
              `User #${data.reporter_id}`
            );
          }
        } else {
          setReporterName('');
        }

        /*
         * Assignee
         */
        if (data?.pic_id) {
          try {
            const assignee =
              await getUserById(
                data.pic_id
              );

            setAssigneeName(
              assignee?.username ??
                assignee?.name ??
                `User #${data.pic_id}`
            );
          } catch {
            setAssigneeName(
              `User #${data.pic_id}`
            );
          }
        } else {
          setAssigneeName('');
        }
      } catch (err) {
        setTicket(null);

        if (err?.status === 404) {
          setError(
            `Ticket ${id} was not found.`
          );
        } else if (
          err?.status === 403
        ) {
          setError(
            'You do not have permission to view this ticket.'
          );
        } else {
          setError(
            getErrorMessage(
              err,
              'Failed to load ticket.'
            )
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [id]
  );

  /*
   * LOAD COMMENTS
   */
  const loadComments = useCallback(
    async () => {
      if (!id) {
        return;
      }

      setIsLoadingComments(true);
      setCommentError('');

      try {
        const data =
          await getTicketComments(
            id,
            {
              skip: 0,
              limit: 20,
            }
          );

        const loadedComments =
          Array.isArray(data)
            ? data
            : [];

        setComments(
          loadedComments
        );

        /*
         * Ambil semua author_id unik.
         */
        const authorIds = [
          ...new Set(
            loadedComments
              .map(
                (comment) =>
                  comment?.author_id
              )
              .filter(
                (authorId) =>
                  authorId !== null &&
                  authorId !== undefined
              )
          ),
        ];

        const authorMap = {};

        /*
         * Username user yang sedang login
         * sudah tersedia dari AuthContext.
         */
        if (user?.id) {
          authorMap[user.id] =
            user?.username ??
            user?.name ??
            `User #${user.id}`;
        }

        /*
         * Ambil username author lain.
         */
        const otherAuthorIds =
          authorIds.filter(
            (authorId) =>
              Number(authorId) !==
              Number(user?.id)
          );

        await Promise.all(
          otherAuthorIds.map(
            async (authorId) => {
              try {
                const author =
                  await getUserById(
                    authorId
                  );

                authorMap[authorId] =
                  author?.username ??
                  author?.name ??
                  `User #${authorId}`;
              } catch {
                authorMap[authorId] =
                  `User #${authorId}`;
              }
            }
          )
        );

        setCommentAuthors(
          authorMap
        );
      } catch (err) {
        setComments([]);
        setCommentAuthors({});

        setCommentError(
          getErrorMessage(
            err,
            'Failed to load comments.'
          )
        );
      } finally {
        setIsLoadingComments(false);
      }
    },
    [id, user]
  );

  /*
   * LOAD ATTACHMENTS
   */
  const loadAttachments =
    useCallback(
      async () => {
        if (!id) {
          return;
        }

        setIsLoadingAttachments(true);
        setAttachmentError('');

        try {
          const data =
            await getTicketAttachments(
              id,
              {
                skip: 0,
                limit: 20,
              }
            );

          setAttachments(
            Array.isArray(data)
              ? data
              : []
          );
        } catch (err) {
          setAttachments([]);

          setAttachmentError(
            getErrorMessage(
              err,
              'Failed to load attachments.'
            )
          );
        } finally {
          setIsLoadingAttachments(false);
        }
      },
      [id]
    );

  /*
   * INITIAL LOAD
   */
  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  useEffect(() => {
    loadAttachments();
  }, [loadAttachments]);

  /*
   * STATUS
   */
  const handleAdvanceStatus =
    async (nextStatus) => {
      if (
        !ticket ||
        updatingStatus
      ) {
        return;
      }

      setUpdatingStatus(true);

      try {
        const updated =
          await updateTicketStatus(
            ticket.id,
            nextStatus
          );

        setTicket(updated);

        toast.success(
          `Status changed to ${nextStatus}.`
        );
      } catch (err) {
        toast.error(
          getErrorMessage(
            err,
            'Failed to update ticket status.'
          )
        );
      } finally {
        setUpdatingStatus(false);
      }
    };

  /*
   * PRIORITY
   */
  const handlePriorityChange =
    async (event) => {
      if (
        !ticket ||
        updatingPriority
      ) {
        return;
      }

      const nextPriority =
        event.target.value;

      if (
        nextPriority ===
        ticket.priority
      ) {
        return;
      }

      setUpdatingPriority(true);

      try {
        const updated =
          await updateTicketPriority(
            ticket.id,
            nextPriority
          );

        setTicket(updated);

        toast.success(
          'Ticket priority updated.'
        );
      } catch (err) {
        toast.error(
          getErrorMessage(
            err,
            'Failed to update ticket priority.'
          )
        );
      } finally {
        setUpdatingPriority(false);
      }
    };

  /*
   * ASSIGNMENT
   */
  const handleAssign =
    async (picId) => {
      if (
        !ticket ||
        updatingAssignment
      ) {
        return;
      }

      if (
        Number(picId) ===
        Number(ticket.pic_id)
      ) {
        return;
      }

      setUpdatingAssignment(true);

      try {
        const updated =
          await assignTicket(
            ticket.id,
            picId
          );

        setTicket(updated);

        try {
          const staff =
            await getUserById(
              updated.pic_id
            );

          setAssigneeName(
            staff?.username ??
              staff?.name ??
              `User #${updated.pic_id}`
          );
        } catch {
          setAssigneeName(
            `User #${updated.pic_id}`
          );
        }

        toast.success(
          'Ticket assignment updated.'
        );
      } catch (err) {
        toast.error(
          getErrorMessage(
            err,
            'Failed to assign ticket.'
          )
        );
      } finally {
        setUpdatingAssignment(false);
      }
    };

  /*
   * ADD COMMENT
   */
  const handleAddComment =
    async (event) => {
      event.preventDefault();

      /*
       * PM tidak boleh membuat komentar.
       */
      if (!canComment) {
        toast.error(
          'You do not have permission to add comments.'
        );

        return;
      }

      const content =
        commentContent.trim();

      if (!content) {
        toast.error(
          'Comment cannot be empty.'
        );

        return;
      }

      if (isSubmittingComment) {
        return;
      }

      setIsSubmittingComment(true);

      try {
        /*
         * author_id TIDAK dikirim.
         *
         * Backend mengambil author
         * berdasarkan JWT user yang login.
         */
        const createdComment =
          await createComment(
            ticket.id,
            content
          );

        /*
         * Tambahkan komentar baru
         * ke daftar secara langsung.
         */
        setComments(
          (previous) => [
            ...previous,
            createdComment,
          ]
        );

        /*
         * Pastikan username current user
         * tersedia pada author map.
         */
        if (user?.id) {
          setCommentAuthors(
            (previous) => ({
              ...previous,
              [user.id]:
                user?.username ??
                user?.name ??
                `User #${user.id}`,
            })
          );
        }

        setCommentContent('');

        toast.success(
          'Comment added successfully.'
        );
      } catch (err) {
        if (err?.status === 403) {
          toast.error(
            'You do not have permission to add comments.'
          );
        } else {
          toast.error(
            getErrorMessage(
              err,
              'Failed to add comment.'
            )
          );
        }
      } finally {
        setIsSubmittingComment(false);
      }
    };

  /*
   * COMMENT AUTHOR
   */
  const getCommentAuthorName =
    (comment) => {
      const authorId =
        comment?.author_id;

      /*
       * Komentar sendiri:
       * tampilkan "You".
       */
      if (
        Number(authorId) ===
        Number(user?.id)
      ) {
        return 'You';
      }

      /*
       * Komentar user lain:
       * tampilkan username.
       */
      return (
        commentAuthors[authorId] ??
        `User #${authorId}`
      );
    };

  /*
   * DOWNLOAD ATTACHMENT
   */
  const handleDownloadAttachment =
    async (attachment) => {
      const result =
        await downloadAttachment(
          attachment.id
        );

      if (
        typeof result === 'string'
      ) {
        window.open(
          result,
          '_blank',
          'noopener,noreferrer'
        );

        return;
      }

      throw new Error(
        'Attachment download URL was not returned by the server.'
      );
    };

  /*
   * PREVIEW ATTACHMENT
   */
  const handlePreviewAttachment =
    async (attachment) => {
      const result =
        await previewAttachment(
          attachment.id
        );

      if (
        typeof result === 'string'
      ) {
        window.open(
          result,
          '_blank',
          'noopener,noreferrer'
        );

        return;
      }

      throw new Error(
        'Attachment preview URL was not returned by the server.'
      );
    };

  /*
   * LOADING
   */
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading ticket...
        </p>
      </div>
    );
  }

  /*
   * ERROR
   */
  if (error) {
    return (
      <div className="space-y-4">
        <TicketEmptyState
          message={error}
        />

        <div className="flex justify-center">
          <button
            type="button"
            onClick={loadTicket}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <TicketEmptyState
        message={
          `Ticket ${id} was not found.`
        }
      />
    );
  }

  const isDone =
    ticket.status === 'DONE';

  const canManageStatus =
    role === ROLES.PM_IT ||
    (
      role === ROLES.STAFF_IT &&
      Number(ticket.pic_id) ===
        Number(user?.id)
    );

  const canManagePriority =
    role === ROLES.PM_IT;

  const canManageAssignment =
    role === ROLES.PM_IT;

  return (
    <div className="space-y-6">
      <TicketDetailHeader
        backTo={
          BACK_ROUTE_BY_ROLE[role] ??
          ROUTES.HOME
        }
        id={ticket.ticket_number}
        title={ticket.title}
        priority={ticket.priority}
        status={ticket.status}
        createdAt={formatDate(
          ticket.created_at
        )}
      />

      <Card className="p-5">
        <TicketTimeline
          currentStage={
            ticket.status
          }
        />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          {/* DESCRIPTION */}
          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Description
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              {ticket.description ||
                'No description provided.'}
            </p>
          </Card>

          {/* ATTACHMENTS */}
          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Attachments
            </h2>

            {isLoadingAttachments && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading attachments...
              </p>
            )}

            {!isLoadingAttachments &&
              attachmentError && (
                <div className="space-y-3">
                  <p className="text-sm text-red-500">
                    {attachmentError}
                  </p>

                  <button
                    type="button"
                    onClick={
                      loadAttachments
                    }
                    className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    Retry
                  </button>
                </div>
              )}

            {!isLoadingAttachments &&
              !attachmentError &&
              attachments.length === 0 && (
                <TicketEmptyState
                  message="No attachments."
                />
              )}

            {!isLoadingAttachments &&
              !attachmentError &&
              attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map(
                    (attachment) => (
                      <AttachmentCard
                        key={
                          attachment.id
                        }
                        id={
                          attachment.id
                        }
                        name={
                          attachment.filename
                        }
                        contentType={
                          attachment.content_type
                        }
                        onDownload={() =>
                          handleDownloadAttachment(
                            attachment
                          )
                        }
                        onPreview={() =>
                          handlePreviewAttachment(
                            attachment
                          )
                        }
                      />
                    )
                  )}
                </div>
              )}
          </Card>

          {/* COMMENTS */}
          <Card className="p-5">
            <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Comments
            </h2>

            {isLoadingComments && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading comments...
              </p>
            )}

            {!isLoadingComments &&
              commentError && (
                <div className="space-y-3">
                  <p className="text-sm text-red-500">
                    {commentError}
                  </p>

                  <button
                    type="button"
                    onClick={
                      loadComments
                    }
                    className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    Retry
                  </button>
                </div>
              )}

            {!isLoadingComments &&
              !commentError &&
              comments.length === 0 && (
                <TicketEmptyState
                  message="No comments yet."
                />
              )}

            {!isLoadingComments &&
              !commentError &&
              comments.length > 0 && (
                <div className="space-y-3">
                  {comments.map(
                    (comment) => {
                      const authorName =
                        getCommentAuthorName(
                          comment
                        );

                      const isOwnComment =
                        Number(
                          comment?.author_id
                        ) ===
                        Number(user?.id);

                      return (
                        <div
                          key={
                            comment.id
                          }
                          className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {isOwnComment
                                ? 'You'
                                : authorName}
                            </p>

                            <p className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                              {formatDate(
                                comment.timestamp
                              )}
                            </p>
                          </div>

                          <p className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
                            {
                              comment.content
                            }
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

            {/* COMMENT FORM */}
            {canComment && (
              <form
                onSubmit={
                  handleAddComment
                }
                className="mt-5 space-y-3"
              >
                <textarea
                  value={
                    commentContent
                  }
                  onChange={(event) =>
                    setCommentContent(
                      event.target.value
                    )
                  }
                  disabled={
                    isSubmittingComment
                  }
                  rows={4}
                  placeholder="Write a comment..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={
                      isSubmittingComment ||
                      !commentContent.trim()
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmittingComment
                      ? 'Sending...'
                      : 'Add Comment'}
                  </button>
                </div>
              </form>
            )}

            {/* PM VIEW */}
            {!canComment && (
              <p className="mt-4 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                You can view comments,
                but you cannot add
                comments to this ticket.
              </p>
            )}
          </Card>


        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <TicketInfoCard
            title="Ticket Details"
            rows={[
              {
                label: 'Type',
                value: ticket.type,
              },
              {
                label: 'Module',
                value:
                  ticket.module || '-',
              },
              {
                label: 'Reporter',
                value: (
                  <AssigneeAvatar
                    name={
                      reporterName ||
                      `User #${ticket.reporter_id}`
                    }
                  />
                ),
              },
              {
                label: 'Assignee',
                value: (
                  <AssigneeAvatar
                    name={
                      assigneeName ||
                      '-'
                    }
                  />
                ),
              },
              {
                label: 'Created',
                value:
                  formatDate(
                    ticket.created_at
                  ),
              },
              {
                label: 'Updated',
                value:
                  formatDate(
                    ticket.updated_at
                  ),
              },
            ]}
          />

          {(canManageStatus ||
            canManagePriority ||
            canManageAssignment) && (
            <TicketActionPanel>
              {canManageStatus && (
                <StatusSelector
                  status={
                    ticket.status
                  }
                  onAdvance={
                    handleAdvanceStatus
                  }
                  disabled={isDone}
                  isUpdating={
                    updatingStatus
                  }
                />
              )}

              {canManagePriority && (
                <div>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    Priority
                  </p>

                  <Select
                    value={
                      ticket.priority
                    }
                    disabled={
                      isDone ||
                      updatingPriority
                    }
                    onChange={
                      handlePriorityChange
                    }
                  >
                    {PRIORITY_OPTIONS.map(
                      (option) => (
                        <option
                          key={
                            option.value
                          }
                          value={
                            option.value
                          }
                        >
                          {
                            option.label
                          }
                        </option>
                      )
                    )}
                  </Select>

                  {updatingPriority && (
                    <p className="mt-1 text-xs text-gray-400">
                      Updating priority...
                    </p>
                  )}
                </div>
              )}

              {canManageAssignment && (
                <AssignmentPanel
                  assigneeId={
                    ticket.pic_id
                  }
                  assigneeName={
                    assigneeName
                  }
                  onAssign={
                    handleAssign
                  }
                  disabled={isDone}
                  isUpdating={
                    updatingAssignment
                  }
                />
              )}

              {isDone && (
                <p className="rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  This ticket is DONE.
                  Workflow changes are
                  locked.
                </p>
              )}
            </TicketActionPanel>
          )}
        </div>
      </div>
    </div>
  );
}