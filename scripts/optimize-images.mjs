/**
 * Generates resized WebP copies of supplied photographs for responsive srcset.
 *
 * Resize + re-encode only: no cropping, colour, sharpening or retouching.
 * Original files are read, never written. Run: npm run images
 */
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_DIR = 'public/assets/images';
const OUT_DIR = 'public/assets/images/optimized';

const jobs = [
  { file: 'booda-sunday-adeyemo.png', widths: [480, 800, 1024] },
  { file: 'booda-sunday-adeyemo-white.png', widths: [480, 800, 1200] },
  { file: 'ogbomosho-city-view.jpg', widths: [640, 1024] },
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

/*
 * Project photos (Community Impact cards + Gallery). Originals live outside
 * /public in assets-source/projects/ (git-ignored, kept locally). For each
 * project, photos get the slugs <base>, <base>-2, <base>-3 …; the first is the
 * one shown on the Community Impact card. Web copies are written to
 * public/assets/images/projects/<slug>-<width>.webp plus a <slug>.jpg fallback,
 * and their sizes to src/data/generated/project-photos.json.
 * Same rule: resize + re-encode only, so watermarks are untouched.
 */
const PROJECT_SRC = 'assets-source/projects';
const PROJECT_OUT = 'public/assets/images/projects';
const PROJECT_MANIFEST = 'src/data/generated/project-photos.json';
const PROJECT_WIDTHS = [640, 1000, 1400];

const projectPhotos = [
  { base: 'borehole-ojude-ajaawa', files: ['COMISSIONING OF OJUDE AJAAWA BOREHOLE (17).jpg'] },
  { base: 'borehole-akunko-junction-isoko', files: ['BOREHOLE COM AKUNKO JUNC ISOKO (23).jpg'] },
  {
    base: 'okada-bus-stop-seminary',
    files: ['OKADA BSTOP SEMINARY (BSA) (3).jpg', 'OKADA BSTOP SEMINARY (BSA) (5).jpg'],
  },
  {
    base: 'okada-bus-stop-baptist-high-school',
    files: [
      'OKADA BSTOP BAP HIGH SCH (BSA).jpg (2).jpg',
      'OKADA BSTOP BAP HIGH SCH (BSA).jpg (3).jpg',
    ],
  },
  {
    base: 'bus-stop-arowomole',
    files: [
      'Commisioning of BSA Arowomole Bus stop (15).jpg',
      'Commisioning of BSA Arowomole Bus stop (8).jpg',
    ],
  },
  {
    base: 'drainage-oluwatedo',
    files: ['DRAINAGE OLUWATEDO COM (BSA) (7).jpg', 'DRAINAGE OLUWATEDO COM (BSA) (3).jpg'],
  },
  {
    base: 'summit-beyond-limits',
    files: [
      'BSA SUMMIT BEYOND LIMITS 130925 2.jpg',
      'BSA SUMMIT BEYOND LIMITS 130925 5.jpg',
      'BSA SUMMIT BEYOND LIMITS 130925 7.jpg',
    ],
  },
  {
    base: 'majokosile-graduation',
    files: [
      'BSA MAJOKOSILE GRAD (36).jpg',
      'BSA MAJOKOSILE GRAD (25).jpg',
      'BSA MAJOKOSILE GRAD (37).jpg',
    ],
  },
  {
    base: 'bike-riders-akomoran-empowerment',
    files: [
      'BSA BIKE RIDERS APOMORAN EMPOWERMENT (12).jpg',
      'BSA BIKE RIDERS APOMORAN EMPOWERMENT (8).jpg',
      'BSA BIKE RIDERS APOMORAN EMPOWERMENT (1).jpg',
    ],
  },
  {
    base: 'jamb-scholarship-2025',
    files: [
      'BSA JAMB 2025 SCHOLARSHIP ORIENTATION (18).jpg',
      'BSA JAMB 2025 SCHOLARSHIP ORIENTATION (20).jpg',
      'BSA JAMB 2025 SCHOLARSHIP ORIENTATION (1).jpg',
    ],
  },
  {
    base: 'jamb-scholarship-2024',
    files: [
      'BSA 2024 JAMB SCHOLARSHIP (36).jpg',
      'BSA 2024 JAMB SCHOLARSHIP (35).jpg',
      'BSA 2024 JAMB SCHOLARSHIP (33).jpg',
    ],
  },
  {
    base: 'jamb-scholarship-2023',
    files: [
      'BSA JAMB SCHOLARSHIP PRESENTATION (10).jpg',
      'BSA JAMB SCHOLARSHIP PRESENTATION (11).jpg',
      'BSA JAMB SCHOLARSHIP PRESENTATION (7).jpg',
    ],
  },
  {
    base: 'eye-treatment-okada-riders',
    files: [
      'FREE MEDICAL EYE TREATMENT FOR OKADA RIDERS (69).jpg',
      'FREE MEDICAL EYE TREATMENT FOR OKADA RIDERS (74).jpg',
      'FREE MEDICAL EYE TREATMENT FOR OKADA RIDERS (64).jpg',
    ],
  },
  {
    base: 'operation-feed-the-needy',
    files: ['BSAF OPERATION FEED THE NEEDY (7).jpg', 'BSAF OPERATION FEED THE NEEDY (12).jpg'],
  },
  {
    base: 'less-privileged',
    files: ['BSA TO THE LESS PRIVILEGED (11).jpg', 'BSA TO THE LESS PRIVILEGED (42).jpg'],
  },
  {
    base: 'widows-cash-empowerment',
    files: [
      'BSA WIDOWS CASH EMPOWERMENT (2).jpg',
      'BSA WIDOWS CASH EMPOWERMENT (8).jpg',
      'BSA WIDOWS CASH EMPOWERMENT (40).jpg',
    ],
  },
  {
    base: 'christmas-love-extension',
    files: ['BSA CHRISTMAS LOVE EXTENSION (12).jpg', 'BSA CHRISTMAS LOVE EXTENSION (8).jpg'],
  },
  {
    base: 'christmas-love-sharing-2022',
    files: [
      'BSA CHRISTMAS LOVE SHARING 22 (45).jpg',
      'BSA CHRISTMAS LOVE SHARING 22 (16).jpg',
      'BSA CHRISTMAS LOVE SHARING 22 (2).jpg',
    ],
  },
  {
    base: 'covid-19-palliatives',
    files: [
      'PALIATIVES FOR OGBOMOSO SOUTH DURING COVID 19 (10).jpg',
      'PALIATIVES FOR OGBOMOSO SOUTH DURING COVID 19 (11).jpg',
    ],
  },
];

await mkdir(PROJECT_OUT, { recursive: true });
await mkdir(path.dirname(PROJECT_MANIFEST), { recursive: true });

const manifest = {};
for (const { base, files } of projectPhotos) {
  for (const [i, file] of files.entries()) {
    const slug = i === 0 ? base : `${base}-${i + 1}`;
    const source = sharp(path.join(PROJECT_SRC, file)).rotate(); // honour camera orientation
    for (const width of PROJECT_WIDTHS) {
      await source
        .clone()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(PROJECT_OUT, `${slug}-${width}.webp`));
    }
    const info = await source
      .clone()
      .resize({ width: 1400, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(PROJECT_OUT, `${slug}.jpg`));
    manifest[slug] = { width: info.width, height: info.height };
    console.log(`${slug}  ${info.width}x${info.height}  (${file})`);
  }
}

await writeFile(PROJECT_MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`${Object.keys(manifest).length} project photos → ${PROJECT_MANIFEST}`);

/*
 * Campaign flyers (Gallery, "Campaign" filter). Originals live in
 * assets-source/campaign/ (git-ignored, kept locally); web copies go to
 * public/assets/images/flyers/<slug>-<width>.webp plus a <slug>.jpg fallback.
 * Resize + re-encode only (PNGs are flattened onto white), no cropping.
 */
const FLYER_SRC = 'assets-source/campaign';
const FLYER_OUT = 'public/assets/images/flyers';
const FLYER_WIDTHS = [600, 900];

const campaignFlyers = [
  { file: 'BSA 49.jpg.jpeg', slug: 'new-dawn-2027' },
  { file: 'BSA 45.2.png', slug: 'new-dawn-2027-joint' },
  { file: 'BSA 45.3.png', slug: 'new-dawn-2027-joint-2' },
  { file: 'BSA 46.jpg.jpeg', slug: 'sure-mercy' },
  { file: 'BSA 48.jpg.jpeg', slug: 'our-2027-candidates' },
];

await mkdir(FLYER_OUT, { recursive: true });

for (const { file, slug } of campaignFlyers) {
  const source = sharp(path.join(FLYER_SRC, file)).rotate().flatten({ background: '#ffffff' });
  for (const width of FLYER_WIDTHS) {
    await source
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(FLYER_OUT, `${slug}-${width}.webp`));
  }
  const info = await source
    .clone()
    .resize({ width: 900, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(FLYER_OUT, `${slug}.jpg`));
  console.log(`flyer ${slug}  ${info.width}x${info.height}  (${file})`);
}

/*
 * Candidate portraits from the 2026 Independence shoot (About page). Originals
 * in assets-source/portraits/ (git-ignored, kept locally); web copies go to
 * public/assets/images/portraits/. Resize + re-encode only: transparency is
 * kept and the photographer's watermark is never cropped or retouched.
 */
const PORTRAIT_SRC = 'assets-source/portraits';
const PORTRAIT_OUT = 'public/assets/images/portraits';

const portraits = [
  // Transparent cut-out: WebP keeps the alpha channel; PNG fallback
  {
    file: 'BSA Independence Shoot 2026 23.png',
    slug: 'independence-2026-23',
    widths: [480, 800, 1056],
    fallback: 'png',
  },
  {
    file: 'BSA Independence Shoot 2026 12.jpg',
    slug: 'independence-2026-12',
    widths: [640, 1000, 1400],
    fallback: 'jpg',
  },
];

await mkdir(PORTRAIT_OUT, { recursive: true });

for (const { file, slug, widths, fallback } of portraits) {
  const source = sharp(path.join(PORTRAIT_SRC, file)).rotate();
  for (const width of widths) {
    await source
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85, alphaQuality: 90 })
      .toFile(path.join(PORTRAIT_OUT, `${slug}-${width}.webp`));
  }
  const out = path.join(PORTRAIT_OUT, `${slug}.${fallback}`);
  if (fallback === 'png') {
    // Re-encoding made the PNG larger, so the fallback is an exact copy of the original
    await copyFile(path.join(PORTRAIT_SRC, file), out);
  } else {
    await source
      .clone()
      .resize({ width: widths.at(-1), withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
  }
  console.log(`portrait ${slug}  (${file})`);
}
