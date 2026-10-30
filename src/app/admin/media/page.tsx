"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AdminSearch, AdminShell } from "@/components/admin/AdminShell";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useSiteContent } from "@/components/admin/useSiteContent";
import { StateView } from "@/components/ui/StateView";
import { CardGridSkeleton } from "@/components/ui/Skeleton";

export default function AdminMediaPage() {
  const { content, status, save } = useSiteContent();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const list = content?.media || [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((m) => m.name.toLowerCase().includes(q) || m.url.includes(q));
  }, [content, query]);

  return (
    <AdminShell title="Media Library">
      {status === "loading" ? <CardGridSkeleton /> : null}
      {status === "error" ? <StateView kind="error" /> : null}
      {status === "success" ? <StateView kind="success" compact className="mb-4" /> : null}

      {content ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <AdminSearch value={query} onChange={setQuery} placeholder="Search media" />
            <MediaUploader
              onUploaded={(item) =>
                void save({ ...content, media: [item, ...(content.media || [])] })
              }
            />
          </div>
          {!content.media?.length ? (
            <StateView
              kind="empty"
              title="No media uploaded"
              description="Upload photos and videos to use across gallery, leaders, pages, and events."
            />
          ) : !filtered.length ? (
            <StateView kind="no-search" />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <article key={item.id} className="card-soft overflow-hidden">
                  <div className="relative aspect-video bg-cream">
                    {item.type === "image" ? (
                      <Image src={item.url} alt={item.name} fill className="object-cover" />
                    ) : item.type === "video" ? (
                      <video src={item.url} className="h-full w-full object-cover" muted preload="metadata" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm font-semibold text-navy">
                        PDF / File
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="truncate text-xs text-muted">{item.url}</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-full border border-line px-3 py-1 text-xs"
                        onClick={() => void navigator.clipboard.writeText(item.url)}
                      >
                        Copy URL
                      </button>
                      <button
                        type="button"
                        className="rounded-full px-3 py-1 text-xs text-red-600"
                        onClick={() =>
                          void save({
                            ...content,
                            media: content.media.filter((m) => m.id !== item.id),
                          })
                        }
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
