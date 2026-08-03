import Label from '../ui/Label';

// Generic label + control + error/hint wrapper. Works for any control
// (Input, Select, Textarea, TypeSelector) instead of a separate
// FormInput/FormSelect/FormTextarea per field type.
export default function FormField({ id, label, error, hint, children }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {!error && hint && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  );
}