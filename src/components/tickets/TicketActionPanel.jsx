import Card from '../ui/Card';

// Generic titled actions card. Stage 8 had this render a flat list of
// placeholder buttons ("actions: string[]", every click a toast).
// Stage 10 replaces those with real (local-state) controls —
// StatusSelector, AssignmentPanel, NoteComposer — so the panel itself
// becomes a plain container: whatever is passed as `children` is what
// shows up. Renders nothing if there's nothing to show (User's view).
export default function TicketActionPanel({ title = 'Actions', children }) {
  if (!children) {
    return null;
  }

  return (
    <Card className="p-5">
      <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="flex flex-col gap-5">{children}</div>
    </Card>
  );
}