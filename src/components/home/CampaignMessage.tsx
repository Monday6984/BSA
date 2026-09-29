import { Container } from '@/components/layout/Container';
import { Placeholder } from '@/components/ui/Placeholder';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { campaignMessage } from '@/data/home';

/**
 * Campaign message: the real campaign video (≈57%) beside the section heading
 * (≈43%) on the soft background. Video comes first on mobile.
 *
 * Top padding is measured from the floating countdown above, which sits in its
 * own soft-background wrapper, so the two read as one continuous surface.
 */
export function CampaignMessage() {
  const { eyebrow, heading, body, video } = campaignMessage;

  return (
    <section aria-labelledby="campaign-message-heading" className="bg-background py-20 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14 xl:gap-20">
        <VideoPlayer video={video} />

        <div className="max-w-xl">
          <span aria-hidden="true" className="gold-rule" />
          <p className="mt-5 eyebrow text-gold-deep">{eyebrow}</p>
          <h2 id="campaign-message-heading" className="mt-3 text-h2">
            {heading}
          </h2>

          {body ? (
            <p className="mt-5 text-lead text-muted">{body}</p>
          ) : (
            // Dev-only reminder; nothing is rendered in production until copy is approved.
            import.meta.env.DEV && (
              <Placeholder className="mt-6 py-6 text-muted">
                Supporting copy — awaiting approved text.
              </Placeholder>
            )
          )}
        </div>
      </Container>
    </section>
  );
}
