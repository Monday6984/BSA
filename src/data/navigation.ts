import type { CallToAction, NavItem } from '@/types/content';

export const mainNavigation: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Manifesto', to: '/manifesto' },
  { label: 'Projects', to: '/projects' },
  { label: 'News & Updates', to: '/news' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Join the Movement', to: '/join-the-movement' },
];

export const donateCta: CallToAction = { label: 'Donate', to: '/donate' };

export const footerNavigation: NavItem[] = [...mainNavigation, { label: 'Donate', to: '/donate' }];
