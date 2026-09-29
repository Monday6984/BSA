import { JoinForms, JoinIntro, MoreWays } from '@/components/join/JoinSections';
import { ImageHero } from '@/components/layout/ImageHero';
import { PageCTA } from '@/components/layout/PageCTA';
import { Seo } from '@/components/seo/Seo';
import { Highlight } from '@/components/ui/SectionHeading';
import { joinPage } from '@/data/join';

/**
 * Join the Movement page. Ends with its own CTA (PageCTA with props); the
 * site-wide one is switched off for this route in App.tsx.
 */
export default function JoinMovement() {
  const { seo, hero, finalCta } = joinPage;

  return (
    <>
      <Seo title={seo.title} titleIsFull description={seo.description} path="/join-the-movement" />
      <ImageHero
        id="join-heading"
        eyebrow={hero.eyebrow}
        heading={
          <>
            {hero.heading.lead} <Highlight>{hero.heading.highlight}</Highlight>
          </>
        }
        subtitle={hero.subtitle}
        image={hero.image}
        imagePosition={hero.image.position}
      />
      <JoinIntro />
      <JoinForms />
      <MoreWays />
      <PageCTA id="join-cta" className="py-12 lg:py-16" {...finalCta} />
    </>
  );
}
