import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { StateView } from "@/components/ui/StateView";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mandatory Public Disclosure",
  description: "CBSE mandatory public disclosure for Sacred Heart Senior Secondary School.",
};

function DocTable({
  title,
  rows,
}: {
  title: string;
  rows: { title: string; href: string }[];
}) {
  if (!rows.length) {
    return <StateView kind="empty" title={`No ${title.toLowerCase()} yet`} compact />;
  }
  return (
    <div className="card-soft overflow-hidden">
      <div className="border-b border-line bg-cream px-5 py-4">
        <h2 className="heading-display text-xl font-bold">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-muted">
              <th className="px-5 py-3 font-semibold">Document / Information</th>
              <th className="px-5 py-3 font-semibold">Link</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.title} className="border-b border-line last:border-0">
                <td className="px-5 py-3 text-ink">{row.title}</td>
                <td className="px-5 py-3">
                  <a
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-1 font-semibold text-navy"
                  >
                    Click Here <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function DisclosurePage() {
  const { disclosureInfo, documents } = await getContent();
  const infoRows = [
    ["NAME OF THE SCHOOL", disclosureInfo.schoolName],
    ["SCHOOL CODE", disclosureInfo.schoolCode],
    ["AFFILIATION NO.", disclosureInfo.affiliationNo],
    ["COMPLETE ADDRESS WITH PIN CODE", disclosureInfo.address],
    ["PRINCIPAL NAME", disclosureInfo.principalName],
    ["PRINCIPAL QUALIFICATION", disclosureInfo.principalQualification],
    ["SCHOOL EMAIL ID", disclosureInfo.email],
    ["CONTACT DETAILS", disclosureInfo.contact],
  ];

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Mandatory Public Disclosure"
        description="Official school information and documents as required for public disclosure."
      />
      <section className="section-pad">
        <div className="container-site space-y-8">
          <div className="card-soft overflow-hidden">
            <div className="border-b border-line bg-cream px-5 py-4">
              <h2 className="heading-display text-xl font-bold">GENERAL INFORMATION</h2>
            </div>
            <table className="w-full text-left text-sm">
              <tbody>
                {infoRows.map(([label, value]) => (
                  <tr key={label} className="border-b border-line last:border-0">
                    <th className="w-1/2 px-5 py-3 font-semibold text-muted">{label}</th>
                    <td className="px-5 py-3 text-ink">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <DocTable title="DOCUMENT / INFORMATION" rows={documents.disclosure} />
          <DocTable title="RESULT / ACADEMICS" rows={documents.academics} />
        </div>
      </section>
    </>
  );
}
