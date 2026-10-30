"use client";

import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useSiteContent } from "@/components/admin/useSiteContent";
import { StateView } from "@/components/ui/StateView";
import { CardGridSkeleton } from "@/components/ui/Skeleton";
import type { GalleryItem } from "@/lib/types";

export default function AdminGalleryPage() {
  const { content, status, save } = useSiteContent();

  function addFromUpload(url: string, type: "image" | "video", name: string) {
    if (!content) return;
    const item: GalleryItem = {
      id: crypto.randomUUID(),
      title: name.replace(/\.[^.]+$/, "") || "Gallery item",
      src: url,
      type,
      caption: "",
    };
    void save({ ...content, gallery: [item, ...content.gallery] });
  }

  return (
    <AdminShell title="Gallery">
      {status === "loading" ? <CardGridSkeleton /> : null}
      {status === "error" ? <StateView kind="error" /> : null}
      {content ? (
        <div className="space-y-4">
          <MediaUploader
            accept="image/*,video/mp4,video/webm"
            label="Add photo/video to gallery"
            onUploaded={(item) => {
              if (item.type === "file") return;
              addFromUpload(item.url, item.type, item.name);
            }}
          />
          {!content.gallery.length ? (
            <StateView kind="empty" title="Gallery is empty" />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.gallery.map((item) => (
                <article key={item.id} className="card-soft overflow-hidden">
                  <div className="relative aspect-[4/3] bg-cream">
                    {item.type === "image" ? (
                      <Image src={item.src} alt={item.title} fill className="object-cover" />
                    ) : (
                      <video src={item.src} className="h-full w-full object-cover" controls preload="metadata" />
                    )}
                  </div>
                  <div className="space-y-2 p-4">
                    <input
                      className="w-full rounded-xl border border-line px-3 py-2 text-sm"
                      value={item.title}
                      onChange={(e) =>
                        void save({
                          ...content,
                          gallery: content.gallery.map((g) =>
                            g.id === item.id ? { ...g, title: e.target.value } : g
                          ),
                        })
                      }
                    />
                    <input
                      className="w-full rounded-xl border border-line px-3 py-2 text-sm"
                      value={item.caption || ""}
                      placeholder="Caption"
                      onChange={(e) =>
                        void save({
                          ...content,
                          gallery: content.gallery.map((g) =>
                            g.id === item.id ? { ...g, caption: e.target.value } : g
                          ),
                        })
                      }
                    />
                    <button
                      type="button"
                      className="text-sm text-red-600"
                      onClick={() =>
                        void save({
                          ...content,
                          gallery: content.gallery.filter((g) => g.id !== item.id),
                        })
                      }
                    >
                      Remove
                    </button>
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
