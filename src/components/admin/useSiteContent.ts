"use client";

import { useCallback, useEffect, useState } from "react";
import type { SiteContent } from "@/lib/types";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "saving" | "error" | "success">(
    "loading"
  );

  const reload = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (res.status === 401) {
        setStatus("error");
        return;
      }
      if (!res.ok) throw new Error("fail");
      setContent((await res.json()) as SiteContent);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const save = useCallback(async (next: SiteContent) => {
    setContent(next);
    setStatus("saving");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (res.status === 401) {
        setStatus("error");
        return false;
      }
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      setTimeout(() => setStatus("ready"), 1200);
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }, []);

  return { content, setContent, status, save, reload };
}
