import { ImageHero } from '@/components/layout/ImageHero';
import { PageCTA } from '@/components/layout/PageCTA';
import {
  Achievements,
  NextSteps,
  Pillars,
  Transparency,
} from '@/components/manifesto/ManifestoSections';
import { Seo } from '@/components/seo/Seo';
import { manifestoPage } from '@/data/manifesto';

/**
 * Manifesto page. Ends with a single Community Impact CTA (PageCTA with props);
 * the site-wide Join the Movement CTA is switched off for this route in App.tsx.
 */
export default function Manifesto() {
  const { seo, hero, impactCta } = manifestoPage;

  return (
    <>
      <Seo title={seo.title} titleIsFull description={seo.description} path="/manifesto" />
      <ImageHero
        id="manifesto-heading"
        heading={hero.heading}
        subtitle={hero.subtitle}
        image={hero.backdrop}
      />
      <Achievements />
      <Pillars />
      <NextSteps />
      <Transparency />
      <PageCTA id="impact-cta" className="pt-12 pb-20 lg:pt-16 lg:pb-24" {...impactCta} />
    </>
  );
}
