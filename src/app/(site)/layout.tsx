import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SchoolAtmosphere } from "@/components/site/SchoolAtmosphere";
import { WelcomePopup } from "@/components/site/WelcomePopup";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { getContent } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: content.school.name,
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    email: content.school.email,
    telephone: content.school.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mandi Road, Nichlaul",
      addressLocality: "Maharajganj",
      addressRegion: "Uttar Pradesh",
      postalCode: "273304",
      addressCountry: "IN",
    },
    foundingDate: "2007-04-01",
    motto: content.school.motto,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SchoolAtmosphere />
      <div className="relative z-0 flex min-h-full flex-1 flex-col">
        <Header
          school={content.school}
          pages={content.pages}
          aboutDocs={content.documents.about}
          tcDocs={content.documents.tc}
        />
        <main className="flex-1">{children}</main>
        <Footer school={content.school} pages={content.pages} />
      </div>
      <WhatsAppFloat school={content.school} />
      <WelcomePopup
        enabled={content.announcement?.enabled}
        image={content.announcement?.image}
        title={content.announcement?.title}
        subtitle={content.announcement?.subtitle}
      />
    </>
  );
}
