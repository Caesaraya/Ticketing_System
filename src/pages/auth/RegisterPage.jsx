import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Shield } from 'lucide-react';
import { toast } from 'sonner';

import { register } from '../../services/authService';
import { ROUTES } from '../../constants/routes';

import Card from '../../components/ui/Card';
import Logo from '../../components/ui/Logo';
import Label from '../../components/ui/Label';
import Input from '../../components/ui/Input';
import PasswordInput from '../../components/ui/PasswordInput';
import Button from '../../components/ui/Button';
import Divider from '../../components/ui/Divider';
import ThemeToggle from '../../components/ui/ThemeToggle';

const ROLE_OPTIONS = [
  {
    value: 'USER',
    label: 'User',
  },
  {
    value: 'PM_IT',
    label: 'PM IT',
  },
  {
    value: 'STAFF_IT',
    label: 'Staff IT',
  },
];

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!form.name.trim()) {
      toast.error('Name is required.');
      return;
    }

    if (!form.email.trim()) {
      toast.error('Email is required.');
      return;
    }

    if (!form.password) {
      toast.error('Password is required.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (!form.role) {
      toast.error('Please select a role.');
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });

      toast.success(
        'Account created successfully. Please sign in.'
      );

      navigate(ROUTES.LOGIN, {
        replace: true,
      });
    } catch (error) {
      if (error?.status === 400) {
        toast.error(
          error?.message ||
            'Unable to create the account.'
        );
      } else if (error?.status === 409) {
        toast.error(
          error?.message ||
            'This email is already registered.'
        );
      } else if (error?.status === 422) {
        toast.error(
          error?.message ||
            'Please check your registration information.'
        );
      } else if (error?.status >= 500) {
        toast.error(
          'The server is currently unavailable. Please try again later.'
        );
      } else if (
        error?.message
          ?.toLowerCase()
          .includes('unable to reach')
      ) {
        toast.error(
          'Unable to connect to the Ticketing System backend.'
        );
      } else {
        toast.error(
          error?.message ||
            'Registration failed. Please try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

return (
  <div className="relative w-full max-w-sm px-0">
    <div className="absolute -top-12 right-0 sm:-top-14">
      <ThemeToggle />
    </div>

    <Card className="p-5 sm:p-8">
        <div className="mb-7 flex flex-col items-center text-center">
          <Logo
            size="md"
            className="mb-3"
          />

          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Create Account
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Register your TicketFlow account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
        >
          <div>
            <Label htmlFor="name">
              Name
            </Label>

            <Input
              id="name"
              name="name"
              type="text"
              icon={User}
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

          <div>
            <Label htmlFor="email">
              Email address
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              icon={Mail}
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div>
            <Label htmlFor="role">
              Role
            </Label>

            <div className="relative">
              <Shield
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400"
              />

              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pl-10 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              >
                {ROLE_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="password">
              Password
            </Label>

            <PasswordInput
              id="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">
              Confirm Password
            </Label>

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="my-6">
          <Divider label="TicketFlow" />
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
          WSSI Ticketing System — Internal use only
        </p>
      </Card>
    </div>
  );
}