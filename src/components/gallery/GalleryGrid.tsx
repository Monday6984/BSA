import { cn } from '@/lib/cn';
import type { GalleryItem } from '@/types/content';
import { GalleryCard } from './GalleryCard';

/** One large tile then four small ones, repeating; the large tile alternates sides. */
const GROUP = 5;

interface GalleryGridProps {
  items: GalleryItem[];
  onOpen: (index: number) => void;
}

/**
 * Editorial grid. Desktop: 4 columns, a 2×2 feature tile beside four small
 * tiles per group. Tablet: 2 columns, feature tiles full width. Mobile: one
 * column. Every tile has a fixed frame, so nothing shifts as images load.
 */
export function GalleryGrid({ items, onOpen }: GalleryGridProps) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-flow-dense lg:auto-rows-[12.5rem] lg:grid-cols-4 lg:gap-5 xl:auto-rows-[14rem]">
      {items.map((item, i) => {
        const large = i % GROUP === 0;
        const rightSide = Math.floor(i / GROUP) % 2 === 1;
        return (
          <li
            key={item.id}
            className={cn(
              'aspect-[4/3] lg:aspect-auto',
              large && 'md:col-span-2 md:aspect-[16/9] lg:row-span-2',
              large && rightSide && 'lg:col-start-3',
            )}
          >
            <GalleryCard
              item={item}
              onOpen={() => onOpen(i)}
              sizes={
                large
                  ? '(min-width: 64rem) 38rem, 100vw'
                  : '(min-width: 64rem) 19rem, (min-width: 48rem) 50vw, 100vw'
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
