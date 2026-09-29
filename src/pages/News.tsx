import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { PageHeader } from '@/components/layout/PageHeader';
import { NewsCard } from '@/components/news/NewsCard';
import { Seo } from '@/components/seo/Seo';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { getAllNews } from '@/lib/news';
import type { NewsExcerpt, NewsPage } from '@/types/news';

export { NewsErrorBoundary as ErrorBoundary } from '@/components/news/NewsErrorBoundary';

/** First page is loaded before the route renders; later pages load on demand. */
export function loader(): Promise<NewsPage> {
  return getAllNews(1);
}

export default function News() {
  const firstPage = useLoaderData<typeof loader>();
  const [items, setItems] = useState<NewsExcerpt[]>(firstPage.items);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const hasMore = items.length < firstPage.total;

  async function loadMore() {
    setLoadingMore(true);
    setLoadError(false);
    try {
      const next = await getAllNews(page + 1);
      setItems((current) => [...current, ...next.items]);
      setPage((p) => p + 1);
    } catch {
      setLoadError(true);
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <>
      <Seo title="News & updates" path="/news" />
      <PageHeader title="News & updates" />
      <Section>
        {items.length === 0 ? (
          <p className="text-muted">No updates have been published yet. Please check back soon.</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((article, index) => (
                <li key={article._id}>
                  <NewsCard
                    article={article}
                    variant="grid"
                    headingLevel="h2"
                    priority={index < 3}
                  />
                </li>
              ))}
            </ul>

            {hasMore && (
              <div className="mt-12 text-center">
                <Button variant="outline" onClick={loadMore} disabled={loadingMore}>
                  {loadingMore ? 'Loading…' : 'Load more updates'}
                </Button>
                {loadError && (
                  <p role="alert" className="mt-3 text-sm text-error">
                    Couldn’t load more updates. Please try again.
                  </p>
                )}
                <p className="mt-3 text-sm text-muted" aria-live="polite">
                  Showing {items.length} of {firstPage.total}
                </p>
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
}
