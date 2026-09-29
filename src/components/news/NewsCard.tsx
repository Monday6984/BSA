import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';
import type { NewsExcerpt } from '@/types/news';
import { NewsImage } from './NewsImage';
import { NewsMeta } from './NewsMeta';

export type NewsCardVariant = 'featured' | 'compact' | 'grid';

interface NewsCardProps {
  article: NewsExcerpt;
  variant?: NewsCardVariant;
  /** Heading level for the title — h3 inside a section, h2 on the listing page */
  headingLevel?: 'h2' | 'h3';
  priority?: boolean;
}

interface Layout {
  root: string;
  media: string;
  image?: string;
  body: string;
  title: string;
  aspect: number;
  /** Different crop for the stacked (below sm) layout */
  mobileAspect?: number;
  sizes: string;
  clamp: string;
  read: { label: string; className: string; arrow?: string };
  meta: { tone: 'gold' | 'green'; caps: boolean };
}

/** Shared white card shell (homepage + listing). */
const cardShell = 'overflow-hidden rounded-card border border-border bg-white';

const imageMotion = 'transition-transform duration-500 motion-safe:group-hover:scale-[1.03]';

/** Gold text link used on homepage cards (accessible gold on white). */
const goldRead = 'inline-flex items-center gap-2 self-start font-semibold text-gold-deep';

const layouts: Record<NewsCardVariant, Layout> = {
  // Homepage lead story: natural height; wide, short image on top, content below.
  featured: {
    root: cn(cardShell, 'flex flex-col'),
    media: 'overflow-hidden',
    body: 'flex flex-col p-6 sm:p-8',
    // 23px mobile · 26px tablet · 29px desktop
    title: 'text-[1.4375rem] leading-[1.15] sm:text-[1.625rem] lg:text-[1.8125rem]',
    // ~242px tall at 1440; a taller 16:9 crop when stacked on phones
    aspect: 2.65,
    mobileAspect: 16 / 9,
    sizes: '(min-width: 64rem) 40rem, 100vw',
    clamp: 'line-clamp-3 text-base sm:text-[1.0625rem]',
    read: {
      label: 'Read full update',
      className: cn(goldRead, 'mt-7 sm:mt-8 sm:text-[1.0625rem]'),
    },
    meta: { tone: 'gold', caps: true },
  },
  // Homepage secondary story: compact square image beside the text, at every width.
  compact: {
    root: cn(cardShell, 'flex items-start gap-4 p-4 sm:gap-5 sm:p-5'),
    // 96px phones · 160px tablets · 144px small laptops · 180px desktop
    media: 'w-24 shrink-0 overflow-hidden rounded-media sm:w-40 lg:w-36 xl:w-[11.25rem]',
    body: 'flex min-w-0 flex-1 flex-col',
    // 18px mobile · 20px tablet · 21px desktop
    title: 'text-lg leading-[1.18] sm:text-xl lg:text-[1.3125rem]',
    aspect: 1,
    sizes: '(min-width: 80rem) 180px, (min-width: 40rem) 160px, 96px',
    clamp: 'line-clamp-2 sm:line-clamp-3',
    read: { label: 'Read update', className: cn(goldRead, 'mt-4') },
    meta: { tone: 'green', caps: true },
  },
  // /news listing and related articles.
  grid: {
    root: cn(cardShell, 'flex h-full flex-col'),
    media: 'overflow-hidden',
    body: 'flex flex-1 flex-col p-6',
    title: 'text-xl leading-snug',
    aspect: 16 / 10,
    sizes: '(min-width: 64rem) 24rem, (min-width: 40rem) 50vw, 100vw',
    clamp: 'line-clamp-3',
    read: {
      label: 'Read more',
      className:
        'mt-auto inline-flex items-center gap-2 self-start border-b-2 border-gold pt-5 pb-1 text-sm font-semibold text-navy',
      arrow: 'text-gold',
    },
    meta: { tone: 'gold', caps: false },
  },
};

/**
 * News card. The title is the link (stretched over the whole card), so each
 * card has exactly one accessible link named after the article.
 */
export function NewsCard({
  article,
  variant = 'grid',
  headingLevel = 'h3',
  priority,
}: NewsCardProps) {
  const layout = layouts[variant];
  const Heading = headingLevel;

  return (
    <article className={cn('group relative', layout.root)}>
      {layout.mobileAspect !== undefined && (
        // Stacked layout only; lazy, so it never downloads while hidden
        <div className={cn(layout.media, 'sm:hidden')}>
          <NewsImage
            image={article.image}
            aspect={layout.mobileAspect}
            sizes="100vw"
            className={imageMotion}
          />
        </div>
      )}
      <div className={cn(layout.media, layout.mobileAspect !== undefined && 'hidden sm:block')}>
        <NewsImage
          image={article.image}
          aspect={layout.aspect}
          sizes={layout.sizes}
          priority={priority}
          className={cn(imageMotion, layout.image)}
        />
      </div>

      <div className={layout.body}>
        <NewsMeta
          category={article.category}
          publishedAt={article.publishedAt}
          tone={layout.meta.tone}
          caps={layout.meta.caps}
        />
        <Heading className={cn('mt-3 font-heading font-bold text-navy', layout.title)}>
          <Link
            to={`/news/${article.slug}`}
            className="underline-offset-4 group-hover:underline after:absolute after:inset-0 after:rounded-card"
          >
            {article.title}
          </Link>
        </Heading>
        {article.excerpt && (
          <p className={cn('mt-3 text-[0.9375rem] leading-relaxed text-muted', layout.clamp)}>
            {article.excerpt}
          </p>
        )}
        <span aria-hidden="true" className={layout.read.className}>
          {layout.read.label}
          <ArrowRight
            className={cn(
              'size-4 transition-transform motion-safe:group-hover:translate-x-1',
              layout.read.arrow,
            )}
          />
        </span>
      </div>
    </article>
  );
}
