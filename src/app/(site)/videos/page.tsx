import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { StateView } from "@/components/ui/StateView";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Videos",
  description: "School videos and campus highlights from Sacred Heart School.",
};

export default async function VideosPage() {
  const { videos } = await getContent();
  const published = videos.filter((v) => v.published);

  return (
    <>
      <PageHero
        eyebrow="Watch"
        title="Videos"
        description="Play school videos with an accessible player — works with progressive loading on slower networks."
      />
      <section className="section-pad">
        <div className="container-site space-y-8">
          {!published.length ? (
            <StateView kind="empty" title="No videos published" />
          ) : (
            published.map((video) => (
              <article key={video.id} className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <VideoPlayer src={video.src} poster={video.poster} title={video.title} />
                <div className="card-soft p-6">
                  <h2 className="heading-display text-2xl font-bold">{video.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {video.description || "School video from Sacred Heart Sr. Sec. School."}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}
