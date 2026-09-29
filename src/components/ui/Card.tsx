import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'li';
  /** light: white on white/soft sections. dark: raised panel on navy. */
  tone?: 'light' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Subtle lift on hover — for cards that contain a link */
  interactive?: boolean;
  children: ReactNode;
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  as: Tag = 'div',
  tone = 'light',
  padding = 'md',
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        'relative overflow-hidden rounded-card border',
        tone === 'light' ? 'border-border bg-white' : 'border-navy-700 bg-navy-800 text-white',
        paddings[padding],
        interactive && 'transition-shadow hover:shadow-card',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
