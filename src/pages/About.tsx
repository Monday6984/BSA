import {
  AboutHero,
  Journey,
  PullQuote,
  QuickFacts,
  StorySplit,
} from '@/components/about/AboutSections';
import { PageCTA } from '@/components/layout/PageCTA';
import { Seo } from '@/components/seo/Seo';
import { about } from '@/data/about';

/**
 * About page. Ends with a single Manifesto CTA (PageCTA with props); the
 * site-wide Join the Movement CTA is switched off for this route in App.tsx.
 */
export default function About() {
  const { seo, earlyLife, foundation, running, manifesto } = about;

  return (
    <>
      <Seo title={seo.title} titleIsFull description={seo.description} path="/about" />
      <AboutHero />
      <QuickFacts />
      <StorySplit id="early-life-heading" {...earlyLife} />
      <Journey />
      <PullQuote />
      <StorySplit id="foundation-heading" {...foundation} />
      <StorySplit id="running-heading" {...running} imageAspect="portrait" tone="soft" />
      <PageCTA id="manifesto-cta" highlight="" className="pb-20 lg:pb-24" {...manifesto} />
    </>
  );
}
