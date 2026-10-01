import { assets } from '@/lib/assets';
import { projectPhoto } from '@/lib/projectPhotos';
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
  /** Short line under the title; leave out until the campaign supplies one */
  caption?: string;
  /** Omitted until the campaign supplies the matching photograph */
  image?: ImageAsset & { position?: string };
}

export interface ImpactCategory {
  id: string;
  heading: string;
  projects: ImpactProject[];
}

/**
 * Community Impact (/projects) page. Project titles supplied by the campaign;
 * do not rewrite them or add captions, dates or figures without approval.
 * Alt text describes what each photo shows.
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
          id: 'ojude-ajaawa-borehole',
          title: 'Commissioning of Ojude Ajaawa Borehole',
          image: projectPhoto(
            'borehole-ojude-ajaawa',
            'Residents gathered along a street in Ojude Ajaawa for the borehole commissioning',
          ),
        },
        {
          id: 'akunko-junction-isoko-borehole',
          title: 'BSA Borehole Commissioning Akunko Junction Isoko',
          image: projectPhoto(
            'borehole-akunko-junction-isoko',
            'Residents gathered in front of a borehole with two water tanks, marked as renovated by the Booda Sunday Adeyemo Foundation',
            '50% 30%',
          ),
        },
      ],
    },
    {
      id: 'roads-drainage-bus-stops',
      heading: 'Roads, Drainage & Bus Stops',
      projects: [
        {
          id: 'okada-bus-stop-seminary',
          title: 'BSA Construction of Okada Bustop Seminary',
          image: projectPhoto(
            'okada-bus-stop-seminary',
            'A roadside okada shelter with a BSA sign, with people seated and standing beneath it',
          ),
        },
        {
          id: 'okada-bus-stop-baptist-high-school',
          title: 'Baptist High-school Construction of Okada Bustop',
          image: projectPhoto(
            'okada-bus-stop-baptist-high-school',
            'An okada shelter with benches and BSA signs, its roof marked as constructed by the Booda Sunday Adeyemo Foundation',
          ),
        },
        {
          id: 'arowomole-bus-stop',
          title: 'Commissioning of BSA Arowomole Bus Stop',
          image: projectPhoto(
            'bus-stop-arowomole',
            'Residents gathered at the commissioning of the BSA Arowomole Bus Stop',
          ),
        },
        {
          id: 'oluwatedo-drainage',
          title: 'BSA Oluwatedo Community Drainage',
          image: projectPhoto(
            'drainage-oluwatedo',
            'A concrete drainage channel running alongside a wall and an unpaved road',
          ),
        },
      ],
    },
    {
      id: 'youth-empowerment-skills',
      heading: 'Youth Empowerment & Skills',
      projects: [
        {
          id: 'summit-beyond-limits',
          title: 'BSA Capacity Building Summit Beyond Limits',
          image: projectPhoto(
            'summit-beyond-limits',
            'A speaker on stage at the Capacity Building Summit, with Beyond Limits signage behind',
            '50% 35%',
          ),
        },
        {
          id: 'majokosile-graduation',
          title: 'BSA Majokosile Graduation',
          image: projectPhoto(
            'majokosile-graduation',
            'Women arranging handbags on a table at the Majokosile graduation',
          ),
        },
        {
          id: 'bike-riders-akomoran-empowerment',
          title: 'BSA Bike Riders Akomoran Empowerment',
          image: projectPhoto(
            'bike-riders-akomoran-empowerment',
            'Men standing beside a new motorcycle during the bike riders empowerment',
          ),
        },
      ],
    },
    {
      id: 'education-scholarships',
      heading: 'Education & Scholarships',
      projects: [
        {
          id: 'jamb-scholarship-2025',
          title: '2025 BSA Jamb Scholarship',
          image: projectPhoto(
            'jamb-scholarship-2025',
            'A speaker with a microphone addressing students in a classroom at the 2025 JAMB scholarship orientation',
          ),
        },
        {
          id: 'jamb-scholarship-2024',
          title: '2024 BSA Jamb Scholarship',
          image: projectPhoto(
            'jamb-scholarship-2024',
            'A large group of students and guests holding up their scholarship certificates in a hall',
          ),
        },
        {
          id: 'jamb-scholarship-2023',
          title: '2023 BSA Jamb Scholarship',
          image: projectPhoto(
            'jamb-scholarship-2023',
            'A student receiving a scholarship certificate from two men, one in a BSA T-shirt',
            '50% 30%',
          ),
        },
      ],
    },
    {
      id: 'health-community-support',
      heading: 'Health & Community Support',
      projects: [
        {
          id: 'eye-treatment-okada-riders',
          title: 'BSA Free Medical Eye Treatment for Okada Riders',
          image: projectPhoto(
            'eye-treatment-okada-riders',
            'A man in trial frames reading a vision test chart at the free eye treatment',
          ),
        },
        {
          id: 'operation-feed-the-needy',
          title: 'BSA Operation Feed the Needy',
          image: projectPhoto(
            'operation-feed-the-needy',
            'A ribbon-cutting behind a row of food bags at Operation Feed the Needy',
            '50% 40%',
          ),
        },
        {
          id: 'less-privileged',
          title: 'BSA to the Less Privilege',
          image: projectPhoto(
            'less-privileged',
            'A smiling young man holding up a BSA bag beside sacks of food',
          ),
        },
        {
          id: 'widows-cash-empowerment',
          title: 'BSA Widows Cash Empowerment',
          image: projectPhoto(
            'widows-cash-empowerment',
            'Women seated together in a hall at the widows cash empowerment',
          ),
        },
        {
          id: 'christmas-love-extension',
          title: 'BSA Christmas Love Extension',
          image: projectPhoto(
            'christmas-love-extension',
            'A man in a BSA jacket speaking into a microphone beside rows of gift bags',
            '50% 30%',
          ),
        },
        {
          id: 'christmas-love-sharing-2022',
          title: 'BSA Christmas Love Sharing 2022',
          image: projectPhoto(
            'christmas-love-sharing-2022',
            'A large crowd of residents gathered in a school compound for Christmas Love Sharing',
          ),
        },
        {
          id: 'covid-19-palliatives',
          title: 'Palliative for Ogbomosho South During Covid 19',
          image: projectPhoto(
            'covid-19-palliatives',
            'A masked volunteer handing a relief package to a woman during the COVID-19 palliative distribution',
            '50% 35%',
          ),
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
