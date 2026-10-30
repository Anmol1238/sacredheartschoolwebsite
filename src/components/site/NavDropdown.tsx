"use client";

import Link from "next/link";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type NavChild = {
  label: string;
  href: string;
  external?: boolean;
};

export function NavDropdown({
  label,
  href,
  items,
  active,
  className,
}: {
  label: string;
  href: string;
  items: NavChild[];
  active?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div
      className="relative shrink-0"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className={cn(className)}
        aria-expanded={open}
        aria-current={active ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        {label}
        <ChevronDown
          className={cn("ml-0.5 h-3.5 w-3.5 transition duration-300", open && "rotate-180")}
        />
      </Link>
      {open ? (
        <div className="absolute left-0 top-full z-50 min-w-56 origin-top animate-[fadeUp_0.2s_ease] rounded-2xl border border-line bg-white p-2 shadow-xl">
          {items.map((child) =>
            child.external ? (
              <a
                key={child.href + child.label}
                href={child.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-navy/10 hover:text-navy"
              >
                <span>{child.label}</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted" />
              </a>
            ) : (
              <Link
                key={child.href + child.label}
                href={child.href}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-navy/10 hover:text-navy"
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            )
          )}
        </div>
      ) : null}
    </div>
  );
}
