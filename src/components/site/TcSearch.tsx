"use client";

import { useMemo, useState } from "react";
import { StateView } from "@/components/ui/StateView";
import { SearchField } from "@/components/ui/SearchField";
import type { TcCertificate } from "@/lib/types";

export function TcSearch({
  title,
  certificates,
}: {
  title: string;
  certificates: TcCertificate[];
}) {
  const [query, setQuery] = useState("");
  const [slowHint, setSlowHint] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return certificates;
    return certificates.filter(
      (c) =>
        c.studentName.toLowerCase().includes(q) ||
        c.tcNumber.toLowerCase().includes(q) ||
        c.className.toLowerCase().includes(q)
    );
  }, [certificates, query]);

  function onSearch(v: string) {
    setQuery(v);
    setSlowHint(true);
    window.setTimeout(() => setSlowHint(false), 250);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="heading-display text-2xl font-bold">{title}</h2>
          <p className="mt-1 text-sm text-muted">Search by student name, class, or TC number.</p>
        </div>
        <SearchField value={query} onChange={onSearch} placeholder="Search certificates…" />
      </div>

      {slowHint ? <StateView kind="loading" compact /> : null}

      {!certificates.length ? (
        <StateView
          kind="empty"
          title="No matching certificates found."
          description="Try searching for a different name or checking back later."
        />
      ) : !filtered.length ? (
        <StateView
          kind="no-search"
          title="No matching certificates found."
          description={`No results for “${query}”. Try another name or TC number.`}
        />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">TC No.</th>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">Issued</th>
                <th className="px-4 py-3 font-semibold">File</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-line">
                  <td className="px-4 py-3 font-medium text-ink">{c.tcNumber}</td>
                  <td className="px-4 py-3">{c.studentName}</td>
                  <td className="px-4 py-3">{c.className}</td>
                  <td className="px-4 py-3">{c.issuedOn}</td>
                  <td className="px-4 py-3">
                    {c.fileUrl ? (
                      <a
                        href={c.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-navy"
                      >
                        Open
                      </a>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
