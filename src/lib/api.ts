import type {
  ContactSubmission,
  JoinMovementSubmission,
  NewsletterSubmission,
} from '@/types/forms';

/**
 * Form submission layer. No backend exists yet — each function is the single
 * place to connect a real endpoint (or CMS/CRM/payment provider) later.
 */

export class NotConfiguredError extends Error {
  constructor(feature: string) {
    super(`${feature} is not connected to a backend yet.`);
    this.name = 'NotConfiguredError';
  }
}

export async function submitNewsletter(data: NewsletterSubmission): Promise<void> {
  void data;
  throw new NotConfiguredError('Newsletter signup');
}

export async function submitJoinMovement(data: JoinMovementSubmission): Promise<void> {
  void data;
  throw new NotConfiguredError('Volunteer sign-up');
}

export async function submitContact(data: ContactSubmission): Promise<void> {
  void data;
  throw new NotConfiguredError('Constituency feedback');
}
