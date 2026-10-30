import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Admission",
  description: "Admission procedure, documents, fees and rules for Sacred Heart School.",
};

export default async function AdmissionPage() {
  const { school, admission } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Join Our Family"
        title="Admission"
        description={admission.sessionNote}
      />
      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <Block title="Academic Session / Courses">
              <ul className="space-y-2 text-sm text-muted">
                {admission.courses.map((c) => (
                  <li key={c}>• {c}</li>
                ))}
              </ul>
            </Block>
            <Block title="Admission Procedure">
              <ol className="space-y-2 text-sm text-muted">
                {admission.procedure.map((p, i) => (
                  <li key={p}>
                    <strong className="text-ink">{i + 1}.</strong> {p}
                  </li>
                ))}
              </ol>
            </Block>
            <Block title="Documents Required">
              <ul className="space-y-2 text-sm text-muted">
                {admission.documentsRequired.map((d) => (
                  <li key={d}>• {d}</li>
                ))}
              </ul>
            </Block>
            <Block title="School Fee">
              <ul className="space-y-2 text-sm text-muted">
                {admission.feeNotes.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <Link href="/fee-structure" className="btn-primary mt-4 inline-flex">
                Fee Structure Page
              </Link>
            </Block>
            <Block title="School Uniform">
              <p className="text-sm leading-6 text-muted">{admission.uniformNote}</p>
            </Block>
            <Block title="Withdrawals">
              <ul className="space-y-2 text-sm text-muted">
                {admission.withdrawals.map((w) => (
                  <li key={w}>• {w}</li>
                ))}
              </ul>
            </Block>
            <a href={`tel:${school.phoneDisplay}`} className="btn-ghost">
              Call Us {school.phoneDisplay}
            </a>
          </div>
          <div>
            <h2 className="heading-display mb-4 text-2xl font-bold">Contact For Admission</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-soft p-6">
      <h2 className="heading-display text-xl font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
