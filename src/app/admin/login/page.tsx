"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { StateView } from "@/components/ui/StateView";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "denied">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setStatus("denied");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div className="admin-shell flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {status === "loading" ? <StateView kind="loading" compact /> : null}
        {status === "denied" ? (
          <StateView
            kind="permission-denied"
            compact
            title="Invalid password"
            description="Check the admin password in .env.local and try again."
          />
        ) : null}
        {params.get("reason") === "expired" ? (
          <StateView kind="session-expired" compact />
        ) : null}

        <form onSubmit={onSubmit} className="card-soft p-7">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Admin</p>
          <h1 className="heading-display mt-2 text-3xl font-bold text-ink">Sign in</h1>
          <p className="mt-2 text-sm text-muted">
            Manage Sacred Heart School website content. Use the admin password from your
            environment configuration.
          </p>
          <label className="mt-6 block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line px-3 py-3 outline-none focus:border-navy"
            placeholder="Enter admin password"
          />
          {status === "error" ? (
            <p className="mt-2 text-sm text-red-600">Password is required.</p>
          ) : null}
          <button type="submit" className="btn-primary mt-5 w-full" disabled={status === "loading"}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<StateView kind="loading" className="m-8" />}>
      <LoginForm />
    </Suspense>
  );
}
