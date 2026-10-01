import {
  ArrowRight,
  Droplet,
  GraduationCap,
  HeartPulse,
  type LucideIcon,
  Users,
} from 'lucide-react';
import { Link } from 'react-router';
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { manifestoPillars, pillarsSection } from '@/data/manifesto';
import { assets } from '@/lib/assets';
import { cn } from '@/lib/cn';

/** Icon + tinted badge per pillar, following the mockup's colour pattern. */
const pillarStyles: Record<string, { Icon: LucideIcon; badge: string }> = {
  droplet: { Icon: Droplet, badge: 'bg-navy/[0.06] text-navy' },
  'graduation-cap': { Icon: GraduationCap, badge: 'bg-green-soft text-green' },
  users: { Icon: Users, badge: 'bg-gold-soft text-gold-deep' },
  'heart-pulse': { Icon: HeartPulse, badge: 'bg-green-soft text-green' },
};

/**
 * "Our priorities" — centred header, four equal cards (4 across from xl,
 * 2×2 from sm, stacked on mobile), then the "Our vision" navy panel sitting on
 * a cityscape band that fades up into the section background.
 */
export function ManifestoPillars() {
  const { eyebrow, heading, intro } = pillarsSection;

  return (
    <section
      aria-labelledby="pillars-heading"
      className="overflow-hidden bg-background pt-20 lg:pt-24"
    >
      <Container>
        <header className="mx-auto max-w-4xl text-center">
          <p className="flex items-center justify-center gap-3 eyebrow text-navy">
            <span aria-hidden="true" className="gold-rule w-8" />
            {eyebrow}
          </p>
          <h2 id="pillars-heading" className="mt-4 text-h2">
            {heading.lead} <span className="text-gold-display">{heading.highlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] text-base leading-relaxed text-muted sm:text-[1.0625rem]">
            {intro}
          </p>
        </header>

        <ul className="relative z-10 mt-12 grid reveal gap-5 sm:grid-cols-2 lg:mt-14 lg:gap-6 xl:grid-cols-4">
          {manifestoPillars.map((pillar) => {
            const style = pillarStyles[pillar.icon ?? ''] ?? pillarStyles.droplet;
            return (
              <li
                key={pillar.id}
                className="flex flex-col rounded-card border border-border bg-white p-6 sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex size-14 items-center justify-center rounded-full lg:size-16',
                    style.badge,
                  )}
                >
                  <style.Icon className="size-6 lg:size-7" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-heading text-xl leading-snug font-bold xl:min-h-[2lh]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{pillar.summary}</p>
                <Link
                  to={`/manifesto#${pillar.id}`}
                  className="group mt-auto inline-flex items-center gap-2 self-start border-b-2 border-gold pt-6 pb-1 text-sm font-semibold text-navy"
                >
                  Learn more<span className="sr-only"> about {pillar.title}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 text-gold transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>

      <VisionBand />
    </section>
  );
}

/** Cityscape band with the navy "Our vision" panel on the right. */
function VisionBand() {
  const { vision } = pillarsSection;
  const city = assets.cityscape;

  return (
    <div className="relative -mt-10 pt-24 pb-8 sm:pt-28 lg:-mt-16 lg:pt-32 lg:pb-7">
      {/* Real aerial photo, so never mirrored; fades up into the section */}
      <img
        src={city.src}
        srcSet={city.srcSet}
        sizes="100vw"
        alt=""
        width={city.width}
        height={city.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full mask-t-from-55% mask-t-to-95% object-cover object-[50%_28%]"
      />

      <Container className="relative">
        <div className="rounded-card bg-navy px-7 py-9 text-white sm:px-10 lg:ml-auto lg:w-[62%] lg:px-14 lg:py-8">
          <p className="flex items-center gap-3 eyebrow text-white">
            <span aria-hidden="true" className="gold-rule w-8" />
            {vision.eyebrow}
          </p>
          <h3 className="mt-3 font-heading text-[1.75rem] leading-tight font-bold text-white sm:text-[2rem]">
            {vision.heading.lead} <span className="text-gold">{vision.heading.highlight}</span>
          </h3>
          <p className="mt-3 max-w-[34rem] text-base leading-relaxed text-white/90">
            {vision.body}
          </p>
          <ButtonLink to={vision.cta.to} withArrow className="mt-6">
            {vision.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
