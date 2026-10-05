import type { SocialLink } from '@/types/content';

/** Confirmed campaign facts. Only add values supplied by the campaign. */
export const campaign = {
  candidateName: 'Booda Sunday Adeyemo',
  shortName: 'Booda',
  identity: 'BSA',
  constituency: 'Ogbomoso South State Constituency',
  party: {
    name: 'Nigeria Democratic Congress',
    abbreviation: 'NDC',
  },
  /**
   * Election day, as an ISO 8601 date-time. Countdown targets midnight WAT (UTC+1)
   * at the start of 27 February 2027. Set to null to hide the countdown.
   */
  electionDate: '2027-02-27T00:00:00+01:00' as string | null,
} as const;

/**
 * Candidate biography, supplied by the campaign. Source of truth for any
 * biographical text on the site — do not add or embellish claims.
 */
export const biography: string[] = [
  'Booda Sunday Adeyemo was born in the north and raised in Ogbomoso, where he came in 2003 to study Electrical Electronics Engineering at LAUTECH and never left. He built a business here, started a foundation here, and has spent over a decade solving problems most politicians only talk about, from clean water to school infrastructure.',
  'He is contesting for the Ogbomoso South State Constituency seat under the Nigeria Democratic Congress (NDC), with one conviction: representation should be measured in outcomes people can see in their own streets, not promises made once every four years.',
];

/**
 * Official campaign social accounts. PENDING — awaiting URLs from the campaign.
 * The footer renders these automatically once added, e.g.
 * { platform: 'facebook', label: 'Facebook', href: 'https://facebook.com/...' }
 */
export const socialLinks: SocialLink[] = [];

/**
 * Official donation account: the single source of truth for bank details.
 * Supplied and confirmed (exact bank-registered name) by the campaign, 5 October 2026.
 */
export const donationAccount = {
  bankName: 'Zenith Bank',
  accountName: 'SUNDAY JEREMIAH_CAMPAIGN ACCOUNT',
  accountNumber: '1244219463',
} as const;

/**
 * Campaign office contact link (a route, mailto: or tel: URL).
 * PENDING — null until the campaign supplies contact details; buttons that
 * point here render disabled meanwhile.
 */
export const campaignOffice = {
  href: null as string | null,
};
