import { ImageHero } from '@/components/layout/ImageHero';
import { PageCTA } from '@/components/layout/PageCTA';
import { ProjectCategory, Stories } from '@/components/projects/ImpactSections';
import { Seo } from '@/components/seo/Seo';
import { Highlight } from '@/components/ui/SectionHeading';
import { projectsPage } from '@/data/projects';

/**
 * Community Impact page. Ends with a single Support CTA (PageCTA with props);
 * the site-wide Join the Movement CTA is switched off for this route in App.tsx.
 */
export default function Projects() {
  const { seo, hero, categories, supportCta } = projectsPage;

  return (
    <>
      <Seo title={seo.title} titleIsFull description={seo.description} path="/projects" />
      <ImageHero
        id="impact-heading"
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
      {categories.map((category, i) => (
        <ProjectCategory key={category.id} category={category} tone={i % 2 ? 'soft' : 'white'} />
      ))}
      <Stories />
      <PageCTA id="support-cta" className="py-12 lg:py-16" {...supportCta} />
    </>
  );
}
