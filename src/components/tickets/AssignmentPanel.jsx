import { useState } from 'react';
import Select from '../ui/Select';
import Button from '../ui/Button';
import AssigneeAvatar from './AssigneeAvatar';
import { DUMMY_STAFF } from '../../data/staffListDummy';

// PM-only panel to (simulate) assign/reassign a ticket to a staff
// member from the dummy directory. Purely local state — the parent
// page decides what "assigning" means (here: a setState call).
export default function AssignmentPanel({ assignee, onAssign }) {
  const [selected, setSelected] = useState(assignee ?? '');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">Currently assigned to</span>
        <AssigneeAvatar name={assignee} />
      </div>

      <Select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="">Unassigned</option>
        {DUMMY_STAFF.map((staff) => (
          <option key={staff.value} value={staff.value}>
            {staff.label}
          </option>
        ))}
      </Select>

      <Button className="w-full" onClick={() => onAssign(selected || null)}>
        {assignee ? 'Reassign Ticket' : 'Assign Ticket'}
      </Button>
    </div>
  );
}