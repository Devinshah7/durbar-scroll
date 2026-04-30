import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface Pillar {
  num: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  bg: string;
  accent: string;
  pattern?: "peacock" | "grid" | "spotlight" | "warli";
}

const PILLARS: Pillar[] = [
  {
    num: "01",
    eyebrow: "Pillar One — Events",
    title: "Corporate Events &\nLive Experiences.",
    body:
      "From boardroom conclaves to packed arenas — we design events that move people. Not just physically, but emotionally.",
    bullets: [
      "Corporate Conclaves & Conferences",
      "Product Launches & Brand Promotions",
      "Annual Days & Award Nights",
      "Employee Engagement & Team Building",
      "LIVE Celebrity Concerts",
      "Brand Activations",
    ],
    bg: "var(--color-burgundy)",
    accent: "var(--color-gold)",
    pattern: "peacock",
  },
  {
    num: "02",
    eyebrow: "Pillar Two — Tourism",
    title: "MICE & Experiential\nTravel.",
    body:
      "We curate journeys that balance business with discovery. Immersive, seamlessly executed, culturally enriching.",
    bullets: [
      "MICE: Domestic & International",
      "Leadership Retreats & Incentive Tours",
      "Wellness, Heritage & Spiritual Tours",
      "Tailor-Made Experiential Journeys",
    ],
    bg: "var(--color-indigo-night)",
    accent: "var(--color-gold)",
    pattern: "grid",
  },
  {
    num: "03",
    eyebrow: "Pillar Three — Celebrities",
    title: "Talent, Managed.\nStars, Delivered.",
    body:
      "From Bollywood icons to classical maestros to social media phenomena — we manage, book, and integrate talent into your event narrative.",
    bullets: [
      "Bollywood Playback & Actor Booking",
      "Folk & Classical Artists",
      "Social Media Influencers",
      "Unconventional & Niche Talent",
      "Instrumental Bands",
      "Cross-Cultural Performers",
    ],
    bg: "var(--color-smoke)",
    accent: "var(--color-gold)",
    pattern: "spotlight",
  },
  {
    num: "04",
    eyebrow: "Pillar Four — Culture",
    title: "Culture Embedded.\nNot Decorated.",
    body:
      "We don't sprinkle culture on top of events. We build it into the architecture of every experience — in the storytelling, the art, the performance, the hospitality.",
    bullets: [
      "Historical Storytelling",
      "Cross-Cultural Collaborations",
      "Artistry Workshops",
      "Exhibitions & Festivals",
      "Cultural Podcasts & Seminars",
    ],
    bg: "var(--color-forest)",
    accent: "var(--color-gold-pale)",
    pattern: "warli",
  },
];

export function Pillars() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return; // skip horizontal scroll on mobile

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrapper);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pillars" ref={wrapperRef} className="relative overflow-hidden">
      {/* Desktop horizontal track */}
      <div
        ref={trackRef}
        className="hidden h-screen md:flex"
        style={{ width: "max-content" }}
      >
        {/* Intro panel */}
        <PanelIntro />
        {PILLARS.map((p) => (
          <PillarPanel key={p.num} pillar={p} />
        ))}
      </div>

      {/* Mobile stacked */}
      <div className="md:hidden">
        <PanelIntro mobile />
        {PILLARS.map((p) => (
          <PillarPanel key={p.num} pillar={p} mobile />
        ))}
      </div>
    </section>
  );
}

