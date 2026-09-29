import { useCallback, useState } from 'react';
import type { FormStatus } from '@/types/forms';

/**
 * Tracks submission status for any form. Pass the API function from lib/api.
 * `submit` resolves to true on success, so callers can e.g. reset the form.
 */
export function useFormSubmit<T>(submitFn: (data: T) => Promise<void>) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (data: T): Promise<boolean> => {
      setStatus('submitting');
      setError(null);
      try {
        await submitFn(data);
        setStatus('success');
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        setStatus('error');
        return false;
      }
    },
    [submitFn],
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  return { status, error, submit, reset };
}
