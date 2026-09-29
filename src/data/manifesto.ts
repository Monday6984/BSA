import type { ManifestoPillar } from '@/types/content';
import { assets } from '@/lib/assets';

/** Priorities section copy, as approved in the homepage mockup. */
export const pillarsSection = {
  eyebrow: 'Our priorities',
  heading: { lead: 'A Stronger', highlight: 'Ogbomoso South' },
  intro:
    'Focused on real solutions for the issues that matter most to our people, our plan is built around four key areas.',
  vision: {
    eyebrow: 'Our vision',
    heading: { lead: 'A People-First', highlight: 'Ogbomoso South' },
    body: 'A safer, more prosperous and more united constituency where every ward counts and every voice matters.',
    cta: { label: 'Read the Manifesto', to: '/manifesto' },
  },
};

/**
 * The four priority areas, as approved in the homepage mockup.
 * Do not rewrite, extend or add pillars without approval.
 */
export const manifestoPillars: ManifestoPillar[] = [
  {
    id: 'water-infrastructure',
    title: 'Water & Infrastructure',
    summary:
      'Improving access to clean water, better roads and essential infrastructure for stronger, more connected communities.',
    icon: 'droplet',
  },
  {
    id: 'education',
    title: 'Education',
    summary:
      'Supporting better schools, safer learning environments and more opportunities for young people.',
    icon: 'graduation-cap',
  },
  {
    id: 'jobs-economic-growth',
    title: 'Jobs & Economic Growth',
    summary:
      'Creating opportunities, supporting local businesses and empowering our people with practical skills.',
    icon: 'users',
  },
  {
    id: 'health-community-support',
    title: 'Health & Community Support',
    summary:
      'Strengthening primary healthcare and supporting vulnerable groups for healthier, stronger communities.',
    icon: 'heart-pulse',
  },
];

/**
 * Manifesto page. All copy supplied and approved by the campaign; do not
 * rewrite, shorten or embellish.
 */
export const manifestoPage = {
  seo: {
    title: 'The Manifesto | Booda Sunday Adeyemo',
    description: 'A decade of proof and a plan for what comes next for Ogbomoso South.',
  },

  hero: {
    heading: 'The Manifesto',
    subtitle: 'A decade of proof, and a plan for what comes next.',
    backdrop: { ...assets.cityscape, alt: '' },
  },

  achievements: {
    eyebrow: 'Before the ticket',
    heading: 'What we’ve already done',
    items: [
      {
        icon: 'graduation-cap',
        text: 'Vocational training for young people, many of whom are now running their own trades.',
      },
      {
        icon: 'book-open',
        text: 'A seven-month academic empowerment programme preparing students for WAEC and JAMB, delivered by trained teachers.',
      },
      {
        icon: 'sun',
        text: 'Solar lighting installed in communities to improve security at night.',
      },
      { icon: 'droplet', text: 'Borehole drilling across Ogbomoso South.' },
      {
        icon: 'store',
        text: 'Small business empowerment to help traders and artisans start up.',
      },
      { icon: 'bus', text: 'Modern bus stops, changing the face of the constituency.' },
    ],
  },

  agenda: {
    eyebrow: 'The agenda',
    heading: 'Four pillars, one agenda',
    pillars: [
      {
        id: 'youth-empowerment',
        title: 'Youth Empowerment',
        body: 'Skills acquisition hubs, apprenticeship funding and a seat at the table for ward-level youth councils.',
      },
      {
        id: 'job-creation',
        title: 'Job Creation',
        body: 'Backing local agro-processing and artisan clusters with access to affordable credit and market linkages.',
      },
      {
        id: 'infrastructure',
        title: 'Infrastructure',
        body: 'Boreholes, feeder roads and drainage, prioritised by the wards that live with their absence daily.',
      },
      {
        id: 'education',
        title: 'Education',
        body: 'Scholarship support, rehabilitated classrooms and a scale-up of the WASSCE prep programme.',
      },
    ],
  },

  nextSteps: {
    eyebrow: 'In office',
    heading: 'What comes next',
    items: [
      'A structured vocational center to train youth at scale and position them for the local economy.',
      'A push to make education the currency young people invest in, alongside recognition that a person’s worth is not defined by their certificate.',
      'A cooperative-style structure to help local business owners access funding for their businesses.',
    ],
  },

  transparency: {
    eyebrow: 'How this government will run',
    heading: 'Transparency, first',
    paragraphs: [
      'Constituents will know what the constituency allowance is and exactly what it is being spent on.',
      'This is not a promise made to sound good. It comes from someone who lives among the people he’s asking to vote for him, and who understands, because he has lived it, what it costs a family not to have water or light or a functioning road.',
    ],
    image: {
      ...assets.projects.communityOutreach,
      alt: 'Women from the community seated together at a community outreach gathering',
    },
  },

  impactCta: {
    // No eyebrow or description supplied; PageCTA omits them when empty
    eyebrow: '',
    title: 'See the work behind the promises.',
    highlight: '',
    description: '',
    buttonText: 'View Community Impact',
    buttonHref: '/projects',
    image: {
      ...assets.projects.campaign,
      alt: 'Booda Sunday Adeyemo speaking through a megaphone at a BSA Foundation borehole commissioning',
    },
  },
} as const;
