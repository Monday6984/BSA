import { assets } from '@/lib/assets';
import type { ImageAsset, Project, ProjectCategory } from '@/types/content';

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  'community-outreach': 'Community Outreach',
  'local-economy': 'Local Economy',
  education: 'Education',
  infrastructure: 'Infrastructure',
};

/** Awaiting verified project records and photographs from the campaign. */
export const projects: Project[] = [];

export interface ProjectStat {
  value: string;
  label: string;
}

export interface GroundActivity {
  id: string;
  category: string;
  title: string;
  description?: string;
  image: ImageAsset & { position: string };
  to: string;
}

/** "On the ground" homepage section. Copy supplied by the campaign. */
export const onTheGround = {
  eyebrow: 'On the ground',
  heading: { lead: 'Real work.', highlightLead: 'Real', highlight: 'impact.' },
  intro:
    'From community outreach to supporting education and engaging with our people, these are some of the initiatives making a difference in Ogbomoso South.',
  cta: { label: 'View all projects', to: '/projects' },

  /**
   * UNCONFIRMED — figures from the design mockup, not yet verified by the
   * campaign. While `confirmed` is false they are hidden in production and
   * shown with an "unconfirmed" marker in development.
   */
  stats: {
    confirmed: false,
    items: [
      { value: '10+', label: 'communities reached' },
      { value: '5,000+', label: 'people supported' },
      { value: '20+', label: 'initiatives and projects' },
    ] satisfies ProjectStat[],
  },

  /** First item is the large feature card. */
  activities: [
    {
      id: 'community-outreach',
      category: 'Community outreach',
      title: 'Supporting families across Ogbomoso South',
      description:
        'Food support, essential supplies and community assistance where it matters most.',
      image: {
        ...assets.projects.communityOutreach,
        alt: 'Women from the community seated together at a community outreach gathering',
        position: '50% 60%',
      },
      to: '/projects',
    },
    {
      id: 'campaign',
      category: 'Campaign',
      title: 'Engaging with our people',
      image: {
        ...assets.projects.campaign,
        alt: 'Booda Sunday Adeyemo speaking through a megaphone to community members',
        position: '55% 30%',
      },
      to: '/projects',
    },
    {
      id: 'education',
      category: 'Education',
      title: 'Cash gifts to support students',
      image: {
        ...assets.projects.cashGift,
        alt: 'Booda Sunday Adeyemo presenting a BSA Foundation scholarship cheque to a student',
        position: '25% 35%',
      },
      to: '/projects',
    },
  ] satisfies GroundActivity[],

  commitment: {
    eyebrow: 'Our commitment',
    heading: { lead: 'More projects.', highlight: 'Stronger communities.' },
    body: 'We will continue to invest in practical, community-focused initiatives that improve everyday life in Ogbomoso South.',
    cta: { label: 'See the full projects', to: '/projects' },
  },
};

export interface ImpactProject {
  id: string;
  title: string;
  caption: string;
  /** Omitted until the campaign supplies the matching photograph */
  image?: ImageAsset & { position?: string };
}

export interface ImpactCategory {
  id: string;
  heading: string;
  projects: ImpactProject[];
}

/**
 * Community Impact (/projects) page. All copy supplied and approved by the
 * campaign; do not rewrite or add figures. Photos marked TEMPORARY are
 * stand-ins from the existing library (client to supply the real ones); their
 * alt text describes what the photo shows, not the named project.
 */
