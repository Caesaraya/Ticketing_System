import { Search } from 'lucide-react';
import Input from '../ui/Input';

// Generic list toolbar: search box + any number of filter dropdowns
// (passed in as `filters`, composed by the page using this — Stage 6
// doesn't hardcode which filters exist) + a "Clear" reset + an
// optional trailing slot (e.g. a future "Create Ticket" button).
export default function TicketToolbar({ searchValue, onSearchChange, filters, onClear, trailing }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        icon={Search}
        placeholder="Search by ID, title, or assignee..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-xs"
      />

      {filters}

      <button
        type="button"
        onClick={onClear}
        className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        Clear
      </button>

      {trailing && <div className="ml-auto">{trailing}</div>}
    </div>
  );
}