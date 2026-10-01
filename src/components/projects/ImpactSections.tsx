import { ImageIcon, Quote } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { type ImpactCategory, type ImpactProject, projectsPage } from '@/data/projects';
import { cn } from '@/lib/cn';

/** Gold rule + serif heading, as used by every section on this page. */
function RuledHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="flex items-center gap-4 text-[1.5rem] leading-tight sm:text-[1.75rem] lg:text-[2rem]"
    >
      <span aria-hidden="true" className="gold-rule w-10" />
      {children}
    </h2>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * One category: heading, then its project cards. A touch-scrollable row on
 * mobile (the scroll stays inside the row), three across (wrapping) from md.
 */
export function ProjectCategory({
  category,
  tone,
}: {
  category: ImpactCategory;
  tone: 'white' | 'soft';
}) {
  const headingId = `${category.id}-heading`;

  return (
    <section
      id={category.id}
      aria-labelledby={headingId}
      className={cn('py-12 lg:py-16', tone === 'soft' ? 'bg-background' : 'bg-white')}
    >
      <Container>
        <RuledHeading id={headingId}>{category.heading}</RuledHeading>
        {/* Focusable so keyboard users can scroll the row on small screens */}
        <ul
          tabIndex={0}
          aria-label={`${category.heading} projects`}
          className="-mx-gutter mt-7 flex snap-x snap-mandatory scroll-px-gutter [scrollbar-width:thin] gap-4 overflow-x-auto px-gutter pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:mt-8 lg:gap-6"
        >
          {category.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: ImpactProject }) {
  const { title, caption, image } = project;

  return (
    <li className="w-[82%] shrink-0 snap-start sm:w-[46%] md:w-auto">
      <div className="aspect-[16/10] overflow-hidden rounded-card border border-border bg-background">
        {image ? (
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes="(min-width: 76rem) 23rem, (min-width: 48rem) 31vw, (min-width: 40rem) 46vw, 82vw"
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
            style={{ objectPosition: image.position }}
          />
        ) : (
          <PhotoPlaceholder />
        )}
      </div>
      <h3 className="mt-4 font-sans text-base leading-snug font-semibold tracking-normal sm:text-[1.0625rem]">
        {title}
      </h3>
      {caption && <p className="mt-1 text-sm leading-relaxed text-muted">{caption}</p>}
    </li>
  );
}

/** Same frame as a photo, clearly marked, until the campaign supplies the image. */
function PhotoPlaceholder() {
  return (
    <div
      role="note"
      className="flex size-full flex-col items-center justify-center gap-2 border-2 border-dashed border-border text-muted"
    >
      <ImageIcon aria-hidden="true" className="size-6 opacity-60" strokeWidth={1.5} />
      <span className="eyebrow text-[0.6875rem]">Photo to be supplied</span>
    </div>
  );
}

/** Three editorial story cards: quote mark, story, short title. */
export function Stories() {
  const { heading, items } = projectsPage.stories;

  return (
    <section aria-labelledby="stories-heading" className="bg-white py-12 lg:py-16">
      <Container>
        <RuledHeading id="stories-heading">{heading}</RuledHeading>
        <ul className="mt-7 grid gap-5 lg:mt-8 lg:grid-cols-3 lg:gap-6">
          {items.map((story) => (
            <li key={story.id}>
              <article className="flex h-full flex-col rounded-card border border-border bg-white p-6 sm:p-7">
                <Quote aria-hidden="true" className="size-8 shrink-0 fill-gold text-gold" />
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-text">{story.body}</p>
                <h3 className="mt-auto flex items-start gap-3 pt-6 font-sans text-[0.9375rem] leading-snug font-semibold tracking-normal">
                  <span aria-hidden="true" className="mt-[0.6em] gold-rule w-6" />
                  {story.title}
                </h3>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
