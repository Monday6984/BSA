import { type FormEvent, useCallback, useState } from 'react';

export type FieldErrors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isEmail = (value: string) => EMAIL.test(value);

/** Accepts local (0803…) and international (+234…) formats: 7–15 digits. */
export const isPhone = (value: string) => {
  const digits = value.replace(/[\s()-]/g, '').replace(/^\+/, '');
  return /^\d{7,15}$/.test(digits);
};

/** Reads a FormData field as a trimmed string. */
export const field = (data: FormData, name: string) => String(data.get(name) ?? '').trim();

/**
 * Client-side validation for an uncontrolled form (native validation is off
 * via noValidate so messages stay consistent). On submit it runs `validate`,
 * focuses the first invalid field, and only calls `onValid` when clean.
 * Errors clear per field as the user edits it.
 */
export function useFieldErrors(validate: (data: FormData) => FieldErrors) {
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = useCallback(
    (onValid: (data: FormData, form: HTMLFormElement) => void) =>
      (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const next = validate(data);
        setErrors(next);

        const first = Object.keys(next)[0];
        if (first) {
          const control = form.elements.namedItem(first);
          if (control instanceof HTMLElement) control.focus();
          return;
        }
        onValid(data, form);
      },
    [validate],
  );

  /** Attach to the form's onChange: clears the error of the field being edited. */
  const clearOnChange = useCallback((event: FormEvent<HTMLFormElement>) => {
    const name = (event.target as HTMLInputElement).name;
    if (!name) return;
    setErrors((current) => {
      if (!(name in current)) return current;
      const rest = { ...current };
      delete rest[name];
      return rest;
    });
  }, []);

  return { errors, handleSubmit, clearOnChange };
}
