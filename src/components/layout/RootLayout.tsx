import { Outlet, ScrollRestoration, useMatches, useNavigation } from 'react-router';
import { Footer } from './Footer';
import { Header } from './Header';
import { PageCTA } from './PageCTA';

/** Routes can opt out of the site-wide CTA with `handle: { hidePageCta: true }`. */
interface RouteHandle {
  hidePageCta?: boolean;
}

/** Shared shell for every route: skip link, header, main landmark, footer. */
export function RootLayout() {
  // True while a route (e.g. a CMS-backed news page) is loading its data
  const loading = useNavigation().state === 'loading';
  const hidePageCta = useMatches().some(
    (match) => (match.handle as RouteHandle | undefined)?.hidePageCta,
  );

  return (
    <div className="flex min-h-dvh flex-col">
      {loading && (
        <div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-50 h-0.5 animate-pulse bg-gold"
        />
      )}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-button focus:bg-navy focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} aria-busy={loading} className="flex-1 outline-none">
        <Outlet />
        {!hidePageCta && <PageCTA />}
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
