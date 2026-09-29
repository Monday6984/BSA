import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type BadgeTone = 'gold' | 'green' | 'navy' | 'neutral';

const tones: Record<BadgeTone, string> = {
  gold: 'bg-gold-soft text-gold-deep',
  green: 'bg-green-soft text-green-deep',
  navy: 'bg-navy text-white',
  neutral: 'bg-background text-muted',
};

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

/** Small category/status tag. Text carries the meaning; colour only supports it. */
export function Badge({ tone = 'gold', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2.5 py-1 text-xs leading-none font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
