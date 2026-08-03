import { useState } from 'react';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

// Generic "add a note" control — a textarea plus a submit button that
// clears itself after adding. Shared by both PM's internal note and
// Staff's work note (they only differ by placeholder/button text and
// which local state list `onAdd` appends to). Display of existing
// notes reuses CommentCard rather than a note-specific card.
export default function NoteComposer({ placeholder, buttonLabel = 'Add Note', onAdd }) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue('');
  };

  return (
    <div className="space-y-2">
      <Textarea rows={3} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
      <Button variant="secondary" className="w-full" onClick={handleAdd}>
        {buttonLabel}
      </Button>
    </div>
  );
}