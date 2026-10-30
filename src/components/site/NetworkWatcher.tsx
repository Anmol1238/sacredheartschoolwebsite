"use client";

import { useEffect, useState } from "react";
import { StateView } from "@/components/ui/StateView";

export function NetworkWatcher() {
  const [online, setOnline] = useState(true);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    sync();

    type NetInfo = {
      effectiveType?: string;
      addEventListener: (type: string, listener: () => void) => void;
      removeEventListener: (type: string, listener: () => void) => void;
    };
    const connection = (navigator as Navigator & { connection?: NetInfo }).connection;
    const onConnection = () => {
      const type = connection?.effectiveType;
      setSlow(type === "2g" || type === "slow-2g");
    };
    connection?.addEventListener("change", onConnection);
    onConnection();

    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
      connection?.removeEventListener("change", onConnection);
    };
  }, []);

  if (!online) {
    return (
      <div className="fixed inset-x-0 top-0 z-[60] p-3">
        <StateView
          kind="no-internet"
          compact
          className="mx-auto max-w-xl border border-red-100 bg-white shadow-xl"
        />
      </div>
    );
  }

  if (slow) {
    return (
      <div className="fixed inset-x-0 top-0 z-[60] p-3">
        <StateView
          kind="slow-network"
          compact
          className="mx-auto max-w-xl border border-amber-100 bg-white shadow-xl"
        />
      </div>
    );
  }

  return null;
}
