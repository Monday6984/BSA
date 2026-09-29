import { assets } from '@/lib/assets';
import type { HeroContent, ImageAsset, VideoAsset } from '@/types/content';
import { biography, campaign } from './campaign';

/** Supplied homepage copy. Do not rewrite without campaign approval. */
export const hero: HeroContent = {
  label: campaign.constituency,
  headline: {
    lines: ['Make Ogbomoso', 'South'],
    highlight: 'Great Again',
  },
  body: 'Booda Sunday Adeyemo is building a people-first mandate around jobs, schools, water and roads, carried by the wards that will make it happen.',
  primaryCta: { label: 'Join the Movement', to: '/join-the-movement' },
  secondaryCta: { label: 'Read the Manifesto', to: '/manifesto' },
  portrait: {
    ...assets.portrait.primary,
    alt: 'Booda Sunday Adeyemo smiling, hands clasped, wearing black traditional attire and a striped cap',
  },
  backdrop: {
    ...assets.cityscape,
    alt: '', // decorative
  },
};

/** Supplied countdown message. */
export const countdownMessage = {
  lead: 'Until Election Day —',
  accent: 'every ward counts.',
};

const campaignVideo: VideoAsset = {
  src: assets.video.campaignMessage,
  type: 'video/mp4',
  title: 'Campaign message',
  durationSeconds: 114,
  // poster: PENDING — the first frame is black (fade-in); add an approved still here.
  // captions: PENDING — add WebVTT tracks here when available.
};

/** Campaign message section. Supplied copy — do not rewrite without campaign approval. */
export const campaignMessage = {
  eyebrow: 'Campaign message',
  heading: 'Feeding hope. Serving people.',
  body: 'For over a decade, BSA Foundation has been a consistent source of nourishment, comfort and unwavering support. Since 2020, through global challenges and local needs, we haven’t missed a day in our mission: feeding the people.' as
    string | null,
  video: campaignVideo,
};

/** "Who is Booda?" section. Supplied copy; biography lives in data/campaign.ts. */
export const aboutIntro = {
  eyebrow: 'Who is Booda?',
  heading: 'Building a life of service in Ogbomoso.',
  paragraphs: biography,
  cta: { label: 'Read Booda’s full story', to: '/about' },
  portrait: {
    ...assets.portrait.alternate,
    alt: 'Portrait of Booda Sunday Adeyemo smiling with a raised fist, in white traditional attire and a striped cap',
  },
};

export interface MovementOption {
  id: string;
  title: string;
  description: string;
  cta: { label: string; to: string };
  icon: 'users' | 'megaphone' | 'heart-handshake';
  image: ImageAsset & { position: string };
}

/** "Join the movement" + "Stay connected" section. Supplied copy. */
export const joinMovement = {
  eyebrow: 'Join the movement',
  heading: { lead: 'Be part of a', highlight: 'brighter', trail: 'Ogbomoso.' },
  intro:
    'This movement is bigger than one person. It’s about people who believe in a safer, stronger and more prosperous Ogbomoso South. There’s a place for you. Sign up as a ward volunteer, a polling agent, or simply someone willing to spread the word.',
  /** TEMPORARY image (see lib/assets.ts). Decorative, so no alt text. */
  image: { ...assets.movement.banner, alt: '' },
  options: [
    {
      id: 'volunteer',
      title: 'Volunteer with us',
      description: 'Give your time, skills and energy to help move the campaign forward.',
      cta: { label: 'Join as a volunteer', to: '/join-the-movement' },
      icon: 'users',
      image: { ...assets.movement.volunteer, alt: '', position: '50% 30%' },
    },
    {
      id: 'spread-the-word',
      title: 'Spread the word',
      description:
        'Talk to friends, family and neighbours. Share our message and help more people get involved.',
      cta: { label: 'Help spread the word', to: '/join-the-movement' },
      icon: 'megaphone',
      image: { ...assets.movement.spreadTheWord, alt: '', position: '60% 45%' },
    },
    {
      id: 'support',
      title: 'Support the campaign',
      description:
        'Whether it’s a donation, supplies or other support, your contribution helps us do more on the ground.',
      cta: { label: 'Support us today', to: '/donate' },
      icon: 'heart-handshake',
      image: { ...assets.movement.support, alt: '', position: '50% 55%' },
    },
  ] satisfies MovementOption[],
  signup: {
    eyebrow: 'Stay connected',
    heading: { lead: 'Join the', highlight: 'movement.' },
    body: 'Get campaign updates, event invites and ways to get involved in Ogbomoso South.',
    placeholder: 'Your email address',
    submitLabel: 'Join us',
    privacy: 'We respect your privacy. No spam.',
  },
};

/** "Latest updates" section copy. Articles themselves come from Sanity. */
export const latestUpdates = {
  eyebrow: 'Latest updates',
  heading: 'News from the campaign and our communities.',
  intro:
    'Stay informed about campaign activities, community outreach, events and other important updates.',
  cta: { label: 'View all updates', to: '/news' },
  emptyMessage: 'No updates have been published yet. Please check back soon.',
  errorMessage: 'Updates are unavailable right now. Please check back soon.',
};
