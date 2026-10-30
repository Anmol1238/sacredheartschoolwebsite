"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff, Pause, Play } from "lucide-react";
import type { HeroSlide, SiteContent } from "@/lib/types";
import { cn } from "@/lib/cn";

const INTERVAL_MS = 3000;
const FADE_MS = 700;

type Props = {
  school: SiteContent["school"];
  slides: HeroSlide[];
};

/**
 * Clean campus media carousel — photos only.
 * Titles / CTAs live in the Welcome section below, never over the image.
 */
export function HeroSlideshow({ school, slides }: Props) {
  const seed = useMemo(() => {
    const list = (slides || []).filter((s) => Boolean(s?.src?.trim()));
    if (list.length) return list;
    if (school.heroImage) {
      return [{ id: "fallback", src: school.heroImage, title: "", caption: "" }];
    }
    return [] as HeroSlide[];
  }, [slides, school.heroImage]);

  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const items = useMemo(() => seed.filter((s) => !failed[s.id]), [seed, failed]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    try {
      setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {
      setReduceMotion(false);
    }
  }, []);

  useEffect(() => {
    if (index >= items.length) {
      setIndex(0);
      setProgressKey((k) => k + 1);
    }
  }, [items.length, index]);

  function goTo(next: number) {
    if (!items.length) return;
    setIndex(((next % items.length) + items.length) % items.length);
    setProgressKey((k) => k + 1);
  }

  useEffect(() => {
    if (paused || items.length < 2 || reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
      setProgressKey((k) => k + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, items.length, reduceMotion]);

  const current = items[index] ?? items[0];

  if (!items.length) {
    return (
      <section
        className="flex min-h-[52vh] items-center justify-center bg-[#e8e6df] md:min-h-[62vh]"
        aria-label="School campus slideshow"
      >
        <div className="px-6 text-center text-ink">
          <ImageOff className="mx-auto mb-3 h-10 w-10 text-muted" aria-hidden />
          <p className="text-sm font-medium text-muted">Campus photos will appear here soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden bg-[#0f1428]"
      aria-roledescription="carousel"
      aria-label="School campus slideshow"
    >
      <div className="relative aspect-[16/10] min-h-[52vh] w-full md:aspect-auto md:min-h-[68vh] lg:min-h-[74vh]">
        {items.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0",
                reduceMotion ? "" : "transition-opacity ease-in-out",
                active ? "opacity-100" : "opacity-0"
              )}
              style={reduceMotion ? undefined : { transitionDuration: `${FADE_MS}ms` }}
              aria-hidden={!active}
            >
              <Image
                src={slide.src}
                alt={
                  slide.title?.trim()
                    ? slide.title
                    : `${school.shortName} campus photo ${i + 1}`
                }
                fill
                priority={i === 0}
                quality={95}
                className="object-cover object-center"
                sizes="100vw"
                onError={() =>
                  setFailed((prev) => ({
                    ...prev,
                    [slide.id]: true,
                  }))
                }
              />
            </div>
          );
        })}

        {items.length > 1 ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-black/20">
              <div
                key={progressKey}
                className={cn("h-full bg-[#F5A623]", !reduceMotion && "hero-progress-bar")}
                style={
                  reduceMotion
                    ? { width: `${((index + 1) / items.length) * 100}%` }
                    : {
                        animationDuration: `${INTERVAL_MS}ms`,
                        animationPlayState: paused ? "paused" : "running",
                      }
                }
              />
            </div>

            <div
              className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/30 bg-black/35 px-2.5 py-1.5 shadow-lg backdrop-blur-md"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
            >
              <button
                type="button"
                aria-label="Previous slide"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/20"
                onClick={() => goTo(index - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1.5 px-1">
                {items.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-[#F5A623]" : "w-2 bg-white/55 hover:bg-white/85"
                    )}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next slide"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/20"
                onClick={() => goTo(index + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/20"
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              </button>
            </div>

            <p className="sr-only" aria-live="polite">
              Slide {index + 1} of {items.length}
              {current?.title ? `: ${current.title}` : ""}
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
