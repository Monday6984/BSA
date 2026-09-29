import { createClient, type SanityClient } from '@sanity/client';

/**
 * Public, read-only Sanity client.
 *
 * - No token: the browser can only read PUBLISHED documents in a public
 *   dataset. Drafts are never visible, and no secret is shipped to users.
 * - `perspective: 'published'` makes that explicit.
 * - `useCdn: true` serves cached responses from Sanity's CDN (fast, and
 *   updates appear within seconds of publishing).
 */
export const sanityConfig = {
  projectId: (import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined) ?? '',
  dataset: (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production',
  apiVersion: (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) || '2025-02-19',
};

export const isSanityConfigured = Boolean(sanityConfig.projectId);

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (!isSanityConfigured) {
    throw new Error('Sanity is not configured. Set VITE_SANITY_PROJECT_ID in .env.local.');
  }
  client ??= createClient({
    ...sanityConfig,
    useCdn: true,
    perspective: 'published',
    // Fail fast so visitors see the "unavailable" message instead of a long spinner
    // (the client's default is 5 retries with exponential backoff).
    maxRetries: 2,
    retryDelay: () => 400,
    timeout: 10_000,
  });
  return client;
}
