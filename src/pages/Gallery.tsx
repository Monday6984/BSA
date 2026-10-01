import { useMemo, useState } from 'react';
import { FromTheCampaign } from '@/components/gallery/FromTheCampaign';
import { GalleryCard } from '@/components/gallery/GalleryCard';
import { GalleryFilters } from '@/components/gallery/GalleryFilters';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox';
import { Container } from '@/components/layout/Container';
import { ImageHero } from '@/components/layout/ImageHero';
import { PageCTA } from '@/components/layout/PageCTA';
import { Seo } from '@/components/seo/Seo';
import { Button } from '@/components/ui/Button';
import { Highlight } from '@/components/ui/SectionHeading';
import { type GalleryFilter, galleryItems, galleryPage } from '@/data/gallery';
import type { GalleryItem } from '@/types/content';

const matches = (item: GalleryItem, filter: GalleryFilter) =>
  filter === 'all' || (filter === 'videos' ? item.type === 'video' : item.category === filter);

/**
 * Gallery page. Content is local (data/gallery.ts): no CMS or API calls.
 * Ends with its own Community Impact CTA; the site-wide one is switched off
 * for this route in App.tsx.
 */
export default function Gallery() {
  const { seo, hero, pageSize, emptyMessage, fromTheCampaign, cta } = galleryPage;
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [visible, setVisible] = useState(pageSize);
  const [lightbox, setLightbox] = useState<{ items: GalleryItem[]; index: number } | null>(null);

  const featured = galleryItems.find((item) => item.featured) ?? galleryItems[0];
  const rest = useMemo(() => galleryItems.filter((item) => item !== featured), [featured]);
  const campaignPicks = useMemo(
    () => galleryItems.filter((item) => item.fromTheCampaign).slice(0, 3),
    [],
  );

  // "All" skips the featured item (it's shown above); a category includes it
  const filtered = useMemo(
    () => (filter === 'all' ? rest : galleryItems.filter((item) => matches(item, filter))),
    [filter, rest],
  );
  const shown = filtered.slice(0, visible);

  const changeFilter = (next: GalleryFilter) => {
    setFilter(next);
    setVisible(pageSize);
  };

  // Grid tiles open the viewer on the whole filtered list, so it can step past the loaded items
  const openIn = (items: GalleryItem[]) => (index: number) => setLightbox({ items, index });

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/gallery" />
      <ImageHero
        id="gallery-heading"
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

      {featured && (
        <section aria-labelledby="featured-heading" className="bg-white pt-10 lg:pt-14">
          <Container>
            <h2 id="featured-heading" className="sr-only">
              Featured
            </h2>
            <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
              <GalleryCard
                item={featured}
                variant="feature"
                priority
                sizes="(min-width: 76rem) 76rem, 100vw"
                onOpen={() => openIn([featured, ...rest])(0)}
              />
            </div>
          </Container>
        </section>
      )}

      <section aria-labelledby="all-media-heading" className="bg-white py-10 lg:py-14">
        <Container>
          <h2 id="all-media-heading" className="sr-only">
            Photos and videos
          </h2>
          <GalleryFilters active={filter} onChange={changeFilter} />
          <p aria-live="polite" className="sr-only">
            {`Showing ${shown.length} of ${filtered.length} items`}
          </p>

          <div className="mt-6 lg:mt-8">
            {filtered.length > 0 ? (
              <GalleryGrid items={shown} onOpen={openIn(filtered)} />
            ) : (
              <p className="rounded-card border border-border bg-background px-6 py-14 text-center text-muted">
                {emptyMessage}
              </p>
            )}
          </div>

          {shown.length < filtered.length && (
            <div className="mt-10 flex justify-center">
              <Button variant="outline" onClick={() => setVisible((n) => n + pageSize)}>
                Load more
              </Button>
            </div>
          )}
        </Container>
      </section>

      <FromTheCampaign
        heading={fromTheCampaign.heading}
        items={campaignPicks}
        onOpen={openIn(campaignPicks)}
      />

      <PageCTA id="gallery-cta" className="pt-4 pb-14 lg:pb-16" {...cta} />

      <GalleryLightbox
        items={lightbox?.items ?? []}
        index={lightbox?.index ?? null}
        onIndexChange={(index) => setLightbox((lb) => (lb ? { ...lb, index } : lb))}
        onClose={() => setLightbox(null)}
      />
    </>
  );
}
