import { Link } from 'react-router';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { campaign, socialLinks } from '@/data/campaign';
import { footerNavigation } from '@/data/navigation';
import { Container } from './Container';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark">
      <Container className="grid gap-12 py-section-sm md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-4">
          {/* White plate keeps the navy logo legible without recolouring it */}
          <div className="inline-flex rounded-card bg-white p-2">
            <Logo imgClassName="h-22" />
          </div>
          <p className="mt-5 max-w-xs text-sm text-on-navy-muted">
            {campaign.candidateName}
            <br />
            {campaign.constituency}
            <br />
            {campaign.party.name} ({campaign.party.abbreviation})
          </p>

          {socialLinks.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4" aria-label="Social media">
              {socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white underline-offset-4 hover:text-gold hover:underline"
                  >
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick links */}
        <nav aria-labelledby="footer-links-heading" className="lg:col-span-4">
          <h2 id="footer-links-heading" className="font-sans text-base font-semibold text-white">
            Quick links
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
            {footerNavigation.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-on-navy-muted transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Newsletter */}
        <div className="md:col-span-2 lg:col-span-4">
          <h2 className="font-sans text-base font-semibold text-white">Stay updated</h2>
          <p className="mt-2 mb-4 text-sm text-on-navy-muted">
            Subscribe to receive the latest updates and campaign news.
          </p>
          <NewsletterForm tone="dark" />
        </div>
      </Container>

      <div className="border-t border-navy-700">
        <Container className="flex flex-col gap-3 py-6 text-sm text-on-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {campaign.candidateName}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
