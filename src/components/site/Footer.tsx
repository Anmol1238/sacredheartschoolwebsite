import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons/BrandIcons";
import type { CustomPage, SiteContent } from "@/lib/types";

export function Footer({
  school,
  pages = [],
}: {
  school: SiteContent["school"];
  pages?: CustomPage[];
}) {
  return (
    <footer className="on-media bg-ink">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={school.logo}
              alt={school.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-white object-contain p-1"
            />
            <div>
              <p className="heading-display text-lg font-semibold">{school.shortName}</p>
              <p className="text-sm text-white/70">
                “{school.motto}” — {school.mottoTranslation}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
            Education is not preparation for life, but education is life itself.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={school.social.instagram}
              aria-label="Instagram"
              className="rounded-full border border-white/20 p-2 hover:bg-white/10"
            >
              <InstagramIcon />
            </a>
            <a
              href={school.social.facebook}
              aria-label="Facebook"
              className="rounded-full border border-white/20 p-2 hover:bg-white/10"
            >
              <FacebookIcon />
            </a>
            <a
              href={school.social.youtube}
              aria-label="YouTube"
              className="rounded-full border border-white/20 p-2 hover:bg-white/10"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>

        <div>
          <h3 className="heading-display text-lg">Explore</h3>
          <div className="mt-4 grid gap-2 text-sm text-white/80">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/academics" className="hover:text-white">Academics</Link>
            <Link href="/activities" className="hover:text-white">Activities</Link>
            <Link href="/homework" className="hover:text-white">Homework</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/gallery" className="hover:text-white">Gallery</Link>
            <Link href="/videos" className="hover:text-white">Videos</Link>
            <Link href="/disclosure" className="hover:text-white">Mandatory Public Disclosure</Link>
            <Link href="/fee-structure" className="hover:text-white">Fee Structure</Link>
            {pages
              .filter((p) => p.published && p.showInNav && p.slug !== "activities")
              .map((p) => (
                <Link key={p.id} href={`/pages/${p.slug}`} className="hover:text-white">
                  {p.title}
                </Link>
              ))}
          </div>
        </div>

        <div>
          <h3 className="heading-display text-lg">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <a href={`tel:${school.phone}`} className="flex items-start gap-2 hover:text-white">
              <Phone className="mt-0.5 h-4 w-4" /> {school.phone}
            </a>
            <a href={`mailto:${school.email}`} className="flex items-start gap-2 hover:text-white">
              <Mail className="mt-0.5 h-4 w-4" /> {school.email}
            </a>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4" /> {school.address}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {school.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="/admin" className="hover:text-white">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
