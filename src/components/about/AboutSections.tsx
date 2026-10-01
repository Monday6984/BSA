import {
  BookOpen,
  BriefcaseBusiness,
  ChartColumnIncreasing,
  Flag,
  GraduationCap,
  type LucideIcon,
  Quote,
  Sprout,
  User,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Highlight } from '@/components/ui/SectionHeading';
import { about } from '@/data/about';
import { cn } from '@/lib/cn';
import type { ImageAsset } from '@/types/content';

const icons: Record<string, LucideIcon> = {
  user: User,
  'graduation-cap': GraduationCap,
  briefcase: BriefcaseBusiness,
  flag: Flag,
  sprout: Sprout,
  'book-open': BookOpen,
  chart: ChartColumnIncreasing,
};

/* -------------------------------------------------------------------------- */

/** Navy hero: text left, unaltered cut-out portrait right over a faded cityscape. */
export function AboutHero() {
  const { eyebrow, heading, body, portrait, backdrop } = about.hero;

  return (
    <section
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden surface-dark"
    >
      {/* Backdrop fills the right half on desktop, the lower band on mobile */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[24rem] sm:h-[28rem] lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[55%]"
      >
        <img
          src={backdrop.src}
          srcSet={backdrop.srcSet}
          sizes="(min-width: 64rem) 55vw, 100vw"
          alt=""
          width={backdrop.width}
          height={backdrop.height}
          decoding="async"
          className="size-full object-cover object-[60%_40%] opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy via-navy/40 via-30% to-navy/30 lg:bg-linear-to-r lg:via-navy/50 lg:via-35% lg:to-navy/20" />
      </div>

      <Container className="grid items-end lg:min-h-[34rem] lg:grid-cols-[1fr_0.9fr]">
        <div className="animate-fade-up pt-14 pb-10 sm:pt-16 lg:self-center lg:pt-16 lg:pb-32">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 id="about-heading" className="mt-5 max-w-xl text-h1">
            {heading.lead} <Highlight>{heading.highlight}</Highlight>
          </h1>
          <p className="mt-5 max-w-lg text-lead text-on-navy-muted">{body}</p>
        </div>

        {/* Portrait sits on the hero's bottom edge; the fact cards overlap its lower part */}
        <div className="relative mx-auto h-[24rem] w-full max-w-md animate-fade-in [animation-delay:150ms] sm:h-[28rem] lg:h-[34rem] lg:max-w-none">
          <img
            src={portrait.src}
            srcSet={portrait.srcSet}
            sizes="(min-width: 64rem) 30rem, 80vw"
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            fetchPriority="high"
            decoding="async"
            className="absolute top-[6%] left-1/2 h-[115%] w-auto max-w-none -translate-x-[58%]"
          />
        </div>
      </Container>
    </section>
  );
}

/** Four fact cards, overlapping the bottom of the hero. */
export function QuickFacts() {
  return (
    <section aria-label="Quick facts" className="relative z-10 flow-root bg-background pb-4">
      <Container>
        <dl className="-mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:-mt-20 lg:grid-cols-4">
          {about.facts.map((fact) => {
            const Icon = icons[fact.icon];
            return (
              <div
                key={fact.label}
                className="flex items-start gap-4 rounded-card border border-border bg-white p-5 shadow-card sm:block sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-deep"
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <dt className="text-sm text-muted sm:mt-4">{fact.label}</dt>
                  <dd className="mt-1 leading-snug font-semibold text-navy">{fact.value}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

interface StorySplitProps {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
  /** `position` is a CSS object-position for the crop */
  image: ImageAsset & { position?: string };
  /** Portrait photos use a taller 4:5 frame at every width */
  imageAspect?: 'landscape' | 'portrait';
  tone?: 'white' | 'soft';
}

/** Two-column editorial block: story left, photograph right (image below on mobile). */
export function StorySplit({
  id,
  eyebrow,
  heading,
  paragraphs,
  image,
  imageAspect = 'landscape',
  tone = 'white',
}: StorySplitProps) {
  return (
    <section
      aria-labelledby={id}
      className={cn('py-16 lg:py-24', tone === 'soft' ? 'bg-background' : 'bg-white')}
    >
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={id} className="mt-4 text-h2">
            {heading}
          </h2>
          <div className="mt-6 max-w-xl space-y-5 text-[1.0625rem] leading-[1.75] text-muted">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <div
          className={cn(
            'overflow-hidden rounded-card border border-border',
            imageAspect === 'portrait' ? 'aspect-4/5' : 'aspect-[4/3]',
          )}
        >
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes="(min-width: 64rem) 34rem, 100vw"
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
            style={{ objectPosition: image.position }}
          />
        </div>
      </Container>
    </section>
  );
}

/** Three story blocks with gold icons. */
export function Journey() {
  const { eyebrow, heading, blocks } = about.journey;

  return (
    <section aria-labelledby="journey-heading" className="bg-background py-16 lg:py-24">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id="journey-heading" className="mt-4 text-h2">
          {heading}
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:mt-12 lg:gap-12">
          {blocks.map((block) => {
            const Icon = icons[block.icon];
            return (
              <li key={block.title}>
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full bg-gold text-navy"
                >
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-heading text-xl leading-snug font-bold">{block.title}</h3>
                <p className="mt-3 text-base leading-[1.75] text-muted">{block.body}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/** Full-width navy pull quote with a faint portrait on the right. */
export function PullQuote() {
  const { text, attribution } = about.quote;
  const portrait = about.hero.portrait;

  return (
    <section
      aria-label="Quote from Booda Sunday Adeyemo"
      className="relative isolate overflow-hidden surface-dark"
    >
      {/* Faint portrait at the right edge of the content area */}
      <Container className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <img
          src={portrait.src}
          srcSet={portrait.srcSet}
          sizes="20rem"
          alt=""
          width={portrait.width}
          height={portrait.height}
          loading="lazy"
          decoding="async"
          className="absolute top-6 right-0 h-[140%] w-auto max-w-none mask-l-from-40% opacity-25"
        />
      </Container>
      <Container>
        <figure className="py-16 lg:py-24 lg:pr-[30%]">
          <Quote aria-hidden="true" className="size-10 fill-gold text-gold sm:size-12" />
          <blockquote className="mt-5 font-heading text-[1.375rem] leading-snug text-white italic sm:text-[1.75rem] lg:text-[2rem]">
            <p>{text}</p>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 font-medium text-gold">
            <span aria-hidden="true" className="gold-rule w-8" />
            {attribution}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
