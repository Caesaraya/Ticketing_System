import { toast } from 'sonner';

import Card from '../ui/Card';
import Label from '../ui/Label';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ProfileForm({
  defaultValues,
}) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Edit Profile
        </h2>

        <Button
          variant="secondary"
          onClick={() => toast.info('Coming soon')}
        >
          Edit Profile
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="profile-name">
            Name
          </Label>

          <Input
            id="profile-name"
            value={defaultValues?.name ?? ''}
            disabled
            readOnly
          />
        </div>

        <div>
          <Label htmlFor="profile-email">
            Email
          </Label>

          <Input
            id="profile-email"
            type="email"
            value={defaultValues?.email ?? ''}
            disabled
            readOnly
          />
        </div>

        <div>
          <Label htmlFor="profile-phone">
            Phone
          </Label>

          <Input
            id="profile-phone"
            value={defaultValues?.phone ?? ''}
            disabled
            readOnly
          />
        </div>

        <div>
          <Label htmlFor="profile-department">
            Department
          </Label>

          <Input
            id="profile-department"
            value={defaultValues?.department ?? ''}
            disabled
            readOnly
          />
        </div>
      </div>
    </Card>
  );
}