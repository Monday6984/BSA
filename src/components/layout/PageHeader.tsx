import type { ReactNode } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from './Container';

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
}

/** Top-of-page title band for inner pages. Owns the page's single <h1>. */
export function PageHeader({ title, eyebrow, description }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-background py-section-sm">
      <Container>
        <SectionHeading as="h1" title={title} eyebrow={eyebrow} description={description} />
      </Container>
    </div>
  );
}
