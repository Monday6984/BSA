export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface NewsletterSubmission {
  email: string;
}

/** Volunteer sign-up (Join the Movement page). */
export interface JoinMovementSubmission {
  fullName: string;
  email: string;
  /** Value from the "How would you like to help?" list */
  role: string;
  message?: string;
}

/** Constituency feedback (Join the Movement page). */
export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
