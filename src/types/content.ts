/**
 * Content models. These mirror what a CMS/API would return so the UI can be
 * wired to a backend later without changing components.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Responsive candidates, e.g. "/a-480.webp 480w, /a-800.webp 800w" */
  srcSet?: string;
}

export interface NavItem {
  label: string;
  to: string;
}

export interface SocialLink {
  platform: 'facebook' | 'x' | 'instagram' | 'youtube' | 'tiktok' | 'whatsapp';
  label: string;
  href: string;
}

export interface CallToAction {
  label: string;
  to: string;
}

export interface ManifestoPillar {
  id: string;
  title: string;
  summary: string;
  /** Lucide icon name, resolved in the UI layer. */
  icon?: string;
  commitments?: string[];
}

export type ProjectCategory =
  'community-outreach' | 'local-economy' | 'education' | 'infrastructure';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  summary?: string;
  location?: string;
  /** ISO 8601 date string */
  date?: string;
  image?: ImageAsset;
}

export interface CaptionTrack {
  /** WebVTT file path */
  src: string;
  /** BCP 47 language code, e.g. "en" or "yo" */
  srclang: string;
  label: string;
}

export interface VideoAsset {
  src: string;
  /** MIME type, e.g. "video/mp4" */
  type: string;
  /** Accessible name for the player */
  title: string;
  /** Measured from the file; shown before playback */
  durationSeconds?: number;
  /** Optional still shown before playback. Leave unset until an approved image exists. */
  poster?: ImageAsset;
  captions?: CaptionTrack[];
}

export type GalleryCategory =
  'campaign' | 'community-outreach' | 'events' | 'projects' | 'education';

interface GalleryItemBase {
  id: string;
  category: GalleryCategory;
  title: string;
  /** Display date, e.g. "September 2026". Leave out if unknown. */
  date?: string;
  description?: string;
  /** Shown large under the hero. Only the first featured item is used. */
  featured?: boolean;
  /** Also listed in the "From the campaign" section */
  fromTheCampaign?: boolean;
}

export interface GalleryPhoto extends GalleryItemBase {
  type: 'image';
  /** Local asset; alt text is required. `position` is a CSS object-position for the crop. */
  image: ImageAsset & { position?: string };
}

export interface GalleryVideo extends GalleryItemBase {
  type: 'video';
  /** The 11-character ID from the YouTube URL (youtube.com/watch?v=ID). Never hosted locally. */
  youtubeId: string;
  /** Optional custom thumbnail; YouTube's own thumbnail is used otherwise. */
  thumbnail?: ImageAsset & { position?: string };
  /** Demo entry with a fake ID: shown in development only. */
  placeholder?: boolean;
}

export type GalleryItem = GalleryPhoto | GalleryVideo;

export interface HeroContent {
  label: string;
  headline: {
    /** Plain lines, each rendered on its own line on desktop */
    lines: string[];
    /** Final line, rendered in the gold accent */
    highlight: string;
  };
  body: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  /** Transparent cut-out portrait, placed over the backdrop */
  portrait: ImageAsset;
  /** Decorative environmental background behind the portrait */
  backdrop: ImageAsset;
}
