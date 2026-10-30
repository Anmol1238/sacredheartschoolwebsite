"use client";

import Image from "next/image";
import { ArrowDown, ArrowUp, Images } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useSiteContent } from "@/components/admin/useSiteContent";
import { StateView } from "@/components/ui/StateView";
import { CardGridSkeleton } from "@/components/ui/Skeleton";
import type { HeroSlide } from "@/lib/types";

export default function AdminHeroPage() {
  const { content, status, save } = useSiteContent();

  function updateSlides(slides: HeroSlide[]) {
    if (!content) return;
    void save({
      ...content,
      heroSlides: slides,
      school: {
        ...content.school,
        heroImage: slides[0]?.src || content.school.heroImage,
      },
    });
  }

  function addFromUpload(url: string, name: string) {
    if (!content) return;
    const slide: HeroSlide = {
      id: crypto.randomUUID(),
      src: url,
      title: name.replace(/\.[^.]+$/, "") || "Campus photo",
      caption: "",
    };
    updateSlides([...(content.heroSlides || []), slide]);
  }

  function move(id: string, dir: -1 | 1) {
    if (!content) return;
    const slides = [...(content.heroSlides || [])];
    const i = slides.findIndex((s) => s.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= slides.length) return;
    [slides[i], slides[j]] = [slides[j], slides[i]];
    updateSlides(slides);
  }

  const slides = content?.heroSlides || [];

  return (
    <AdminShell title="Homepage Slideshow">
      {status === "loading" ? <CardGridSkeleton /> : null}
      {status === "error" ? <StateView kind="error" /> : null}

      {content ? (
        <div className="space-y-6">
          <div className="card-soft flex flex-wrap items-start justify-between gap-4 p-5">
            <div className="max-w-xl">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white">
                <Images className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-ink">Hero campus slideshow</h2>
              <p className="mt-1 text-sm leading-6 text-muted">
                These photos rotate on the homepage hero. Upload more school images anytime —
                parents and students see them instantly after save.
              </p>
            </div>
            <MediaUploader
              accept="image/*"
              label="Add slideshow image"
              onUploaded={(item) => {
                if (item.type !== "image") return;
                addFromUpload(item.url, item.name);
              }}
            />
          </div>

          {!slides.length ? (
            <StateView
              kind="empty"
              title="No slideshow images yet"
              description="Upload campus photos to start the homepage slideshow."
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {slides.map((slide, index) => (
                <article key={slide.id} className="card-soft overflow-hidden">
                  <div className="relative aspect-[16/9] bg-cream">
                    <Image
                      src={slide.src}
                      alt={slide.title || "Slide"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
                      {index + 1} / {slides.length}
                    </span>
                  </div>
                  <div className="space-y-3 p-4">
                    <input
                      className="w-full rounded-xl border border-line px-3 py-2 text-sm"
                      value={slide.title || ""}
                      placeholder="Slide title"
                      onChange={(e) =>
                        updateSlides(
                          slides.map((s) =>
                            s.id === slide.id ? { ...s, title: e.target.value } : s
                          )
                        )
                      }
                    />
                    <input
                      className="w-full rounded-xl border border-line px-3 py-2 text-sm"
                      value={slide.caption || ""}
                      placeholder="Short caption (optional)"
                      onChange={(e) =>
                        updateSlides(
                          slides.map((s) =>
                            s.id === slide.id ? { ...s, caption: e.target.value } : s
                          )
                        )
                      }
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
                        disabled={index === 0}
                        onClick={() => move(slide.id, -1)}
                      >
                        <ArrowUp className="h-3.5 w-3.5" /> Up
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
                        disabled={index === slides.length - 1}
                        onClick={() => move(slide.id, 1)}
                      >
                        <ArrowDown className="h-3.5 w-3.5" /> Down
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-sm text-red-600"
                        onClick={() => updateSlides(slides.filter((s) => s.id !== slide.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </AdminShell>
  );
}
