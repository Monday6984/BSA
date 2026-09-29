import { Play } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { GalleryItem } from '@/types/content';
import { metaLine, thumbnailFor } from './media';

interface GalleryCardProps {
  item: GalleryItem;
  onOpen: () => void;
  /** `sizes` attribute for the thumbnail */
  sizes: string;
  variant?: 'tile' | 'feature';
  /** Above-the-fold: load eagerly with high priority */
  priority?: boolean;
  className?: string;
}

/**
 * A photo or YouTube video as one clickable tile: image fills the frame,
 * category and title sit on a short scrim at the bottom, videos get a play
 * badge. The parent sets the frame size (aspect ratio or grid span).
 */
export function GalleryCard({
  item,
  onOpen,
  sizes,
  variant = 'tile',
  priority = false,
  className,
}: GalleryCardProps) {
  const thumb = thumbnailFor(item);
  const video = item.type === 'video';
  const feature = variant === 'feature';

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'group relative block size-full overflow-hidden rounded-card bg-navy text-left',
        className,
      )}
    >
      <img
        src={thumb.src}
        srcSet={thumb.srcSet}
        sizes={sizes}
        alt={video ? '' : thumb.alt}
        width={thumb.width}
        height={thumb.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        style={{ objectPosition: thumb.position }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/15 via-45% to-transparent transition-opacity duration-200 group-hover:opacity-90"
      />

      {video && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-1/2 left-1/2 flex -translate-1/2 items-center justify-center rounded-full bg-white/95 text-navy shadow-card transition-colors group-hover:bg-gold',
            feature ? 'size-18 sm:size-20' : 'size-14',
          )}
        >
          <Play className={cn('ml-0.5 fill-current', feature ? 'size-8' : 'size-6')} />
        </span>
      )}

      <span className={cn('absolute inset-x-0 bottom-0', feature ? 'p-5 sm:p-8' : 'p-4 sm:p-5')}>
        <span className="block eyebrow text-[0.6875rem] text-gold sm:text-eyebrow">
          {metaLine(item)}
        </span>
        <span
          className={cn(
            'mt-1.5 block font-heading leading-snug font-bold text-white',
            feature ? 'max-w-2xl text-[1.5rem] sm:text-[2rem] lg:text-[2.375rem]' : 'text-lg',
          )}
        >
          {item.title}
        </span>
        <span className="sr-only">{video ? ' (play video)' : ' (open photo)'}</span>
      </span>
    </button>
  );
}
