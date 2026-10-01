import { Container } from '@/components/layout/Container';
import { Button, ButtonLink } from '@/components/ui/Button';
import { assets } from '@/lib/assets';
import { cn } from '@/lib/cn';
import type { ImageAsset } from '@/types/content';

interface PageCTAProps {
  /** Pass '' to omit */
  eyebrow?: string;
  /** Plain part of the heading */
  title?: string;
  /** Final words of the heading, shown in gold */
  highlight?: string;
  /** Pass '' to omit */
  description?: string;
  buttonText?: string;
  /** Pass '' while the destination is pending: the button renders disabled */
  buttonHref?: string;
  /** Optional second, outline button beside the main one */
  secondaryText?: string;
  secondaryHref?: string;
  image?: ImageAsset;
  /** CSS object-position for the photo, e.g. "50% 20%" */
  imagePosition?: string;
  /** Unique id prefix; needed when more than one CTA is on a page */
  id?: string;
  /** Section spacing override (defaults to the standard above-footer spacing) */
  className?: string;
}

const defaults = {
  secondaryText: '',
  secondaryHref: '',
  eyebrow: 'Join the movement',
  title: 'Together, we can build a stronger',
  highlight: 'Ogbomoso South.',
  description:
    'Be part of a people-driven movement for better opportunities, stronger communities and a brighter future.',
  buttonText: 'Join the Movement',
  buttonHref: '/join-the-movement',
  image: { ...assets.community, alt: '' } as ImageAsset,
  imagePosition: '70% 40%',
  id: 'page-cta',
  className: 'py-14 lg:py-16',
} satisfies Required<PageCTAProps>;

/**
 * Site-wide call to action shown above the footer (see RootLayout).
 * Navy panel, text left, Ogbomoso image right blending into the navy;
 * the image moves below the text on mobile.
 */
export function PageCTA(props: PageCTAProps) {
  const {
    eyebrow,
    title,
    highlight,
    description,
    buttonText,
    buttonHref,
    secondaryText,
    secondaryHref,
    image,
    imagePosition,
    id,
    className,
  } = {
    ...defaults,
    ...props,
  };

  return (
    <section aria-labelledby={`${id}-heading`} className={cn('bg-background', className)}>
      <Container>
        <div className="relative isolate flex flex-col overflow-hidden rounded-card surface-dark lg:block">
          {/* Image: full-bleed right half on desktop, a band under the text on mobile */}
          <div className="relative h-48 sm:h-60 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[55%]">
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="(min-width: 64rem) 45vw, 100vw"
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
              style={{ objectPosition: imagePosition }}
            />
            {/* Fades the photo into the navy: from the top on mobile, from the left on desktop */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-b from-navy via-navy/20 via-35% to-transparent lg:bg-linear-to-r lg:via-navy/40 lg:via-30% lg:to-transparent lg:to-70%"
            />
          </div>

          <div className="relative -order-1 px-7 pt-9 pb-2 sm:px-10 lg:max-w-[34rem] lg:px-12 lg:py-12 xl:max-w-[38rem]">
            {eyebrow && (
              <p className="mb-4 flex items-center gap-3 eyebrow text-gold">
                <span aria-hidden="true" className="gold-rule w-8" />
                {eyebrow}
              </p>
            )}
            <h2
              id={`${id}-heading`}
              className="font-heading text-[1.75rem] leading-[1.15] font-bold sm:text-[2.125rem] lg:text-[2.375rem]"
            >
              {title}
              {highlight && (
                <>
                  {' '}
                  <span className="text-gold">{highlight}</span>
                </>
              )}
            </h2>
            {description && (
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-on-navy-muted sm:text-base">
                {description}
              </p>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {buttonHref ? (
                <ButtonLink to={buttonHref} withArrow>
                  {buttonText}
                </ButtonLink>
              ) : (
                // Destination not supplied yet: shown, but not actionable
                <Button disabled withArrow>
                  {buttonText}
                </Button>
              )}
              {secondaryText && secondaryHref && (
                <ButtonLink to={secondaryHref} variant="outline-light">
                  {secondaryText}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
