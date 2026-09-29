import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { ImageAsset } from '@/types/content';

interface ImageHeroProps {
  /** Heading id, also used to label the section */
  id: string;
  /** Without an eyebrow, a short gold rule sits above the heading instead */
  eyebrow?: string;
  heading: ReactNode;
  subtitle: string;
  image: ImageAsset;
  /** CSS object-position for the photo */
  imagePosition?: string;
}

/**
 * Compact navy hero for inner pages (Manifesto, Community Impact): title left,
 * photo fading in from the right. Owns the page's single <h1>.
 */
export function ImageHero({
  id,
  eyebrow,
  heading,
  subtitle,
  image,
  imagePosition = '75% 55%',
}: ImageHeroProps) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden surface-dark">
      <div aria-hidden="true" className="absolute inset-0 -z-10 lg:right-0 lg:left-auto lg:w-[62%]">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 64rem) 62vw, 100vw"
          alt=""
          width={image.width}
          height={image.height}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
        {/* Keeps the text legible: a navy wash on mobile, a left-to-right fade on desktop */}
        <div className="absolute inset-0 bg-navy/75 lg:bg-transparent lg:bg-linear-to-r lg:from-navy lg:via-navy/40 lg:via-35% lg:to-transparent" />
      </div>

      <Container className="flex min-h-[15rem] items-center py-14 sm:min-h-[17rem] lg:min-h-[20rem]">
        <div className="animate-fade-up">
          {eyebrow ? (
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          ) : (
            <span aria-hidden="true" className="gold-rule block w-10" />
          )}
          <h1 id={id} className="mt-5 max-w-2xl text-h1">
            {heading}
          </h1>
          <p className="mt-4 max-w-lg text-lead text-on-navy-muted">{subtitle}</p>
        </div>
      </Container>
    </section>
  );
}
