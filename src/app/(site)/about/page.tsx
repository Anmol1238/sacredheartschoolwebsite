import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { FacilitiesPreview } from "@/components/site/HomeSections";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Sacred Heart Sr. Sec. School — philosophy, mission, values, and documents.",
};

export default async function AboutPage() {
  const content = await getContent();
  const { about, aboutExtended, school, documents } = content;

  return (
    <>
      <PageHero
        eyebrow={about.welcomeEyebrow}
        title={about.title}
        description="Fostering a nurturing environment where every child learns, grows, and thrives."
      />
      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-base leading-7 text-muted">{aboutExtended.philosophy}</p>
            <p className="text-base leading-7 text-muted">{about.body}</p>
            <ul className="space-y-2">
              {about.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-ink">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-96 overflow-hidden rounded-[2rem]">
            <Image
              src={school.campusImage}
              alt="Sacred Heart campus"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container-site">
          <h2 className="heading-display text-center text-3xl font-bold">Our Core Values</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {aboutExtended.values.map((v) => (
              <div key={v} className="rounded-2xl bg-navy px-4 py-6 text-center text-sm font-bold tracking-wide text-white">
                {v}
              </div>
            ))}
          </div>
          <div className="card-soft mx-auto mt-10 max-w-3xl p-6">
            <h3 className="heading-display text-2xl font-bold">Our Mission</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{aboutExtended.mission}</p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <h2 className="heading-display text-3xl font-bold">Documents</h2>
          <p className="mt-2 text-sm text-muted">Same About dropdown destinations as the live website.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {documents.about.map((doc) => {
              const external = doc.href.startsWith("http");
              return (
                <a
                  key={doc.title}
                  href={doc.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="card-soft flex items-center justify-between gap-3 p-5 hover:border-navy"
                >
                  <span className="font-semibold text-ink">{doc.title}</span>
                  {external ? <ExternalLink className="h-4 w-4 text-navy" /> : <span className="text-navy">Open →</span>}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <div id="facilities">
        <FacilitiesPreview content={content} />
      </div>
    </>
  );
}
