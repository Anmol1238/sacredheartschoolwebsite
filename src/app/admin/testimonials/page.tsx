"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminSearch, AdminShell } from "@/components/admin/AdminShell";
import { StateView } from "@/components/ui/StateView";
import type { SiteContent, Testimonial } from "@/lib/types";

export default function AdminTestimonialsPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "success">("loading");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/content");
        const data = (await res.json()) as SiteContent;
        setContent(data);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!content) return [];
    const q = query.trim().toLowerCase();
    if (!q) return content.testimonials;
    return content.testimonials.filter(
      (t) => t.name.toLowerCase().includes(q) || t.text.toLowerCase().includes(q)
    );
  }, [content, query]);

  async function persist(next: SiteContent) {
    setContent(next);
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    if (!res.ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setTimeout(() => setStatus("ready"), 1200);
  }

  function addItem() {
    if (!content) return;
    const item: Testimonial = {
      id: crypto.randomUUID(),
      name: "New parent",
      text: "Write the testimonial here.",
    };
    void persist({ ...content, testimonials: [item, ...content.testimonials] });
  }

  function updateItem(id: string, patch: Partial<Testimonial>) {
    if (!content) return;
    void persist({
      ...content,
      testimonials: content.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });
  }

  function removeItem(id: string) {
    if (!content) return;
    void persist({
      ...content,
      testimonials: content.testimonials.filter((t) => t.id !== id),
    });
  }

  return (
    <AdminShell title="Testimonials">
      {status === "loading" ? <StateView kind="loading" /> : null}
      {status === "error" ? <StateView kind="error" className="mb-4" /> : null}
      {status === "success" ? <StateView kind="success" compact className="mb-4" /> : null}

      {content ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <AdminSearch value={query} onChange={setQuery} placeholder="Search testimonials" />
            <button type="button" className="btn-primary" onClick={addItem}>
              Add testimonial
            </button>
          </div>

          {!content.testimonials.length ? (
            <StateView
              kind="empty"
              title="No testimonials yet"
              description="Add parent voices to show on the homepage."
              action={
                <button type="button" className="btn-primary" onClick={addItem}>
                  Create first
                </button>
              }
            />
          ) : !filtered.length ? (
            <StateView kind="no-search" description={`No matches for “${query}”.`} />
          ) : (
            <div className="space-y-4">
              {filtered.map((t) => (
                <div key={t.id} className="card-soft grid gap-3 p-5 md:grid-cols-[1fr_auto]">
                  <div className="space-y-3">
                    <input
                      className="w-full rounded-xl border border-line px-3 py-2"
                      value={t.name}
                      onChange={(e) => updateItem(t.id, { name: e.target.value })}
                    />
                    <textarea
                      className="w-full rounded-xl border border-line px-3 py-2"
                      rows={3}
                      value={t.text}
                      onChange={(e) => updateItem(t.id, { text: e.target.value })}
                    />
                  </div>
                  <button
                    type="button"
                    className="h-fit rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => removeItem(t.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </AdminShell>
  );
}
