import { isRouteErrorResponse, useRouteError } from 'react-router';
import { PageHeader } from '@/components/layout/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import NotFound from '@/pages/NotFound';

/**
 * Error UI for news routes: the site's 404 page for unknown slugs, and a
 * friendly "unavailable" message if the CMS can't be reached.
 */
export function NewsErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />;

  if (import.meta.env.DEV) console.warn('[news] Failed to load:', error);

  return (
    <>
      <Seo title="News & updates" path="/news" noindex />
      <PageHeader
        title="News & updates"
        description="Updates are unavailable right now. Please check back soon."
      />
      <Section>
        <ButtonLink to="/" variant="secondary" withArrow>
          Back to home
        </ButtonLink>
      </Section>
    </>
  );
}
