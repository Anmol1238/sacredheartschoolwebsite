"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminSearch, AdminShell } from "@/components/admin/AdminShell";
import { StateView } from "@/components/ui/StateView";
import type { SiteContent } from "@/lib/types";

export default function AdminInquiriesPage() {
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
    const list = content?.inquiries || [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.message.toLowerCase().includes(q)
    );
  }, [content, query]);

  async function markRead(id: string) {
    if (!content) return;
    const next = {
      ...content,
      inquiries: content.inquiries.map((i) =>
        i.id === id ? { ...i, status: "read" as const } : i
      ),
    };
    setContent(next);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
  }

  return (
    <AdminShell title="Inquiries">
      {status === "loading" ? <StateView kind="loading" /> : null}
      {status === "error" ? <StateView kind="error" /> : null}
      {content ? (
        <div className="space-y-4">
          <AdminSearch value={query} onChange={setQuery} placeholder="Search inquiries" />
          {!content.inquiries?.length ? (
            <StateView
              kind="empty"
              title="No inquiries yet"
              description="Contact and admission form submissions will land here."
            />
          ) : !filtered.length ? (
            <StateView kind="no-search" />
          ) : (
            filtered.map((inquiry) => (
              <article key={inquiry.id} className="card-soft p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-ink">{inquiry.name}</h2>
                    <p className="text-sm text-muted">
                      {inquiry.email} · {inquiry.phone}
                    </p>
                  </div>
                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
                    {inquiry.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink">{inquiry.message}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xs text-muted">
                    {new Date(inquiry.createdAt).toLocaleString("en-IN")}
                  </p>
                  {inquiry.status === "new" ? (
                    <button
                      type="button"
                      className="rounded-full border border-line px-3 py-1.5 text-sm"
                      onClick={() => markRead(inquiry.id)}
                    >
                      Mark read
                    </button>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </div>
      ) : null}
    </AdminShell>
  );
}
