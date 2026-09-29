import { Container } from '@/components/layout/Container';
import { campaign } from '@/data/campaign';
import { countdownMessage } from '@/data/home';
import { useCountdown } from '@/hooks/useCountdown';

const units = ['days', 'hours', 'minutes', 'seconds'] as const;

const longDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Africa/Lagos',
});

/**
 * Floating election countdown bar. It overlaps the hero's bottom edge by 2rem
 * and bridges into the (soft-background) campaign message section below.
 *
 * `flow-root` stops the bar's negative margin collapsing through the wrapper,
 * so the soft background starts exactly at the hero's bottom edge.
 */
export function Countdown() {
  const parts = useCountdown(campaign.electionDate);
  if (!parts || !campaign.electionDate) return null;

  return (
    <section
      aria-label="Countdown to Election Day"
      className="relative z-10 flow-root bg-background"
    >
      <Container>
        <div className="-mt-8 overflow-hidden rounded-card border border-white/15 bg-navy text-white shadow-card md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,1.3fr)] md:items-center">
          {/* role="timer" is not live by default, so screen readers aren't interrupted every second */}
          <div role="timer" className="grid grid-cols-4 divide-x divide-white/15 py-3">
            {units.map((unit) => (
              <div key={unit} className="px-1 text-center">
                <span className="block text-2xl leading-none font-semibold tabular-nums sm:text-[1.75rem]">
                  {String(parts[unit]).padStart(2, '0')}
                </span>
                <span className="mt-1.5 block text-xs leading-none text-on-navy-muted">{unit}</span>
              </div>
            ))}
          </div>

          <p className="border-t border-white/15 px-4 py-2.5 text-center text-sm leading-snug md:border-t-0 md:border-l md:px-6 md:py-0 md:text-left md:text-[0.9375rem]">
            <time dateTime={campaign.electionDate} className="sr-only">
              {longDate.format(new Date(campaign.electionDate))}.
            </time>
            <span className="text-white md:block">{countdownMessage.lead}</span>{' '}
            <span className="text-gold md:block">{countdownMessage.accent}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
