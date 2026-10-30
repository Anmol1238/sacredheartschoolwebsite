"use client";

import { useMemo, useState } from "react";
import { AdminSearch, AdminShell } from "@/components/admin/AdminShell";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useSiteContent } from "@/components/admin/useSiteContent";
import { StateView } from "@/components/ui/StateView";
import { LoadingSkeleton } from "@/components/ui/StateView";
import type { HomeworkItem } from "@/lib/types";

export default function AdminHomeworkPage() {
  const { content, status, save } = useSiteContent();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const list = content?.homework || [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.className.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q)
    );
  }, [content, query]);

  function addItem() {
    if (!content) return;
    const item: HomeworkItem = {
      id: crypto.randomUUID(),
      className: "Class 1",
      title: "New homework",
      description: "Describe the assignment.",
      date: new Date().toISOString().slice(0, 10),
    };
    void save({ ...content, homework: [item, ...content.homework] });
  }

  return (
    <AdminShell title="Homework">
      {status === "loading" ? <LoadingSkeleton /> : null}
      {status === "error" ? <StateView kind="error" /> : null}
      {content ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <AdminSearch value={query} onChange={setQuery} placeholder="Search homework" />
            <button type="button" className="btn-primary" onClick={addItem}>
              Add homework
            </button>
          </div>
          {!content.homework.length ? (
            <StateView kind="empty" title="No homework posted" />
          ) : !filtered.length ? (
            <StateView kind="no-search" />
          ) : (
            filtered.map((item) => (
              <article key={item.id} className="card-soft grid gap-3 p-5 md:grid-cols-2">
                <input
                  className="rounded-xl border border-line px-3 py-2"
                  value={item.className}
                  onChange={(e) =>
                    void save({
                      ...content,
                      homework: content.homework.map((h) =>
                        h.id === item.id ? { ...h, className: e.target.value } : h
                      ),
                    })
                  }
                  placeholder="Class"
                />
                <input
                  type="date"
                  className="rounded-xl border border-line px-3 py-2"
                  value={item.date}
                  onChange={(e) =>
                    void save({
                      ...content,
                      homework: content.homework.map((h) =>
                        h.id === item.id ? { ...h, date: e.target.value } : h
                      ),
                    })
                  }
                />
                <input
                  className="rounded-xl border border-line px-3 py-2 md:col-span-2"
                  value={item.title}
                  onChange={(e) =>
                    void save({
                      ...content,
                      homework: content.homework.map((h) =>
                        h.id === item.id ? { ...h, title: e.target.value } : h
                      ),
                    })
                  }
                  placeholder="Title"
                />
                <textarea
                  className="rounded-xl border border-line px-3 py-2 md:col-span-2"
                  rows={3}
                  value={item.description}
                  onChange={(e) =>
                    void save({
                      ...content,
                      homework: content.homework.map((h) =>
                        h.id === item.id ? { ...h, description: e.target.value } : h
                      ),
                    })
                  }
                />
                <div className="md:col-span-2">
                  <MediaUploader
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    label="Attach file / image"
                    onUploaded={(media) =>
                      void save({
                        ...content,
                        homework: content.homework.map((h) =>
                          h.id === item.id ? { ...h, fileUrl: media.url } : h
                        ),
                      })
                    }
                  />
                  {item.fileUrl ? (
                    <p className="mt-2 text-xs text-muted">Attached: {item.fileUrl}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="justify-self-start text-sm text-red-600"
                  onClick={() =>
                    void save({
                      ...content,
                      homework: content.homework.filter((h) => h.id !== item.id),
                    })
                  }
                >
                  Delete
                </button>
              </article>
            ))
          )}
        </div>
      ) : null}
    </AdminShell>
  );
}
