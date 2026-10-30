"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  FileText,
  ImageIcon,
  Images,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  NotebookPen,
  Quote,
  Search,
  Sparkles,
  Users,
  Video,
  FilePlus2,
} from "lucide-react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Site Content", icon: FileText },
  { href: "/admin/hero", label: "Homepage Slideshow", icon: Images },
  { href: "/admin/leaders", label: "Leaders", icon: Users },
  { href: "/admin/pages", label: "Pages", icon: FilePlus2 },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/homework", label: "Homework", icon: NotebookPen },
  { href: "/admin/fees", label: "Fee Structure", icon: FileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/states", label: "UI States", icon: Sparkles },
];

export function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[250px_1fr]">
        <aside className="border-r border-line bg-white/80 p-5 backdrop-blur">
          <p className="heading-display text-lg font-semibold text-navy">SHS Admin</p>
          <p className="mt-1 text-xs text-muted">Full website CMS</p>
          <nav className="mt-6 max-h-[70vh] space-y-1 overflow-y-auto pr-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium",
                    active ? "bg-navy text-white" : "text-ink hover:bg-cream"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/academics"
            className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted hover:bg-cream"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Preview academics
          </Link>
          <button
            type="button"
            onClick={logout}
            className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </aside>

        <div className="p-5 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="heading-display text-3xl font-bold text-ink">{title}</h1>
              <p className="mt-1 text-sm text-muted">
                Manage public content, media, pages, and inquiries.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium"
            >
              View site
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function AdminSearch({
  value,
  onChange,
  placeholder = "Search…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="relative block max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-navy"
      />
    </label>
  );
}
