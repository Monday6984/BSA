import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react';
import { hasImage, imageSrcSet, imageUrl } from '@/lib/sanity/image';
import type { SanityImage } from '@/types/news';

/** Map Portable Text to the site's typography. No raw HTML is ever rendered. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 first:mt-0">{children}</p>,
    h2: ({ children }) => <h2 className="mt-12 text-h3 sm:text-[1.75rem]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 text-xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-gold pl-6 font-heading text-xl leading-snug text-navy italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-6 marker:text-gold">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-gold-deep">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href ?? '';
      const external = /^https?:/.test(href);
      return (
        <a
          href={href}
          className="font-medium text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!hasImage(value)) return null;
      const aspect = 3 / 2;
      return (
        <figure className="mt-10">
          <img
            src={imageUrl(value, 960, aspect)}
            srcSet={imageSrcSet(value, aspect, [480, 768, 960, 1280])}
            sizes="(min-width: 48rem) 42rem, 100vw"
            alt={value.alt ?? ''}
            loading="lazy"
            decoding="async"
            className="w-full rounded-card object-cover"
            style={{ aspectRatio: aspect }}
          />
          {value.caption && (
            <figcaption className="mt-3 text-sm text-muted">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="text-[1.0625rem] leading-[1.8] text-text/85">
      <PortableText value={value} components={components} />
    </div>
  );
}
