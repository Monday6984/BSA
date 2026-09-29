import { HandHeart, type LucideIcon, Megaphone, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { FeedbackForm } from '@/components/forms/FeedbackForm';
import { VolunteerForm } from '@/components/forms/VolunteerForm';
import { Container } from '@/components/layout/Container';
import { joinPage } from '@/data/join';

const icons: Record<string, LucideIcon> = {
  users: Users,
  megaphone: Megaphone,
  'hand-heart': HandHeart,
};

/** Short gold rule above a serif heading, as on the Donate page. */
function RuleAbove() {
  return <span aria-hidden="true" className="gold-rule block w-12" />;
}

/* -------------------------------------------------------------------------- */

/** Short participation intro at a comfortable reading width. */
export function JoinIntro() {
  const { heading, body } = joinPage.intro;

  return (
    <section aria-labelledby="intro-heading" className="bg-white py-14 lg:py-20">
      <Container>
        <RuleAbove />
        <h2 id="intro-heading" className="mt-5 max-w-3xl text-h2">
          {heading}
        </h2>
        <p className="mt-5 max-w-[42rem] text-[1.0625rem] leading-[1.75] text-text">{body}</p>
      </Container>
    </section>
  );
}

/**
 * The two forms side by side: Constituency feedback LEFT, Volunteer sign-up
 * RIGHT (DOM order, so they stack in the same order on mobile).
 */
export function JoinForms() {
  const { feedback, volunteer } = joinPage;

  return (
    <div className="bg-background py-14 lg:py-20">
      <Container className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        <FormPanel id={feedback.id} heading={feedback.heading} description={feedback.description}>
          <FeedbackForm
            submitLabel={feedback.submitLabel}
            successMessage={feedback.successMessage}
          />
        </FormPanel>
        <FormPanel
          id={volunteer.id}
          heading={volunteer.heading}
          description={volunteer.description}
        >
          <VolunteerForm
            roles={volunteer.roles}
            submitLabel={volunteer.submitLabel}
            successMessage={volunteer.successMessage}
          />
        </FormPanel>
      </Container>
    </div>
  );
}

function FormPanel({
  id,
  heading,
  description,
  children,
}: {
  id: string;
  heading: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="flex scroll-mt-28 flex-col rounded-card border border-border bg-white p-6 sm:p-8"
    >
      <RuleAbove />
      <h2 id={`${id}-heading`} className="mt-4 text-[1.75rem] leading-tight sm:text-[2rem]">
        {heading}
      </h2>
      <p className="mt-3 mb-7 max-w-md text-[0.9375rem] leading-relaxed text-muted sm:text-base">
        {description}
      </p>
      {children}
    </section>
  );
}

/** Three simple cards: icon, title, one line. */
export function MoreWays() {
  const { heading, cards } = joinPage.moreWays;

  return (
    <section aria-labelledby="more-ways-heading" className="bg-white py-14 lg:py-20">
      <Container>
        <RuleAbove />
        <h2 id="more-ways-heading" className="mt-5 text-h2">
          {heading}
        </h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12 lg:gap-6">
          {cards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <li
                key={card.title}
                className="flex items-start gap-4 rounded-card border border-border bg-white p-6"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-deep"
                >
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-h3">{card.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{card.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
