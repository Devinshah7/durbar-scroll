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
    role: "The Initiator & Founder",
    years: "24+ Years",
    bio: "With 24+ years in marketing, customer service, and event management, Priyana has orchestrated 2000+ events globally. Her expertise spans luxury brand launches, MICE, weddings, and experiential campaigns that seamlessly blend creativity with precision. She leads with vision, passion, and a commitment to excellence that defines TMB's ethos.",
    origin: { x: -80, y: 0 },
  },
  {
    img: t2,
    name: "Asheesh Bhimsaria",
    role: "Co-Founder & Partner",
    years: "35+ Years",
    bio: "A business growth strategist with 35+ years in exports, B2B, and high-value real estate, Asheesh transforms complexity into clarity. He helps brands streamline sales processes, align teams, and achieve consistent growth. More than a consultant — a collaborator who believes in getting \"in the game\" with clients, driving measurable results through practical strategy.",
    origin: { x: 0, y: 60 },
  },
  {
    img: t3,
    name: "Shikha Deb Choudhury",
    role: "Co-Founder & Partner",
    years: "45+ Years",
    bio: "An artistic visionary with 45+ years in Indian art, culture, and education, Shikha brings depth, tradition, and storytelling brilliance to TMB. A renowned dance drama director, Bengali scriptwriter, and former All India Radio artist, she has mentored generations of performers and curated large-scale cultural productions. Her conceptual creativity adds soulful Indian essence to every TMB experience.",
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

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r1 = seed / 233280;
        const r2 = ((seed * 1.7) % 233280) / 233280;
        const r3 = ((seed * 2.3) % 233280) / 233280;
        return { top: `${(r1 * 100).toFixed(2)}%`, left: `${(r2 * 100).toFixed(2)}%`, opacity: 0.1 + r3 * 0.35, size: 1 + Math.round(r3 * 2) };
      }),
    [],
  );

  return (
    <section id="team" ref={ref} className="relative overflow-hidden py-24 md:py-32" style={{ background: "linear-gradient(180deg, var(--section-cream) 0%, var(--section-warm-dark) 25%, var(--section-warm-dark) 100%)" }}>
      <div className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span key={i} className="absolute rounded-full" style={{ top: s.top, left: s.left, width: s.size, height: s.size, background: "var(--color-gold-pale)", opacity: s.opacity }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1300px] px-6 md:px-10">
        <div className="mb-20 max-w-3xl">
          <div className="eyebrow mb-5">The Core Team</div>
          <SplitWords as="h2" text="The Minds Behind The Majestic." className="font-serif-display section-heading" />
          <div className="heading-flourish"><span className="flourish-diamond">◆</span></div>
          <p className="mt-5 text-[16px] font-display italic" style={{ color: "rgba(253,246,227,0.7)" }}>
            Three leaders. Decades of individual mastery across events, business, art & culture.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="team-card group relative flex flex-col items-center px-6 py-10 text-center transition-all duration-500"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,150,12,0.3)", backdropFilter: "blur(4px)" }}
              onMouseEnter={(e) => { gsap.to(e.currentTarget, { y: -10, borderColor: "rgba(200,150,12,1)", boxShadow: "0 16px 48px rgba(200,150,12,0.18)", duration: 0.4 }); }}
              onMouseLeave={(e) => { gsap.to(e.currentTarget, { y: 0, borderColor: "rgba(200,150,12,0.3)", boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.4 }); }}
            >
              {/* Gold filigree top corners */}
              <div className="absolute left-3 top-3" style={{ color: "var(--color-gold)", opacity: 0.3, fontSize: 20 }}>❧</div>
              <div className="absolute right-3 top-3" style={{ color: "var(--color-gold)", opacity: 0.3, fontSize: 20, transform: "scaleX(-1)" }}>❧</div>

              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full" style={{ border: "3px solid var(--color-gold)", boxShadow: "0 0 40px rgba(200,150,12,0.25), 0 0 0 6px rgba(200,150,12,0.1)" }}>
                <img src={m.img} alt={m.name} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-6 font-serif-display" style={{ color: "var(--color-gold)", fontSize: "28px" }}>{m.name}</h3>
              <div className="mt-1 font-display italic" style={{ color: "var(--color-gold-pale)", fontSize: "16px" }}>{m.role}</div>
              <div className="mt-4 inline-block rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em]" style={{ borderColor: "rgba(200,150,12,0.5)", color: "var(--color-gold)" }}>
                {m.years}
              </div>
              <p className="mt-5 text-[15px] leading-[1.7]" style={{ color: "rgba(253,246,227,0.7)" }}>{m.bio}</p>
              <div className="mt-6 h-px w-0 transition-all duration-500 group-hover:w-full" style={{ background: "var(--color-gold)" }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        #team h2 { font-size: clamp(40px, 5.5vw, 56px); color: var(--color-gold); }
      `}</style>
    </section>
  );
}