export const projectsPage = {
  seo: {
    title: 'Community Impact | Booda Sunday Adeyemo',
    description:
      'Explore community projects and initiatives across Ogbomoso South, including water access, infrastructure, youth empowerment and education.',
  },

  hero: {
    eyebrow: 'Community Impact',
    heading: { lead: 'Community', highlight: 'Impact' },
    subtitle:
      'A decade of work across Ogbomoso South, ward by ward. Explore projects and community initiatives across key areas.',
    image: {
      ...assets.projects.campaign,
      alt: '',
      position: '60% 35%',
    },
  },

  categories: [
    {
      id: 'water-boreholes',
      heading: 'Water & Boreholes',
      projects: [
        {
          id: 'isale-afon-borehole',
          title: 'Isale-Afon borehole',
          caption: 'Isale-Afon borehole, now serving over 3,000 residents',
          // TEMPORARY stand-in photo: replace with the actual project photograph
          image: {
            ...assets.projects.campaign,
            alt: 'Booda Sunday Adeyemo speaking through a megaphone at a BSA Foundation borehole commissioning',
            position: '55% 30%',
          },
        },
        {
          id: 'borehole-renovation',
          title: 'Borehole renovation',
          caption: 'Renovation of an abandoned borehole in Ogbomoso South',
          // TEMPORARY stand-in photo: replace with the actual project photograph
          image: {
            ...assets.projects.communityOutreach,
            alt: 'Women from the community seated together at a community outreach gathering',
            position: '50% 55%',
          },
        },
        {
          id: 'community-water-point',
          title: 'Community water point',
          caption: 'A community water point, before and after.',
          // TEMPORARY stand-in photo: replace with the actual project photograph
          image: {
            ...assets.community,
            alt: 'A view over Ogbomoso rooftops towards a rocky hill at sunset',
            position: '50% 60%',
          },
        },
      ],
    },
    {
      id: 'roads-drainage-bus-stops',
      heading: 'Roads, Drainage & Bus Stops',
      projects: [
        {
          id: 'drainage-construction',
          title: 'Drainage construction',
          caption: 'Drainage construction to stop seasonal flooding',
          // TEMPORARY stand-in photo: replace with the actual project photograph
          image: {
            ...assets.cityscape,
            alt: 'Roads and a roundabout around a landmark tower in Ogbomoso',
            position: '75% 70%',
          },
        },
        {
          id: 'okada-shelter',
          title: 'Okada shelter',
          caption: 'Okada shelter built for a busy junction',
          // TEMPORARY stand-in photo: replace with the actual project photograph
          image: {
            ...assets.projects.communityOutreach2,
            alt: 'Residents gathered outdoors listening to a speaker',
            position: '50% 25%',
          },
        },
        {
          id: 'modern-bus-stop',
          title: 'Modern bus stop',
          caption: 'One of the modern bus stops now serving Ogbomoso South',
          // TEMPORARY stand-in photo: replace with the actual project photograph
          image: {
            ...assets.community,
            alt: 'A view over Ogbomoso rooftops towards a rocky hill at sunset',
            position: '50% 60%',
          },
        },
      ],
    },
    {
      id: 'youth-empowerment-skills',
      heading: 'Youth Empowerment & Skills',
      projects: [
        {
          id: 'vocational-training',
          title: 'Vocational training',
          caption: 'Vocational training cohort, now running their own trades',
          // TEMPORARY stand-in photo: replace with the actual project photograph
          image: {
            ...assets.projects.classroom,
            alt: 'A teacher addressing a classroom of students with open textbooks',
            position: '40% 45%',
          },
        },
        {
          id: 'small-business-empowerment',
          title: 'Small business empowerment',
          caption: 'Small business empowerment for local traders',
          // TEMPORARY stand-in photo: replace with the actual project photograph
          image: {
            ...assets.projects.communityOutreach,
            alt: 'Women from the community seated together at a community outreach gathering',
            position: '50% 55%',
          },
        },
        {
          id: 'market-union-meeting',
          title: 'Market union meeting',
          caption: 'Meeting with a market union on trade support',
          // TEMPORARY stand-in photo: replace with the actual project photograph
          image: {
            ...assets.projects.communityOutreach2,
            alt: 'Residents gathered outdoors listening to a speaker',
            position: '50% 25%',
          },
        },
      ],
    },
    {
      id: 'education-scholarships',
      heading: 'Education & Scholarships',
      projects: [
        {
          id: 'cash-gift-to-students',
          title: 'Cash gift to students',
          caption: '120 WASSCE scholarship forms distributed to indigent students',
          image: {
            ...assets.projects.cashGift,
            alt: 'Booda Sunday Adeyemo presenting a BSA Foundation scholarship cheque to a student',
            position: '30% 40%',
          },
        },
        {
          id: 'waec-jamb-prep',
          title: 'WAEC and JAMB prep',
          caption: 'Seven-month WAEC and JAMB preparation programme',
          image: {
            ...assets.projects.classroom2,
            alt: 'Students in school uniform working through exam papers at their desks',
            position: '50% 40%',
          },
        },
        {
          id: 'trained-teachers',
          title: 'Trained teachers',
          caption: 'Trained teachers delivering the academic empowerment programme',
          image: {
            ...assets.projects.classroom,
            alt: 'A teacher addressing a classroom of students with open textbooks',
            position: '40% 45%',
          },
        },
      ],
    },
  ] satisfies ImpactCategory[],

  stories: {
    heading: 'Stories from the ground',
    items: [
      {
        id: 'tech-career',
        title: 'From a BSA Foundation programme to a tech career in Abuja',
        body: 'Years ago, during a period when schools were on an extended strike, BSA Foundation ran a program to keep young people engaged and building skills. One participant recently found Sunday again, this time at a speaking engagement, and reminded him who he was. That young man is now working professionally in tech in Abuja, and credits the program with where his career started.',
      },
      {
        id: 'operation-feed-the-people',
        title: 'A family that hasn’t forgotten a night without food',
        body: 'A family relocating to the area once arrived with nothing to eat and went to bed hungry. The next morning, a BSA team knocked on their door with food, part of an outreach effort called Operation Feed the People. That family is doing well today. They still talk about that morning.',
      },
      {
        id: 'water-everyone-can-see',
        title: 'The water everyone can see',
        body: 'Communities across Ogbomoso South now have boreholes where there were none. Clean water has become something available mainly to those who can pay for it. BSA’s borehole projects were built to close that gap, and every time Sunday drives past one, he says, it still means something to him.',
      },
    ],
  },

  supportCta: {
    eyebrow: '',
    title: 'Help us do more of this.',
    highlight: '',
    description: '',
    buttonText: 'Support the Movement',
    buttonHref: '/join-the-movement',
    image: {
      ...assets.projects.communityOutreach2,
      alt: 'Residents gathered outdoors listening to a speaker',
    },
    imagePosition: '50% 18%',
  },
};
