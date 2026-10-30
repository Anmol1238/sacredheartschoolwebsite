"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { StateView } from "@/components/ui/StateView";
import type { SiteContent } from "@/lib/types";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "saving" | "success" | "error" | "buffering">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setStatus("buffering");
        const res = await fetch("/api/content");
        if (!res.ok) throw new Error("fail");
        const data = (await res.json()) as SiteContent;
        if (!cancelled) {
          setContent(data);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function save() {
    if (!content) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      setTimeout(() => setStatus("ready"), 1800);
    } catch {
      setStatus("error");
    }
  }

  return (
    <AdminShell title="Site Content">
      {status === "loading" || status === "buffering" ? (
        <StateView kind={status === "buffering" ? "buffering" : "loading"} />
      ) : null}
      {status === "error" ? (
        <StateView
          kind="error"
          action={
            <button type="button" className="btn-primary" onClick={() => location.reload()}>
              Reload
            </button>
          }
        />
      ) : null}
      {status === "success" ? <StateView kind="success" compact className="mb-4" /> : null}

      {content && status !== "error" ? (
        <div className="space-y-6">
          <div className="card-soft grid gap-4 p-6 md:grid-cols-2">
            <div className="md:col-span-2 rounded-2xl border border-line bg-cream p-4">
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={content.announcement?.enabled ?? false}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      announcement: {
                        ...(content.announcement || {
                          title: "",
                          subtitle: "",
                          image: "",
                        }),
                        enabled: e.target.checked,
                      },
                    })
                  }
                />
                Show homepage welcome popup (same as live site opening announcement)
              </label>
              <Field
                label="Popup title"
                value={content.announcement?.title || ""}
                onChange={(v) =>
                  setContent({
                    ...content,
                    announcement: { ...content.announcement, title: v, enabled: content.announcement?.enabled ?? true, subtitle: content.announcement?.subtitle || "", image: content.announcement?.image || "" },
                  })
                }
              />
              <Field
                label="Popup image URL"
                value={content.announcement?.image || ""}
                onChange={(v) =>
                  setContent({
                    ...content,
                    announcement: { ...content.announcement, image: v, enabled: content.announcement?.enabled ?? true, title: content.announcement?.title || "", subtitle: content.announcement?.subtitle || "" },
                  })
                }
              />
            </div>
            <Field
              label="School name"
              value={content.school.name}
              onChange={(v) =>
                setContent({ ...content, school: { ...content.school, name: v } })
              }
            />
            <Field
              label="Phone"
              value={content.school.phone}
              onChange={(v) =>
                setContent({ ...content, school: { ...content.school, phone: v } })
              }
            />
            <Field
              label="Email"
              value={content.school.email}
              onChange={(v) =>
                setContent({ ...content, school: { ...content.school, email: v } })
              }
            />
            <Field
              label="Address"
              value={content.school.address}
              onChange={(v) =>
                setContent({ ...content, school: { ...content.school, address: v } })
              }
            />
            <div className="md:col-span-2">
              <label className="text-sm font-medium">About body</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-line px-3 py-3"
                rows={6}
                value={content.about.body}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, body: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <button type="button" className="btn-primary" onClick={save} disabled={status === "saving"}>
            {status === "saving" ? "Saving…" : "Save changes"}
          </button>
        </div>
      ) : null}
    </AdminShell>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        className="mt-1 w-full rounded-xl border border-line px-3 py-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
