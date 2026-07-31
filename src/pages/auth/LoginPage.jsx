import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DASHBOARD_BY_ROLE } from '../../constants/routes';

import Card from '../../components/ui/Card';
import Logo from '../../components/ui/Logo';
import Label from '../../components/ui/Label';
import Input from '../../components/ui/Input';
import PasswordInput from '../../components/ui/PasswordInput';
import Checkbox from '../../components/ui/Checkbox';
import Button from '../../components/ui/Button';
import Divider from '../../components/ui/Divider';
import ThemeToggle from '../../components/ui/ThemeToggle';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  // Role is no longer picked in the form — it comes back from the auth
  // service after it looks the credentials up in the dummy user
  // database. UI/markup below is unchanged from Stage 2 except the
  // removed role <Select>.
  const onSubmit = async ({ email, password }) => {
    setIsSubmitting(true);
    try {
      const result = await login({ email, password });
      toast.success(`Signed in as ${result.user.role}`);
      navigate(DASHBOARD_BY_ROLE[result.user.role], { replace: true });
    } catch (err) {
      toast.error(err.message ?? 'Login failed');
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
          <Logo size="md" className="mb-3" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">TicketFlow</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              icon={Mail}
              placeholder="name@company.com"
              error={errors.email}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              error={errors.password}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <Checkbox id="rememberMe" label="Remember me" {...register('rememberMe')} />
            <button
              type="button"
              onClick={() => toast.info("Forgot password isn't available yet")}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Sign In
          </Button>
        </form>

        <div className="my-6">
          <Divider label="Secure access" />
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
          WSSI Ticketing System — Internal use only
        </p>
      </Card>
    </div>
  );
}