import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitWords } from "@/lib/reveal";
import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    img: t1,
    name: "Priyana Choudhury",
    role: "Initiator & Founder",
    years: "24 Years",
    bio: "With 24+ years in marketing, customer service, and global event management — Priyana has orchestrated over 2000 events across the world. She leads with vision, executes with precision, and defines what TMB stands for.",
    origin: { x: -80, y: 0 },
  },
  {
    img: t2,
    name: "Asheesh Bhimsaria",
    role: "Co-Founder & Partner",
    years: "35 Years",
    bio: "A business growth strategist with 35+ years in exports, B2B, and high-value real estate. He transforms complexity into clarity — driving measurable outcomes through disciplined, collaborative execution.",
    origin: { x: 0, y: 60 },
  },
  {
    img: t3,
    name: "Shikha Deb Choudhury",
    role: "Co-Founder & Partner",
    years: "45 Years",
    bio: "An artistic visionary with 45+ years in Indian art, culture, and education. Dance drama director, Bengali scriptwriter, former All India Radio artist. She is the cultural conscience of every TMB experience.",
    origin: { x: 80, y: 0 },
  },
];

export function Team() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll<HTMLElement>(".team-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          ...TEAM[i].origin,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Star field
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r1 = seed / 233280;
        const r2 = ((seed * 1.7) % 233280) / 233280;
        const r3 = ((seed * 2.3) % 233280) / 233280;
        return {
          top: `${(r1 * 100).toFixed(2)}%`,
          left: `${(r2 * 100).toFixed(2)}%`,
          opacity: 0.1 + r3 * 0.35,
          size: 1 + Math.round(r3 * 2),
        };
      }),
    [],
  );

  return (
    <section
      id="team"
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "var(--color-indigo-night)" }}
    >
      {/* Starfield */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              background: "var(--color-gold-pale)",
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1300px] px-6 md:px-10">
        <div className="mb-16 max-w-3xl">
          <div className="eyebrow mb-5">The Core Team</div>
          <SplitWords
            as="h2"
            text="The Minds Behind The Majestic."
            className="font-display italic"
          />
          <p className="mt-5 text-[16px]" style={{ color: "rgba(253,246,227,0.7)" }}>
            Three leaders. 104 combined years of mastery.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="team-card group relative flex flex-col items-center px-6 py-10 text-center transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(200,150,12,0.3)",
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -10,
                  borderColor: "rgba(200,150,12,1)",
                  boxShadow: "0 16px 48px rgba(200,150,12,0.18)",
                  duration: 0.4,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  borderColor: "rgba(200,150,12,0.3)",
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                  duration: 0.4,
                });
              }}
            >
              <div
                className="relative h-40 w-40 overflow-hidden rounded-full"
                style={{
                  border: "2px solid var(--color-gold)",
                  boxShadow: "0 0 40px rgba(200,150,12,0.25)",
                }}
              >
                <img src={m.img} alt={m.name} className="h-full w-full object-cover" />
              </div>
              <h3
                className="mt-6 font-serif-display"
                style={{ color: "var(--color-gold)", fontSize: "22px" }}
              >
                {m.name}
              </h3>
              <div
                className="mt-1 font-display italic"
                style={{ color: "var(--color-gold-pale)", fontSize: "16px" }}
              >
                {m.role}
              </div>
              <div
                className="mt-4 inline-block rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em]"
                style={{
                  borderColor: "rgba(200,150,12,0.5)",
                  color: "var(--color-gold)",
                }}
              >
                {m.years}
              </div>
              <p
                className="mt-5 text-[14px] leading-[1.7]"
                style={{ color: "rgba(253,246,227,0.7)" }}
              >
                {m.bio}
              </p>
              <div
                className="mt-6 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: "var(--color-gold)" }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        #team h2 { font-size: clamp(40px, 5.5vw, 72px); color: var(--color-gold); }
      `}</style>
    </section>
  );
}
