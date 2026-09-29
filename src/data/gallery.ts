import { assets } from '@/lib/assets';
import type { GalleryCategory, GalleryItem } from '@/types/content';

/**
 * Gallery content: local photos and YouTube videos. No CMS; edit this file.
 *
 * Add a photo: put the file in /public/assets/images/gallery/ and add an
 * { type: 'image', ... } entry with `image: { src, width, height, alt }`.
 * Add a video: add a { type: 'video', youtubeId: '...' } entry.
 * Items show in the order listed here (put the newest first).
 *
 * Titles use approved campaign copy or the photo's own printed caption.
 * Dates are left out until the campaign confirms them.
 */
const items: GalleryItem[] = [
  {
    id: 'community-outreach-01',
    type: 'image',
    category: 'community-outreach',
    title: 'Supporting families across Ogbomoso South',
    featured: true,
    image: {
      ...assets.projects.communityOutreach,
      alt: 'Women from the community seated together at a community outreach gathering',
      position: '50% 55%',
    },
  },
  {
    id: 'ojude-ajaawa-borehole',
    type: 'image',
    category: 'projects',
    // From the caption printed on the photograph
    title: 'Commissioning of Ojude Ajaawa Borehole',
    fromTheCampaign: true,
    image: {
      ...assets.projects.campaign,
      alt: 'Booda Sunday Adeyemo speaking through a megaphone at a BSA Foundation borehole commissioning',
      position: '55% 30%',
    },
  },
  {
    id: 'cash-gift-students',
    type: 'image',
    category: 'education',
    title: 'Cash gifts to support students',
    fromTheCampaign: true,
    image: {
      ...assets.projects.cashGift,
      alt: 'Booda Sunday Adeyemo presenting a BSA Foundation scholarship cheque to a student',
      position: '30% 40%',
    },
  },
  {
    id: 'classroom-outreach-01',
    type: 'image',
    category: 'education',
    title: 'Outreach in the classroom',
    image: {
      ...assets.projects.classroom,
      alt: 'A teacher addressing a classroom of students with open textbooks',
      position: '40% 45%',
    },
  },
  {
    id: 'classroom-outreach-02',
    type: 'image',
    category: 'education',
    title: 'Students in class',
    image: {
      ...assets.projects.classroom2,
      alt: 'Students in school uniform working through exam papers at their desks',
      position: '50% 40%',
    },
  },
  {
    id: 'residents-gathering',
    type: 'image',
    category: 'campaign',
    title: 'Engaging with our people',
    fromTheCampaign: true,
    image: {
      ...assets.projects.communityOutreach2,
      alt: 'Residents gathered outdoors listening to a speaker',
      position: '50% 25%',
    },
  },
  {
    // DEMO — fake ID so the video player can be tested. Development only;
    // delete once a real campaign video is added.
    id: 'demo-video',
    type: 'video',
    category: 'events',
    title: 'Demo video (replace with a campaign YouTube video)',
    youtubeId: 'YOUTUBE_VIDEO_ID',
    placeholder: true,
    thumbnail: { ...assets.community, alt: '', position: '50% 60%' },
  },
];

/** Published items: demo placeholders are dropped from production builds. */
export const galleryItems: GalleryItem[] = items.filter(
  (item) => import.meta.env.DEV || !(item.type === 'video' && item.placeholder),
);

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  campaign: 'Campaign',
  'community-outreach': 'Community Outreach',
  events: 'Events',
  projects: 'Projects',
  education: 'Education',
};

/** Filter row. "videos" matches every video regardless of category. */
export const galleryFilters = [
  { value: 'all', label: 'All' },
  { value: 'campaign', label: 'Campaign' },
  { value: 'community-outreach', label: 'Community Outreach' },
  { value: 'events', label: 'Events' },
  { value: 'projects', label: 'Projects' },
  { value: 'education', label: 'Education' },
  { value: 'videos', label: 'Videos' },
] as const;

export type GalleryFilter = (typeof galleryFilters)[number]['value'];

export const galleryPage = {
  seo: {
    title: 'Gallery',
    description:
      'Photos and videos from community activities, outreach programmes, events and campaign engagements across Ogbomoso South.',
  },
  hero: {
    eyebrow: 'Campaign Gallery',
    heading: { lead: 'Moments from the', highlight: 'ground.' },
    subtitle:
      'Photos and videos from community activities, outreach programmes, events and campaign engagements across Ogbomoso South.',
    image: { ...assets.projects.classroom, alt: '', position: '40% 40%' },
  },
  /** Items revealed per "Load more" */
  pageSize: 12,
  emptyMessage: 'No gallery items in this category yet.',
  fromTheCampaign: { heading: 'From the campaign' },
  cta: {
    eyebrow: '',
    title: 'See the work behind the campaign.',
    highlight: '',
    description:
      'Explore the projects, programmes and community work happening across Ogbomoso South.',
    buttonText: 'Explore Community Impact',
    buttonHref: '/projects',
  },
};
