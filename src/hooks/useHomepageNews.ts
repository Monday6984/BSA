import { useEffect, useState } from 'react';
import { getHomepageNews } from '@/lib/news';
import type { HomepageNews } from '@/types/news';

export type HomepageNewsState =
  { status: 'loading' } | { status: 'ready'; news: HomepageNews } | { status: 'error' };

/** Loads the homepage's featured + secondary articles from Sanity. */
export function useHomepageNews(): HomepageNewsState {
  const [state, setState] = useState<HomepageNewsState>({ status: 'loading' });

  useEffect(() => {
    let active = true;
    getHomepageNews()
      .then((news) => active && setState({ status: 'ready', news }))
      .catch((error: unknown) => {
        if (import.meta.env.DEV) console.warn('[news] Homepage news unavailable:', error);
        if (active) setState({ status: 'error' });
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}
