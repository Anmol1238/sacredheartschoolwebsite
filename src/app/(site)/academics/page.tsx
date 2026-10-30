import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Academic stages at Sacred Heart School — Fundamentals, Preparatory, Middle, and Secondary.",
};

export default async function AcademicsPage() {
  const content = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Strong Foundations, Bright Futures"
        title="Academics"
        description="A clear pathway from early years to secondary education with values, creativity, and excellence."
      />
      <section className="section-pad">
        <div className="container-site grid gap-6">
          {content.academics.map((stage, index) => (
            <article
              key={stage.title}
              className={`card-soft grid overflow-hidden md:grid-cols-2 ${
                index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative min-h-64">
                <Image src={stage.image} alt={stage.title} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-7 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">{stage.years}</p>
                <h2 className="heading-display mt-2 text-3xl font-bold">{stage.title}</h2>
                <p className="mt-4 text-base leading-7 text-muted">{stage.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
