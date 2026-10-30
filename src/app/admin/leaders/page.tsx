"use client";

import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useSiteContent } from "@/components/admin/useSiteContent";
import { StateView } from "@/components/ui/StateView";
import { LeaderSkeleton } from "@/components/ui/Skeleton";
import type { Leader } from "@/lib/types";

export default function AdminLeadersPage() {
  const { content, status, save } = useSiteContent();

  function updateLeader(id: string, patch: Partial<Leader>) {
    if (!content) return;
    void save({
      ...content,
      leaders: content.leaders.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    });
  }

  function addLeader() {
    if (!content) return;
    const leader: Leader = {
      id: crypto.randomUUID(),
      name: "New Leader",
      role: "Role",
      photo: "https://ui-avatars.com/api/?name=New+Leader&background=373186&color=fff&size=512",
      message: "Write a welcome message.",
      quote: "Write a short quote.",
    };
    void save({ ...content, leaders: [...content.leaders, leader] });
  }

  return (
    <AdminShell title="Leaders">
      {status === "loading" ? (
        <div className="space-y-4">
          <LeaderSkeleton />
          <LeaderSkeleton />
        </div>
      ) : null}
      {status === "error" ? <StateView kind="error" /> : null}
      {status === "success" ? <StateView kind="success" compact className="mb-4" /> : null}

      {content ? (
        <div className="space-y-4">
          <button type="button" className="btn-primary" onClick={addLeader}>
            Add leader
          </button>
          {!content.leaders.length ? (
            <StateView kind="empty" title="No leaders yet" />
          ) : (
            content.leaders.map((leader) => (
              <article key={leader.id} className="card-soft grid gap-5 p-5 md:grid-cols-[140px_1fr]">
                <div className="space-y-3">
                  <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-line">
                    <Image src={leader.photo} alt={leader.name} fill className="object-cover" />
                  </div>
                  <MediaUploader
                    accept="image/*"
                    label="Upload photo"
                    onUploaded={(item) => updateLeader(leader.id, { photo: item.url })}
                  />
                </div>
                <div className="grid gap-3">
                  <input
                    className="rounded-xl border border-line px-3 py-2"
                    value={leader.name}
                    onChange={(e) => updateLeader(leader.id, { name: e.target.value })}
                    placeholder="Name"
                  />
                  <input
                    className="rounded-xl border border-line px-3 py-2"
                    value={leader.role}
                    onChange={(e) => updateLeader(leader.id, { role: e.target.value })}
                    placeholder="Role (Director / Secretary)"
                  />
                  <input
                    className="rounded-xl border border-line px-3 py-2"
                    value={leader.photo}
                    onChange={(e) => updateLeader(leader.id, { photo: e.target.value })}
                    placeholder="Photo URL"
                  />
                  <textarea
                    className="rounded-xl border border-line px-3 py-2"
                    rows={2}
                    value={leader.quote}
                    onChange={(e) => updateLeader(leader.id, { quote: e.target.value })}
                    placeholder="Quote"
                  />
                  <textarea
                    className="rounded-xl border border-line px-3 py-2"
                    rows={3}
                    value={leader.message}
                    onChange={(e) => updateLeader(leader.id, { message: e.target.value })}
                    placeholder="Message"
                  />
                  <button
                    type="button"
                    className="justify-self-start text-sm text-red-600"
                    onClick={() =>
                      void save({
                        ...content,
                        leaders: content.leaders.filter((l) => l.id !== leader.id),
                      })
                    }
                  >
                    Remove
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
