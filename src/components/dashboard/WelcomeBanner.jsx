export default function WelcomeBanner({ name, subtitle }) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Welcome back, {name}
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
    </div>
  );
}