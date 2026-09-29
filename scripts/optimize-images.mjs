/**
 * Generates resized WebP copies of supplied photographs for responsive srcset.
 *
 * Resize + re-encode only: no cropping, colour, sharpening or retouching.
 * Original files are read, never written. Run: npm run images
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_DIR = 'public/assets/images';
const OUT_DIR = 'public/assets/images/optimized';

const jobs = [
  { file: 'booda-sunday-adeyemo.png', widths: [480, 800, 1024] },
  { file: 'booda-sunday-adeyemo-white.png', widths: [480, 800, 1200] },
  { file: 'ogbomosho-cityscape-background.png', widths: [900, 1400, 1774] },
  { file: 'ogbomosho-community.png', widths: [640, 1000, 1400] },
  { file: 'community-outreach-1.jpg', widths: [640, 1000, 1400] },
  { file: 'campaign.jpg', widths: [640, 1000, 1400] },
  { file: 'cash-gift.jpg', widths: [640, 1000, 1400] },
  { file: 'community-outreach-2.jpg', widths: [640, 1000, 1536] },
  { file: 'outreach-in-the-classroom.jpg', widths: [640, 1000, 1400] },
  { file: 'outreach-in-the-classroom-2.jpg', widths: [640, 1000, 1400] },
  { file: 'join-the-movement.png', widths: [800, 1400, 2109] },
  { file: 'volunteer-with-us.png', widths: [480, 768, 1024] },
  { file: 'spread-the-word.png', widths: [480, 768, 1024] },
  { file: 'support-the-campaign.png', widths: [480, 768, 1024] },
];

await mkdir(OUT_DIR, { recursive: true });

for (const { file, widths } of jobs) {
  const base = path.parse(file).name;
  for (const width of widths) {
    const out = path.join(OUT_DIR, `${base}-${width}.webp`);
    const info = await sharp(path.join(SRC_DIR, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(out);
    console.log(`${out}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
}
