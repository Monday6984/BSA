import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImage } from '@/types/news';
import { sanityConfig } from './client';

const builder = createImageUrlBuilder({
  projectId: sanityConfig.projectId || 'unconfigured',
  dataset: sanityConfig.dataset,
});

export function hasImage(image: SanityImage | null | undefined): image is SanityImage {
  return Boolean(image?.asset?._ref);
}

/**
 * URL for a Sanity image cropped to `aspect` (width / height) at `width` px.
 * Respects the editor's crop and hotspot; serves WebP/AVIF where supported.
 */
export function imageUrl(image: SanityImage, width: number, aspect: number): string {
  return builder
    .image(image)
    .width(width)
    .height(Math.round(width / aspect))
    .fit('crop')
    .auto('format')
    .quality(80)
    .url();
}

/** srcset across common widths, so browsers only download what they need. */
export function imageSrcSet(
  image: SanityImage,
  aspect: number,
  widths = [400, 640, 960, 1280, 1600],
): string {
  return widths.map((w) => `${imageUrl(image, w, aspect)} ${w}w`).join(', ');
}
