import { Play } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import type { GalleryItem } from '@/types/content';
import { metaLine, thumbnailFor } from './media';

interface FromTheCampaignProps {
  heading: string;
  items: GalleryItem[];
  onOpen: (index: number) => void;
}

/** Lighter strip of three small horizontal cards: thumbnail, category, title. */
export function FromTheCampaign({ heading, items, onOpen }: FromTheCampaignProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="from-campaign-heading" className="bg-background py-14 lg:py-16">
      <Container>
        <span aria-hidden="true" className="gold-rule block w-12" />
        <h2 id="from-campaign-heading" className="mt-5 text-[1.75rem] leading-tight sm:text-[2rem]">
          {heading}
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
          {items.map((item, i) => {
            const thumb = thumbnailFor(item);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onOpen(i)}
                  className="group flex w-full items-center gap-4 rounded-card border border-border bg-white p-3 text-left transition-colors hover:border-navy/30"
                >
                  <span className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-button bg-navy sm:w-32">
                    <img
                      src={thumb.src}
                      srcSet={thumb.srcSet}
                      sizes="8rem"
                      alt={item.type === 'image' ? thumb.alt : ''}
                      width={thumb.width}
                      height={thumb.height}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      style={{ objectPosition: thumb.position }}
                    />
                    {item.type === 'video' && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 m-auto flex size-9 items-center justify-center rounded-full bg-white/95 text-navy"
                      >
                        <Play className="ml-0.5 size-4 fill-current" />
                      </span>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block eyebrow text-[0.6875rem] text-gold-deep">
                      {metaLine(item)}
                    </span>
                    <span className="mt-1 block leading-snug font-semibold text-navy">
                      {item.title}
                    </span>
                    <span className="sr-only">
                      {item.type === 'video' ? ' (play video)' : ' (open photo)'}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
