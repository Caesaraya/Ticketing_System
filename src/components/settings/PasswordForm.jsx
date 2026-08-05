import { toast } from 'sonner';

import Label from '../ui/Label';
import PasswordInput from '../ui/PasswordInput';
import Button from '../ui/Button';

export default function PasswordForm() {
  const handleComingSoon = (e) => {
    e.preventDefault();

    toast.info('Coming soon');
  };

  return (
    <form
      onSubmit={handleComingSoon}
      noValidate
      className="space-y-4"
    >
      <div>
        <Label htmlFor="current-password">
          Current Password
        </Label>

        <PasswordInput
          id="current-password"
          disabled
        />
      </div>

      <div>
        <Label htmlFor="new-password">
          New Password
        </Label>

        <PasswordInput
          id="new-password"
          disabled
        />
      </div>

      <div>
        <Label htmlFor="confirm-password">
          Confirm Password
        </Label>

        <PasswordInput
          id="confirm-password"
          disabled
        />
      </div>

      <Button type="submit">
        Update Password
      </Button>
    </form>
  );
}