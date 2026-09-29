import { EveryAmount, WaysToGive, WhySupport } from '@/components/donate/DonateSections';
import { ImageHero } from '@/components/layout/ImageHero';
import { PageCTA } from '@/components/layout/PageCTA';
import { Seo } from '@/components/seo/Seo';
import { Highlight } from '@/components/ui/SectionHeading';
import { campaignOffice } from '@/data/campaign';
import { donatePage } from '@/data/donate';

/**
 * Donate page. Ends with a single "Questions about giving?" CTA (PageCTA with
 * props); the site-wide Join the Movement CTA is switched off for this route
 * in App.tsx.
 */
export default function Donate() {
  const { seo, hero, questionsCta } = donatePage;

  return (
    <>
      <Seo title={seo.title} titleIsFull description={seo.description} path="/donate" />
      <ImageHero
        id="donate-heading"
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
      <WhySupport />
      <WaysToGive />
      <EveryAmount />
      <PageCTA
        id="questions-cta"
        className="py-12 lg:py-16"
        buttonHref={campaignOffice.href ?? ''}
        {...questionsCta}
      />
    </>
  );
}
