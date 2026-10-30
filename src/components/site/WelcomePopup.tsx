"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { StateView } from "@/components/ui/StateView";
import { Skeleton } from "@/components/ui/Skeleton";

type Props = {
  enabled: boolean;
  image: string;
  title: string;
  subtitle?: string;
  storageKey?: string;
};

export function WelcomePopup({
  enabled,
  image,
  title,
  subtitle,
  storageKey = "shs_welcome_popup_dismissed",
}: Props) {
  const [open, setOpen] = useState(false);
  const [imgState, setImgState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!enabled || !image) return;
    try {
      if (sessionStorage.getItem(storageKey) === "1") return;
    } catch {
      // private mode / blocked storage — still show once per mount
    }
    const t = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(t);
  }, [enabled, image, storageKey]);

  function dismiss() {
    setOpen(false);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/55 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-3 top-3 z-10 rounded-full bg-ink/80 p-2 text-white hover:bg-ink"
          aria-label="Close announcement"
          onClick={dismiss}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-line px-5 py-4 pr-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Announcement</p>
          <h2 className="heading-display mt-1 text-xl font-bold text-ink md:text-2xl">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
        </div>

        <div className="relative max-h-[70vh] overflow-auto bg-cream p-3 md:p-4">
          {imgState === "loading" ? (
            <div className="space-y-3 p-2">
              <StateView kind="buffering" compact title="Loading announcement" />
              <Skeleton className="aspect-[3/4] w-full" />
            </div>
          ) : null}
          {imgState === "error" ? (
            <StateView
              kind="error"
              compact
              title="Could not load announcement image"
              description="Check your connection and try again."
              action={
                <button type="button" className="btn-primary" onClick={() => setImgState("loading")}>
                  Retry
                </button>
              }
            />
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className={`mx-auto h-auto w-full max-w-2xl rounded-2xl object-contain ${
              imgState === "ready" ? "block" : "hidden"
            }`}
            onLoad={() => setImgState("ready")}
            onError={() => setImgState("error")}
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-line px-5 py-4">
          <button type="button" className="btn-primary" onClick={dismiss}>
            Continue to website
          </button>
        </div>
      </div>
    </div>
  );
}
