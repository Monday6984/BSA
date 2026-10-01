import sizes from '@/data/generated/project-photos.json';
import type { ImageAsset } from '@/types/content';

/** Slugs written by `npm run images` (scripts/optimize-images.mjs). */
export type ProjectPhotoSlug = keyof typeof sizes;

/**
 * Web copy of a project photo: WebP at 640/1000/1400px plus a JPEG fallback,
 * generated from the original in assets-source/projects/. Sizes come from the
 * generated manifest, so the browser always knows the right aspect ratio.
 */
export function projectPhoto(
  slug: ProjectPhotoSlug,
  alt: string,
  position?: string,
): ImageAsset & { position?: string } {
  const { width, height } = sizes[slug];
  return {
    src: `/assets/images/projects/${slug}.jpg`,
    srcSet: [640, 1000, 1400]
      .map((w) => `/assets/images/projects/${slug}-${w}.webp ${w}w`)
      .join(', '),
    width,
    height,
    alt,
    position,
  };
}
