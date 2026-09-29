# BSA Campaign — Sanity Studio

The editing app for news articles. The website reads published articles from
Sanity; nothing in the React code needs to change to publish news.

## One-time setup

1. Create a free project at https://www.sanity.io/manage (dataset: `production`, visibility: **public**).
2. Copy `.env.example` to `.env` and set `SANITY_STUDIO_PROJECT_ID`.
3. In the website root, set the same ID in `.env.local` as `VITE_SANITY_PROJECT_ID`.
4. In sanity.io/manage → API → CORS origins, add `http://localhost:5173`, `https://boodasundayadeyemo.com` and `https://www.boodasundayadeyemo.com`
   (no credentials needed).
5. `npm install`, then `npx sanity login`.
6. Import the three starter articles: `npm run seed`.

## Everyday use

- `npm run dev` — Studio at http://localhost:3333
- `npm run deploy` — host the Studio at `https://<name>.sanity.studio` for the campaign team

## Publishing an article

1. **News articles → +** to create one.
2. Fill in title, click **Generate** for the slug, pick a category, set the publication date.
3. Upload the featured image, add alt text, and drag the **hotspot** onto the main subject.
4. Write the excerpt and body (headings, bold/italic, links, lists, quotes and images are supported).
5. Optional: author, "Feature on the homepage", and the SEO & sharing tab.
6. Changes save automatically as a **draft** (not public). Press **Publish** to make it live.
   The site updates within about a minute (CDN cache).

To take an article down, use **Unpublish** from the document menu.

The **Editorial notes** tab is internal and never shown on the website.
