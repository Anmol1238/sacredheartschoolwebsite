import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Bus,
  FlaskConical,
  GraduationCap,
  Leaf,
  Lock,
  Monitor,
  Route,
  Shield,
  Sparkles,
  Trophy,
  Users,
  Wifi,
} from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import { cn } from "@/lib/cn";

const iconMap: Record<string, ReactNode> = {
  graduation: <GraduationCap className="h-6 w-6" />,
  sports: <Trophy className="h-6 w-6" />,
  values: <Users className="h-6 w-6" />,
  tech: <Monitor className="h-6 w-6" />,
  web: <Wifi className="h-6 w-6" />,
  bus: <Bus className="h-6 w-6" />,
  security: <Shield className="h-6 w-6" />,
  club: <Users className="h-6 w-6" />,
  person: <Sparkles className="h-6 w-6" />,
  eco: <Leaf className="h-6 w-6" />,
  road: <Route className="h-6 w-6" />,
  campus: <Lock className="h-6 w-6" />,
  lab: <FlaskConical className="h-6 w-6" />,
  activity: <Trophy className="h-6 w-6" />,
};

export function Hero({ content }: { content: SiteContent }) {
  const { school, highlights, heroSlides } = content;
  return (
    <div className="relative">
      {/* Media only — no titles on the photos */}
      <HeroSlideshow school={school} slides={heroSlides || []} />

      {/* Details section under the slideshow */}
      <section className="relative border-b border-line bg-white">
        <div className="container-site grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-12">
          <div className="fade-up">
            <div className="mb-4 flex items-center gap-4">
              <Image
                src={school.logo}
                alt=""
                width={88}
                height={88}
                className="h-16 w-16 object-contain md:h-20 md:w-20"
                priority
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Warm Welcome To
                </p>
                <h1 className="heading-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
                  {school.shortName}
                </h1>
              </div>
            </div>
            <p className="max-w-2xl text-base leading-7 text-ink/80 md:text-lg">
              “{school.motto}” — {school.mottoTranslation}. Established {school.established} on Mandi
              Road, Nichlaul, Maharajganj.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                About Us
              </Link>
              <a
                href={`tel:${school.phone}`}
                className="inline-flex items-center justify-center rounded-full border border-line bg-cream px-5 py-3 text-sm font-bold text-navy transition hover:border-navy/30"
              >
                Call Us {school.phoneDisplay}
              </a>
              <Link
                href="/admission"
                className="inline-flex items-center justify-center rounded-full bg-[#F5A623] px-5 py-3 text-sm font-bold text-[#1A237E] transition hover:bg-[#ffb84a]"
              >
                Admission
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-1">
            {highlights.map((item, index) => (
              <article
                key={item.title}
                className="card-soft flex items-center justify-between gap-4 p-4 fade-up"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {item.eyebrow}
                  </p>
                  <h2 className="mt-0.5 text-base font-bold text-ink md:text-lg">{item.title}</h2>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-white">
                  {iconMap[item.icon] || <Sparkles className="h-5 w-5" />}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function AboutPreview({ content }: { content: SiteContent }) {
  const { about, school } = content;
  return (
    <section className="section-pad bg-[linear-gradient(180deg,#fff_0%,#f8f7f0_100%)]">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <div className="fade-up">
          <p className="eyebrow">{about.welcomeEyebrow}</p>
          <h2 className="heading-display mt-2 text-4xl font-bold md:text-5xl">{about.title}</h2>
          <p className="mt-3 text-sm text-muted">{about.subtitle}</p>
          <p className="mt-5 text-base leading-7 text-ink/80">{about.body}</p>
          <ul className="mt-5 space-y-2 text-sm font-medium text-ink">
            {about.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green" />
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-green/10 px-4 py-2 text-sm font-semibold text-green-dark">
            {school.tagline}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href="/about" className="btn-primary">
              About Us
            </Link>
            <a href={`tel:${school.phone}`} className="btn-ghost">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
                ☎
              </span>
              {school.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="relative fade-up">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[40%_40%_18%_18%/28%_28%_18%_18%] border-8 border-white shadow-2xl">
            <Image
              src={school.campusImage}
              alt="Campus view"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </div>
          <div className="absolute left-2 top-1/3 rounded-2xl bg-white p-5 shadow-xl md:-left-4">
            <p className="text-3xl font-bold text-accent">{school.yearsLegacy}+</p>
            <p className="text-sm text-muted">Years of Legacy</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AcademicsPreview({ content }: { content: SiteContent }) {
  return (
    <section className="section-pad bg-white">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Strong Foundations, Bright Futures</p>
          <h2 className="heading-display mt-2 text-3xl font-bold md:text-4xl">Academic Journey</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.academics.map((stage) => (
            <article key={stage.title} className="group overflow-hidden rounded-3xl border border-line bg-cream">
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={stage.image}
                  alt={stage.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{stage.years}</p>
                <h3 className="mt-1 text-lg font-semibold text-ink">{stage.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{stage.description}</p>
                <Link href="/academics" className="mt-4 inline-block text-sm font-semibold text-navy">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FacilitiesPreview({ content }: { content: SiteContent }) {
  return (
    <section className="section-pad bg-cream">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Campus Life</p>
            <h2 className="heading-display mt-2 text-3xl font-bold md:text-4xl">Our Facilities</h2>
          </div>
          <Link href="/about#facilities" className="btn-primary">
            Explore Campus
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.facilities.slice(0, 9).map((f) => (
            <article key={f.title} className="card-soft flex gap-4 p-5 transition hover:-translate-y-1">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-white">
                {iconMap[f.icon] || <Sparkles className="h-5 w-5" />}
              </div>
              <div>
                <h3 className="font-semibold text-ink">{f.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{f.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsBand({ content }: { content: SiteContent }) {
  return (
    <section className="bg-navy text-white">
      <div className="container-site grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
        {content.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="heading-display text-4xl font-bold">{stat.value}</p>
            <p className="mt-2 text-sm text-white/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CampusHighlights({ content }: { content: SiteContent }) {
  return (
    <section className="section-pad bg-white">
      <div className="container-site grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">Learning Beyond Books</p>
          <h2 className="heading-display mt-2 text-3xl font-bold md:text-4xl">
            Campus Highlights for Holistic Development
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            From clubs and labs to safe transport and value education — every space is designed for confident, humble learners.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {content.campusHighlights.map((item) => (
              <article key={item.title} className="rounded-3xl border border-line bg-cream p-5">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-line bg-[#eceae3]">
            <Image
              src={content.school.heroImage}
              alt="Students and campus"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/about" className="btn-primary">
              Explore Visionary Path
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-line bg-cream px-5 py-3 text-sm font-bold text-navy"
            >
              Contact For Admission
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LeadersSection({ content }: { content: SiteContent }) {
  const leaders = content.leaders || [];
  if (!leaders.length) return null;

  return (
    <section className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#f4f1ea_0%,#ffffff_42%,#eef1fb_100%)]" aria-hidden />
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#F5A623]/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-navy/10 blur-3xl" aria-hidden />

      <div className="container-site relative">
        <div className="mx-auto max-w-3xl text-center fade-up">
          <p className="eyebrow">Voices of Our Leaders</p>
          <h2 className="heading-display mt-2 text-3xl font-bold text-navy md:text-5xl">
            Words of Wisdom
          </h2>
          <p className="mt-4 text-base leading-7 text-ink/75 md:text-lg">
            Our school leaders share their wisdom, values, and vision to inspire students, parents,
            and educators alike. Their words guide our path toward growth, respect, and excellence.
          </p>
        </div>

        <div className="mt-12 space-y-8 md:space-y-10">
          {leaders.map((leader, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={leader.id || leader.name}
                className={cn(
                  "group grid overflow-hidden rounded-[2rem] border border-line bg-white/90 shadow-[0_24px_60px_rgba(47,42,122,0.08)] backdrop-blur-sm fade-up md:grid-cols-[0.9fr_1.1fr]",
                  reverse && "md:grid-cols-[1.1fr_0.9fr]"
                )}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div
                  className={cn(
                    "relative min-h-[280px] bg-navy/5 md:min-h-[360px]",
                    reverse && "md:order-2"
                  )}
                >
                  <Image
                    src={leader.photo}
                    alt={`${leader.name}, ${leader.role}`}
                    fill
                    className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent p-5 md:hidden">
                    <p className="text-lg font-bold text-white">{leader.name}</p>
                    <p className="text-sm text-[#F5A623]">{leader.role}</p>
                  </div>
                </div>

                <div className={cn("flex flex-col justify-center p-6 md:p-10", reverse && "md:order-1")}>
                  <span
                    className="font-hand mb-3 text-5xl leading-none text-[#F5A623]/80 md:text-6xl"
                    aria-hidden
                  >
                    “
                  </span>
                  <blockquote className="heading-display text-xl font-semibold leading-relaxed text-navy md:text-2xl">
                    {leader.quote}
                  </blockquote>
                  <div className="mt-6 hidden border-t border-line pt-5 md:block">
                    <h3 className="text-xl font-bold text-ink">{leader.name}</h3>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                      {leader.role}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink/75 md:text-base">{leader.message}</p>
                  <Link
                    href="/about"
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-deep"
                  >
                    Know More
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function GalleryPreview({ content }: { content: SiteContent }) {
  const items = content.gallery.filter((g) => g.type === "image").slice(0, 4);
  if (!items.length) return null;
  return (
    <section className="section-pad bg-white">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Campus Moments</p>
            <h2 className="heading-display mt-2 text-3xl font-bold md:text-4xl">Photo Gallery</h2>
          </div>
          <Link href="/gallery" className="btn-primary">
            View all photos
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href="/gallery"
              className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eceae3]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold text-ink">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideosPreview({ content }: { content: SiteContent }) {
  const video = content.videos.find((v) => v.published);
  if (!video) return null;
  return (
    <section className="section-pad bg-cream">
      <div className="container-site grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Watch & Learn</p>
          <h2 className="heading-display mt-2 text-3xl font-bold md:text-4xl">{video.title}</h2>
          <p className="mt-4 text-muted">{video.description}</p>
          <Link href="/videos" className="btn-primary mt-6">
            Open video library
          </Link>
        </div>
        <VideoEmbed src={video.src} poster={video.poster} title={video.title} />
      </div>
    </section>
  );
}

function VideoEmbed({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-ink shadow-lg">
      <video
        className="aspect-video w-full object-cover"
        controls
        preload="none"
        poster={poster}
        title={title}
      >
        <source src={src} />
      </video>
    </div>
  );
}

export function Testimonials({ content }: { content: SiteContent }) {
  if (!content.testimonials.length) {
    return null;
  }
  return (
    <section className="section-pad bg-white">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Community Trust</p>
          <h2 className="heading-display mt-2 text-3xl font-bold md:text-4xl">What Parents Say</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {content.testimonials.map((t) => (
            <blockquote key={t.id} className="rounded-3xl border border-line bg-cream p-6">
              <p className="text-base leading-7 text-ink">“{t.text}”</p>
              <footer className="mt-4 text-sm font-semibold text-navy">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose({ content }: { content: SiteContent }) {
  return (
    <section className="section-pad bg-navy text-white">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-orange-200 italic">Why Families Choose Us</p>
          <h2 className="heading-display mt-2 text-3xl font-bold md:text-4xl">
            A school built for discipline, excellence, and care
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {content.whyChoose.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
