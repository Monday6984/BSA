import { CircleAlert, CircleCheck } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { FormStatus } from '@/types/forms';

interface FormMessageProps {
  status: FormStatus;
  successMessage: string;
  error?: string | null;
  tone?: 'light' | 'dark';
  className?: string;
}

/** Announces the result of a submission. Uses icon + text, not colour alone. */
export function FormMessage({
  status,
  successMessage,
  error,
  tone = 'light',
  className,
}: FormMessageProps) {
  const dark = tone === 'dark';

  return (
    <div aria-live="polite" className={className}>
      {status === 'success' && (
        <p
          className={cn('flex items-start gap-2 text-sm', dark ? 'text-white' : 'text-green-deep')}
        >
          <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-green" />
          {successMessage}
        </p>
      )}
      {status === 'error' && error && (
        <p
          role="alert"
          className={cn('flex items-start gap-2 text-sm', dark ? 'text-white' : 'text-error')}
        >
          <CircleAlert
            aria-hidden="true"
            className={cn('mt-0.5 size-4 shrink-0', dark ? 'text-gold' : 'text-error')}
          />
          {error}
        </p>
      )}
    </div>
  );
}
