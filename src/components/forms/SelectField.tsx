import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { FormField } from './FormField';
import { inputStyles } from './fieldStyles';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
  tone?: 'light' | 'dark';
  fieldClassName?: string;
}

export function SelectField({
  label,
  options,
  placeholder,
  hint,
  error,
  tone,
  required,
  className,
  fieldClassName,
  defaultValue = placeholder ? '' : undefined,
  ...rest
}: SelectFieldProps) {
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
        <select
          required={required}
          defaultValue={defaultValue}
          className={cn(inputStyles, 'pr-10', className)}
          {...control}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FormField>
  );
}
