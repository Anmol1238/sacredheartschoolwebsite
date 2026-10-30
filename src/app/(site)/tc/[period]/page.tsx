import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { TcSearch } from "@/components/site/TcSearch";
import { getContent } from "@/lib/content";

const PERIODS = {
  "2026": { title: "TC issue from 2026", key: "from2026" as const },
  "2025": { title: "TC issue from 2025", key: "from2025" as const },
  "before-2025": { title: "TC issue before 2025", key: "before2025" as const },
};

type Props = { params: Promise<{ period: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { period } = await params;
  const meta = PERIODS[period as keyof typeof PERIODS];
  return { title: meta?.title || "Transfer Certificate" };
}

export default async function TcPeriodPage({ params }: Props) {
  const { period } = await params;
  const meta = PERIODS[period as keyof typeof PERIODS];
  if (!meta) notFound();

  const { tcCertificates, documents } = await getContent();
  const list = tcCertificates[meta.key] || [];

  return (
    <>
      <PageHero
        eyebrow="Records"
        title={meta.title}
        description="Search issued transfer certificates. Matching the live school TC pages."
      />
      <section className="section-pad">
        <div className="container-site space-y-6">
          <div className="flex flex-wrap gap-2">
            {documents.tc.map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  doc.href.endsWith(period) || (period === "2026" && doc.href.endsWith("/2026"))
                    ? "bg-navy text-white"
                    : "border border-line bg-white"
                }`}
              >
                {doc.title}
              </Link>
            ))}
          </div>
          <TcSearch title={meta.title} certificates={list} />
        </div>
      </section>
    </>
  );
}
