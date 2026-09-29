import { type ReactNode, useId } from 'react';
import { cn } from '@/lib/cn';

export interface FieldControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
}

interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  /** Hide the label visually (still read by screen readers) */
  hideLabel?: boolean;
  tone?: 'light' | 'dark';
  className?: string;
  /** Receives the ids/aria props to spread onto the control */
  children: (control: FieldControlProps) => ReactNode;
}

/** Label + control + hint + error, wired together for assistive tech. */
export function FormField({
  label,
  hint,
  error,
  required,
  hideLabel,
  tone = 'light',
  className,
  children,
}: FormFieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  const dark = tone === 'dark';

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={id}
        className={cn(
          'text-sm font-medium',
          dark ? 'text-white' : 'text-text',
          hideLabel && 'sr-only',
        )}
      >
        {label}
        {required && (
          <span aria-hidden="true" className={dark ? 'text-gold' : 'text-gold-deep'}>
            {' '}
            *
          </span>
        )}
      </label>
      {children({
        id,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
      })}
      {hint && (
        <p id={hintId} className={cn('text-sm', dark ? 'text-on-navy-muted' : 'text-muted')}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={cn('text-sm font-medium', dark ? 'text-gold' : 'text-error')}>
          {error}
        </p>
      )}
    </div>
  );
}
