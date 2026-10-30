"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileSearch,
  Inbox,
  Lock,
  RefreshCw,
  ShieldOff,
  SignalZero,
  WifiOff,
} from "lucide-react";
import type { ReactNode } from "react";
import type { UiStateKind } from "@/lib/types";
import { cn } from "@/lib/cn";

const copy: Record<
  UiStateKind,
  {
    title: string;
    description: string;
    icon: ReactNode;
  }
> = {
  empty: {
    title: "Nothing here yet",
    description: "When content is added, it will show up in this space.",
    icon: <Inbox className="h-8 w-8" />,
  },
  loading: {
    title: "Loading",
    description: "Fetching the latest information for you.",
    icon: <RefreshCw className="h-8 w-8 animate-spin" />,
  },
  error: {
    title: "Something went wrong",
    description: "We could not complete that request. Please try again.",
    icon: <AlertTriangle className="h-8 w-8" />,
  },
  "no-internet": {
    title: "No internet connection",
    description: "Check your network and reconnect to continue.",
    icon: <WifiOff className="h-8 w-8" />,
  },
  "slow-network": {
    title: "Slow network detected",
    description: "Things may take a little longer. Hang tight.",
    icon: <SignalZero className="h-8 w-8" />,
  },
  "no-search": {
    title: "No search results",
    description: "Try a different keyword or clear filters.",
    icon: <FileSearch className="h-8 w-8" />,
  },
  "permission-denied": {
    title: "Permission denied",
    description: "You do not have access to perform this action.",
    icon: <ShieldOff className="h-8 w-8" />,
  },
  "session-expired": {
    title: "Session expired",
    description: "Sign in again to continue managing the site.",
    icon: <Lock className="h-8 w-8" />,
  },
  "form-validation": {
    title: "Please check the form",
    description: "Some fields need attention before you can continue.",
    icon: <AlertTriangle className="h-8 w-8" />,
  },
  success: {
    title: "Success",
    description: "Your changes were saved successfully.",
    icon: <CheckCircle2 className="h-8 w-8" />,
  },
  buffering: {
    title: "Buffering",
    description: "Preparing media and content for smooth playback.",
    icon: <Clock3 className="h-8 w-8" />,
  },
};

function iconTone(kind: UiStateKind) {
  if (kind === "success") return "bg-green/10 text-green";
  if (kind === "error" || kind === "form-validation") return "bg-red-50 text-red-600";
  if (kind === "loading" || kind === "buffering" || kind === "slow-network") {
    return "bg-navy/10 text-navy";
  }
  return "bg-sand text-navy";
}

type Props = {
  kind: UiStateKind;
  title?: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
  errors?: string[];
};

export function StateView({
  kind,
  title,
  description,
  action,
  compact,
  className,
  errors,
}: Props) {
  const meta = copy[kind];

  return (
    <div
      className={cn(
        "card-soft flex flex-col items-center text-center",
        compact ? "px-5 py-8" : "px-6 py-12",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl",
          iconTone(kind)
        )}
      >
        {meta.icon}
      </div>
      <h3 className="heading-display text-xl font-semibold text-ink">
        {title || meta.title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">
        {description || meta.description}
      </p>
      {kind === "form-validation" && errors?.length ? (
        <ul className="mt-4 w-full max-w-sm space-y-1 text-left text-sm text-red-600">
          {errors.map((err) => (
            <li key={err}>• {err}</li>
          ))}
        </ul>
      ) : null}
      {kind === "buffering" ? (
        <div className="buffer-bar mt-5 w-full max-w-xs">
          <span />
        </div>
      ) : null}
      {kind === "loading" ? (
        <div className="mt-6 grid w-full max-w-md gap-3">
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-5/6" />
          <div className="skeleton h-3 w-4/6" />
        </div>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function LoadingSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton h-12 w-full" />
      ))}
    </div>
  );
}
