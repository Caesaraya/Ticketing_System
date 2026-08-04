import Card from '../ui/Card';

// Read-only identity summary at the top of the Profile page: large
// avatar + name/role, then a label/value grid for the rest. Distinct
// from tickets/AssigneeAvatar (that one's a small inline avatar+name
// used in tables/sidebars) — this is a page-level identity header.
export default function ProfileCard({ name, role, department, email, phone, joinedDate }) {
  const initials = name?.[0]?.toUpperCase() ?? '?';

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-semibold text-white">
          {initials}
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-gray-400 dark:text-gray-500">Department</dt>
          <dd className="text-sm font-medium text-gray-700 dark:text-gray-200">{department}</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-400 dark:text-gray-500">Email</dt>
          <dd className="text-sm font-medium text-gray-700 dark:text-gray-200">{email}</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-400 dark:text-gray-500">Phone</dt>
          <dd className="text-sm font-medium text-gray-700 dark:text-gray-200">{phone}</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-400 dark:text-gray-500">Joined</dt>
          <dd className="text-sm font-medium text-gray-700 dark:text-gray-200">{joinedDate}</dd>
        </div>
      </dl>
    </Card>
  );
}