export interface SeoProps {
  /** Page title without the site suffix. Omit on the homepage. */
  title?: string;
  /** Use `title` as the full <title>, without appending the site name */
  titleIsFull?: boolean;
  description?: string;
  /** Route path, e.g. "/about". Used for canonical + og:url when VITE_SITE_URL is set. */
  path: string;
  image?: { src: string; alt: string };
  type?: 'website' | 'article';
  noindex?: boolean;
  /** ISO dates for articles (article:published_time / modified_time) */
  publishedTime?: string;
  modifiedTime?: string;
  /** Structured data object(s), serialised as JSON-LD. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}
