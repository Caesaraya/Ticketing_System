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

import {
  ROLES,
} from '../../constants/roles';

import {
  ROUTES,
  TICKET_LIST_BY_ROLE,
} from '../../constants/routes';

import {
  getTicketById,
  updateTicketStatus,
  assignTicket,
  updateTicketPriority,
} from '../../services/ticketService';

import {
  getUserById,
} from '../../services/userService';

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

import {
  PRIORITY_OPTIONS,
} from '../../constants/ticketOptions';


/* ============================================================
   HELPERS
============================================================ */

function formatDate(value) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

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
    return (
      error.message ||
      'Your session has expired. Please login again.'
    );
  }

  if (error?.status === 403) {
    return (
      error.message ||
      'You do not have permission to perform this action.'
    );
  }

  if (error?.status === 404) {
    return (
      error.message ||
      'The ticket or selected user was not found.'
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
      .includes(
        'unable to reach'
      )
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


/* ============================================================
   COMPONENT
============================================================ */

export default function TicketDetailPage() {
  const {
    id,
  } = useParams();

  const navigate =
    useNavigate();

  const {
    user,
    role,
  } = useAuth();


  /* ==========================================================
     STATE
  ========================================================== */

  const [
    ticket,
    setTicket,
  ] = useState(null);

  const [
    reporterName,
    setReporterName,
  ] = useState('');

  const [
    assigneeName,
    setAssigneeName,
  ] = useState('');

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState('');


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


  /* ==========================================================
     LOAD TICKET
  ========================================================== */

  const loadTicket = useCallback(
    async () => {
      if (!id) {
        setTicket(null);
        setError(
          'Ticket ID is missing.'
        );
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const data =
          await getTicketById(id);

        setTicket(data);


        /* ------------------------------------------------------
           Reporter
        ------------------------------------------------------ */

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


        /* ------------------------------------------------------
           Assignee
        ------------------------------------------------------ */

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

        setReporterName('');
        setAssigneeName('');

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


  useEffect(() => {
    loadTicket();
  }, [loadTicket]);


  /* ==========================================================
     STATUS
  ========================================================== */

  const handleAdvanceStatus =
    async (nextStatus) => {
      if (
        !ticket ||
        updatingStatus ||
        ticket.status === 'DONE'
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


  /* ==========================================================
     PRIORITY
  ========================================================== */

  const handlePriorityChange =
    async (event) => {
      if (
        !ticket ||
        updatingPriority ||
        ticket.status === 'DONE'
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


  /* ==========================================================
     ASSIGNMENT
  ========================================================== */

  const handleAssign =
    async (picId) => {
      if (
        !ticket ||
        updatingAssignment ||
        ticket.status === 'DONE'
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


        /* ------------------------------------------------------
           Reload assignee name
        ------------------------------------------------------ */

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


  /* ==========================================================
     LOADING
  ========================================================== */

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading ticket...
        </p>
      </div>
    );
  }


  /* ==========================================================
     ERROR
  ========================================================== */

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


  /* ==========================================================
     EMPTY
  ========================================================== */

  if (!ticket) {
    return (
      <TicketEmptyState
        message={
          `Ticket ${id} was not found.`
        }
      />
    );
  }


  /* ==========================================================
     PERMISSIONS
  ========================================================== */

  const isDone =
    ticket.status === 'DONE';


  /*
   * PM_IT:
   * - status
   * - priority
   * - assignment
   */

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


  /*
   * User hanya dapat melihat ticket.
   */


  /* ==========================================================
     BACK ROUTE
  ========================================================== */

  const backRoute =
    TICKET_LIST_BY_ROLE[role] ??
    ROUTES.HOME;


  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="space-y-6">

      {/* ======================================================
          HEADER
      ======================================================= */}

      <TicketDetailHeader
        backTo={backRoute}
        id={ticket.ticket_number}
        title={ticket.title}
        priority={ticket.priority}
        status={ticket.status}
        createdAt={formatDate(
          ticket.created_at
        )}
      />


      {/* ======================================================
          WORKFLOW TIMELINE
      ======================================================= */}

      <Card className="p-5">
        <TicketTimeline
          currentStage={
            ticket.status
          }
        />
      </Card>


      {/* ======================================================
          MAIN CONTENT
      ======================================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ====================================================
            LEFT
        ===================================================== */}

        <div className="space-y-6 lg:col-span-2">

          {/* --------------------------------------------------
              DESCRIPTION
          --------------------------------------------------- */}

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Description
            </h2>

            <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600 dark:text-gray-300">
              {ticket.description ||
                'No description provided.'}
            </p>
          </Card>


          {/* --------------------------------------------------
              ACTIVITY HISTORY
          --------------------------------------------------- */}

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Activity History
            </h2>

            <TicketEmptyState
              message="Ticket history will be integrated with the activity/history stage."
            />
          </Card>


          {/* --------------------------------------------------
              COMMENTS
          --------------------------------------------------- */}

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Comments
            </h2>

            <TicketEmptyState
              message="Comments will be integrated with the comment stage."
            />
          </Card>


          {/* --------------------------------------------------
              ATTACHMENTS
          --------------------------------------------------- */}

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Attachments
            </h2>

            <TicketEmptyState
              message="Attachments will be integrated with the attachment stage."
            />
          </Card>

        </div>


        {/* ====================================================
            RIGHT SIDEBAR
        ===================================================== */}

        <div className="space-y-6">

          {/* --------------------------------------------------
              TICKET INFORMATION
          --------------------------------------------------- */}

          <TicketInfoCard
            title="Ticket Details"
            rows={[
              {
                label: 'Type',
                value:
                  ticket.type,
              },

              {
                label: 'Module',
                value:
                  ticket.module ||
                  '-',
              },

              {
                label: 'Reporter',
                value: (
                  <AssigneeAvatar
                    name={
                      reporterName ||
                      (
                        ticket.reporter_id
                          ? `User #${ticket.reporter_id}`
                          : '-'
                      )
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
                      (
                        ticket.pic_id
                          ? `User #${ticket.pic_id}`
                          : 'Unassigned'
                      )
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


          {/* --------------------------------------------------
              ACTION PANEL
          --------------------------------------------------- */}

          {(
            canManageStatus ||
            canManagePriority ||
            canManageAssignment
          ) && (
            <TicketActionPanel>

              {/* ================================================
                  STATUS
              ================================================= */}

              {canManageStatus && (
                <StatusSelector
                  status={
                    ticket.status
                  }
                  onAdvance={
                    handleAdvanceStatus
                  }
                  disabled={
                    isDone ||
                    updatingStatus
                  }
                  isUpdating={
                    updatingStatus
                  }
                />
              )}


              {/* ================================================
                  PRIORITY
              ================================================= */}

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


              {/* ================================================
                  ASSIGNMENT
              ================================================= */}

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
                  disabled={
                    isDone ||
                    updatingAssignment
                  }
                  isUpdating={
                    updatingAssignment
                  }
                />
              )}


              {/* ================================================
                  DONE LOCK
              ================================================= */}

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