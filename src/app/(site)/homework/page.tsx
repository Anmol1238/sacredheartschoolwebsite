import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { StateView } from "@/components/ui/StateView";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Homework",
  description: "Homework updates for Sacred Heart School students and parents.",
};

export default async function HomeworkPage() {
  const { homework } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Classroom Support"
        title="Homework"
        description="Daily and weekly homework posted by the school team for each class."
      />
      <section className="section-pad">
        <div className="container-site">
          {!homework.length ? (
            <StateView
              kind="empty"
              title="No homework posted"
              description="Teachers can publish homework from the admin panel."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {homework.map((item) => (
                <article key={item.id} className="card-soft p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {item.className} ·{" "}
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                  {item.fileUrl ? (
                    <a
                      href={item.fileUrl}
                      className="mt-4 inline-flex text-sm font-semibold text-navy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open attachment →
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
