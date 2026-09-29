import { ArrowLeft } from 'lucide-react';
import { data, Link, type LoaderFunctionArgs, useLoaderData } from 'react-router';
import { Container } from '@/components/layout/Container';
import { ArticleBody } from '@/components/news/ArticleBody';
import { NewsCard } from '@/components/news/NewsCard';
import { NewsImage } from '@/components/news/NewsImage';
import { NewsMeta } from '@/components/news/NewsMeta';
import { Seo } from '@/components/seo/Seo';
import { getNewsBySlug, getRelatedNews } from '@/lib/news';
import { hasImage, imageUrl } from '@/lib/sanity/image';
import { site } from '@/lib/site';

export { NewsErrorBoundary as ErrorBoundary } from '@/components/news/NewsErrorBoundary';

export async function loader({ params }: LoaderFunctionArgs) {
  const article = params.slug ? await getNewsBySlug(params.slug) : null;
  // Unknown or unpublished slug → the site's 404 page
  if (!article) throw data(null, { status: 404 });
  // Related articles are a nice-to-have: never fail the page over them
  const related = await getRelatedNews(article).catch(() => []);
  return { article, related };
}

export default function NewsArticle() {
  const { article, related } = useLoaderData<typeof loader>();
  const path = `/news/${article.slug}`;

  // SEO fallbacks: seoTitle → title, seoDescription → excerpt, socialImage → featuredImage
  const seoTitle = article.seoTitle || article.title;
  const seoDescription = article.seoDescription || article.excerpt || undefined;
  const shareImage = hasImage(article.socialImage) ? article.socialImage : article.image;
  const ogImage = hasImage(shareImage)
    ? { src: imageUrl(shareImage, 1200, 1200 / 630), alt: shareImage.alt ?? article.title }
    : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    datePublished: article.publishedAt,
    dateModified: article._updatedAt,
    ...(seoDescription ? { description: seoDescription } : {}),
    ...(ogImage ? { image: [ogImage.src] } : {}),
    // Only include an author when one has actually been entered
    ...(article.author ? { author: [{ '@type': 'Person', name: article.author }] } : {}),
    ...(site.url ? { mainEntityOfPage: `${site.url}${path}` } : {}),
  };

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={path}
        image={ogImage}
        type="article"
        publishedTime={article.publishedAt}
        modifiedTime={article._updatedAt}
        jsonLd={jsonLd}
      />

      <article>
        <Container size="narrow" className="pt-10 lg:pt-14">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline-offset-4 hover:underline"
          >
            <ArrowLeft aria-hidden="true" className="size-4 text-gold" />
            Back to news
          </Link>
          <NewsMeta
            category={article.category}
            publishedAt={article.publishedAt}
            className="mt-8"
          />
          <h1 className="mt-4 text-h1">{article.title}</h1>
          {article.author && <p className="mt-4 text-sm text-muted">By {article.author}</p>}
        </Container>

        <Container className="mt-10 max-w-5xl">
          <NewsImage
            image={article.image}
            aspect={16 / 9}
            sizes="(min-width: 64rem) 64rem, 100vw"
            priority
            className="rounded-card"
          />
        </Container>

        <Container size="narrow" className="py-12 lg:py-16">
          {article.body?.length ? (
            <ArticleBody value={article.body} />
          ) : (
            article.excerpt && <p className="text-lead text-muted">{article.excerpt}</p>
          )}
        </Container>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-background py-16 lg:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-heading" className="text-h2">
                More from the campaign
              </h2>
              <Link
                to="/news"
                className="text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
              >
                View all updates
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item._id}>
                  <NewsCard article={item} variant="grid" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
