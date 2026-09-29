import { ArrowRight, HeartHandshake, Lock, type LucideIcon, Megaphone, Users } from 'lucide-react';
import { Link } from 'react-router';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { Container } from '@/components/layout/Container';
import { joinMovement, type MovementOption } from '@/data/home';
import { cn } from '@/lib/cn';

const optionStyles: Record<MovementOption['icon'], { Icon: LucideIcon; badge: string }> = {
  users: { Icon: Users, badge: 'bg-gold-soft text-gold' },
  megaphone: { Icon: Megaphone, badge: 'bg-green-soft text-green' },
  'heart-handshake': { Icon: HeartHandshake, badge: 'bg-gold-soft text-gold' },
};

/**
 * "Join the movement" — intro (~34%) beside three participation cards (~66%),
 * then the navy "Stay connected" signup banner. From xl the campaign image sits
 * in the banner's left side and rises into the space under the intro; below xl
 * it appears as its own block after the intro copy.
 */
export function JoinMovement() {
  const { eyebrow, heading, intro, options } = joinMovement;

  return (
    <section
      aria-labelledby="join-heading"
      className="overflow-hidden bg-background py-20 lg:py-24"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[37fr_63fr] xl:gap-10">
          <div>
            <p className="flex items-center gap-3 eyebrow text-navy">
              <span aria-hidden="true" className="gold-rule w-8" />
              {eyebrow}
            </p>
            <h2 id="join-heading" className="mt-4 text-h2">
              <span className="block">{heading.lead}</span>{' '}
              <span className="xl:whitespace-nowrap">
                <span className="text-gold-display">{heading.highlight}</span> {heading.trail}
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-[1.0625rem]">
              {intro}
            </p>
            <InlineImage />
          </div>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:self-start">
            {options.map((option) => (
              <OptionCard key={option.id} option={option} />
            ))}
          </ul>
        </div>

        <SignupBanner />
      </Container>
    </section>
  );
}

/** Below xl: the campaign image as a standalone block after the intro. */
function InlineImage() {
  const { image } = joinMovement;
  return (
    <div className="mt-8 aspect-4/3 overflow-hidden rounded-card sm:aspect-[16/7] xl:hidden">
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="100vw"
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="size-full object-cover object-[0%_30%]"
      />
    </div>
  );
}

function OptionCard({ option }: { option: MovementOption }) {
  const { title, description, cta, image, icon } = option;
  const style = optionStyles[icon];

  return (
    <li className="group relative flex flex-col rounded-card border border-border bg-white transition duration-300 hover:shadow-card motion-safe:hover:-translate-y-1">
      <div className="relative h-44 overflow-hidden rounded-t-card">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 80rem) 16rem, (min-width: 64rem) 30vw, (min-width: 40rem) 50vw, 100vw"
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: image.position }}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
        />
      </div>

      <div className="relative flex flex-1 flex-col px-6 pt-13 pb-7 xl:px-5">
        <span
          aria-hidden="true"
          className={cn(
            'absolute -top-9 left-6 flex size-18 items-center justify-center rounded-full ring-4 ring-white',
            style.badge,
          )}
        >
          <style.Icon className="size-7" strokeWidth={1.75} />
        </span>
        <h3 className="font-heading text-xl leading-snug font-bold">{title}</h3>
        <p className="mt-3 text-[0.9375rem] leading-[1.3] text-muted">{description}</p>
        {/* Stretched link: the whole card is clickable, the text stays the accessible name */}
        <Link
          to={cta.to}
          className="mt-auto inline-flex items-center gap-2 self-start border-b-2 border-gold pt-6 pb-1 text-sm font-semibold whitespace-nowrap text-navy after:absolute after:inset-0 after:rounded-card"
        >
          {cta.label}
          <ArrowRight
            aria-hidden="true"
            className="size-4 text-gold transition-transform motion-safe:group-hover:translate-x-1"
          />
        </Link>
      </div>
    </li>
  );
}

function SignupBanner() {
  const { image, signup } = joinMovement;

  return (
    <div className="relative mt-12 rounded-card surface-dark">
      {/* From xl: image fills the banner's left and rises above it, fading up and to the right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 hidden h-[calc(100%+10rem)] w-[35%] overflow-hidden rounded-bl-card xl:block"
      >
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="40vw"
          alt=""
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className="size-full mask-t-from-85% mask-r-from-75% object-cover object-[8%_50%]"
        />
      </div>

      <div className="relative grid grid-cols-1 items-center gap-8 px-7 py-9 sm:px-10 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:gap-7 xl:py-12 xl:pr-10 xl:pl-[36%]">
        <div>
          <p className="flex items-center gap-3 eyebrow text-white">
            <span aria-hidden="true" className="gold-rule w-6" />
            {signup.eyebrow}
          </p>
          <h3 className="mt-3 font-heading text-[1.875rem] leading-tight font-bold sm:text-[2.25rem] xl:text-[1.875rem]">
            {signup.heading.lead} <span className="text-gold">{signup.heading.highlight}</span>
          </h3>
          <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/90">
            {signup.body}
          </p>
        </div>

        <span aria-hidden="true" className="hidden w-px self-stretch bg-white/20 xl:block" />

        <NewsletterForm
          tone="dark"
          attached
          withArrow
          placeholder={signup.placeholder}
          submitLabel={signup.submitLabel}
          footnote={
            <p className="flex items-center gap-2 text-sm text-on-navy-muted">
              <Lock aria-hidden="true" className="size-4 shrink-0" />
              {signup.privacy}
            </p>
          }
        />
      </div>
    </div>
  );
}
