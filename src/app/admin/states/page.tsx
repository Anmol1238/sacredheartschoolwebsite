"use client";

import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { StateView } from "@/components/ui/StateView";
import type { UiStateKind } from "@/lib/types";

const kinds: UiStateKind[] = [
  "empty",
  "loading",
  "error",
  "no-internet",
  "slow-network",
  "no-search",
  "permission-denied",
  "session-expired",
  "form-validation",
  "success",
  "buffering",
];

export default function AdminStatesPage() {
  return (
    <AdminShell title="UI States Gallery">
      <p className="mb-6 max-w-3xl text-sm text-muted">
        All product states used across the public site and admin panel — empty, loading, error, offline,
        slow network, no search results, permission denied, session expired, form validation, success,
        and buffering.
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kinds.map((kind) => (
          <StateView
            key={kind}
            kind={kind}
            compact
            errors={
              kind === "form-validation"
                ? ["Name is required", "Enter a valid email address"]
                : undefined
            }
            action={
              kind === "session-expired" ? (
                <Link href="/admin/login?reason=expired" className="btn-primary">
                  Sign in again
                </Link>
              ) : kind === "error" ? (
                <button type="button" className="btn-primary">
                  Retry
                </button>
              ) : undefined
            }
          />
        ))}
      </div>
    </AdminShell>
  );
}
