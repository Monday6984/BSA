import { buttonStyles } from '@/components/ui/buttonStyles';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { submitJoinMovement } from '@/lib/api';
import { FormMessage } from './FormMessage';
import { type SelectOption, SelectField } from './SelectField';
import { TextAreaField } from './TextAreaField';
import { TextField } from './TextField';
import { type FieldErrors, field, isEmail, useFieldErrors } from './validation';

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const email = field(data, 'email');

  if (!field(data, 'fullName')) errors.fullName = 'Please enter your full name.';
  if (!email) errors.email = 'Please enter your email address.';
  else if (!isEmail(email))
    errors.email = 'Please enter a valid email address, e.g. name@example.com.';
  if (!field(data, 'role')) errors.role = 'Please choose how you’d like to help.';
  return errors;
}

interface VolunteerFormProps {
  roles: SelectOption[];
  submitLabel: string;
  successMessage: string;
}

/**
 * Volunteer sign-up. Submits through `submitJoinMovement` in lib/api.ts, which
 * throws until a backend is configured — so no fake success is ever shown.
 */
export function VolunteerForm({ roles, submitLabel, successMessage }: VolunteerFormProps) {
  const { status, error, submit } = useFormSubmit(submitJoinMovement);
  const { errors, handleSubmit, clearOnChange } = useFieldErrors(validate);
  const submitting = status === 'submitting';

  const onSubmit = handleSubmit(async (data, form) => {
    const message = field(data, 'message');
    const ok = await submit({
      fullName: field(data, 'fullName'),
      email: field(data, 'email'),
      role: field(data, 'role'),
      ...(message && { message }),
    });
    if (ok) form.reset();
  });

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onChange={clearOnChange}
      aria-busy={submitting}
      className="flex flex-1 flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Full name"
          name="fullName"
          autoComplete="name"
          required
          error={errors.fullName}
        />
        <TextField
          label="Email address"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          error={errors.email}
        />
      </div>
      <SelectField
        label="How would you like to help?"
        name="role"
        options={roles}
        placeholder="Choose an option"
        required
        error={errors.role}
      />
      <TextAreaField
        label="Anything else we should know? (optional)"
        name="message"
        rows={5}
        error={errors.message}
      />
      <div className="mt-auto flex flex-col gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className={buttonStyles('primary', 'md', 'self-start')}
        >
          {submitting ? 'Sending…' : submitLabel}
        </button>
        <FormMessage status={status} error={error} successMessage={successMessage} />
      </div>
    </form>
  );
}
