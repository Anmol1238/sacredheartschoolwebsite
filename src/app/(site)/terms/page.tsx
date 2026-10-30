import { PageHero } from "@/components/site/PageHero";

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Use" description="Guidelines for using this website." />
      <section className="section-pad">
        <div className="container-site max-w-3xl text-muted leading-7">
          <p>
            Content on this website is for informational purposes about Sacred Heart Sr. Sec. School.
            Admission decisions and official records are managed by the school office. Do not misuse
            contact forms or attempt unauthorized access to the admin area.
          </p>
        </div>
      </section>
    </>
  );
}
