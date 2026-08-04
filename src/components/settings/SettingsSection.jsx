import Card from '../ui/Card';

// Titled card wrapper used repeatedly on the Settings page (Theme,
// Language, Notifications, Change Password) so each section doesn't
// re-declare the same title/description/card markup.
export default function SettingsSection({ title, description, children }) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{description}</p>
        )}
      </div>
      {children}
    </Card>
  );
}