function PanelIntro({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden ${
        mobile ? "min-h-[80vh] px-6 py-24" : "h-screen w-screen px-10"
      }`}
      style={{ background: "var(--color-ink)" }}
    >
      {/* Watermark mandala */}
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute h-[80vmin] w-[80vmin] mandala-spin"
        style={{ color: "var(--color-gold)", opacity: 0.07 }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.6">
          <circle cx="200" cy="200" r="190" />
          <circle cx="200" cy="200" r="140" />
          <circle cx="200" cy="200" r="90" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 360) / 12;
            return (
              <path
                key={i}
                d="M200 30 C 175 90, 175 140, 200 200 C 225 140, 225 90, 200 30 Z"
                transform={`rotate(${a} 200 200)`}
              />
            );
          })}
        </g>
      </svg>
      <div className="relative text-center">
        <div className="eyebrow mb-6">The TMB Framework</div>
        <h2
          className="font-display italic leading-[0.95]"
          style={{
            color: "var(--color-ivory)",
            fontSize: mobile ? "44px" : "clamp(60px, 8vw, 110px)",
          }}
        >
          Crafting Excellence
          <br />
          Across Four Pillars
        </h2>
        <div
          className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]"
          style={{ color: "var(--color-gold)" }}
        >
          <span>{mobile ? "scroll to explore" : "scroll to explore"}</span>
          <span className="inline-block animate-bounce">→</span>
        </div>
      </div>
    </div>
  );
}

function PillarPanel({ pillar, mobile = false }: { pillar: Pillar; mobile?: boolean }) {
  return (
    <div
      className={`relative flex overflow-hidden ${
        mobile ? "min-h-[90vh] flex-col px-6 py-20" : "h-screen w-screen items-center px-12"
      }`}
      style={{ background: pillar.bg }}
    >
      {/* Watermark number */}
      <div
        className="font-display pointer-events-none absolute"
        style={{
          color: pillar.accent,
          opacity: 0.08,
          fontSize: mobile ? "180px" : "260px",
          fontWeight: 900,
          top: mobile ? "10px" : "20px",
          left: mobile ? "10px" : "40px",
          lineHeight: 1,
        }}
      >
        {pillar.num}
      </div>

      {/* Decorative pattern half */}
      <div className={`pointer-events-none absolute right-0 top-0 ${mobile ? "h-full w-full opacity-20" : "h-full w-1/2 opacity-30"}`}>
        <PillarPattern pattern={pillar.pattern} accent={pillar.accent} />
      </div>

      {/* Content */}
      <div className={`relative ${mobile ? "" : "max-w-[58%] pl-4"}`}>
        <div className="eyebrow mb-5">{pillar.eyebrow}</div>
        <h3
          className="font-serif-display whitespace-pre-line"
          style={{
            color: "var(--color-ivory)",
            fontSize: mobile ? "36px" : "clamp(40px, 5vw, 64px)",
            lineHeight: 1.05,
          }}
        >
          {pillar.title}
        </h3>
        <div className="my-7 h-px w-24" style={{ background: pillar.accent }} />
        <p
          className="max-w-xl text-[15px] leading-[1.75] md:text-[16px]"
          style={{ color: "rgba(253,246,227,0.78)" }}
        >
          {pillar.body}
        </p>
        <ul className="mt-7 flex flex-wrap gap-2.5">
          {pillar.bullets.map((b) => (
            <li
              key={b}
              className="rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em]"
              style={{
                borderColor: "rgba(200,150,12,0.45)",
                color: "var(--color-gold-pale)",
              }}
            >
              ◆ {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PillarPattern({ pattern, accent }: { pattern?: string; accent: string }) {
  if (pattern === "peacock") {
    return (
      <svg viewBox="0 0 400 800" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke={accent} strokeWidth="1">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx={200}
              cy={100 + i * 90}
              rx={120 - i * 6}
              ry={70 - i * 3}
              transform={`rotate(${i * 8} 200 ${100 + i * 90})`}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={`e${i}`} cx={200} cy={120 + i * 60} r="6" />
          ))}
        </g>
      </svg>
    );
  }
  if (pattern === "grid") {
    return (
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.6,
        }}
      />
    );
  }
  if (pattern === "spotlight") {
    return (
      <div
        className="h-full w-full"
        style={{
          background: `radial-gradient(circle at 70% 50%, rgba(255,240,200,0.35), transparent 60%)`,
        }}
      />
    );
  }
  // warli
  return (
    <svg viewBox="0 0 400 800" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g stroke={accent} strokeWidth="1" fill="none">
        {Array.from({ length: 10 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => {
            const cx = 50 + col * 60;
            const cy = 50 + row * 80;
            return (
              <g key={`${row}-${col}`}>
                <circle cx={cx} cy={cy} r="8" />
                <line x1={cx} y1={cy + 8} x2={cx} y2={cy + 28} />
                <line x1={cx} y1={cy + 14} x2={cx - 12} y2={cy + 22} />
                <line x1={cx} y1={cy + 14} x2={cx + 12} y2={cy + 22} />
                <line x1={cx} y1={cy + 28} x2={cx - 8} y2={cy + 42} />
                <line x1={cx} y1={cy + 28} x2={cx + 8} y2={cy + 42} />
              </g>
            );
          }),
        )}
      </g>
    </svg>
  );
}
