const dateFormatter = new Intl.DateTimeFormat('en-NG', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  // Campaign dates are Nigerian dates: format in Lagos time so days never shift.
  timeZone: 'Africa/Lagos',
});

/** Format an ISO date string, e.g. "12 Sept 2026". */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** Seconds to m:ss, e.g. 114 → "1:54". */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(Math.round(totalSeconds % 60)).padStart(2, '0');
  return `${minutes}:${seconds}`;
}
