import type { ComponentType } from 'react';
import { createBrowserRouter, type LoaderFunction, RouterProvider } from 'react-router';
import { RootLayout } from '@/components/layout/RootLayout';

/** Each page is its own chunk, loaded on first visit. */
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
});

/** Pages that load CMS data: also wire up their loader and error boundary. */
const dataPage =
  (
    load: () => Promise<{
      default: ComponentType;
      loader: LoaderFunction;
      ErrorBoundary: ComponentType;
    }>,
  ) =>
  async () => {
    const mod = await load();
    return { Component: mod.default, loader: mod.loader, ErrorBoundary: mod.ErrorBoundary };
  };

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, lazy: page(() => import('@/pages/Home')) },
      {
        path: 'about',
        // Ends with its own Manifesto CTA instead of the site-wide one
        handle: { hidePageCta: true },
        lazy: page(() => import('@/pages/About')),
      },
      {
        path: 'manifesto',
        // Ends with its own Community Impact CTA instead of the site-wide one
        handle: { hidePageCta: true },
        lazy: page(() => import('@/pages/Manifesto')),
      },
      {
        path: 'projects',
        // Ends with its own Support CTA instead of the site-wide one
        handle: { hidePageCta: true },
        lazy: page(() => import('@/pages/Projects')),
      },
      {
        path: 'donate',
        // Ends with its own "Questions about giving?" CTA instead of the site-wide one
        handle: { hidePageCta: true },
        lazy: page(() => import('@/pages/Donate')),
      },
      { path: 'news', lazy: dataPage(() => import('@/pages/News')) },
      { path: 'news/:slug', lazy: dataPage(() => import('@/pages/NewsArticle')) },
      {
        path: 'gallery',
        // Ends with its own Community Impact CTA instead of the site-wide one
        handle: { hidePageCta: true },
        lazy: page(() => import('@/pages/Gallery')),
      },
      {
        path: 'join-the-movement',
        // The conversion page itself, so no site-wide "Join the Movement" CTA
        handle: { hidePageCta: true },
        lazy: page(() => import('@/pages/JoinMovement')),
      },
      { path: '*', lazy: page(() => import('@/pages/NotFound')) },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
