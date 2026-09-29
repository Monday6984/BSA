import { cn } from '@/lib/cn';

/** Small gold eyebrow with the leading rule, used by the About and Manifesto sections. */
export function Eyebrow({
  children,
  tone = 'light',
}: {
  children: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 eyebrow',
        tone === 'dark' ? 'text-gold' : 'text-gold-deep',
      )}
    >
      <span aria-hidden="true" className="gold-rule w-8" />
      {children}
    </p>
  );
}
