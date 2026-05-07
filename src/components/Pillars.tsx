import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Diyas } from "@/lib/diyas";
import { FadeUp } from "@/lib/reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PILLARS = [
  {
    numeral: "I",
    title: "MICE EVENTS",
    desc: "Corporate conclaves, conferences, product launches, award nights, employee engagement, and leadership offsites — executed with precision and prestige.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="8" y="12" width="32" height="24" rx="2" />
        <path d="M8 18h32" />
        <circle cx="24" cy="30" r="4" />
        <path d="M18 8l6 4 6-4" />
      </svg>
    ),
  },
  {
    numeral: "II",
    title: "SPORTS EVENTS",
    desc: "Tournament management, sporting galas, league activations, and sports hospitality — from the 30th TT Asian Cup to bespoke sporting spectacles.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="24" cy="24" r="16" />
        <path d="M12 18c4 4 12 4 24 0" />
        <path d="M12 30c4-4 12-4 24 0" />
        <line x1="24" y1="8" x2="24" y2="40" />
      </svg>
    ),
  },
  {
    numeral: "III",
    title: "WEDDINGS",
    desc: "Luxury Indian weddings, destination weddings, and pre-wedding curation — where tradition meets timeless elegance in every celebration.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M14 28C10 24 8 18 12 14C16 10 20 12 24 18C28 12 32 10 36 14C40 18 38 24 34 28L24 38L14 28Z" />
        <path d="M24 18v8" />
        <circle cx="24" cy="30" r="2" />
      </svg>
    ),
  },
  {
    numeral: "IV",
    title: "CELEBRITY CONCERTS",
    desc: "LIVE-IN concerts, artist booking & management, Bollywood playback, folk & classical performances, and large-scale productions that electrify audiences.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M20 12v24" />
        <path d="M20 12c0 0 12-4 12 4v8c0 8-12 4-12 4" />
        <ellipse cx="16" cy="36" rx="4" ry="3" />
        <path d="M32 20l4-4M32 16l4 4" />
        <path d="M36 28l3-3M36 25l3 3" />
      </svg>
    ),
  },
];

export function Pillars() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pillar-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="pillars" className="relative overflow-hidden py-28 md:py-36" style={{ background: "linear-gradient(180deg, var(--section-terracotta) 0%, var(--section-warm-dark) 30%, var(--section-warm-dark) 100%)" }}>
      <Diyas count={10} />
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp className="mb-20 text-center">
          <p className="eyebrow mb-4">Our Sacred Pillars</p>
          <h2 className="section-heading font-serif-display" style={{ color: "var(--color-gold)" }}>
            The Temple of Excellence
          </h2>
          <div className="heading-flourish mx-auto"><span className="flourish-diamond">◆</span></div>
          <p className="mx-auto mt-6 max-w-xl text-[16px]" style={{ color: "var(--color-gold-pale)", fontStyle: "italic" }}>
            Four pillars upon which every Majestic experience is built
          </p>
        </FadeUp>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="pillar-card group relative overflow-hidden rounded border p-7 text-center transition-all duration-300 hover:border-[rgba(200,150,12,0.7)]"
              style={{ opacity: 0, background: "var(--color-smoke)", borderColor: "rgba(200,150,12,0.2)" }}
            >
              {/* Roman numeral watermark */}
              <div
                className="pointer-events-none absolute right-3 top-1 font-serif-display select-none"
                style={{ fontSize: 100, color: "rgba(200,150,12,0.06)", lineHeight: 1, fontWeight: 700 }}
              >
                {p.numeral}
              </div>
              <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center" style={{ color: "var(--color-gold)" }}>
                {p.icon}
              </div>
              <div className="font-serif-display mb-3 text-lg font-bold tracking-[0.15em]" style={{ color: "var(--color-gold)", fontSize: 20 }}>{p.title}</div>
              <p className="text-[14px] leading-relaxed" style={{ color: "var(--color-gold-pale)" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
