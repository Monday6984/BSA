import { Link } from 'react-router';
import { assets } from '@/lib/assets';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** Height classes for the image; width always follows the asset's own aspect ratio. */
  imgClassName?: string;
}

/**
 * The supplied BSA logo, used unaltered, linking home.
 *
 * Sized by height only (w-auto) so any replacement — e.g. a future horizontal
 * campaign lockup — keeps its proportions: update `assets.logo` and nothing else.
 * On navy backgrounds wrap it in a white plate (see Footer) — never recolour it.
 */
export function Logo({ className, imgClassName = 'h-12' }: LogoProps) {
  const { src, width, height } = assets.logo;
  return (
    <Link
      to="/"
      aria-label="Booda Sunday Adeyemo — home"
      className={cn('inline-flex shrink-0', className)}
    >
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        decoding="async"
        className={cn('w-auto max-w-none', imgClassName)}
      />
    </Link>
  );
}
