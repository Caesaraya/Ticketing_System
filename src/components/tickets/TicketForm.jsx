import { useForm, Controller } from 'react-hook-form';

import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';

import FormField from './FormField';
import TypeSelector from './TypeSelector';
import FormActions from './FormActions';

import {
  PRIORITY_OPTIONS,
  CATEGORY_OPTIONS,
} from '../../constants/ticketOptions';

export default function TicketForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      type: 'BUG',
      priority: 'MEDIUM',
      module: '',
      description: '',
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >
      <FormField
        id="title"
        label="Ticket Title"
        error={errors.title?.message}
      >
        <Input
          id="title"
          placeholder="e.g., Cannot access email server"
          error={errors.title}
          disabled={isSubmitting}
          {...register('title', {
            required: 'Ticket title is required',
            minLength: {
              value: 5,
              message:
                'Title must be at least 5 characters',
            },
          })}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          id="type"
          label="Request Type"
          error={errors.type?.message}
        >
          <Controller
            name="type"
            control={control}
            rules={{
              required: 'Request type is required',
            }}
            render={({ field }) => (
              <TypeSelector
                value={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
              />
            )}
          />
        </FormField>

        <FormField
          id="priority"
          label="Priority"
          error={errors.priority?.message}
        >
          <Select
            id="priority"
            disabled={isSubmitting}
            {...register('priority', {
              required: 'Priority is required',
            })}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField
        id="module"
        label="Affected Module / System"
        error={errors.module?.message}
      >
        <Select
          id="module"
          disabled={isSubmitting}
          {...register('module', {
            required:
              'Please select an affected system',
          })}
        >
          <option value="">
            Select a system...
          </option>

          {CATEGORY_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        id="description"
        label="Description"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          rows={5}
          placeholder="Describe the steps to reproduce, expected behavior, and actual behavior..."
          error={errors.description}
          disabled={isSubmitting}
          {...register('description', {
            required: 'Description is required',
            maxLength: {
              value: 1000,
              message:
                'Description must be under 1000 characters',
            },
          })}
        />
      </FormField>

      <FormActions
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitLabel={submitLabel}
      />
    </form>
  );
}