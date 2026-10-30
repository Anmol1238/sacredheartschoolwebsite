import {
  AboutPreview,
  AcademicsPreview,
  CampusHighlights,
  FacilitiesPreview,
  GalleryPreview,
  Hero,
  LeadersSection,
  StatsBand,
  Testimonials,
  VideosPreview,
  WhyChoose,
} from "@/components/site/HomeSections";
import { getContent } from "@/lib/content";

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      <Hero content={content} />
      <AboutPreview content={content} />
      <AcademicsPreview content={content} />
      <FacilitiesPreview content={content} />
      <StatsBand content={content} />
      <CampusHighlights content={content} />
      <LeadersSection content={content} />
      <GalleryPreview content={content} />
      <VideosPreview content={content} />
      <Testimonials content={content} />
      <WhyChoose content={content} />
    </>
  );
}
