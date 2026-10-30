"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminSearch, AdminShell } from "@/components/admin/AdminShell";
import { StateView } from "@/components/ui/StateView";
import type { EventItem, SiteContent } from "@/lib/types";

export default function AdminEventsPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/content");
        setContent((await res.json()) as SiteContent);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!content) return [];
    const q = query.trim().toLowerCase();
    if (!q) return content.events;
    return content.events.filter(
      (e) => e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q)
    );
  }, [content, query]);

  async function persist(next: SiteContent) {
    setContent(next);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
  }

  function addEvent() {
    if (!content) return;
    const item: EventItem = {
      id: crypto.randomUUID(),
      title: "New event",
      date: new Date().toISOString().slice(0, 10),
      summary: "Describe the event.",
    };
    void persist({ ...content, events: [item, ...content.events] });
  }

  return (
    <AdminShell title="Events">
      {status === "loading" ? <StateView kind="loading" /> : null}
      {status === "error" ? <StateView kind="error" /> : null}
      {content ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <AdminSearch value={query} onChange={setQuery} placeholder="Search events" />
            <button type="button" className="btn-primary" onClick={addEvent}>
              Add event
            </button>
          </div>
          {!content.events.length ? (
            <StateView kind="empty" title="No events" />
          ) : !filtered.length ? (
            <StateView kind="no-search" />
          ) : (
            filtered.map((event) => (
              <div key={event.id} className="card-soft grid gap-3 p-5 md:grid-cols-3">
                <input
                  className="rounded-xl border border-line px-3 py-2"
                  value={event.title}
                  onChange={(e) =>
                    void persist({
                      ...content,
                      events: content.events.map((x) =>
                        x.id === event.id ? { ...x, title: e.target.value } : x
                      ),
                    })
                  }
                />
                <input
                  type="date"
                  className="rounded-xl border border-line px-3 py-2"
                  value={event.date}
                  onChange={(e) =>
                    void persist({
                      ...content,
                      events: content.events.map((x) =>
                        x.id === event.id ? { ...x, date: e.target.value } : x
                      ),
                    })
                  }
                />
                <textarea
                  className="rounded-xl border border-line px-3 py-2 md:col-span-3"
                  rows={2}
                  value={event.summary}
                  onChange={(e) =>
                    void persist({
                      ...content,
                      events: content.events.map((x) =>
                        x.id === event.id ? { ...x, summary: e.target.value } : x
                      ),
                    })
                  }
                />
              </div>
            ))
          )}
        </div>
      ) : null}
    </AdminShell>
  );
}
