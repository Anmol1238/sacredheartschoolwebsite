import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { StateView } from "@/components/ui/StateView";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Campus photos and media from Sacred Heart Sr. Sec. School.",
};

export default async function GalleryPage() {
  const { gallery } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title="Gallery"
        description="Photos and clips from Sacred Heart School — managed from the admin media & gallery tools."
      />
      <section className="section-pad">
        <div className="container-site">
          {!gallery.length ? (
            <StateView kind="empty" title="No gallery items yet" />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item) => (
                <article key={item.id} className="card-soft overflow-hidden">
                  {item.type === "image" ? (
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <VideoPlayer src={item.src} title={item.title} />
                  )}
                  <div className="p-4">
                    <h2 className="font-semibold text-ink">{item.title}</h2>
                    {item.caption ? (
                      <p className="mt-1 text-sm text-muted">{item.caption}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
