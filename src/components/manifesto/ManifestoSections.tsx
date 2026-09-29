import {
  ArrowRight,
  BookOpen,
  Bus,
  Droplet,
  GraduationCap,
  type LucideIcon,
  Store,
  Sun,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { manifestoPage } from '@/data/manifesto';

const icons: Record<string, LucideIcon> = {
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  sun: Sun,
  droplet: Droplet,
  store: Store,
  bus: Bus,
};

/** Two-digit index shown on the cards: 1 → "01". */
const pad = (n: number) => String(n).padStart(2, '0');

/* -------------------------------------------------------------------------- */

/** Six past accomplishments: 2 × 3 grid of light, bordered cards. */
export function Achievements() {
  const { eyebrow, heading, items } = manifestoPage.achievements;

  return (
    <section aria-labelledby="achievements-heading" className="bg-white py-16 lg:py-20">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id="achievements-heading" className="mt-4 text-h2">
          {heading}
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 lg:gap-5">
          {items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.icon}
                className="flex items-center gap-4 rounded-card border border-border bg-white p-5 sm:gap-5 sm:px-6"
              >
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-deep sm:size-12"
                >
                  <Icon className="size-5 sm:size-6" strokeWidth={1.75} />
                </span>
                <span
                  aria-hidden="true"
                  className="w-7 shrink-0 text-lg font-bold text-navy tabular-nums"
                >
                  {pad(i + 1)}
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-text">{item.text}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/** The centrepiece: four pillar cards on a tinted band (4 across on wide screens). */
export function Pillars() {
  const { eyebrow, heading, pillars } = manifestoPage.agenda;

  return (
    <section
      aria-labelledby="agenda-heading"
      className="border-y border-border bg-background py-16 lg:py-24"
    >
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id="agenda-heading" className="mt-4 text-h2">
          {heading}
        </h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:gap-6 xl:grid-cols-4">
          {pillars.map((pillar, i) => (
            <li
              key={pillar.id}
              id={pillar.id}
              className="relative flex flex-col overflow-hidden rounded-card border border-border bg-white p-6 shadow-card sm:p-7"
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold" />
              <span
                aria-hidden="true"
                className="text-[2.5rem] leading-none font-bold tracking-tight text-gold-display tabular-nums lg:text-[2.75rem]"
              >
                {pad(i + 1)}
              </span>
              <h3 className="mt-5 font-heading text-xl leading-snug font-bold sm:text-[1.375rem]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{pillar.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Three specific commitments as full-width rows with an arrow marker. */
export function NextSteps() {
  const { eyebrow, heading, items } = manifestoPage.nextSteps;

  return (
    <section aria-labelledby="next-heading" className="bg-white py-16 lg:py-20">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id="next-heading" className="mt-4 text-h2">
          {heading}
        </h2>
        <ol className="mt-10 space-y-3 lg:mt-12 lg:space-y-4">
          {items.map((item, i) => (
            <li
              key={item.slice(0, 24)}
              className="flex items-start gap-4 rounded-card border border-border bg-white px-5 py-4 sm:items-center sm:gap-6 sm:px-6 sm:py-5"
            >
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy/[0.06] text-navy"
              >
                <ArrowRight className="size-4" />
              </span>
              <span
                aria-hidden="true"
                className="mt-1.5 w-6 shrink-0 text-sm font-bold text-navy tabular-nums sm:mt-0"
              >
                {pad(i + 1)}
              </span>
              <p className="max-w-4xl text-[0.9375rem] leading-relaxed text-text sm:text-base">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Accountability principle: text left, community photo bleeding off the right edge. */
export function Transparency() {
  const { eyebrow, heading, paragraphs, image } = manifestoPage.transparency;
  const [principle, ...rest] = paragraphs;

  return (
    <section
      aria-labelledby="transparency-heading"
      className="relative isolate overflow-hidden bg-background"
    >
      <Container className="py-16 lg:py-24">
        <div className="lg:max-w-[48%]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="transparency-heading" className="mt-4 text-h2">
            {heading}
          </h2>
          <p className="mt-6 max-w-xl text-lead font-medium text-navy">{principle}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
              {p}
            </p>
          ))}
        </div>
      </Container>

      {/* A band under the text on mobile; the right side of the section on desktop */}
      <div className="relative h-64 sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[46%]">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 64rem) 46vw, 100vw"
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className="size-full mask-t-from-75% object-cover object-[50%_60%] lg:mask-t-from-100% lg:mask-l-from-60%"
        />
      </div>
    </section>
  );
}
