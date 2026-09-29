import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { type GroundActivity, onTheGround } from '@/data/projects';
import { cn } from '@/lib/cn';

/**
 * "On the ground" — intro + stats (~37%) beside a three-photo grid (~63%):
 * one tall feature card and two stacked cards. A navy commitment banner
 * closes the section. Stacks on mobile: intro, stats, feature, cards, banner.
 */
export function OnTheGround() {
  const { eyebrow, heading, intro, cta, activities } = onTheGround;
  const [feature, ...others] = activities;

  return (
    <section aria-labelledby="on-the-ground-heading" className="bg-background py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[37fr_63fr] lg:items-center lg:gap-10 xl:gap-14">
          <div>
            <p className="flex items-center gap-3 eyebrow text-navy">
              <span aria-hidden="true" className="gold-rule w-8" />
              {eyebrow}
            </p>
            <h2 id="on-the-ground-heading" className="mt-4 text-h2">
              <span className="block">{heading.lead}</span>{' '}
              <span className="block">
                {heading.highlightLead}{' '}
                <span className="text-gold-display">{heading.highlight}</span>
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-[1.0625rem]">
              {intro}
            </p>
            <ButtonLink to={cta.to} withArrow className="mt-8">
              {cta.label}
            </ButtonLink>
            <ProjectStats />
          </div>

          <ul className="grid grid-cols-1 gap-4 md:h-[30rem] md:grid-cols-[1.6fr_1fr] md:grid-rows-2 lg:h-[clamp(27rem,34vw,30rem)]">
            <ActivityCard activity={feature} feature />
            {others.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </ul>
        </div>

        <CommitmentBanner />
      </Container>
    </section>
  );
}

/** Unconfirmed figures stay out of production until `stats.confirmed` is true. */
function ProjectStats() {
  const { confirmed, items } = onTheGround.stats;
  if (!confirmed && !import.meta.env.DEV) return null;

  return (
    <div className="mt-10">
      <dl className="flex">
        {items.map((stat) => (
          <div
            key={stat.label}
            className="flex min-w-0 flex-col-reverse justify-end border-l border-gold/60 px-4 first:border-l-0 first:pl-0 last:pr-0 sm:px-5"
          >
            <dt className="mt-1.5 text-sm leading-snug text-muted">{stat.label}</dt>
            <dd className="font-heading text-[1.625rem] leading-none font-bold whitespace-nowrap text-navy sm:text-[1.75rem]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      {!confirmed && (
        <p role="note" className="mt-3 text-xs font-medium text-error">
          Dev only: unconfirmed figures, hidden in production until approved.
        </p>
      )}
    </div>
  );
}

function ActivityCard({
  activity,
  feature = false,
}: {
  activity: GroundActivity;
  feature?: boolean;
}) {
  const { category, title, description, image, to } = activity;

  return (
    <li className={cn(feature && 'md:row-span-2')}>
      <Link
        to={to}
        className={cn(
          'group relative block h-full overflow-hidden rounded-card bg-navy md:aspect-auto',
          feature ? 'aspect-[4/3.4]' : 'aspect-[16/10]',
        )}
      >
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={feature ? '(min-width: 64rem) 36vw, 100vw' : '(min-width: 64rem) 22vw, 100vw'}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: image.position }}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
        />
        {/* Bottom gradient for legible text; lifts slightly on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/35 via-45% to-transparent to-75% transition-opacity duration-300 group-hover:opacity-90"
        />

        <div
          className={cn(
            'absolute inset-x-0 bottom-0 flex items-end gap-4',
            feature ? 'p-5 sm:p-7' : 'p-5 sm:p-6',
          )}
        >
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2.5 eyebrow text-white">
              <span aria-hidden="true" className="gold-rule w-6" />
              {category}
            </p>
            <h3
              className={cn(
                'mt-2 font-heading leading-tight font-bold text-white',
                feature ? 'text-2xl sm:text-[1.75rem]' : 'text-xl',
              )}
            >
              {title}
            </h3>
            {description && (
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/90 sm:text-[0.9375rem]">
                {description}
              </p>
            )}
          </div>
          <span
            aria-hidden="true"
            className={cn(
              'flex shrink-0 items-center justify-center rounded-full bg-gold text-navy transition-transform motion-safe:group-hover:translate-x-1',
              feature ? 'size-12' : 'size-11',
            )}
          >
            <ArrowRight className="size-5" />
          </span>
        </div>
      </Link>
    </li>
  );
}

function CommitmentBanner() {
  const { eyebrow, heading, body, cta } = onTheGround.commitment;

  return (
    <div className="mt-10 rounded-card surface-dark px-7 py-8 sm:px-10 lg:mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto] lg:items-center lg:px-12 lg:py-9">
      <div>
        <p className="flex items-center gap-3 eyebrow text-white">
          <span aria-hidden="true" className="gold-rule w-6" />
          {eyebrow}
        </p>
        <h3 className="mt-2 font-heading text-[1.625rem] leading-tight font-bold sm:text-[1.875rem] lg:text-[1.75rem]">
          {heading.lead} <span className="text-gold lg:block">{heading.highlight}</span>
        </h3>
      </div>
      <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-white/90 lg:mx-8 lg:mt-0 lg:border-x lg:border-white/20 lg:px-8">
        {body}
      </p>
      <ButtonLink to={cta.to} withArrow className="mt-6 lg:mt-0">
        {cta.label}
      </ButtonLink>
    </div>
  );
}
