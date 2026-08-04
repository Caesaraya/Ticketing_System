import { useState } from 'react';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';

import SettingsSection from '../components/settings/SettingsSection';
import PasswordForm from '../components/settings/PasswordForm';
import ThemeToggle from '../components/ui/ThemeToggle';
import Select from '../components/ui/Select';
import Checkbox from '../components/ui/Checkbox';

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'id', label: 'Bahasa Indonesia' },
];

// Shared across all three roles. Theme reuses the existing
// ThemeContext (no new theme logic); Language and Notification
// preference are UI-only (no i18n engine, no real notification
// delivery settings) and reset on refresh, same as everything else in
// this stage.
export default function SettingsPage() {
  const { theme } = useTheme();
  const [language, setLanguage] = useState('en');
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    toast.info('Language preference saved (UI only)');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Account Settings</h1>

      <SettingsSection title="Theme" description="Choose how the app looks on this device.">
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Currently using {theme === 'dark' ? 'Dark' : 'Light'} mode
          </span>
        </div>
      </SettingsSection>

      <SettingsSection title="Language" description="UI only — no translations are applied yet.">
        <Select value={language} onChange={handleLanguageChange} className="max-w-xs">
          {LANGUAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </SettingsSection>

      <SettingsSection title="Notification Preference" description="UI only — no delivery settings are sent anywhere.">
        <Checkbox
          id="email-notifications"
          label="Email me about ticket updates"
          checked={emailNotifications}
          onChange={(e) => setEmailNotifications(e.target.checked)}
        />
      </SettingsSection>

      <SettingsSection title="Change Password" description="UI only — no password is actually changed.">
        <PasswordForm />
      </SettingsSection>
    </div>
  );
}