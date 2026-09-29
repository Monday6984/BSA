import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  title: ReactNode;
  /** Heading level. Pages own the single h1; sections default to h2. */
  as?: 'h1' | 'h2' | 'h3';
  eyebrow?: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Show the short gold rule after the title */
  rule?: boolean;
  /** Use on navy backgrounds */
  tone?: 'light' | 'dark';
  /** Slot for a trailing link, e.g. "See all news & updates" */
  action?: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Section title with optional eyebrow, gold rule and description.
 * Wrap key words in <Highlight> to apply the gold accent.
 */
export function SectionHeading({
  title,
  as: Tag = 'h2',
  eyebrow,
  description,
  align = 'left',
  rule = true,
  tone = 'light',
  action,
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === 'center';
  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        centered && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow && (
          <p className={cn('mb-3 eyebrow', dark ? 'text-gold' : 'text-gold-deep')}>{eyebrow}</p>
        )}
        <div className={cn('flex items-center gap-4', centered && 'justify-center')}>
          <Tag id={id} className={cn(Tag === 'h1' ? 'text-h1' : 'text-h2', dark && 'text-white')}>
            {title}
          </Tag>
          {rule && <span aria-hidden="true" className="mt-2 gold-rule hidden sm:inline-block" />}
        </div>
        {description && (
          <div className={cn('mt-3 text-lead', dark ? 'text-on-navy-muted' : 'text-muted')}>
            {description}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Gold accent for key words inside headlines. Use on navy backgrounds. */
export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('text-gold', className)}>{children}</span>;
}
