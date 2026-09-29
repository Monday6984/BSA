import { Container } from '@/components/layout/Container';
import { NewsCard } from '@/components/news/NewsCard';
import { ButtonLink } from '@/components/ui/Button';
import { latestUpdates } from '@/data/home';
import { useHomepageNews } from '@/hooks/useHomepageNews';
import { cn } from '@/lib/cn';

/**
 * "Latest updates" — content comes from Sanity (never hard-coded):
 * one featured article (left) and up to two secondary articles (right).
 * Handles loading, 0–3+ articles and an unavailable CMS without breaking.
 */
export function LatestUpdates() {
  const { eyebrow, heading, intro, cta, emptyMessage, errorMessage } = latestUpdates;
  const state = useHomepageNews();
  const news = state.status === 'ready' ? state.news : null;
  const hasArticles = Boolean(news?.featured);

  return (
    <section aria-labelledby="latest-updates-heading" className="bg-background py-20 lg:py-24">
      <Container>
        <header className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 eyebrow text-gold-deep">
            <span aria-hidden="true" className="gold-rule w-10" />
            {eyebrow}
          </p>
          <h2 id="latest-updates-heading" className="mx-auto mt-4 max-w-2xl text-h2">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-[1.0625rem]">
            {intro}
          </p>
        </header>

        <div className="mt-12 lg:mt-14" aria-busy={state.status === 'loading'}>
          {state.status === 'loading' && <LatestUpdatesSkeleton />}

          {state.status === 'error' && <p className="text-center text-muted">{errorMessage}</p>}

          {news && !hasArticles && <p className="text-center text-muted">{emptyMessage}</p>}

          {news?.featured && (
            <div
              className={cn(
                'grid grid-cols-1 gap-5',
                news.secondary.length > 0 && 'lg:grid-cols-[57fr_43fr] lg:items-start xl:gap-6',
              )}
            >
              <NewsCard article={news.featured} variant="featured" />
              {news.secondary.length > 0 && (
                <ul className="flex flex-col gap-5 xl:gap-6">
                  {news.secondary.map((article) => (
                    <li key={article._id}>
                      <NewsCard article={article} variant="compact" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {state.status !== 'loading' && hasArticles && (
          <div className="mt-10 text-center lg:mt-12">
            <ButtonLink to={cta.to} withArrow size="lg">
              {cta.label}
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}

/** Placeholder blocks with the final layout's shape, to avoid layout shift. */
function LatestUpdatesSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse grid-cols-1 gap-5 lg:grid-cols-[57fr_43fr] lg:items-start"
    >
      <div className="overflow-hidden rounded-card border border-border bg-white">
        <div className="aspect-[2.65] bg-border/60" />
        <div className="space-y-4 p-8">
          <div className="h-3 w-48 rounded bg-border/60" />
          <div className="h-8 w-4/5 rounded bg-border/60" />
          <div className="h-4 w-full rounded bg-border/60" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-5 rounded-card border border-border bg-white p-5">
            <div className="aspect-square w-24 shrink-0 rounded-media bg-border/60 sm:w-40 lg:w-36 xl:w-[11.25rem]" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-3 w-32 rounded bg-border/60" />
              <div className="h-6 w-full rounded bg-border/60" />
              <div className="h-6 w-2/3 rounded bg-border/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
