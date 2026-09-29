/**
 * Generates seed/news-articles.ndjson from the supplied article copy.
 *
 * Articles are created as PUBLISHED with TEMPORARY values chosen by the
 * client for launch: today's date and existing photos from the website's
 * image folder. Both will be replaced later in the Studio. Unconfirmed facts
 * are recorded in each article's internal "Editorial note".
 *
 * Images are uploaded by the Sanity import via `_sanityAsset` file URLs, so
 * this script must be run on a machine that has the website's images.
 *
 * Run: npm run seed   (builds this file, then imports it)
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

/** TEMPORARY placeholder photo from the website's image folder. */
const localImage = (file, alt) => ({
  _type: 'image',
  _sanityAsset: `image@${pathToFileURL(fileURLToPath(new URL(`../../public/assets/images/${file}`, import.meta.url))).href}`,
  alt,
});

let n = 0;
const key = () => `k${(n++).toString(36).padStart(4, '0')}`;

const span = (text, marks = []) => ({ _type: 'span', _key: key(), text, marks });
const block = (text, style = 'normal') => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  children: [span(text)],
});
const h2 = (text) => block(text, 'h2');
const bullet = (label, value) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  markDefs: [],
  children: [span(`${label}: `, ['strong']), span(value)],
});

const articles = [
  {
    _id: 'news-isale-afon-borehole',
    publishedAt: '2026-09-28T09:00:00+01:00',
    featuredImage: localImage(
      'community-outreach-1.jpg',
      'Women from the community seated together at a community gathering',
    ),
    title: 'Isale-Afon borehole now serving over 3,000 residents',
    slug: 'isale-afon-borehole-serving-over-3000-residents',
    category: 'community-outreach',
    excerpt:
      'The newly completed borehole project in Isale-Afon is now operational, providing a more accessible source of clean water for residents in the community.',
    body: [
      block(
        'Access to clean and reliable water remains an important part of everyday life for communities across Ogbomoso South.',
      ),
      block(
        'The newly completed borehole project in Isale-Afon is now operational, providing a more accessible source of clean water for residents in the community.',
      ),
      block(
        'The project is expected to make a practical difference for households that previously had to travel farther or rely on alternative sources to meet their daily water needs.',
      ),
      block(
        'For many families, access to water is about more than convenience. It affects household routines, hygiene, health and the amount of time residents spend searching for a dependable water source.',
      ),
      block(
        'The Isale-Afon project reflects the importance of paying attention to everyday community needs and supporting initiatives that can deliver practical improvements at the local level.',
      ),
      block(
        'With the borehole now serving residents, the focus remains on ensuring that community infrastructure continues to respond to the needs of the people it is intended to serve.',
      ),
      h2('A focus on practical community needs'),
      block(
        'Water access is one of the areas identified within the broader development agenda around infrastructure and community wellbeing.',
      ),
      block(
        'The Isale-Afon borehole is part of that focus: addressing a specific need within a community and helping residents gain easier access to an essential resource.',
      ),
    ],
    editorialNote:
      '[CONFIRM: project completion/commissioning date and the basis for the 3,000+ residents figure.] [TEMPORARY: publication date and photo (a general community gathering) are placeholders; replace with the real date and a photo of the Isale-Afon borehole.]',
  },
  {
    _id: 'news-wassce-scholarship-forms',
    publishedAt: '2026-09-28T08:30:00+01:00',
    featuredImage: localImage(
      'cash-gift.jpg',
      'Booda Sunday Adeyemo presenting a scholarship cheque to a student',
    ),
    title: '120 WASSCE scholarship forms distributed to indigent students',
    slug: '120-wassce-scholarship-forms-distributed',
    category: 'education',
    excerpt:
      '120 WASSCE scholarship forms have been distributed to indigent students across Ogbomoso South as part of the ongoing education empowerment programme.',
    body: [
      block(
        'Education remains an important part of creating opportunities for young people, particularly for students whose families may face financial difficulties.',
      ),
      block(
        'As part of the ongoing education empowerment programme, 120 WASSCE scholarship forms have been distributed to indigent students across Ogbomoso South.',
      ),
      block(
        'The initiative is intended to provide support for students preparing to sit for the West African Senior School Certificate Examination (WASSCE), helping reduce the financial burden associated with examination registration.',
      ),
      block(
        'For students and their families, support of this nature can provide an opportunity to remain focused on their education during an important stage of their academic journey.',
      ),
      h2('Supporting students through education'),
      block(
        'The scholarship initiative is part of a wider emphasis on education and youth development.',
      ),
      block(
        'Supporting students is not only about examination registration. It is also about creating an environment where young people have the opportunity to pursue their education and develop the skills they need for the future.',
      ),
      block(
        'The distribution of the scholarship forms represents another step in that ongoing effort.',
      ),
      block(
        'The programme will continue to focus on identifying opportunities to support students and families who need assistance.',
      ),
    ],
    editorialNote:
      '[CONFIRM: distribution date, scholarship coverage, eligibility criteria, participating schools and the 120-student figure.] [TEMPORARY: publication date and photo are placeholders; the current photo shows a NECO scholarship cheque, not WASSCE forms.]',
  },
  {
    _id: 'news-town-hall-ogbomoso-south',
    publishedAt: '2026-09-28T08:00:00+01:00',
    featuredImage: localImage(
      'community-outreach-2.jpg',
      'A man addressing residents gathered outdoors',
    ),
    title: 'BSA town hall at Ogbomoso South LGA Secretariat',
    slug: 'bsa-town-hall-ogbomoso-south',
    category: 'events',
    excerpt:
      'Residents are invited to a town hall meeting at the Ogbomoso South LGA Secretariat to hear the manifesto and engage directly with the campaign.',
    body: [
      block(
        'Residents of Ogbomoso South are invited to a town hall meeting at the Ogbomoso South LGA Secretariat.',
      ),
      block(
        'The meeting will provide an opportunity for residents to hear directly about the campaign’s manifesto, ask questions and engage with the team on issues affecting their communities.',
      ),
      block('The town hall is scheduled for Saturday at 10am.'),
      block(
        'Community engagement is an important part of understanding the concerns, priorities and expectations of residents across the constituency. The meeting will therefore provide space for residents to participate in an open conversation and raise issues that matter to them.',
      ),
      h2('An opportunity to listen and engage'),
      block(
        'The campaign’s agenda places emphasis on issues including jobs, education, infrastructure and community development.',
      ),
      block(
        'The town hall provides an opportunity to discuss these priorities directly with residents and hear their perspectives on what needs attention within their communities.',
      ),
      block(
        'Ward coordinators will also be available to assist with volunteer sign-ups for people who would like to become more actively involved in the movement.',
      ),
      h2('Event details'),
      bullet('Venue', 'Ogbomoso South LGA Secretariat'),
      bullet('Day', 'Saturday'),
      bullet('Time', '10:00 AM'),
    ],
    editorialNote:
      '[CONFIRM: exact event date and venue.] [TEMPORARY: publication date and photo are placeholders; replace with a photo from the town hall.]',
  },
];

const docs = articles.map(({ slug, ...rest }) => ({
  _type: 'newsArticle',
  ...rest,
  slug: { _type: 'slug', current: slug },
  featured: false,
  // author is intentionally left empty: it was not supplied.
}));

const out = fileURLToPath(new URL('./news-articles.ndjson', import.meta.url));
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join('\n') + '\n');
console.log(`Wrote ${docs.length} articles to ${out}`);
