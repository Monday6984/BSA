import type { NewsCategory } from '@/types/news';

/**
 * Display labels for news categories. Keep in sync with
 * studio/schemaTypes/newsCategories.ts (same values).
 */
export const newsCategoryLabels: Record<NewsCategory, string> = {
  'campaign-update': 'Campaign update',
  'community-outreach': 'Community outreach',
  education: 'Education',
  projects: 'Projects',
  events: 'Events',
  announcements: 'Announcements',
};

export function categoryLabel(category: NewsCategory | null | undefined): string | null {
  return category ? (newsCategoryLabels[category] ?? null) : null;
}
