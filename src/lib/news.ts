import type { HomepageNews, NewsArticle, NewsExcerpt, NewsPage } from '@/types/news';
import { getSanityClient } from './sanity/client';
import {
  featuredNewsQuery,
  homepageNewsQuery,
  latestNewsQuery,
  newsBySlugQuery,
  newsPageQuery,
} from './sanity/queries';

/**
 * News data access. Every function returns plain typed data and throws if the
 * CMS is unreachable or unconfigured — callers decide on the fallback UI.
 */

export const NEWS_PAGE_SIZE = 9;

/** Most recent featured article, or null if none is marked featured. */
export async function getFeaturedNews(): Promise<NewsExcerpt | null> {
  return getSanityClient().fetch<NewsExcerpt | null>(featuredNewsQuery);
}

/** Newest published articles, optionally excluding one slug. */
export async function getLatestNews(limit = 3, exclude = ''): Promise<NewsExcerpt[]> {
  return getSanityClient().fetch<NewsExcerpt[]>(latestNewsQuery, { limit, exclude });
}

/**
 * Homepage selection:
 * 1. featured = newest article marked "featured", else the newest article;
 * 2. secondary = the next newest articles (never repeating the featured one), max 2.
 */
export async function getHomepageNews(): Promise<HomepageNews> {
  const { featured, latest } = await getSanityClient().fetch<{
    featured: NewsExcerpt | null;
    latest: NewsExcerpt[];
  }>(homepageNewsQuery);

  const lead = featured ?? latest[0] ?? null;
  const secondary = latest.filter((article) => article._id !== lead?._id).slice(0, 2);
  return { featured: lead, secondary };
}

/** One page of the /news listing (1-based page number). */
export async function getAllNews(page = 1, pageSize = NEWS_PAGE_SIZE): Promise<NewsPage> {
  const start = (page - 1) * pageSize;
  return getSanityClient().fetch<NewsPage>(newsPageQuery, { start, end: start + pageSize });
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  return getSanityClient().fetch<NewsArticle | null>(newsBySlugQuery, { slug });
}

/** Up to `limit` other articles, same category first, then newest. */
export async function getRelatedNews(article: NewsExcerpt, limit = 3): Promise<NewsExcerpt[]> {
  const candidates = await getLatestNews(limit * 3, article.slug);
  return [...candidates]
    .sort(
      (a, b) => Number(b.category === article.category) - Number(a.category === article.category),
    )
    .slice(0, limit);
}
