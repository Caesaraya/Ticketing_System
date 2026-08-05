import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { Mail } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '../../context/AuthContext';

import {
  ROUTES,
  DASHBOARD_BY_ROLE,
} from '../../constants/routes';

import Card from '../../components/ui/Card';
import Logo from '../../components/ui/Logo';
import Label from '../../components/ui/Label';
import Input from '../../components/ui/Input';
import PasswordInput from '../../components/ui/PasswordInput';
import Button from '../../components/ui/Button';
import Divider from '../../components/ui/Divider';
import ThemeToggle from '../../components/ui/ThemeToggle';

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    login,
  } = useAuth();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!email.trim()) {
      toast.error(
        'Email is required.'
      );

      return;
    }

    if (!password) {
      toast.error(
        'Password is required.'
      );

      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login({
        email: email.trim(),
        password,
      });

      const role =
        result?.user?.role;

      const dashboard =
        DASHBOARD_BY_ROLE[role];

      toast.success(
        'Login successful.'
      );

      navigate(
        dashboard ??
          ROUTES.HOME,
        {
          replace: true,
        }
      );
    } catch (error) {
      if (error?.status === 401) {
        toast.error(
          error?.message ||
            'Invalid email or password.'
        );
      } else if (
        error?.status === 403
      ) {
        toast.error(
          'You do not have permission to access the system.'
        );
      } else if (
        error?.status === 422
      ) {
        toast.error(
          error?.message ||
            'Please check your login information.'
        );
      } else if (
        error?.status >= 500
      ) {
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
            'Login failed. Please try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute -top-14 right-0">
        <ThemeToggle />
      </div>

      <Card className="p-8">
        <div className="mb-7 flex flex-col items-center text-center">
          <Logo
            size="md"
            className="mb-3"
          />

          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            TicketFlow
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
        >
          <div>
            <Label htmlFor="email">
              Email address
            </Label>

            <Input
              id="email"
              type="email"
              icon={Mail}
              placeholder="name@company.com"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              autoComplete="email"
            />
          </div>

          <div>
            <Label htmlFor="password">
              Password
            </Label>

            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to={ROUTES.REGISTER}
              className="font-medium text-blue-600 hover:underline"
            >
              Create an account
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