'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import { HOMEPAGE_HERO } from '@/lib/content/photography';

interface VideoBackgroundProps {
  videoSrc?: string;
  posterSrc?: string;
  fallbackImage?: string;
  overlayClassName?: string;
  className?: string;
}


export function VideoBackground({
  videoSrc = HOMEPAGE_HERO.video,
  posterSrc = HOMEPAGE_HERO.poster,
  fallbackImage = HOMEPAGE_HERO.fallback,
  overlayClassName,
  className,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [posterError, setPosterError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        await video.play();
        setUseVideo(true);
      } catch {
        setUseVideo(false);
      }
    };

    // If the video is already ready (canplay fired before effect ran), play immediately
    if (video.readyState >= 3) {
      tryPlay();
    }

    video.addEventListener('canplay', tryPlay);
    video.addEventListener('error', () => setUseVideo(false));

    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('error', () => setUseVideo(false));
    };
  }, [videoSrc]);

  const poster = posterError ? fallbackImage : posterSrc;

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <video
        ref={videoRef}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
          useVideo ? 'opacity-100' : 'opacity-0'
        )}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {!useVideo && (
        <Image
          src={posterError ? fallbackImage : posterSrc}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          onError={() => setPosterError(true)}
        />
      )}

      {!useVideo && posterError && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${fallbackImage}')` }}
        />
      )}

      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/50 to-dark/80',
          overlayClassName
        )}
      />
    </div>
  );
}

