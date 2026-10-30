"use client";

import { useState } from "react";
import { StateView } from "@/components/ui/StateView";
import type { MediaItem } from "@/lib/types";

type Props = {
  accept?: string;
  label?: string;
  onUploaded: (item: MediaItem) => void;
};

export function MediaUploader({
  accept = "image/*,video/mp4,video/webm",
  label = "Upload photo or video",
  onUploaded,
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = useState("");

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setStatus("loading");
    setMessage("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(
          data.error === "file_too_large"
            ? "File is too large."
            : data.error === "unsupported_type"
              ? "Unsupported file type."
              : data.error === "unauthorized"
                ? "Session expired. Sign in again."
                : "Upload failed."
        );
        return;
      }
      onUploaded(data.item as MediaItem);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 1200);
    } catch {
      setStatus("error");
      setMessage("Network error while uploading.");
    }
  }

  return (
    <div className="space-y-2">
      <label className="btn-primary cursor-pointer">
        {status === "loading" ? "Uploading…" : label}
        <input type="file" accept={accept} className="hidden" onChange={onChange} />
      </label>
      {status === "loading" ? <StateView kind="buffering" compact /> : null}
      {status === "success" ? <StateView kind="success" compact title="Uploaded" /> : null}
      {status === "error" ? (
        <StateView
          kind={message.includes("Session") ? "session-expired" : "error"}
          compact
          description={message}
        />
      ) : null}
    </div>
  );
}
