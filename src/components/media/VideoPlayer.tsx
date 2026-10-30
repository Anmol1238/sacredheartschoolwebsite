"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, Maximize } from "lucide-react";
import { StateView } from "@/components/ui/StateView";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
};

export function VideoPlayer({ src, poster, title, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const onTime = () => {
      if (!video.duration) return;
      setProgress((video.currentTime / video.duration) * 100);
    };
    const onWaiting = () => setBuffering(true);
    const onPlaying = () => {
      setBuffering(false);
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    const onError = () => setError(true);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("error", onError);
    };
  }, [src]);

  if (error) {
    return (
      <StateView
        kind="error"
        compact
        title="Video unavailable"
        description="This video could not be loaded. Try again on a stronger connection."
        action={
          <button type="button" className="btn-primary" onClick={() => setError(false)}>
            Retry
          </button>
        }
      />
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-3xl border border-line bg-ink shadow-lg", className)}>
      <div className="relative aspect-video bg-black">
        <video
          ref={ref}
          src={src}
          poster={poster}
          className="h-full w-full object-contain"
          playsInline
          preload="metadata"
          title={title}
        />
        {buffering ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
            <div className="buffer-bar w-40">
              <span />
            </div>
          </div>
        ) : null}
        {/* Controls only — no title text over the video frame */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent p-3 pt-10">
          <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/25">
            <div className="h-full bg-green transition-[width] duration-150" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center gap-2 text-white">
            <button
              type="button"
              className="rounded-full bg-white/15 p-2 hover:bg-white/25"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => {
                const video = ref.current;
                if (!video) return;
                if (video.paused) void video.play();
                else video.pause();
              }}
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className="rounded-full bg-white/15 p-2 hover:bg-white/25"
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={() => {
                const video = ref.current;
                if (!video) return;
                video.muted = !video.muted;
                setMuted(video.muted);
              }}
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <span className="flex-1" aria-hidden />
            <button
              type="button"
              className="rounded-full bg-white/15 p-2 hover:bg-white/25"
              aria-label="Fullscreen"
              onClick={() => void ref.current?.requestFullscreen?.()}
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
