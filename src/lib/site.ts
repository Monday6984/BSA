/** Site-wide constants used by SEO and layout. */
export const site = {
  name: 'Booda Sunday Adeyemo',
  shortName: 'BSA',
  /** Homepage <title>. Built only from confirmed facts. */
  defaultTitle: 'Booda Sunday Adeyemo | Ogbomoso South State Constituency',
  /**
   * Canonical origin for canonical links and Open Graph URLs (no trailing slash).
   * Confirmed production domain; VITE_SITE_URL overrides it (e.g. for a staging host).
   */
  url:
    (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
    'https://boodasundayadeyemo.com',
  locale: 'en_NG',
} as const;
