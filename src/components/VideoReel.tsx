import { useEffect, useState } from "react";
import { Diyas } from "@/lib/diyas";
import { SplitWords } from "@/lib/reveal";

interface VideoItem {
  id: string;
  category: string;
  title: string;
}
const VIDEOS: VideoItem[] = [
  { id: "H7lxhdwFTWM", category: "Sports Management", title: "30th TT Asian Cup" },
  { id: "pK_zOuU-A0Q", category: "Corporate Event", title: "Reliance Employee Award Night" },
  { id: "LOC50nm9UuE", category: "Brand Event", title: "Samsung S-Talk" },
  { id: "_qot0YzdCYo", category: "Product Launch", title: "Krux Launch Film" },
  { id: "TYaJMjAsrKk", category: "Live Concert", title: "Sukhwinder Singh · CSC" },
  { id: "P-Bz2D8tOhA", category: "Live Concert", title: "Badshah · CSC" },
];

export function VideoReel() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, var(--section-light) 0%, var(--section-cream) 40%, var(--section-cream) 100%)" }}
    >
      <Diyas count={8} />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-18 max-w-3xl">
          <div className="eyebrow mb-5" style={{ color: "var(--color-terracotta)" }}>Watch the Experience</div>
          <SplitWords as="h2" text="See What We Build." className="font-serif-display section-heading" />
          <div className="heading-flourish"><span className="flourish-diamond">◆</span></div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {VIDEOS.map((v) => (
            <div key={v.id} className="video-card" onClick={() => setActive(v.id)}>
              <div className="video-thumbnail">
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,11,8,0.7), transparent 60%)",
                  }}
                />
                <div className="play-button">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <div
                  className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: "var(--color-terracotta)" }}
                >
                  {v.category}
                </div>
                <h3
                  className="mt-2 font-serif-display"
                  style={{ color: "var(--color-ink)", fontSize: "20px" }}
                >
                  {v.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        section h2 { font-size: clamp(38px, 5vw, 64px); color: var(--color-ink); }
      `}</style>

      {active && (
        <div
          className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(10px)" }}
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute right-6 top-6 text-3xl"
            style={{ color: "var(--color-gold)" }}
          >
            ✕
          </button>
          <div
            className="relative w-full max-w-[1100px]"
            onClick={(e) => e.stopPropagation()}
            style={{ aspectRatio: "16/9" }}
          >
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${active}?autoplay=1&rel=0`}
              title="Video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
