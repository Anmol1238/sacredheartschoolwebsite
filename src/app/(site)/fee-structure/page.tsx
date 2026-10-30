import type { Metadata } from "next";
import { FeeDashboard } from "@/components/site/FeeDashboard";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Fee Structure",
  description:
    "Interactive fee structure dashboard for Sacred Heart Sr. Sec. School — class-wise fees with charts.",
};

export default async function FeeStructurePage() {
  const { fees } = await getContent();

  return (
    <section className="relative overflow-hidden bg-[#F3F5F9]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,_rgba(26,35,126,0.10),_transparent_65%)]"
      />
      <div className="container-site relative py-10 md:py-14">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F5A623]">
            Academic Year {fees.academicYear}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1A237E] md:text-5xl">
            Fee Structure
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted md:text-base">
            Simple graphs and clear amounts — so every parent and student can understand school fees
            quickly.
          </p>
        </div>
        <FeeDashboard fees={fees} />
      </div>
    </section>
  );
}
