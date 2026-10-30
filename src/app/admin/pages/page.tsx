"use client";

import { useMemo, useState } from "react";
import { AdminSearch, AdminShell } from "@/components/admin/AdminShell";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useSiteContent } from "@/components/admin/useSiteContent";
import { StateView } from "@/components/ui/StateView";
import { LoadingSkeleton } from "@/components/ui/StateView";
import type { CustomPage } from "@/lib/types";
import { sanitizeText, slugify } from "@/lib/sanitize";

export default function AdminPagesPage() {
  const { content, status, save } = useSiteContent();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const list = content?.pages || [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q)
    );
  }, [content, query]);

  function addPage() {
    if (!content) return;
    const page: CustomPage = {
      id: crypto.randomUUID(),
      slug: `new-page-${Date.now().toString().slice(-4)}`,
      title: "New Page",
      excerpt: "Short summary for listings and SEO.",
      body: "Write page content here. Use blank lines for new paragraphs.",
      published: false,
      showInNav: false,
      updatedAt: new Date().toISOString(),
    };
    void save({ ...content, pages: [page, ...content.pages] });
  }

  function updatePage(id: string, patch: Partial<CustomPage>) {
    if (!content) return;
    void save({
      ...content,
      pages: content.pages.map((p) =>
        p.id === id
          ? {
              ...p,
              ...patch,
              title: patch.title !== undefined ? sanitizeText(patch.title, 120) : p.title,
              excerpt: patch.excerpt !== undefined ? sanitizeText(patch.excerpt, 280) : p.excerpt,
              body: patch.body !== undefined ? sanitizeText(patch.body, 20000) : p.body,
              slug: patch.slug !== undefined ? slugify(patch.slug) : p.slug,
              updatedAt: new Date().toISOString(),
            }
          : p
      ),
    });
  }

  return (
    <AdminShell title="Custom Pages">
      {status === "loading" ? <LoadingSkeleton rows={5} /> : null}
      {status === "error" ? <StateView kind="error" /> : null}
      {status === "success" ? <StateView kind="success" compact className="mb-4" /> : null}

      {content ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <AdminSearch value={query} onChange={setQuery} placeholder="Search pages" />
            <button type="button" className="btn-primary" onClick={addPage}>
              Add page
            </button>
          </div>
          {!content.pages.length ? (
            <StateView
              kind="empty"
              title="No custom pages"
              description="Create content pages like Activities, Clubs, or Notices — they can appear in navigation."
              action={
                <button type="button" className="btn-primary" onClick={addPage}>
                  Create first page
                </button>
              }
            />
          ) : !filtered.length ? (
            <StateView kind="no-search" />
          ) : (
            filtered.map((page) => (
              <article key={page.id} className="card-soft space-y-3 p-5">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className="rounded-xl border border-line px-3 py-2"
                    value={page.title}
                    onChange={(e) => updatePage(page.id, { title: e.target.value })}
                    placeholder="Title"
                  />
                  <input
                    className="rounded-xl border border-line px-3 py-2"
                    value={page.slug}
                    onChange={(e) => updatePage(page.id, { slug: e.target.value })}
                    placeholder="url-slug"
                  />
                </div>
                <input
                  className="w-full rounded-xl border border-line px-3 py-2"
                  value={page.excerpt}
                  onChange={(e) => updatePage(page.id, { excerpt: e.target.value })}
                  placeholder="Excerpt"
                />
                <textarea
                  className="w-full rounded-xl border border-line px-3 py-2"
                  rows={5}
                  value={page.body}
                  onChange={(e) => updatePage(page.id, { body: e.target.value })}
                  placeholder="Body"
                />
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={page.published}
                      onChange={(e) => updatePage(page.id, { published: e.target.checked })}
                    />
                    Published
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={page.showInNav}
                      onChange={(e) => updatePage(page.id, { showInNav: e.target.checked })}
                    />
                    Show in navigation
                  </label>
                  <MediaUploader
                    accept="image/*"
                    label="Cover image"
                    onUploaded={(item) => updatePage(page.id, { coverImage: item.url })}
                  />
                  <a
                    href={`/pages/${page.slug}`}
                    className="text-sm font-semibold text-navy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Preview →
                  </a>
                  <button
                    type="button"
                    className="text-sm text-red-600"
                    onClick={() =>
                      void save({
                        ...content,
                        pages: content.pages.filter((p) => p.id !== page.id),
                      })
                    }
                  >
                    Delete
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
