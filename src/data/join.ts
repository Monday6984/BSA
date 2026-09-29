import type { SelectOption } from '@/components/forms/SelectField';
import { assets } from '@/lib/assets';

/**
 * Join the Movement page. Copy supplied by the campaign; do not rewrite or
 * add claims.
 */
export const joinPage = {
  seo: {
    title: 'Join the Movement | Booda Sunday Adeyemo',
    description:
      'There are many ways to contribute to the work happening across Ogbomoso South. Volunteer your time, share your ideas, or reach out to the campaign directly.',
  },

  hero: {
    eyebrow: 'Get involved',
    heading: { lead: 'Join the', highlight: 'movement.' },
    subtitle:
      'There are many ways to contribute to the work happening across Ogbomoso South. Volunteer your time, share your ideas, or reach out to the campaign directly.',
    image: { ...assets.projects.communityOutreach, alt: '', position: '50% 45%' },
  },

  intro: {
    heading: 'Your voice. Your time. Your community.',
    body: 'Strong communities are built by people who are willing to participate. Whether you want to volunteer at an event, help with community outreach, support voter education, or simply share an idea, there is a place for you in this movement.',
  },

  feedback: {
    id: 'feedback',
    heading: 'Constituency feedback',
    description:
      'Have a concern, a project suggestion, or a question for the campaign? Send it directly.',
    submitLabel: 'Send feedback',
    successMessage: 'Thank you — your feedback has been sent.',
  },

  volunteer: {
    id: 'volunteer-signup',
    heading: 'Volunteer sign-up',
    description:
      'Ward coordinators, polling agents, social media volunteers and door-to-door canvassers are all needed.',
    submitLabel: 'Sign me up',
    successMessage: 'Thank you for signing up — your details have been sent.',
    roles: [
      { value: 'event-support', label: 'Event Support' },
      { value: 'community-outreach', label: 'Community Outreach' },
      { value: 'ward-coordination', label: 'Ward Coordination' },
      { value: 'polling-agent', label: 'Polling Agent' },
      { value: 'social-media', label: 'Social Media' },
      { value: 'door-to-door', label: 'Door-to-Door Canvassing' },
      { value: 'voter-education', label: 'Voter Education' },
      { value: 'other', label: 'Other' },
    ] satisfies SelectOption[],
  },

  moreWays: {
    heading: 'More ways to get involved',
    cards: [
      {
        icon: 'users',
        title: 'Volunteer your time',
        body: 'Help with campaign events, community outreach, voter education and ward-level activities.',
      },
      {
        icon: 'megaphone',
        title: 'Spread the word',
        body: 'Share campaign updates, events and information with people in your community.',
      },
      {
        icon: 'hand-heart',
        title: 'Support the work',
        body: 'Help the campaign reach more communities through legitimate campaign contributions and resources.',
      },
    ],
  },

  finalCta: {
    eyebrow: '',
    title: 'Together, we can build a stronger',
    highlight: 'Ogbomoso South.',
    description:
      'Every conversation, every volunteer and every contribution helps move the campaign forward.',
    buttonText: 'Join the Movement',
    // Same page: jumps to the sign-up form
    buttonHref: '#volunteer-signup',
    secondaryText: 'Read the Manifesto',
    secondaryHref: '/manifesto',
  },
};
