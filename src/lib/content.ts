import { promises as fs } from "fs";
import path from "path";
import type { Inquiry, SiteContent } from "./types";
import seed from "@/data/site.json";

const DATA_PATH = path.join(process.cwd(), "src/data/site.json");

function normalize(raw: Partial<SiteContent>): SiteContent {
  const base = seed as unknown as SiteContent;
  return {
    ...base,
    ...raw,
    announcement: { ...base.announcement, ...(raw.announcement || {}) },
    heroSlides:
      raw.heroSlides ??
      base.heroSlides ??
      (base.school.heroImage
        ? [{ id: "hero-fallback", src: base.school.heroImage, title: "Campus", caption: "" }]
        : []),
    school: { ...base.school, ...(raw.school || {}), social: { ...base.school.social, ...(raw.school?.social || {}) } },
    about: { ...base.about, ...(raw.about || {}) },
    aboutExtended: { ...base.aboutExtended, ...(raw.aboutExtended || {}) },
    admission: { ...base.admission, ...(raw.admission || {}) },
    fees: {
      ...base.fees,
      ...(raw.fees || {}),
      classes: raw.fees?.classes ?? base.fees.classes,
    },
    disclosureInfo: { ...base.disclosureInfo, ...(raw.disclosureInfo || {}) },
    documents: {
      about: raw.documents?.about ?? base.documents.about,
      tc: raw.documents?.tc ?? base.documents.tc,
      disclosure: raw.documents?.disclosure ?? base.documents.disclosure,
      academics: raw.documents?.academics ?? base.documents.academics,
    },
    tcCertificates: {
      from2026: raw.tcCertificates?.from2026 ?? base.tcCertificates?.from2026 ?? [],
      from2025: raw.tcCertificates?.from2025 ?? base.tcCertificates?.from2025 ?? [],
      before2025: raw.tcCertificates?.before2025 ?? base.tcCertificates?.before2025 ?? [],
    },
    leaders: (raw.leaders || base.leaders).map((leader, index) => ({
      id: leader.id || `leader-${index + 1}`,
      name: leader.name,
      role: leader.role,
      message: leader.message,
      quote: leader.quote,
      photo:
        leader.photo ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=373186&color=fff&size=256`,
    })),
    testimonials: raw.testimonials ?? base.testimonials,
    events: raw.events ?? base.events,
    inquiries: raw.inquiries ?? [],
    media: raw.media ?? base.media ?? [],
    gallery: raw.gallery ?? base.gallery ?? [],
    videos: raw.videos ?? base.videos ?? [],
    pages: raw.pages ?? base.pages ?? [],
    homework: raw.homework ?? base.homework ?? [],
    academics: raw.academics ?? base.academics,
    facilities: raw.facilities ?? base.facilities,
    stats: raw.stats ?? base.stats,
    highlights: raw.highlights ?? base.highlights,
    campusHighlights: raw.campusHighlights ?? base.campusHighlights,
    whyChoose: raw.whyChoose ?? base.whyChoose,
    campusVideo: raw.campusVideo ?? base.campusVideo,
  };
}

export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return normalize(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return normalize(seed as unknown as SiteContent);
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  const normalized = normalize(content);
  await fs.writeFile(DATA_PATH, JSON.stringify(normalized, null, 2), "utf8");
}

export async function addInquiry(
  input: Omit<Inquiry, "id" | "createdAt" | "status">
): Promise<Inquiry> {
  const content = await getContent();
  const inquiry: Inquiry = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  content.inquiries = [inquiry, ...(content.inquiries ?? [])];
  await saveContent(content);
  return inquiry;
}

export function getPublicContent(content: SiteContent) {
  const { inquiries: _i, ...rest } = content;
  return {
    ...rest,
    pages: rest.pages.filter((p) => p.published),
    videos: rest.videos.filter((v) => v.published),
  };
}
