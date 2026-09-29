import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { FormField } from './FormField';
import { inputStyles } from './fieldStyles';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
  tone?: 'light' | 'dark';
  fieldClassName?: string;
}

/** Labelled text/email/tel input. Uncontrolled by default — read values via FormData. */
export function TextField({
  label,
  hint,
  error,
  hideLabel,
  tone,
  required,
  className,
  fieldClassName,
  type = 'text',
  ...rest
}: TextFieldProps) {
  return (
    <FormField
      label={label}
      hint={hint}
      error={error}
      required={required}
      hideLabel={hideLabel}
      tone={tone}
      className={fieldClassName}
    >
      {(control) => (
        <input
          type={type}
          required={required}
          className={cn(inputStyles, className)}
          {...control}
          {...rest}
        />
      )}
    </FormField>
  );
}
