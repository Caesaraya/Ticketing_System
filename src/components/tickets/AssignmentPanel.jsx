import { useEffect, useState } from 'react';

import Select from '../ui/Select';
import Button from '../ui/Button';
import AssigneeAvatar from './AssigneeAvatar';

import { getStaffUsers } from '../../services/userService';

export default function AssignmentPanel({
  assigneeId,
  assigneeName,
  onAssign,
  disabled = false,
  isUpdating = false,
}) {
  const [staff, setStaff] = useState([]);
  const [selected, setSelected] =
    useState(assigneeId ?? '');
  const [isLoading, setIsLoading] =
    useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadStaff() {
      setIsLoading(true);
      setError('');

      try {
        const users = await getStaffUsers();

        if (mounted) {
          setStaff(
            Array.isArray(users)
              ? users
              : []
          );
        }
      } catch (err) {
        if (mounted) {
          setError(
            err?.message ||
              'Failed to load Staff IT.'
          );
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadStaff();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setSelected(assigneeId ?? '');
  }, [assigneeId]);

  const handleAssign = () => {
    if (!selected) {
      return;
    }

    onAssign(Number(selected));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          Currently assigned to
        </span>

        <AssigneeAvatar
          name={assigneeName}
        />
      </div>

      {isLoading ? (
        <p className="text-xs text-gray-400">
          Loading Staff IT...
        </p>
      ) : error ? (
        <p className="text-xs text-red-500">
          {error}
        </p>
      ) : (
        <>
          <Select
            value={selected}
            disabled={
              disabled ||
              isUpdating
            }
            onChange={(event) =>
              setSelected(event.target.value)
            }
          >
            <option value="">
              Select Staff IT...
            </option>

            {staff.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </Select>

          <Button
            className="w-full"
            disabled={
              disabled ||
              isUpdating ||
              !selected
            }
            isLoading={isUpdating}
            onClick={handleAssign}
          >
            {assigneeId
              ? 'Reassign Ticket'
              : 'Assign Ticket'}
          </Button>
        </>
      )}
    </div>
  );
}