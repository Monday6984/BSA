import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow';
  children: ReactNode;
}

/** Centred content column with responsive side gutters. */
export function Container({ size = 'default', className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-gutter',
        size === 'narrow' ? 'max-w-narrow' : 'max-w-site',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
