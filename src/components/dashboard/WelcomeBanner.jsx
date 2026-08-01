// Page-level heading at the top of every role dashboard. `title`, when
// given, overrides the default "Welcome back, {name}" greeting — used
// by dashboards (PM, Staff) whose Stitch design shows a plain page
// title ("Dashboard") instead of a personal greeting. User Dashboard's
// existing usage (name + subtitle, no title) is unaffected.
export default function WelcomeBanner({ name, subtitle, title }) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {title ?? `Welcome back, ${name}`}
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
    </div>
  );
}