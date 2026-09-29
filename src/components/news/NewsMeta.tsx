import { categoryLabel } from '@/data/newsCategories';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/format';
import type { NewsCategory } from '@/types/news';

interface NewsMetaProps {
  category: NewsCategory | null;
  publishedAt: string;
  /** Category label colour */
  tone?: 'gold' | 'green';
  /** Homepage card style: "COMMUNITY OUTREACH · 12 SEPT 2026" */
  caps?: boolean;
  className?: string;
}

/** Category + publication date. */
export function NewsMeta({
  category,
  publishedAt,
  tone = 'gold',
  caps = false,
  className,
}: NewsMetaProps) {
  const label = categoryLabel(category);
  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-y-1',
        caps ? 'gap-x-2 text-xs' : 'gap-x-3 text-sm',
        className,
      )}
    >
      {label && (
        <span className={cn('eyebrow', tone === 'green' ? 'text-green' : 'text-gold-deep')}>
          {label}
        </span>
      )}
      {/* Separator travels with the date so it never dangles at a line end */}
      <span className="inline-flex items-center gap-x-2 whitespace-nowrap">
        {label &&
          (caps ? (
            <span aria-hidden="true" className="text-muted">
              ·
            </span>
          ) : (
            <span aria-hidden="true" className="mr-1 h-3 w-px bg-border" />
          ))}
        <time
          dateTime={publishedAt}
          className={cn('text-muted', caps && 'font-medium tracking-[0.06em] uppercase')}
        >
          {formatDate(publishedAt)}
        </time>
      </span>
    </p>
  );
}
