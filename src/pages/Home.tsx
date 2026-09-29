import { AboutIntro } from '@/components/home/AboutIntro';
import { CampaignMessage } from '@/components/home/CampaignMessage';
import { Countdown } from '@/components/home/Countdown';
import { Hero } from '@/components/home/Hero';
import { LatestUpdates } from '@/components/home/LatestUpdates';
import { JoinMovement } from '@/components/home/JoinMovement';
import { ManifestoPillars } from '@/components/home/ManifestoPillars';
import { OnTheGround } from '@/components/home/OnTheGround';
import { Seo } from '@/components/seo/Seo';

/** Homepage — section order follows the approved mockup. */
export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <Countdown />
      <CampaignMessage />
      <AboutIntro />
      <ManifestoPillars />
      <OnTheGround />
      <JoinMovement />
      <LatestUpdates />
    </>
  );
}
