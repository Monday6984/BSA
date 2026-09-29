import { galleryCategoryLabels } from '@/data/gallery';
import type { GalleryItem, ImageAsset } from '@/types/content';

export type Thumbnail = ImageAsset & { position?: string };

/** Photo, custom video thumbnail, or YouTube's own (hqdefault always exists). */
export function thumbnailFor(item: GalleryItem): Thumbnail {
  if (item.type === 'image') return item.image;
  return (
    item.thumbnail ?? {
      src: `https://i.ytimg.com/vi/${encodeURIComponent(item.youtubeId)}/hqdefault.jpg`,
      width: 480,
      height: 360,
      alt: '',
    }
  );
}

/**
 * Privacy-enhanced embed (youtube-nocookie.com). Autoplay only applies once
 * the viewer has chosen to open the video; nothing plays on page load.
 */
export function embedUrl(youtubeId: string) {
  const params = new URLSearchParams({ autoplay: '1', rel: '0', playsinline: '1' });
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?${params}`;
}

/** "COMMUNITY OUTREACH · SEPTEMBER 2026" (date only when known). */
export function metaLine(item: GalleryItem) {
  return [galleryCategoryLabels[item.category], item.date].filter(Boolean).join(' · ');
}
