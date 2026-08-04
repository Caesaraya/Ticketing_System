import { useState } from 'react';
import { toast } from 'sonner';
import Card from '../ui/Card';
import Label from '../ui/Label';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Dummy "edit profile" form: starts read-only (fields disabled), an
// Edit button unlocks them, Save just shows a success toast and locks
// them again — nothing is persisted or sent anywhere.
export default function ProfileForm({ defaultValues }) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState(defaultValues);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated');
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Edit Profile</h2>
        {!isEditing && (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="profile-name">Name</Label>
          <Input id="profile-name" value={values.name} onChange={handleChange('name')} disabled={!isEditing} />
        </div>
        <div>
          <Label htmlFor="profile-email">Email</Label>
          <Input id="profile-email" type="email" value={values.email} onChange={handleChange('email')} disabled={!isEditing} />
        </div>
        <div>
          <Label htmlFor="profile-phone">Phone</Label>
          <Input id="profile-phone" value={values.phone} onChange={handleChange('phone')} disabled={!isEditing} />
        </div>
        <div>
          <Label htmlFor="profile-department">Department</Label>
          <Input id="profile-department" value={values.department} onChange={handleChange('department')} disabled={!isEditing} />
        </div>
      </div>

      {isEditing && (
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      )}
    </Card>
  );
}