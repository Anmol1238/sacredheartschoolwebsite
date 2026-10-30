"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ExternalLink, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons/BrandIcons";
import { NavDropdown } from "@/components/site/NavDropdown";
import type { CustomPage, SiteContent } from "@/lib/types";
import { cn } from "@/lib/cn";

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
}

const navBase =
  "nav-link relative inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-semibold tracking-wide text-ink transition-all duration-300 ease-out xl:px-3 xl:text-xs 2xl:text-[13px]";

function navClass(active: boolean) {
  return cn(
    navBase,
    active
      ? "bg-navy text-white shadow-md shadow-navy/25 hover:bg-navy-deep hover:text-white"
      : "hover:bg-navy/10 hover:text-navy hover:shadow-sm"
  );
}

export function Header({
  school,
  pages = [],
  aboutDocs = [],
  tcDocs = [],
}: {
  school: SiteContent["school"];
  pages?: CustomPage[];
  aboutDocs?: { title: string; href: string }[];
  tcDocs?: { title: string; href: string }[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [mobileTc, setMobileTc] = useState(false);

  const customNav = pages
    .filter((p) => p.published && p.showInNav && p.slug !== "activities")
    .map((p) => ({ href: `/pages/${p.slug}`, label: p.title }));

  const aboutChildren = aboutDocs.map((d) => ({
    label: d.title,
    href: d.href,
    external: isExternal(d.href),
  }));
  const tcChildren = tcDocs.map((d) => ({
    label: d.title,
    href: d.href,
    external: false,
  }));

  const simpleLinks = [
    { href: "/academics", label: "Academics" },
    { href: "/admission", label: "Admission" },
    { href: "/events", label: "Events" },
    { href: "/activities", label: "Activities" },
    { href: "/gallery", label: "Gallery" },
    { href: "/videos", label: "Videos" },
    { href: "/disclosure", label: "Mandatory Public Disclosure" },
    { href: "/homework", label: "Homework" },
    ...customNav,
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/98 shadow-sm backdrop-blur-md">
      <div className="hidden border-b border-line bg-cream lg:block">
        <div className="container-site flex items-center justify-between gap-4 py-2.5 text-sm">
          <div className="flex items-center gap-2 text-navy">
            <a href={school.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-line p-2 transition hover:bg-white hover:shadow-sm">
              <InstagramIcon />
            </a>
            <a href={school.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full border border-line p-2 transition hover:bg-white hover:shadow-sm">
              <FacebookIcon />
            </a>
            <a href={school.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="rounded-full border border-line p-2 transition hover:bg-white hover:shadow-sm">
              <YoutubeIcon />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-ink">
            <a href={`tel:${school.phoneDisplay}`} className="inline-flex items-center gap-2 transition hover:text-navy">
              <Phone className="h-4 w-4 text-accent" />
              <span>+{school.whatsapp}</span>
            </a>
            <a href={`mailto:${school.email}`} className="inline-flex items-center gap-2 transition hover:text-navy">
              <Mail className="h-4 w-4 text-accent" />
              <span>{school.email}</span>
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{school.addressShort}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container-site flex items-center justify-between gap-3 py-2 md:gap-4 md:py-3">
        {/* Logo already includes school name — show large logo only */}
        <Link
          href="/"
          className="group flex shrink-0 items-center"
          aria-label={school.name}
        >
          <Image
            src={school.logo}
            alt={school.name}
            width={160}
            height={160}
            className="h-[4.25rem] w-auto object-contain transition duration-300 group-hover:scale-[1.03] sm:h-20 md:h-[5.25rem] lg:h-24"
            priority
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-end gap-0.5 overflow-x-auto xl:flex 2xl:gap-1">
          <Link href="/" className={navClass(pathname === "/")}>
            Home
          </Link>
          <NavDropdown
            label="About"
            href="/about"
            active={pathname.startsWith("/about") || pathname.startsWith("/fee-structure")}
            items={aboutChildren}
            className={navClass(
              pathname.startsWith("/about") || pathname.startsWith("/fee-structure")
            )}
          />
          {simpleLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={navClass(pathname === item.href)}
            >
              {item.label}
            </Link>
          ))}
          <NavDropdown
            label="TC"
            href="/tc/2026"
            active={pathname.startsWith("/tc")}
            items={tcChildren}
            className={navClass(pathname.startsWith("/tc"))}
          />
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-navy lg:hidden">
            <a href={school.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-line p-2"><InstagramIcon /></a>
            <a href={school.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full border border-line p-2"><FacebookIcon /></a>
            <a href={school.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="rounded-full border border-line p-2"><YoutubeIcon /></a>
          </div>
          <button
            type="button"
            className="rounded-full border border-line p-2.5 transition hover:bg-navy hover:text-white xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-white xl:hidden">
          <nav className="container-site flex max-h-[75vh] flex-col gap-1 overflow-y-auto py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-3 py-3 text-sm font-semibold transition",
                pathname === "/" ? "bg-navy text-white" : "hover:bg-navy/10 hover:text-navy"
              )}
            >
              Home
            </Link>

            <button
              type="button"
              className="flex items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold transition hover:bg-navy/10 hover:text-navy"
              onClick={() => setMobileAbout((v) => !v)}
            >
              About <ChevronDown className={cn("h-4 w-4 transition", mobileAbout && "rotate-180")} />
            </button>
            {mobileAbout ? (
              <div className="mb-1 space-y-1 border-l border-line pl-3">
                <Link href="/about" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-navy/10">About Us</Link>
                {aboutChildren.map((c) =>
                  c.external ? (
                    <a key={c.href + c.label} href={c.href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-navy/10">
                      {c.label} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <Link key={c.href + c.label} href={c.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-navy/10">{c.label}</Link>
                  )
                )}
              </div>
            ) : null}

            {simpleLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-3 text-sm font-semibold transition",
                  pathname === item.href ? "bg-navy text-white" : "hover:bg-navy/10 hover:text-navy"
                )}
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              className="flex items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold transition hover:bg-navy/10 hover:text-navy"
              onClick={() => setMobileTc((v) => !v)}
            >
              TC <ChevronDown className={cn("h-4 w-4 transition", mobileTc && "rotate-180")} />
            </button>
            {mobileTc ? (
              <div className="space-y-1 border-l border-line pl-3">
                {tcChildren.map((c) => (
                  <Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-navy/10">{c.label}</Link>
                ))}
              </div>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
