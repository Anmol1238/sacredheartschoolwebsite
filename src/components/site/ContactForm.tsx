"use client";

import { useState } from "react";
import { StateView } from "@/components/ui/StateView";

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "validation"
  >("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();

    const nextErrors: string[] = [];
    if (name.length < 2) nextErrors.push("Name must be at least 2 characters.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.push("Enter a valid email.");
    if (phone.length < 10) nextErrors.push("Enter a valid phone number.");
    if (message.length < 10) nextErrors.push("Message must be at least 10 characters.");

    if (nextErrors.length) {
      setErrors(nextErrors);
      setStatus("validation");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-4">
      {status === "validation" ? (
        <StateView kind="form-validation" compact errors={errors} />
      ) : null}
      {status === "loading" ? <StateView kind="loading" compact /> : null}
      {status === "success" ? (
        <StateView
          kind="success"
          compact
          title="Inquiry sent"
          description="Thank you. The school team will get back to you shortly."
        />
      ) : null}
      {status === "error" ? (
        <StateView
          kind="error"
          compact
          action={
            <button type="button" className="btn-primary" onClick={() => setStatus("idle")}>
              Try again
            </button>
          }
        />
      ) : null}

      {status !== "success" ? (
        <form onSubmit={onSubmit} className="card-soft grid gap-4 p-6" noValidate>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-3 outline-none focus:border-navy"
              placeholder="Your name"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-3 outline-none focus:border-navy"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-3 outline-none focus:border-navy"
                placeholder="10-digit mobile"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-3 outline-none focus:border-navy"
              placeholder="Tell us about admission or your question"
            />
          </div>
          <button type="submit" className="btn-primary w-full md:w-auto" disabled={status === "loading"}>
            Send inquiry
          </button>
        </form>
      ) : null}
    </div>
  );
}
