import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Activities",
  description: "Sports, culture programs and school activities at Sacred Heart School.",
};

const sections = [
  {
    title: "Sports Program & Activities",
    body: "Athletics, team games, fitness drills and inter-house competitions that build discipline and teamwork.",
  },
  {
    title: "Culture Program",
    body: "Dance, music, drama and celebration assemblies that nurture expression and confidence.",
  },
  {
    title: "Basant Panchami",
    body: "Seasonal celebrations and values-based gatherings connecting students with culture and community.",
  },
  {
    title: "National Youth Day",
    body: "Youth leadership and inspiration programs celebrating learning, service and ambition.",
  },
  {
    title: "Physical Activity",
    body: "Age-appropriate physical education for junior and pre-primary learners.",
  },
];

export default async function ActivitiesPage() {
  const { gallery, school } = await getContent();
  const photos = gallery.filter((g) => g.type === "image").slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title="Activities"
        description="Sports, culture and co-curricular programs for holistic growth — same destinations as the live school website."
      />
      <section className="section-pad">
        <div className="container-site grid gap-5 md:grid-cols-2">
          {sections.map((s) => (
            <article key={s.title} className="card-soft p-6">
              <h2 className="heading-display text-2xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{s.body}</p>
            </article>
          ))}
        </div>
        {photos.length ? (
          <div className="container-site mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p) => (
              <div key={p.id} className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
                <Image src={p.src} alt={p.title || school.shortName} fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}
