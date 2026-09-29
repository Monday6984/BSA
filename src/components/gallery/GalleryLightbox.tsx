import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { type KeyboardEvent, type MouseEvent, type ReactNode, useEffect, useRef } from 'react';
import type { GalleryItem } from '@/types/content';
import { embedUrl, metaLine } from './media';

interface GalleryLightboxProps {
  items: GalleryItem[];
  /** Open item, or null when closed */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/**
 * Full-screen viewer on the native <dialog> (as the mobile menu): focus is
 * trapped, Escape closes, the page behind is inert and can't scroll, and focus
 * returns to the tile that opened it. Arrow keys move between items.
 * The YouTube iframe only exists while its item is open, so closing (or
 * moving on) stops playback.
 */
export function GalleryLightbox({ items, index, onIndexChange, onClose }: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const item = index === null ? null : items[index];
  const open = item != null;
  const multiple = items.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      openerRef.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    }
    if (!open) {
      // Escape closes the dialog natively before this runs, so check separately
      if (dialog.open) dialog.close();
      openerRef.current?.focus();
      openerRef.current = null;
    }
  }, [open]);

  const step = (delta: number) => {
    if (index === null || !multiple) return;
    onIndexChange((index + delta + items.length) % items.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  };

  // A click on the dark area around the content (the dialog itself) closes it
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={item ? item.title : 'Gallery viewer'}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-navy/95 p-0 text-white backdrop:bg-navy/70"
    >
      {item && (
        <div className="pointer-events-none flex h-full flex-col">
          <div className="pointer-events-auto flex shrink-0 items-center justify-between px-gutter py-3 sm:py-4">
            <p className="text-sm text-on-navy-muted tabular-nums">
              {multiple && `${(index ?? 0) + 1} of ${items.length}`}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery viewer"
              data-autofocus
              className="inline-flex size-11 items-center justify-center rounded-button border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center px-gutter">
            {item.type === 'image' ? (
              <img
                key={item.id}
                src={item.image.src}
                srcSet={item.image.srcSet}
                sizes="100vw"
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                className="pointer-events-auto h-auto max-h-full w-auto max-w-full rounded-media object-contain"
              />
            ) : (
              <div
                className="pointer-events-auto aspect-video"
                // Largest 16:9 box that fits both the width and the available height
                style={{ width: 'min(100%, 64rem, calc((100dvh - 12rem) * 16 / 9))' }}
              >
                <iframe
                  key={item.id}
                  src={embedUrl(item.youtubeId)}
                  title={`YouTube video: ${item.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="size-full rounded-media bg-black"
                />
              </div>
            )}
          </div>

          <div className="pointer-events-auto flex shrink-0 items-center gap-3 px-gutter py-4 sm:gap-6 sm:py-6">
            {multiple && (
              <NavButton label="Previous item" onClick={() => step(-1)}>
                <ChevronLeft aria-hidden="true" className="size-6" />
              </NavButton>
            )}
            <div aria-live="polite" className="min-w-0 flex-1 text-center">
              <p className="eyebrow text-[0.6875rem] text-gold sm:text-eyebrow">{metaLine(item)}</p>
              <p className="mt-1 font-heading text-lg leading-snug font-bold sm:text-xl">
                {item.title}
              </p>
              {item.description && (
                <p className="mx-auto mt-1 max-w-2xl text-sm text-on-navy-muted">
                  {item.description}
                </p>
              )}
            </div>
            {multiple && (
              <NavButton label="Next item" onClick={() => step(1)}>
                <ChevronRight aria-hidden="true" className="size-6" />
              </NavButton>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
    >
      {children}
    </button>
  );
}
