import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'outline-light' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  primary: 'rounded-button bg-gold text-navy hover:bg-gold-hover',
  secondary: 'rounded-button bg-navy text-white hover:bg-navy-800',
  outline: 'rounded-button border border-navy text-navy hover:bg-navy hover:text-white',
  'outline-light':
    'rounded-button border border-white/70 text-white hover:bg-white hover:text-navy',
  text: 'text-navy underline-offset-4 hover:text-gold-deep hover:underline',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-12 px-6 text-[0.9375rem]',
  lg: 'min-h-14 px-7 text-base',
};

export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
) {
  return cn(base, variants[variant], variant !== 'text' && sizes[size], className);
}
