import { useState } from 'react';
import { toast } from 'sonner';
import Label from '../ui/Label';
import PasswordInput from '../ui/PasswordInput';
import Button from '../ui/Button';

// UI-only Change Password form. Validates on submit (required fields,
// minimum length, new !== current, confirm must match) and just shows
// a success toast — no backend call, no real password is changed.
export default function PasswordForm() {
  const [values, setValues] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!values.current) nextErrors.current = 'Current password is required';
    if (!values.next) {
      nextErrors.next = 'New password is required';
    } else if (values.next.length < 8) {
      nextErrors.next = 'New password must be at least 8 characters';
    } else if (values.next === values.current) {
      nextErrors.next = 'New password must be different from the current one';
    }
    if (!values.confirm) {
      nextErrors.confirm = 'Please confirm the new password';
    } else if (values.confirm !== values.next) {
      nextErrors.confirm = 'Passwords do not match';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    toast.success('Password updated');
    setValues({ current: '', next: '', confirm: '' });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <Label htmlFor="current-password">Current Password</Label>
        <PasswordInput
          id="current-password"
          value={values.current}
          onChange={handleChange('current')}
          error={errors.current}
        />
        {errors.current && <p className="mt-1 text-xs text-red-500">{errors.current}</p>}
      </div>

      <div>
        <Label htmlFor="new-password">New Password</Label>
        <PasswordInput
          id="new-password"
          value={values.next}
          onChange={handleChange('next')}
          error={errors.next}
        />
        {errors.next && <p className="mt-1 text-xs text-red-500">{errors.next}</p>}
      </div>

      <div>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <PasswordInput
          id="confirm-password"
          value={values.confirm}
          onChange={handleChange('confirm')}
          error={errors.confirm}
        />
        {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>}
      </div>

      <Button type="submit">Update Password</Button>
    </form>
  );
}