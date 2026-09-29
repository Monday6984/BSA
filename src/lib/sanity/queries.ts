/**
 * All GROQ queries for the site live here. Components never write GROQ.
 *
 * `published` = only articles that have a slug and a publication date that is
 * not in the future. Drafts are excluded twice over: the public client uses
 * the `published` perspective, and draft ids are filtered out explicitly.
 */
const published = `_type == "newsArticle" && defined(slug.current) && defined(publishedAt) && publishedAt <= now() && !(_id in path("drafts.**"))`;

/** Card fields only: no body, no SEO fields. */
const cardFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  excerpt,
  "image": featuredImage{ asset, hotspot, crop, alt },
  featured
`;

/** Homepage: most recent featured article + the three newest (JS picks the final set). */
export const homepageNewsQuery = `{
  "featured": *[${published} && featured == true] | order(publishedAt desc)[0]{ ${cardFields} },
  "latest": *[${published}] | order(publishedAt desc)[0...3]{ ${cardFields} }
}`;

/** Most recent article marked "featured". */
export const featuredNewsQuery = `*[${published} && featured == true] | order(publishedAt desc)[0]{ ${cardFields} }`;

/** Newest articles, optionally excluding one (by slug). */
export const latestNewsQuery = `*[${published} && slug.current != $exclude] | order(publishedAt desc)[0...$limit]{ ${cardFields} }`;

/** A page of the /news listing plus the total count. */
export const newsPageQuery = `{
  "items": *[${published}] | order(publishedAt desc)[$start...$end]{ ${cardFields} },
  "total": count(*[${published}])
}`;

/** One full article. */
export const newsBySlugQuery = `*[${published} && slug.current == $slug][0]{
  ${cardFields},
  _updatedAt,
  body[]{
    ...,
    _type == "image" => { _type, _key, asset, hotspot, crop, alt, caption }
  },
  author,
  seoTitle,
  seoDescription,
  "socialImage": socialImage{ asset, hotspot, crop, alt }
}`;
