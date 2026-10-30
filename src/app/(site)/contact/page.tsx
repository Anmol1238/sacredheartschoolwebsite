import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Sacred Heart School — phone, email, and Mandi Road campus address.",
};

export default async function ContactPage() {
  const { school } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="We're Here"
        title="Contact"
        description="Call anytime, send an email, or visit the campus on Mandi Road."
      />
      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <a href={`tel:${school.phone}`} className="card-soft flex gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted">Call anytime</p>
                <p className="font-semibold text-ink">{school.phone}</p>
              </div>
            </a>
            <a href={`mailto:${school.email}`} className="card-soft flex gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted">Send email</p>
                <p className="font-semibold text-ink">{school.email}</p>
              </div>
            </a>
            <div className="card-soft flex gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted">Mandi Road</p>
                <p className="font-semibold text-ink">{school.address}</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
