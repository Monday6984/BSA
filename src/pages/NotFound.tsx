import { PageHeader } from '@/components/layout/PageHeader';
import { Seo } from '@/components/seo/Seo';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <PageHeader
        title="Page not found"
        description="The page you’re looking for doesn’t exist or has moved."
      />
      <Section>
        <ButtonLink to="/" variant="secondary" withArrow>
          Back to home
        </ButtonLink>
      </Section>
    </>
  );
}
