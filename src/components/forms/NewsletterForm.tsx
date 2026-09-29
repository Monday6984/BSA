import { ArrowRight } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { buttonStyles } from '@/components/ui/buttonStyles';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { submitNewsletter } from '@/lib/api';
import { cn } from '@/lib/cn';
import { FormMessage } from './FormMessage';
import { TextField } from './TextField';

interface NewsletterFormProps {
  tone?: 'light' | 'dark';
  placeholder?: string;
  submitLabel?: string;
  withArrow?: boolean;
  /** Join the input and button into one control (from sm up) */
  attached?: boolean;
  /** Small print under the field, e.g. a privacy note */
  footnote?: ReactNode;
  className?: string;
}

/**
 * Email signup. Submits through `submitNewsletter` in lib/api.ts, which throws
 * until a provider is configured — so no fake "subscribed" state is ever shown.
 */
export function NewsletterForm({
  tone = 'light',
  placeholder = 'Your email address',
  submitLabel = 'Subscribe',
  withArrow = false,
  attached = false,
  footnote,
  className,
}: NewsletterFormProps) {
  const { status, error, submit } = useFormSubmit(submitNewsletter);
  const submitting = status === 'submitting';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void submit({ email: String(data.get('email') ?? '').trim() });
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-3', className)}>
      <div className={cn('flex flex-col gap-2 sm:flex-row', attached && 'sm:gap-0')}>
        <TextField
          label="Email address"
          hideLabel
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={placeholder}
          required
          tone={tone}
          fieldClassName="flex-1"
          className={attached ? 'sm:rounded-r-none' : undefined}
        />
        <button
          type="submit"
          disabled={submitting}
          className={buttonStyles('primary', 'md', cn('shrink-0', attached && 'sm:rounded-l-none'))}
        >
          {submitting ? 'Sending…' : submitLabel}
          {withArrow && !submitting && <ArrowRight aria-hidden="true" className="size-4" />}
        </button>
      </div>
      {footnote}
      <FormMessage
        status={status}
        error={error}
        tone={tone}
        successMessage="Thank you — you're subscribed."
      />
    </form>
  );
}
