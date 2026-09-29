import { assets } from '@/lib/assets';

/**
 * Donate page. All copy supplied and approved by the campaign; do not rewrite
 * or add claims. Bank details live in `donationAccount` (data/campaign.ts).
 */
export const donatePage = {
  seo: {
    title: 'Support the Movement | Booda Sunday Adeyemo',
    description:
      'This campaign runs on contributions from people who believe Ogbomoso South deserves representation that shows up.',
  },

  hero: {
    eyebrow: 'Support the Movement',
    heading: { lead: 'Support the', highlight: 'Movement' },
    subtitle:
      'This campaign runs on contributions from people who believe Ogbomoso South deserves representation that shows up.',
    image: { ...assets.projects.communityOutreach2, alt: '', position: '50% 22%' },
  },

  why: {
    heading: 'Why your support matters',
    paragraphs: [
      'Every borehole, every scholarship form, every bag of rice delivered to a family with nothing to eat, was paid for before there was a campaign asking anyone to vote. Getting Booda into the Ogbomoso South State Assembly means this work can happen at the scale the constituency actually needs, not just what one foundation can carry alone.',
      'Whatever you’re able to give goes toward ward-level organising, town halls, voter education and campaign logistics, not toward personal expenses. That’s the same transparency commitment that will carry into office.',
    ],
  },

  ways: {
    heading: 'Ways to give',
    bank: {
      heading: 'Bank Transfer',
      description: 'Send directly to the official campaign account below.',
    },
    inPerson: {
      heading: 'In Person',
      body: 'Drop off a contribution at the constituency office, or hand it to a verified ward coordinator at any campaign event. Ask for a receipt.',
    },
    time: {
      heading: 'Give Your Time Instead',
      // Split around the link so the approved sentence stays intact
      body: {
        before:
          'Not everyone can give financially, and that’s fine. Sign up as a ward volunteer or polling agent on the ',
        linkText: 'Get Involved page',
        after: ', time and word of mouth carry this movement just as far.',
        to: '/join-the-movement',
      },
    },
    notice:
      'Only give through the official channels listed above. BSA campaign representatives will never ask for a donation through a private personal account or an unverified link.',
  },

  amounts: {
    heading: 'Every amount is put to work',
    items: [
      {
        icon: 'file',
        amount: '₦5,000',
        description: 'Prints and distributes ward-level campaign materials',
      },
      {
        icon: 'bus',
        amount: '₦20,000',
        description: 'Covers transport and logistics for a town hall',
      },
      {
        icon: 'users',
        amount: '₦50,000',
        description: 'Supports a full ward’s voter education drive',
      },
      {
        icon: 'coins',
        amount: 'Any amount',
        description: 'Every contribution moves the campaign forward',
      },
    ],
  },

  questionsCta: {
    eyebrow: '',
    title: 'Questions about giving?',
    highlight: '',
    description: '',
    buttonText: 'Reach the Campaign Office',
    image: {
      ...assets.projects.communityOutreach,
      alt: 'Women from the community seated together at a community outreach gathering',
    },
    imagePosition: '50% 55%',
  },
};
