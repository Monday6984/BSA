import { Play } from 'lucide-react';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/cn';
import { formatDuration } from '@/lib/format';
import type { VideoAsset } from '@/types/content';

interface VideoPlayerProps {
  video: VideoAsset;
  className?: string;
}

/**
 * Self-hosted video in a 16:9 editorial frame, with native controls.
 *
 * - Never autoplays; nothing downloads until the viewer presses play (preload="none").
 * - Before first play, a large play button sits over the poster (or a navy frame
 *   when no poster is set) as the single, keyboard-accessible control. Once
 *   playback starts, the browser's native controls (`controls`) take over.
 * - Captions render from `video.captions` when supplied.
 */
export function VideoPlayer({ video, className }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function handlePlay() {
    const el = ref.current;
    if (!el) return;
    // Render native controls first so the video is focusable, then move focus to it.
    flushSync(() => setStarted(true));
    el.focus();
    void el.play();
  }

  return (
    <div
      className={cn(
        'relative aspect-video overflow-hidden rounded-media border border-navy/10 bg-navy',
        className,
      )}
    >
      <video
        ref={ref}
        controls={started}
        playsInline
        preload="none"
        poster={video.poster?.src}
        aria-label={video.title}
        onPlay={() => setStarted(true)}
        className="size-full bg-navy object-contain"
      >
        <source src={video.src} type={video.type} />
        {video.captions?.map((track, i) => (
          <track
            key={track.src}
            kind="captions"
            src={track.src}
            srcLang={track.srclang}
            label={track.label}
            default={i === 0}
          />
        ))}
        <p className="p-6 text-white">
          Your browser can’t play this video.{' '}
          <a href={video.src} className="underline">
            Download the video
          </a>
          .
        </p>
      </video>

      {!started && (
        <>
          {video.durationSeconds && (
            <p className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 rounded-button bg-navy/80 px-3 py-1.5 text-xs font-medium text-white sm:top-5 sm:left-5">
              <span>{video.title}</span>
              <span aria-hidden="true" className="h-3 w-px bg-white/30" />
              <span>
                <span className="sr-only">Duration </span>
                {formatDuration(video.durationSeconds)}
              </span>
            </p>
          )}
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play video: ${video.title}`}
            className="group absolute inset-0 m-auto flex size-18 items-center justify-center rounded-full bg-white text-navy transition-colors hover:bg-gold sm:size-20"
          >
            <Play aria-hidden="true" className="ml-1 size-7 fill-current sm:size-8" />
          </button>
        </>
      )}
    </div>
  );
}
