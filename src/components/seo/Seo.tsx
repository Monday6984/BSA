import { site } from '@/lib/site';
import type { SeoProps } from '@/types/seo';

/**
 * Page-level metadata. React 19 hoists <title>, <meta> and <link> into
 * <head> automatically. Render once near the top of each page.
 *
 * Note: social crawlers don't execute JS — add prerendering/SSR before launch
 * so Open Graph tags are present in the served HTML.
 */
export function Seo({
  title,
  titleIsFull,
  description,
  path,
  image,
  type = 'website',
  noindex,
  jsonLd,
  publishedTime,
  modifiedTime,
}: SeoProps) {
  const fullTitle = title ? (titleIsFull ? title : `${title} | ${site.name}`) : site.defaultTitle;
  const url = site.url ? `${site.url}${path}` : undefined;
  // CMS images are already absolute; local assets need the site origin.
  const imageUrl =
    image && site.url && !/^https?:/.test(image.src) ? `${site.url}${image.src}` : image?.src;

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {url && <link rel="canonical" href={url} />}

      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {image && <meta property="og:image:alt" content={image.alt} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {jsonLd && (
        <script
          type="application/ld+json"
          // Escape "<" so content can never close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </>
  );
}
