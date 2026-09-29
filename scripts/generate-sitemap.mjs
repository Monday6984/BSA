/**
 * Writes dist/sitemap.xml after `vite build`: the site's pages plus every
 * published news article from Sanity (public, read-only; no token).
 *
 * If Sanity is not configured or can't be reached, the sitemap still lists
 * the pages and the build carries on. Run automatically by `npm run build`.
 */
import { writeFile } from 'node:fs/promises';
import { createClient } from '@sanity/client';
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), 'VITE_');

// Same default as src/lib/site.ts; VITE_SITE_URL overrides both.
const SITE_URL = (env.VITE_SITE_URL || 'https://boodasundayadeyemo.com').replace(/\/$/, '');

/** Public pages (keep in step with the routes in src/App.tsx). */
const pages = [
  '/',
  '/about',
  '/manifesto',
  '/projects',
  '/news',
  '/gallery',
  '/join-the-movement',
  '/donate',
];

// Same "published" rule as src/lib/sanity/queries.ts
const articlesQuery = `*[_type == "newsArticle" && defined(slug.current) && defined(publishedAt) && publishedAt <= now() && !(_id in path("drafts.**"))] | order(publishedAt desc){ "slug": slug.current, _updatedAt }`;

async function fetchArticles() {
  if (!env.VITE_SANITY_PROJECT_ID) {
    console.warn('sitemap: VITE_SANITY_PROJECT_ID not set, news articles skipped');
    return [];
  }
  try {
    const client = createClient({
      projectId: env.VITE_SANITY_PROJECT_ID,
      dataset: env.VITE_SANITY_DATASET || 'production',
      apiVersion: env.VITE_SANITY_API_VERSION || '2025-02-19',
      useCdn: false,
      perspective: 'published',
      timeout: 10_000,
      maxRetries: 1,
    });
    return await client.fetch(articlesQuery);
  } catch (error) {
    console.warn(`sitemap: could not load news articles (${error.message}), pages only`);
    return [];
  }
}

const escapeXml = (s) =>
  s.replace(
    /[<>&'"]/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
  );

const entry = (path, lastmod) =>
  `  <url>\n    <loc>${escapeXml(SITE_URL + path)}</loc>${lastmod ? `\n    <lastmod>${lastmod.slice(0, 10)}</lastmod>` : ''}\n  </url>`;

const articles = await fetchArticles();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  ...pages.map((path) => entry(path)),
  ...articles.map((a) => entry(`/news/${encodeURIComponent(a.slug)}`, a._updatedAt)),
].join('\n')}
</urlset>
`;

await writeFile('dist/sitemap.xml', xml);
console.log(`sitemap: ${pages.length} pages + ${articles.length} news articles → dist/sitemap.xml`);
