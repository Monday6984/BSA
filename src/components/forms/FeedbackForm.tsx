import { buttonStyles } from '@/components/ui/buttonStyles';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { submitContact } from '@/lib/api';
import { FormMessage } from './FormMessage';
import { TextAreaField } from './TextAreaField';
import { TextField } from './TextField';
import { type FieldErrors, field, isEmail, isPhone, useFieldErrors } from './validation';

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const email = field(data, 'email');
  const phone = field(data, 'phone');

  if (!field(data, 'name')) errors.name = 'Please enter your full name.';
  if (!email) errors.email = 'Please enter your email address.';
  else if (!isEmail(email))
    errors.email = 'Please enter a valid email address, e.g. name@example.com.';
  if (phone && !isPhone(phone))
    errors.phone = 'Please enter a valid phone number, e.g. 08031234567.';
  if (!field(data, 'subject')) errors.subject = 'Please enter a subject.';
  if (!field(data, 'message')) errors.message = 'Please write your message.';
  return errors;
}

interface FeedbackFormProps {
  submitLabel: string;
  successMessage: string;
}

/**
 * Constituency feedback. Submits through `submitContact` in lib/api.ts, which
 * throws until a backend is configured — so no fake success is ever shown.
 */
export function FeedbackForm({ submitLabel, successMessage }: FeedbackFormProps) {
  const { status, error, submit } = useFormSubmit(submitContact);
  const { errors, handleSubmit, clearOnChange } = useFieldErrors(validate);
  const submitting = status === 'submitting';

  const onSubmit = handleSubmit(async (data, form) => {
    const phone = field(data, 'phone');
    const ok = await submit({
      name: field(data, 'name'),
      email: field(data, 'email'),
      ...(phone && { phone }),
      subject: field(data, 'subject'),
      message: field(data, 'message'),
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
        <TextField label="Full name" name="name" autoComplete="name" required error={errors.name} />
        <TextField
          label="Email address"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          error={errors.email}
        />
        <TextField
          label="Phone number (optional)"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0803xxxxxxx"
          error={errors.phone}
        />
        <TextField label="Subject" name="subject" required error={errors.subject} />
      </div>
      <TextAreaField label="Your message" name="message" rows={5} required error={errors.message} />
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
