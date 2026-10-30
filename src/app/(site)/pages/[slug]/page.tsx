import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { getContent } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { pages } = await getContent();
  const page = pages.find((p) => p.slug === slug && p.published);
  if (!page) return { title: "Page" };
  return {
    title: page.title,
    description: page.excerpt,
  };
}

export default async function CustomPageView({ params }: Props) {
  const { slug } = await params;
  const { pages } = await getContent();
  const page = pages.find((p) => p.slug === slug && p.published);
  if (!page) notFound();

  const paragraphs = page.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <PageHero eyebrow="School Page" title={page.title} description={page.excerpt} />
      <section className="section-pad">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_320px]">
          <article className="prose max-w-3xl space-y-4 text-base leading-7 text-muted">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </article>
          {page.coverImage ? (
            <div className="relative min-h-72 overflow-hidden rounded-3xl border border-line">
              <Image
                src={page.coverImage}
                alt={page.title}
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
