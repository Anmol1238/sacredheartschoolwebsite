"use client";

import { useMemo, useState } from "react";
import { AdminSearch, AdminShell } from "@/components/admin/AdminShell";
import { useSiteContent } from "@/components/admin/useSiteContent";
import { StateView } from "@/components/ui/StateView";
import { LoadingSkeleton } from "@/components/ui/StateView";
import type { FeeClass } from "@/lib/types";

function num(v: string) {
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function recompute(row: FeeClass): FeeClass {
  const annual =
    Number(row.admissionFee || 0) +
    Number(row.installment1 || 0) +
    Number(row.installment2 || 0) +
    Number(row.installment3 || 0) +
    Number(row.installment4 || 0);
  const monthly = Math.round(
    (Number(row.installment1 || 0) +
      Number(row.installment2 || 0) +
      Number(row.installment3 || 0) +
      Number(row.installment4 || 0)) /
      12
  );
  return { ...row, annualTotal: annual, monthlyEquivalent: monthly };
}

export default function AdminFeesPage() {
  const { content, status, save } = useSiteContent();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const list = content?.fees?.classes || [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (c) => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.badge.toLowerCase().includes(q)
    );
  }, [content, query]);

  function updateClass(id: string, patch: Partial<FeeClass>) {
    if (!content) return;
    const nextClasses = content.fees.classes.map((c) =>
      c.id === id ? recompute({ ...c, ...patch }) : c
    );
    void save({
      ...content,
      fees: { ...content.fees, classes: nextClasses },
    });
  }

  function addClass() {
    if (!content) return;
    const item: FeeClass = recompute({
      id: `NEW-${Date.now().toString().slice(-4)}`,
      name: "New Class",
      badge: "NEW",
      admissionFee: 0,
      installment1: 0,
      installment2: 0,
      installment3: 0,
      installment4: 0,
      annualTotal: 0,
      monthlyEquivalent: 0,
    });
    void save({
      ...content,
      fees: { ...content.fees, classes: [...content.fees.classes, item] },
    });
  }

  return (
    <AdminShell title="Fee Structure">
      {status === "loading" ? <LoadingSkeleton rows={6} /> : null}
      {status === "error" ? <StateView kind="error" /> : null}
      {status === "success" ? <StateView kind="success" compact className="mb-4" /> : null}

      {content ? (
        <div className="space-y-4">
          <div className="card-soft grid gap-3 p-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Academic year</label>
              <input
                className="mt-1 w-full rounded-xl border border-line px-3 py-2"
                value={content.fees.academicYear}
                onChange={(e) =>
                  void save({
                    ...content,
                    fees: { ...content.fees, academicYear: e.target.value },
                  })
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Payment methods</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-line px-3 py-2"
                rows={2}
                value={content.fees.paymentMethods}
                onChange={(e) =>
                  void save({
                    ...content,
                    fees: { ...content.fees, paymentMethods: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Due dates</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-line px-3 py-2"
                rows={2}
                value={content.fees.dueDates}
                onChange={(e) =>
                  void save({
                    ...content,
                    fees: { ...content.fees, dueDates: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Refund policy</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-line px-3 py-2"
                rows={2}
                value={content.fees.refundPolicy}
                onChange={(e) =>
                  void save({
                    ...content,
                    fees: { ...content.fees, refundPolicy: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <AdminSearch value={query} onChange={setQuery} placeholder="Search class / badge" />
            <div className="flex gap-2">
              <a href="/fee-structure" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">
                Preview page
              </a>
              <button type="button" className="btn-primary" onClick={addClass}>
                Add class
              </button>
            </div>
          </div>

          {!content.fees.classes.length ? (
            <StateView kind="empty" title="No fee classes" action={<button type="button" className="btn-primary" onClick={addClass}>Add first class</button>} />
          ) : !filtered.length ? (
            <StateView kind="no-search" />
          ) : (
            filtered.map((row) => (
              <article key={row.id} className="card-soft space-y-3 p-5">
                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    className="rounded-xl border border-line px-3 py-2"
                    value={row.name}
                    onChange={(e) => updateClass(row.id, { name: e.target.value })}
                    placeholder="Display name"
                  />
                  <input
                    className="rounded-xl border border-line px-3 py-2"
                    value={row.id}
                    onChange={(e) => updateClass(row.id, { id: e.target.value })}
                    placeholder="ID / value"
                  />
                  <input
                    className="rounded-xl border border-line px-3 py-2"
                    value={row.badge}
                    onChange={(e) => updateClass(row.id, { badge: e.target.value })}
                    placeholder="Badge e.g. XI(COM)"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(
                    [
                      ["admissionFee", "Admission"],
                      ["installment1", "1st Inst"],
                      ["installment2", "2nd Inst"],
                      ["installment3", "3rd Inst"],
                      ["installment4", "4th Inst"],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className="text-sm">
                      <span className="text-muted">{label}</span>
                      <input
                        className="mt-1 w-full rounded-xl border border-line px-3 py-2"
                        value={row[key]}
                        onChange={(e) => updateClass(row.id, { [key]: num(e.target.value) })}
                      />
                    </label>
                  ))}
                  <div className="rounded-xl bg-cream px-3 py-2 text-sm">
                    <p className="text-muted">Annual total</p>
                    <p className="font-semibold">₹ {row.annualTotal.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="rounded-xl bg-cream px-3 py-2 text-sm">
                    <p className="text-muted">Monthly</p>
                    <p className="font-semibold">₹ {row.monthlyEquivalent.toLocaleString("en-IN")}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm text-red-600"
                  onClick={() =>
                    void save({
                      ...content,
                      fees: {
                        ...content.fees,
                        classes: content.fees.classes.filter((c) => c.id !== row.id),
                      },
                    })
                  }
                >
                  Delete class
                </button>
              </article>
            ))
          )}
        </div>
      ) : null}
    </AdminShell>
  );
}
