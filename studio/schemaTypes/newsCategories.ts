/**
 * Controlled list of news categories. To add a category, add an entry here
 * AND in the website's src/data/newsCategories.ts (same `value`).
 * Never rename an existing `value` — published articles store it.
 */
export const newsCategories = [
  { title: 'Campaign update', value: 'campaign-update' },
  { title: 'Community outreach', value: 'community-outreach' },
  { title: 'Education', value: 'education' },
  { title: 'Projects', value: 'projects' },
  { title: 'Events', value: 'events' },
  { title: 'Announcements', value: 'announcements' },
] as const;
