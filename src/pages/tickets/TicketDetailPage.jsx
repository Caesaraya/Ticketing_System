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
  getAttachments,
} from '../../services/attachmentService';

import {
  downloadAttachmentFile,
  previewAttachment,
} from '../../utils/attachmentUtills';

import Card from '../../components/ui/Card';
import Select from '../../components/ui/Select';

import TicketDetailHeader from '../../components/tickets/TicketDetailHeader';
import TicketTimeline from '../../components/tickets/TicketTimeline';
import TicketInfoCard from '../../components/tickets/TicketInfoCard';
import TicketEmptyState from '../../components/tickets/TicketEmptyState';
import TicketActionPanel from '../../components/tickets/TicketActionPanel';
import StatusSelector from '../../components/tickets/StatusSelector';
import AssignmentPanel from '../../components/tickets/AssignmentPanel';
import AssigneeAvatar from '../../components/tickets/AssigneeAvatar';

import AttachmentCard from '../../components/tickets/AttachmentCard';

import {
  PRIORITY_OPTIONS,
} from '../../constants/ticketOptions';

const BACK_ROUTE_BY_ROLE = {
  [ROLES.USER]: ROUTES.USER_TICKETS,
  [ROLES.PM_IT]: ROUTES.PM_TICKETS,
  [ROLES.STAFF_IT]: ROUTES.STAFF_TICKETS,
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

  if (error?.status === 403) {
    return 'You do not have permission to perform this action.';
  }

  if (error?.status === 404) {
    return 'The ticket or selected user was not found.';
  }

  if (error?.status === 422) {
    return (
      error.message ||
      'The submitted data is invalid.'
    );
  }

  if (error?.status >= 500) {
    return 'The server encountered an error. Please try again later.';
  }

  if (
    error?.message
      ?.toLowerCase()
      .includes('unable to reach')
  ) {
    return 'Unable to connect to the Ticketing System backend.';
  }

  return error?.message || fallback;
}

export default function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, role } = useAuth();

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
   * Attachment state
   */
  const [
    attachments,
    setAttachments,
  ] = useState([]);

  const [
    isAttachmentsLoading,
    setIsAttachmentsLoading,
  ] = useState(true);

  const [
    attachmentsError,
    setAttachmentsError,
  ] = useState('');

  /*
   * Load ticket
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
         * Load reporter information
         */
        if (data?.reporter_id) {
          try {
            const reporter =
              await getUserById(
                data.reporter_id
              );

            setReporterName(
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
         * Load assignee information
         */
        if (data?.pic_id) {
          try {
            const assignee =
              await getUserById(
                data.pic_id
              );

            setAssigneeName(
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
   * Load attachments
   */
  const loadAttachments =
    useCallback(async () => {
      if (!id) {
        return;
      }

      setIsAttachmentsLoading(true);
      setAttachmentsError('');

      try {
        const response =
          await getAttachments(id, {
            skip: 0,
            limit: 20,
          });

        setAttachments(
          Array.isArray(response)
            ? response
            : []
        );
      } catch (err) {
        setAttachments([]);

        if (err?.status === 403) {
          setAttachmentsError(
            'You do not have permission to view these attachments.'
          );
        } else if (
          err?.status === 404
        ) {
          setAttachmentsError(
            'Attachments were not found.'
          );
        } else {
          setAttachmentsError(
            getErrorMessage(
              err,
              'Failed to load attachments.'
            )
          );
        }
      } finally {
        setIsAttachmentsLoading(false);
      }
    }, [id]);

  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  useEffect(() => {
    loadAttachments();
  }, [loadAttachments]);

  /*
   * Status
   */
  const handleAdvanceStatus =
    async (nextStatus) => {
      if (!ticket || updatingStatus) {
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
   * Priority
   */
  const handlePriorityChange =
    async (event) => {
      if (!ticket || updatingPriority) {
        return;
      }

      const nextPriority =
        event.target.value;

      if (
        nextPriority === ticket.priority
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
   * Assignment
   */
  const handleAssign = async (picId) => {
    if (!ticket || updatingAssignment) {
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

      if (updated?.pic_id) {
        try {
          const staff =
            await getUserById(
              updated.pic_id
            );

          setAssigneeName(
            staff?.name ??
              `User #${updated.pic_id}`
          );
        } catch {
          setAssigneeName(
            `User #${updated.pic_id}`
          );
        }
      } else {
        setAssigneeName('');
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
   * Loading ticket
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
   * Ticket error
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
        message={`Ticket ${id} was not found.`}
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
          currentStage={ticket.status}
        />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">

          {/* Description */}
          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Description
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              {ticket.description ||
                'No description provided.'}
            </p>
          </Card>

          {/* Attachments */}
          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Attachments ({attachments.length})
            </h2>

            {isAttachmentsLoading ? (
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Loading attachments...
              </p>
            ) : attachmentsError ? (
              <div className="space-y-2">
                <p className="text-sm text-red-500">
                  {attachmentsError}
                </p>

                <button
                  type="button"
                  onClick={loadAttachments}
                  className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Retry
                </button>
              </div>
            ) : attachments.length === 0 ? (
              <TicketEmptyState
                message="No attachments."
              />
            ) : (
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
                      size={
                        attachment.content_type ||
                        'Attachment'
                      }
                      onDownload={() =>
                        downloadAttachmentFile(
                          attachment
                        )
                      }
                      onPreview={() =>
                        previewAttachment(
                          attachment
                        )
                      }
                    />
                  )
                )}
              </div>
            )}
          </Card>

          {/* Activity History */}
          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Activity History
            </h2>

            <TicketEmptyState
              message="Ticket history will be integrated with the activity/history stage."
            />
          </Card>
        </div>

        <div className="space-y-6">

          {/* Ticket information */}
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
                      'Unassigned'
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

          {/* Ticket actions */}
          {(canManageStatus ||
            canManagePriority ||
            canManageAssignment) && (
            <TicketActionPanel>

              {canManageStatus && (
                <StatusSelector
                  status={ticket.status}
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
                          {option.label}
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
                  This ticket is DONE. Workflow changes are locked.
                </p>
              )}
            </TicketActionPanel>
          )}
        </div>
      </div>
    </div>
  );
}