import { useAuth } from '../context/AuthContext';
import { PROFILE_DETAILS } from '../data/profileDummy';

import ProfileCard from '../components/profile/ProfileCard';
import ProfileForm from '../components/profile/ProfileForm';

// Shared across all three roles — reads the logged-in user from
// AuthContext and merges in the dummy per-account details
// (department/phone/joinedDate) keyed by the same account name used
// everywhere else in the app.
export default function ProfilePage() {
  const { user, role } = useAuth();
  const details = PROFILE_DETAILS[user?.name] ?? {};

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Profile</h1>

      <ProfileCard
        name={user?.name}
        role={role}
        department={details.department}
        email={user?.email}
        phone={details.phone}
        joinedDate={details.joinedDate}
      />

      <ProfileForm
        defaultValues={{
          name: user?.name ?? '',
          email: user?.email ?? '',
          phone: details.phone ?? '',
          department: details.department ?? '',
        }}
      />
    </div>
  );
}