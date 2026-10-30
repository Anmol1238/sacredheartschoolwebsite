"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useSiteContent } from "@/components/admin/useSiteContent";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { StateView } from "@/components/ui/StateView";
import { LoadingSkeleton } from "@/components/ui/StateView";
import type { VideoItem } from "@/lib/types";

export default function AdminVideosPage() {
  const { content, status, save } = useSiteContent();

  function addVideo(src: string, name: string) {
    if (!content) return;
    const item: VideoItem = {
      id: crypto.randomUUID(),
      title: name.replace(/\.[^.]+$/, "") || "School video",
      src,
      description: "",
      published: true,
    };
    void save({ ...content, videos: [item, ...content.videos] });
  }

  return (
    <AdminShell title="Videos">
      {status === "loading" ? <LoadingSkeleton rows={4} /> : null}
      {status === "error" ? <StateView kind="error" /> : null}
      {content ? (
        <div className="space-y-4">
          <MediaUploader
            accept="video/mp4,video/webm"
            label="Upload video"
            onUploaded={(item) => addVideo(item.url, item.name)}
          />
          {!content.videos.length ? (
            <StateView kind="empty" title="No videos yet" />
          ) : (
            content.videos.map((video) => (
              <article key={video.id} className="card-soft grid gap-4 p-5 lg:grid-cols-2">
                <VideoPlayer src={video.src} poster={video.poster} title={video.title} />
                <div className="space-y-3">
                  <input
                    className="w-full rounded-xl border border-line px-3 py-2"
                    value={video.title}
                    onChange={(e) =>
                      void save({
                        ...content,
                        videos: content.videos.map((v) =>
                          v.id === video.id ? { ...v, title: e.target.value } : v
                        ),
                      })
                    }
                  />
                  <textarea
                    className="w-full rounded-xl border border-line px-3 py-2"
                    rows={3}
                    value={video.description || ""}
                    onChange={(e) =>
                      void save({
                        ...content,
                        videos: content.videos.map((v) =>
                          v.id === video.id ? { ...v, description: e.target.value } : v
                        ),
                      })
                    }
                    placeholder="Description"
                  />
                  <input
                    className="w-full rounded-xl border border-line px-3 py-2"
                    value={video.poster || ""}
                    onChange={(e) =>
                      void save({
                        ...content,
                        videos: content.videos.map((v) =>
                          v.id === video.id ? { ...v, poster: e.target.value } : v
                        ),
                      })
                    }
                    placeholder="Poster image URL"
                  />
                  <MediaUploader
                    accept="image/*"
                    label="Upload poster"
                    onUploaded={(item) =>
                      void save({
                        ...content,
                        videos: content.videos.map((v) =>
                          v.id === video.id ? { ...v, poster: item.url } : v
                        ),
                      })
                    }
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={video.published}
                      onChange={(e) =>
                        void save({
                          ...content,
                          videos: content.videos.map((v) =>
                            v.id === video.id ? { ...v, published: e.target.checked } : v
                          ),
                        })
                      }
                    />
                    Published on website
                  </label>
                  <button
                    type="button"
                    className="text-sm text-red-600"
                    onClick={() =>
                      void save({
                        ...content,
                        videos: content.videos.filter((v) => v.id !== video.id),
                      })
                    }
                  >
                    Delete video
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      ) : null}
    </AdminShell>
  );
}
