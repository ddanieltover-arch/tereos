
'use client';

import { VideoBackground } from '@/components/shared/video-background';
import { HOMEPAGE_HERO } from '@/lib/content/photography';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <VideoBackground
        videoSrc={HOMEPAGE_HERO.video}
        posterSrc={HOMEPAGE_HERO.poster}
        fallbackImage={HOMEPAGE_HERO.fallback}
        overlayClassName="hidden"
      />
    </section>
  );
}
