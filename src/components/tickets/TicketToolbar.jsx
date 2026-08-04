import { Search } from 'lucide-react';

import Input from '../ui/Input';

export default function TicketToolbar({
  searchValue,
  onSearchChange,
  filters,
  onClear,
  trailing,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        icon={Search}
        placeholder="Search by ticket number or title..."
        value={searchValue}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
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

      {trailing && (
        <div className="ml-auto">
          {trailing}
        </div>
      )}
    </div>
  );
}