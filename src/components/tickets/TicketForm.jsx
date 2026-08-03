import { useForm, Controller } from 'react-hook-form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import FormField from './FormField';
import TypeSelector from './TypeSelector';
import AttachmentUploader from './AttachmentUploader';
import FormActions from './FormActions';
import { PRIORITY_OPTIONS, CATEGORY_OPTIONS } from '../../constants/ticketOptions';

// Reusable ticket form. Takes `defaultValues` in and calls `onSubmit`
// with the validated form data out — it has no idea whether it's being
// used for Create (this stage) or a future Edit page, and no idea what
// happens to the data afterward (dummy object today, a real API call
// later). All client-side validation lives here, not in the page.
export default function TicketForm({ defaultValues, onSubmit, onCancel, isSubmitting, submitLabel }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      type: 'Bug',
      priority: 'Medium',
      category: '',
      description: '',
      attachment: null,
      ...defaultValues,
    },
  });

  const attachment = watch('attachment');

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <FormField id="title" label="Ticket Title" error={errors.title?.message}>
        <Input
          id="title"
          placeholder="e.g., Cannot access email server"
          error={errors.title}
          {...register('title', {
            required: 'Ticket title is required',
            minLength: { value: 5, message: 'Title must be at least 5 characters' },
          })}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField id="type" label="Request Type">
          <Controller
            name="type"
            control={control}
            render={({ field }) => <TypeSelector value={field.value} onChange={field.onChange} />}
          />
        </FormField>

        <FormField id="priority" label="Priority" error={errors.priority?.message}>
          <Select id="priority" {...register('priority', { required: true })}>
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField id="category" label="Affected Module / System" error={errors.category?.message}>
        <Select id="category" {...register('category', { required: 'Please select an affected system' })}>
          <option value="">Select a system...</option>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField id="description" label="Description" error={errors.description?.message}>
        <Textarea
          id="description"
          rows={5}
          placeholder="Describe the steps to reproduce, expected behavior, and actual behavior..."
          error={errors.description}
          {...register('description', {
            required: 'Description is required',
            maxLength: { value: 1000, message: 'Description must be under 1000 characters' },
          })}
        />
      </FormField>

      <FormField id="attachment" label="Attachments">
        <AttachmentUploader file={attachment} onChange={(file) => setValue('attachment', file)} />
      </FormField>

      <FormActions onCancel={onCancel} isSubmitting={isSubmitting} submitLabel={submitLabel} />
    </form>
  );
}