import { assets } from '@/lib/assets';

/** About page. All copy supplied and approved by the campaign; do not embellish. */
export const about = {
  seo: {
    title: 'About Booda Sunday Adeyemo | Ogbomoso South',
    description:
      'Booda Sunday Adeyemo was born in the north and came to Ogbomoso for good in 2003 to study Electrical Electronics Engineering at LAUTECH. He is contesting for the Ogbomoso South State Constituency seat under the Nigeria Democratic Congress (NDC).',
  },

  hero: {
    eyebrow: 'Who is Booda?',
    heading: { lead: 'A story of resilience, community and', highlight: 'service.' },
    body: 'Born in the north, raised with a deep connection to Ogbomoso, and building here since 2003.',
    portrait: {
      ...assets.portrait.primary,
      alt: 'Booda Sunday Adeyemo smiling, hands clasped, wearing black traditional attire and a striped cap',
    },
    backdrop: { ...assets.cityscape, alt: '' },
  },

  facts: [
    { icon: 'user', label: 'Full name', value: 'Sunday Jeremiah Adeyemo' },
    {
      icon: 'graduation-cap',
      label: 'Education',
      value: 'B.Tech, Electrical Electronics Engineering, LAUTECH',
    },
    {
      icon: 'briefcase',
      label: 'Business',
      value: 'Founder, Trinity Innovations (2011), 20+ jobs created',
    },
    { icon: 'flag', label: 'Party', value: 'Nigeria Democratic Congress (NDC)' },
  ],

  earlyLife: {
    eyebrow: 'His early life',
    heading: 'Where it started',
    paragraphs: [
      'Booda Sunday Adeyemo was born in the north, to Jeremiah Adeyemo, a businessman. The family kept close ties to Ogbomoso even then, returning every year for Christmas, a season young Sunday remembers looking forward to the way other children look forward to a trip abroad.',
      'He had his primary education at Model Primary School, Suleja, and his secondary education at Bishop James Yisa Memorial Secondary School, also in Suleja. In 2003, he came to Ogbomoso for good, to study Electrical Electronics Engineering at Ladoke Akintola University of Technology (LAUTECH). He has been rooted in the community since.',
    ],
    image: {
      ...assets.community,
      alt: 'A view over Ogbomoso rooftops towards a rocky hill at sunset',
    },
  },

  journey: {
    eyebrow: 'His journey',
    heading: 'A story before the glory',
    blocks: [
      {
        icon: 'sprout',
        title: 'Starting with little',
        body: 'Sunday is open about where he started. His background was modest, and school fees were never guaranteed. Even so, as a student he began paying school fees for other children alongside his own, an orphaned girl among them. She has since built a life for herself in Abuja, and he still remembers her name.',
      },
      {
        icon: 'book-open',
        title: 'Learning through sacrifice',
        body: 'As an undergraduate, he set out to become a network engineer. He couldn’t afford a laptop, so he studied for his CCNA certification by simulating routers on paper, borrowing a laptop only when he could find one. Two days before the exam, he was still working from paper. He sat the exam and scored 97 over 100.',
      },
      {
        icon: 'chart',
        title: 'Building something of his own',
        body: 'After graduation, he started what would become Trinity Innovations in 2011. The early years were hard. For nearly a year, he walked to and from work rather than pay for transport, not because he couldn’t afford it, but because he chose to put that money back into the business instead. There was a point where he nearly walked away, having gone as far as an interview with a telecoms company in Lagos. On the journey home, he changed his mind. Today, Trinity Innovations employs more than 20 people.',
      },
    ],
  },

  quote: {
    text: 'There is no glory without a story. Every glory we see today has a back end, and the back end is the suffering side. My condition was never a reason to be limited.',
    attribution: 'Booda Sunday Adeyemo',
  },

  foundation: {
    eyebrow: 'Service to community',
    heading: 'Carrying it into the foundation',
    paragraphs: [
      'That same conviction, that hardship is not a reason to stop, carried into the BODA SUNDAY ADEYEMO FOUNDATION (BSA), through which he has led drainage construction, the building of okada shelters across Ogbomoso, and the renovation of abandoned boreholes across Ogbomoso South.',
    ],
    image: {
      ...assets.projects.campaign,
      alt: 'Booda Sunday Adeyemo speaking through a megaphone at a BSA Foundation borehole commissioning',
    },
  },

  running: {
    eyebrow: 'A decision shaped by experience',
    heading: 'Why he’s running now',
    paragraphs: [
      'This is not Sunday’s first attempt at the ticket. He has stepped down for other candidates in past cycles, trusting that the values he cared about would be carried forward. Each time, the promises made to the community went undelivered. That experience is part of why he decided this time to run the race himself rather than hand it to someone else.',
      'He is contesting for the Ogbomoso South State Constituency seat under the Nigeria Democratic Congress (NDC).',
    ],
    image: {
      src: '/assets/images/community-outreach-2.jpg',
      width: 1536,
      height: 2048,
      alt: 'Residents gathered outdoors listening to a speaker',
    },
  },

  manifesto: {
    eyebrow: 'The road ahead',
    title: 'Read what he’s promising for Ogbomoso South.',
    description: 'Explore the four pillars of the campaign and the priorities for Ogbomoso South.',
    buttonText: 'See the Manifesto',
    buttonHref: '/manifesto',
    image: { ...assets.cityscape, alt: '' },
  },
} as const;
