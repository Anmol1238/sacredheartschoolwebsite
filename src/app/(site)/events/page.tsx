import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { StateView } from "@/components/ui/StateView";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Programs, activities and school events at Sacred Heart School.",
};

export default async function EventsPage() {
  const { events } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Our Programs & Activities"
        title="Events"
        description="Sports programs, celebrations and campus moments — aligned with the live Events section."
      />
      <section className="section-pad">
        <div className="container-site space-y-8">
          <div className="card-soft p-6">
            <h2 className="heading-display text-2xl font-bold">Sports Program and Activities</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Explore sports meets, culture programs and youth days on the Activities page, and
              browse photo/video coverage in Gallery & Videos.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/activities" className="btn-primary">
                View Activities
              </Link>
              <Link href="/gallery" className="rounded-full border border-line px-4 py-2 text-sm font-semibold">
                Gallery
              </Link>
            </div>
          </div>

          {!events.length ? (
            <StateView kind="empty" title="No events published" description="New events will appear here soon." />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article key={event.id} className="card-soft p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-ink">{event.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{event.summary}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
