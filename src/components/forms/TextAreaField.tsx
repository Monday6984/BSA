import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { FormField } from './FormField';
import { inputStyles } from './fieldStyles';

interface TextAreaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  tone?: 'light' | 'dark';
  fieldClassName?: string;
}

export function TextAreaField({
  label,
  hint,
  error,
  tone,
  required,
  className,
  fieldClassName,
  rows = 5,
  ...rest
}: TextAreaFieldProps) {
  return (
    <FormField
      label={label}
      hint={hint}
      error={error}
      required={required}
      tone={tone}
      className={fieldClassName}
    >
      {(control) => (
        <textarea
          rows={rows}
          required={required}
          className={cn(inputStyles, 'py-3', className)}
          {...control}
          {...rest}
        />
      )}
    </FormField>
  );
}
