import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Highlight } from '@/components/ui/SectionHeading';
import { hero } from '@/data/home';

/**
 * Homepage hero, built to the approved hero mockup:
 * copy on the left (~45%), and on the right a full-bleed scene — cityscape
 * backdrop blending into navy, the candidate in the foreground, and a thin
 * gold frame. Stacks (copy, then scene) below lg.
 *
 * The portrait is only positioned, cropped and masked with CSS.
 */
export function Hero() {
  const { label, headline, body, primaryCta, secondaryCta } = hero;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden surface-dark"
    >
      <HeroBackground />

      <Container className="relative z-10 lg:flex lg:min-h-[clamp(36rem,46vw,50rem)] lg:items-center">
        <div className="animate-fade-up pt-14 pb-12 sm:pt-16 lg:max-w-[30rem] lg:py-20 xl:max-w-[36rem]">
          <p className="text-sm font-medium tracking-wide text-on-navy-muted">
            {label}
            {/* Inline so it follows the last word if the label wraps */}
            <span aria-hidden="true" className="ml-3 gold-rule w-8 align-middle" />
          </p>

          <h1 id="hero-heading" className="mt-6 text-display">
            {headline.lines.map((line) => (
              <span key={line} className="block">
                {line}{' '}
              </span>
            ))}
            <Highlight className="block">{headline.highlight}</Highlight>
          </h1>

          <p className="mt-7 max-w-[33rem] text-lead text-on-navy-muted">{body}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <ButtonLink to={primaryCta.to} withArrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink to={secondaryCta.to} variant="outline-light">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <HeroVisual />
    </section>
  );
}

/** Subtle tonal glow and a faint arc — decoration only. */
function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-80 left-[18%] size-200 rounded-full bg-radial from-navy-800 to-transparent to-70%" />
      <div className="absolute -bottom-160 -left-80 size-240 rounded-full border border-navy-700/60" />
    </div>
  );
}

/**
 * Right-hand scene. Layers, back to front:
 * cityscape → navy blend → gold frame → portrait.
 */
function HeroVisual() {
  const { portrait, backdrop } = hero;

  return (
    <div className="relative h-[28rem] animate-fade-in [animation-delay:150ms] sm:h-[36rem] md:h-[40rem] lg:absolute lg:inset-y-0 lg:right-0 lg:hero-visual-left lg:h-auto">
      {/* Cityscape backdrop, masked to dissolve into the navy: from the top on mobile, from the left on desktop */}
      <img
        src={backdrop.src}
        srcSet={backdrop.srcSet}
        sizes="(min-width: 64rem) 60vw, 100vw"
        alt={backdrop.alt}
        width={backdrop.width}
        height={backdrop.height}
        decoding="async"
        className="absolute inset-0 size-full hero-scene-fade object-cover object-[60%_top]"
      />

      {/* Gentle navy tint at the top so the sky meets the header calmly */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 hidden h-1/4 bg-linear-to-b from-navy/40 to-transparent lg:block"
      />

      {/* Thin gold frame: long top line fading right, short left line */}
      <div
        aria-hidden="true"
        className="absolute top-[9%] left-[8%] h-[38%] w-[84%] rounded-tl-lg border-t-[1.5px] border-l-[1.5px] border-gold mask-r-from-70% lg:top-[12%] lg:left-[12%] lg:h-[40%] lg:w-[77%]"
      />

      {/* Candidate — anchored so the face sits right of centre and the hero's bottom edge crops at the waist */}
      <img
        src={portrait.src}
        srcSet={portrait.srcSet}
        sizes="(min-width: 64rem) 38vw, 90vw"
        alt={portrait.alt}
        width={portrait.width}
        height={portrait.height}
        fetchPriority="high"
        decoding="async"
        className="absolute top-[12%] left-1/2 h-[98%] w-auto max-w-none -translate-x-[58%] lg:top-[11.6%] lg:left-[41%] lg:h-[99%]"
      />
    </div>
  );
}
