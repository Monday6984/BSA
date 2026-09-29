import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Container } from '@/components/layout/Container';
import { aboutIntro } from '@/data/home';

/**
 * "Who is Booda?" — portrait (~43%) beside the supplied biography (~57%).
 * Two columns from md; stacks portrait-first on mobile.
 */
export function AboutIntro() {
  const { eyebrow, heading, paragraphs, cta, portrait } = aboutIntro;

  return (
    <section aria-labelledby="about-intro-heading" className="bg-white py-20 lg:py-28">
      <Container className="grid items-center gap-12 md:grid-cols-[2fr_3fr] md:gap-10 lg:grid-cols-[3fr_4fr] lg:gap-16 xl:gap-24">
        {/* Portrait in a 4:5 panel, with a thin gold corner accent */}
        <div className="relative mx-auto w-full max-w-sm pt-3 pl-3 sm:pt-4 sm:pl-4 md:max-w-none">
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 h-1/3 w-1/3 rounded-tl-card border-t-[1.5px] border-l-[1.5px] border-gold"
          />
          <div className="relative aspect-4/5 overflow-hidden rounded-media bg-background">
            {/* Photo fills the 4:5 panel from the top; the frame crops below the waist */}
            <img
              src={portrait.src}
              srcSet={portrait.srcSet}
              sizes="(min-width: 76rem) 30rem, (min-width: 48rem) 40vw, 24rem"
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-top"
            />
          </div>
        </div>

        <div className="max-w-[36rem]">
          <p className="flex items-center gap-3 eyebrow text-gold-deep">
            <span aria-hidden="true" className="gold-rule w-8" />
            {eyebrow}
          </p>
          <h2 id="about-intro-heading" className="mt-4 text-h2">
            {heading}
          </h2>

          <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.75] text-muted">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <Link
            to={cta.to}
            className="group mt-8 inline-flex items-center gap-2 font-semibold text-navy underline-offset-4 hover:underline"
          >
            {cta.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4 text-gold transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
