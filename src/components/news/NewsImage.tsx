import { Newspaper } from 'lucide-react';
import { cn } from '@/lib/cn';
import { hasImage, imageSrcSet, imageUrl } from '@/lib/sanity/image';
import type { SanityImage } from '@/types/news';

interface NewsImageProps {
  image: SanityImage | null | undefined;
  /** width / height of the rendered frame, e.g. 16 / 10 */
  aspect: number;
  /** `sizes` attribute describing the rendered width */
  sizes: string;
  /** Above-the-fold images load eagerly with high priority */
  priority?: boolean;
  className?: string;
}

/**
 * Responsive Sanity image, cropped server-side to the frame's aspect ratio
 * (honouring the editor's hotspot). Missing images render a neutral branded
 * panel instead of a broken image.
 */
export function NewsImage({ image, aspect, sizes, priority = false, className }: NewsImageProps) {
  if (!hasImage(image)) {
    return (
      <div
        aria-hidden="true"
        style={{ aspectRatio: aspect }}
        className={cn('flex items-center justify-center bg-navy text-gold/60', className)}
      >
        <Newspaper className="size-10" strokeWidth={1.25} />
      </div>
    );
  }

  return (
    <img
      src={imageUrl(image, 960, aspect)}
      srcSet={imageSrcSet(image, aspect)}
      sizes={sizes}
      alt={image.alt ?? ''}
      width={960}
      height={Math.round(960 / aspect)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ aspectRatio: aspect }}
      className={cn('w-full bg-background object-cover', className)}
    />
  );
}
