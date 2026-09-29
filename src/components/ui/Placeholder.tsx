import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Development marker for sections awaiting approved content.
 * Remove each usage once real content is supplied.
 */
export function Placeholder({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        'rounded-card border border-dashed border-current/30 px-6 py-10 text-center text-sm opacity-80',
        className,
      )}
    >
      <span className="mb-2 block eyebrow">Placeholder</span>
      {children}
    </div>
  );
}
