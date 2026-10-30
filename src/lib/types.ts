export type Highlight = {
  eyebrow: string;
  title: string;
  icon: string;
};

export type AcademicStage = {
  id?: string;
  title: string;
  description: string;
  image: string;
  years: string;
};

export type Facility = {
  id?: string;
  title: string;
  description: string;
  icon: string;
};

export type Leader = {
  id: string;
  name: string;
  role: string;
  message: string;
  quote: string;
  photo: string;
};

export type Testimonial = {
  id: string;
  name: string;
  text: string;
  photo?: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  summary: string;
  image?: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "archived";
};

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "file";
  mime: string;
  size: number;
  createdAt: string;
  alt?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  src: string;
  type: "image" | "video";
  caption?: string;
};

export type VideoItem = {
  id: string;
  title: string;
  src: string;
  poster?: string;
  description?: string;
  published: boolean;
};

export type CustomPage = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  published: boolean;
  showInNav: boolean;
  updatedAt: string;
};

export type HomeworkItem = {
  id: string;
  className: string;
  title: string;
  description: string;
  date: string;
  fileUrl?: string;
};

export type DocLink = {
  id?: string;
  title: string;
  href: string;
};

export type TcCertificate = {
  id: string;
  studentName: string;
  className: string;
  tcNumber: string;
  issuedOn: string;
  fileUrl?: string;
};

export type FeeClass = {
  id: string;
  name: string;
  badge: string;
  admissionFee: number;
  installment1: number;
  installment2: number;
  installment3: number;
  installment4: number;
  annualTotal: number;
  monthlyEquivalent: number;
};

export type DisclosureDoc = {
  title: string;
  href: string;
};

export type Announcement = {
  enabled: boolean;
  title: string;
  subtitle: string;
  image: string;
};

export type HeroSlide = {
  id: string;
  src: string;
  title?: string;
  caption?: string;
};

export type SiteContent = {
  announcement: Announcement;
  heroSlides: HeroSlide[];
  school: {
    name: string;
    shortName: string;
    motto: string;
    mottoTranslation: string;
    tagline: string;
    established: string;
    phone: string;
    phoneDisplay: string;
    email: string;
    address: string;
    addressShort: string;
    whatsapp: string;
    logo: string;
    heroImage: string;
    campusImage: string;
    yearsLegacy: number;
    social: {
      instagram: string;
      facebook: string;
      youtube: string;
    };
  };
  stats: { label: string; value: string }[];
  highlights: Highlight[];
  about: {
    welcomeEyebrow: string;
    title: string;
    subtitle: string;
    body: string;
    bullets: string[];
  };
  academics: AcademicStage[];
  facilities: Facility[];
  campusHighlights: { title: string; description: string }[];
  whyChoose: { title: string; description: string }[];
  leaders: Leader[];
  testimonials: Testimonial[];
  events: EventItem[];
  documents: {
    about: DocLink[];
    tc: DocLink[];
    disclosure: DisclosureDoc[];
    academics: DisclosureDoc[];
  };
  disclosureInfo: {
    schoolName: string;
    schoolCode: string;
    affiliationNo: string;
    address: string;
    principalName: string;
    principalQualification: string;
    email: string;
    contact: string;
  };
  fees: {
    academicYear: string;
    classes: FeeClass[];
    paymentMethods: string;
    dueDates: string;
    refundPolicy: string;
  };
  tcCertificates: {
    from2026: TcCertificate[];
    from2025: TcCertificate[];
    before2025: TcCertificate[];
  };
  admission: {
    sessionNote: string;
    courses: string[];
    procedure: string[];
    documentsRequired: string[];
    feeNotes: string[];
    withdrawals: string[];
    uniformNote: string;
  };
  aboutExtended: {
    philosophy: string;
    mission: string;
    values: string[];
  };
  campusVideo: string;
  inquiries: Inquiry[];
  media: MediaItem[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  pages: CustomPage[];
  homework: HomeworkItem[];
};

export type UiStateKind =
  | "empty"
  | "loading"
  | "error"
  | "no-internet"
  | "slow-network"
  | "no-search"
  | "permission-denied"
  | "session-expired"
  | "form-validation"
  | "success"
  | "buffering";
