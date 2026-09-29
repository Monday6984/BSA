import type { HTMLAttributes, ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/cn';

export type SectionTone = 'white' | 'soft' | 'navy';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  spacing?: 'default' | 'compact' | 'none';
  /** Set false to control width/padding yourself */
  contained?: boolean;
  children: ReactNode;
}

const toneClasses: Record<SectionTone, string> = {
  white: 'bg-white',
  soft: 'bg-background',
  navy: 'surface-dark',
};

const spacingClasses = {
  default: 'py-section',
  compact: 'py-section-sm',
  none: '',
};

/** Page section with consistent vertical rhythm and background tone. */
export function Section({
  tone = 'white',
  spacing = 'default',
  contained = true,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn(toneClasses[tone], spacingClasses[spacing], className)} {...rest}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
