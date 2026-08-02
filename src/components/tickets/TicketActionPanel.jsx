import { toast } from 'sonner';
import Card from '../ui/Card';
import Button from '../ui/Button';

// Role-specific placeholder action buttons for Ticket Detail (PM:
// Assign/Change Priority/Change Status; Staff: Start Progress/Mark
// Waiting/Mark Completed; User: none — the panel doesn't render at
// all). Every button just fires a "Coming soon" toast — no business
// logic exists yet.
export default function TicketActionPanel({ actions }) {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <Card className="p-5">
      <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</h2>
      <div className="flex flex-col gap-2">
        {actions.map((label) => (
          <Button key={label} variant="secondary" onClick={() => toast.info('Coming soon')}>
            {label}
          </Button>
        ))}
      </div>
    </Card>
  );
}