import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Diyas } from "@/lib/diyas";
import { FadeUp } from "@/lib/reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PILLARS = [
  { title: "EVENTS", desc: "Corporate galas, cultural festivals, and grand celebrations crafted with cinematic precision." },
  { title: "TOURISM", desc: "Heritage tours, MICE travel, and luxury retreats across the sacred land of Bharat." },
  { title: "CULTURE", desc: "Folk art revival, artisan showcases, and sacred journeys preserving India's living heritage." },
  { title: "CELEBRITIES", desc: "Brand partnerships, talent management, and star-powered experiences." },
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
    <section ref={ref} id="pillars" className="relative overflow-hidden py-28 md:py-36" style={{ background: "linear-gradient(180deg, #0a0510 0%, var(--color-ink) 100%)" }}>
      <Diyas count={10} />
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp className="mb-16 text-center">
          <p className="eyebrow mb-4">Crafting Excellence</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl" style={{ color: "var(--color-gold)" }}>
            The Temple of Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: "var(--color-gold-pale)", fontStyle: "italic" }}>
            Four sacred pillars upon which every Majestic experience is built
          </p>
        </FadeUp>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <div key={p.title} className="pillar-card rounded border p-6 text-center" style={{ opacity: 0, background: "var(--color-smoke)", borderColor: "rgba(200,150,12,0.2)" }}>
              <div className="font-display mb-3 text-lg font-bold tracking-[0.25em]" style={{ color: "var(--color-gold)" }}>{p.title}</div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-gold-pale)" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
