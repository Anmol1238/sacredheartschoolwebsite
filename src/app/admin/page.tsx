import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { getContent } from "@/lib/content";

export default async function AdminDashboardPage() {
  const content = await getContent();
  const newInquiries = (content.inquiries || []).filter((i) => i.status === "new").length;

  const cards = [
    { label: "Leaders", value: content.leaders.length, href: "/admin/leaders" },
    { label: "Custom pages", value: content.pages.length, href: "/admin/pages" },
    { label: "Media files", value: content.media.length, href: "/admin/media" },
    { label: "Homepage slides", value: content.heroSlides?.length || 0, href: "/admin/hero" },
    { label: "Gallery items", value: content.gallery.length, href: "/admin/gallery" },
    { label: "Videos", value: content.videos.length, href: "/admin/videos" },
    { label: "Homework", value: content.homework.length, href: "/admin/homework" },
    { label: "Fee classes", value: content.fees.classes.length, href: "/admin/fees" },
    { label: "Testimonials", value: content.testimonials.length, href: "/admin/testimonials" },
    { label: "Events", value: content.events.length, href: "/admin/events" },
    { label: "New inquiries", value: newInquiries, href: "/admin/inquiries" },
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="card-soft p-5 hover:border-navy">
            <p className="text-sm text-muted">{card.label}</p>
            <p className="heading-display mt-2 text-3xl font-bold text-navy">{card.value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="card-soft p-6">
          <h2 className="font-semibold text-ink">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/admin/media" className="btn-primary">
              Upload media
            </Link>
            <Link href="/admin/pages" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">
              Create page
            </Link>
            <Link href="/admin/leaders" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">
              Edit leaders
            </Link>
          </div>
        </div>
        <div className="card-soft p-6">
          <h2 className="font-semibold text-ink">School snapshot</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {content.school.name} · {content.school.addressShort} · {content.school.phone}
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
