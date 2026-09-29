import type { PortableTextBlock } from '@portabletext/react';

/** Category values stored in Sanity. Labels live in data/newsCategories.ts. */
export type NewsCategory =
  'campaign-update' | 'community-outreach' | 'education' | 'projects' | 'events' | 'announcements';

/** A Sanity image field as returned by our queries (asset reference + crop data). */
export interface SanityImage {
  asset?: { _ref: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string | null;
  caption?: string | null;
}

/** Fields needed for cards (homepage, listing, related). No body. */
export interface NewsExcerpt {
  _id: string;
  title: string;
  slug: string;
  category: NewsCategory | null;
  publishedAt: string;
  excerpt: string | null;
  image: SanityImage | null;
  featured: boolean | null;
}

/** A full article for /news/:slug. */
export interface NewsArticle extends NewsExcerpt {
  _updatedAt: string;
  body: PortableTextBlock[] | null;
  author: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  socialImage: SanityImage | null;
}

export interface HomepageNews {
  featured: NewsExcerpt | null;
  secondary: NewsExcerpt[];
}

export interface NewsPage {
  items: NewsExcerpt[];
  total: number;
}
