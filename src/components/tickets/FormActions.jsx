import Button from '../ui/Button';

// Cancel + Submit row shared by TicketForm (Create now, Edit later).
export default function FormActions({ onCancel, isSubmitting, submitLabel = 'Submit Ticket' }) {
  return (
    <div className="flex justify-end gap-3">
      <Button type="button" variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" isLoading={isSubmitting}>
        {submitLabel}
      </Button>
    </div>
  );
}