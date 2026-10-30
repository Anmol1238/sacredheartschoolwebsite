import { PageHero } from "@/components/site/PageHero";

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" description="How we handle inquiries and contact information." />
      <section className="section-pad">
        <div className="container-site prose max-w-3xl text-muted">
          <p>
            Sacred Heart School collects inquiry details (name, email, phone, message) only to respond to
            admission and general questions. We do not sell personal data. Contact the school office to
            request correction or deletion of an inquiry you submitted.
          </p>
        </div>
      </section>
    </>
  );
}
