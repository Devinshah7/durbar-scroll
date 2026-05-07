import { useEffect, useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";
import g9 from "@/assets/gallery-9.jpg";
import { SplitWords } from "@/lib/reveal";

interface GItem {
  src: string;
  client: string;
  event: string;
  tall?: boolean;
}
const ITEMS: GItem[] = [
  { src: g1, client: "Reliance Industries", event: "Annual Awards Night", tall: true },
  { src: g2, client: "Samsung", event: "S-Talk Leadership Forum" },
  { src: g3, client: "Bollywood Music Project", event: "Concert Series" },
  { src: g4, client: "GCS Reliance", event: "Global Corporate Security Event", tall: true },
  { src: g5, client: "Hennessy", event: "Brand Experience Activation" },
  { src: g6, client: "Audi", event: "Product Launch" },
  { src: g7, client: "TIPA", event: "Cultural Showcase", tall: true },
  { src: g8, client: "30th TT Asian Cup", event: "Sports Event Management" },
  { src: g9, client: "Krux", event: "Product Launch Film" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? 0 : (i + 1) % ITEMS.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? 0 : (i - 1 + ITEMS.length) % ITEMS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, var(--section-maroon) 0%, var(--section-cream) 12%, var(--section-light) 100%)" }}
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-14 max-w-3xl">
          <div className="eyebrow mb-5" style={{ color: "var(--color-burgundy)" }}>
            Glimpse of Our Work
          </div>
          <SplitWords
            as="h2"
            text="The Work Speaks."
            className="font-display italic"
          />
          <p className="mt-5 max-w-xl text-[16px]" style={{ color: "rgba(13,11,8,0.65)" }}>
            Over 350 events. Each one different. Each one deliberate.
          </p>
        </div>

        <div
          className="grid gap-3 md:gap-4"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "220px",
          }}
        >
          {ITEMS.map((it, i) => (
            <button
              key={i}
              className="gallery-item group"
              style={{ gridRow: it.tall ? "span 2" : "span 1" }}
              onClick={() => setActive(i)}
              aria-label={`Open ${it.event}`}
            >
              <img src={it.src} alt={`${it.client} — ${it.event}`} loading="lazy" />
              <div className="gallery-overlay">
                <div
                  className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: "var(--color-gold)" }}
                >
                  {it.client}
                </div>
                <div
                  className="mt-1.5 font-serif-display text-lg"
                  style={{ color: "var(--color-ivory)" }}
                >
                  {it.event}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        #gallery h2 { font-size: clamp(44px, 6vw, 80px); color: var(--color-ink); }
        @media (max-width: 768px) {
          #gallery .grid { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 180px !important; }
        }
        @media (max-width: 480px) {
          #gallery .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[10001] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(8px)" }}
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
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? 0 : (i - 1 + ITEMS.length) % ITEMS.length));
            }}
            className="absolute left-6 text-4xl"
            style={{ color: "var(--color-gold)" }}
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? 0 : (i + 1) % ITEMS.length));
            }}
            className="absolute right-6 bottom-6 md:bottom-auto text-4xl"
            style={{ color: "var(--color-gold)" }}
          >
            ›
          </button>
          <div
            className="max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={ITEMS[active].src}
              alt={`${ITEMS[active].client} — ${ITEMS[active].event}`}
              className="max-h-[80vh] max-w-[90vw] object-contain"
            />
            <div className="mt-4 text-center">
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: "var(--color-gold)" }}
              >
                {ITEMS[active].client}
              </div>
              <div className="mt-1 font-serif-display text-xl text-ivory">
                {ITEMS[active].event}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
