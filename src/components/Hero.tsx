import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Diyas } from "@/lib/diyas";
import heroRight from "@/assets/hero-right.jpg";

const MORPH_WORDS = ["experiences.", "ceremonies.", "stories.", "moments.", "journeys."];

export function Hero() {
  const morphRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        opacity: 0, y: 30, duration: 1, stagger: 0.15,
        ease: "power3.out", delay: 2.6,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      const el = morphRef.current;
      if (!el) return;
      i = (i + 1) % MORPH_WORDS.length;
      gsap.to(el, {
        yPercent: -120, opacity: 0, duration: 0.4, ease: "power2.in",
        onComplete: () => {
          el.textContent = MORPH_WORDS[i];
          gsap.fromTo(el, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
        },
      });
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #2A0A0E 0%, #170609 60%, #0B0608 100%)" }}
    >
      <div className="relative flex h-[88vh] min-h-[640px] w-full">
        {/* Cinematic unified backdrop — maroon/gold duotone */}
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={heroRight}
            alt="A ceremonial Indian gathering bathed in chandelier light"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "grayscale(0.4) contrast(1.05) brightness(0.55)", opacity: 0.55 }}
            width={1280}
            height={720}
          />
          {/* Maroon → gold duotone overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(90,16,24,0.85) 0%, rgba(23,6,9,0.7) 50%, rgba(201,160,60,0.18) 100%)",
              mixBlendMode: "multiply",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(11,6,8,0.65) 80%)",
            }}
          />
          {/* Faint mandala behind headline */}
          <svg
            aria-hidden
            viewBox="0 0 400 400"
            className="pointer-events-none absolute"
            style={{ left: "8%", top: "50%", transform: "translateY(-50%)", width: "min(60vw, 640px)", height: "auto", opacity: 0.12 }}
          >
            <g fill="none" stroke="#D4AF37" strokeWidth="0.8">
              <circle cx="200" cy="200" r="60" />
              <circle cx="200" cy="200" r="100" />
              <circle cx="200" cy="200" r="150" />
              <circle cx="200" cy="200" r="190" />
              {Array.from({ length: 16 }).map((_, i) => {
                const a = (i / 16) * Math.PI * 2;
                return (
                  <line
                    key={i}
                    x1={200 + Math.cos(a) * 60}
                    y1={200 + Math.sin(a) * 60}
                    x2={200 + Math.cos(a) * 190}
                    y2={200 + Math.sin(a) * 190}
                  />
                );
              })}
            </g>
          </svg>
          {/* Drifting paisleys */}
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <svg key={i} viewBox="0 0 40 60" className="absolute h-16 w-16" style={{ left: `${10 + i * 14}%`, bottom: "-60px", color: "#D4AF37", opacity: 0.16, animation: `paisley-float ${10 + i * 2}s ease-out ${i * 1.5}s infinite` }}>
                <path d="M20 5 C 8 18, 8 38, 20 55 C 28 40, 30 28, 26 18 C 24 12, 22 8, 20 5 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            ))}
          </div>
          <Diyas count={9} />
        </div>

        {/* Hero overlay text */}
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="hero-content mx-auto w-full max-w-[1500px] px-6 md:px-10">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3 text-[10px]" style={{ letterSpacing: "0.4em", color: "var(--color-gold)" }}>
                <span className="inline-block h-px w-10" style={{ background: "var(--color-gold)" }} />
                EST. 2015 · 350+ EVENTS · ACROSS 11 COUNTRIES
              </div>
              <h1
                className="font-serif-display leading-[1.05]"
                style={{ fontSize: "clamp(48px, 7.5vw, 88px)", color: "var(--color-ivory)", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                <span className="block">We don't organise</span>
                <span className="block">
                  We create{" "}
                  <span style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                    <span ref={morphRef} className="inline-block font-serif-display" style={{ color: "var(--color-gold)", transformOrigin: "center bottom" }}>
                      experiences.
                    </span>
                  </span>
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-[16px] leading-[1.7] md:text-[18px]" style={{ color: "rgba(253,246,227,0.78)" }}>
                India's most trusted experiential partner — 350+ events, 20+ years of expertise, across 11 countries. MICE events, sports, weddings, and celebrity concerts.
              </p>
              <div className="pointer-events-auto mt-10">
                <a href="#gallery" className="btn-gold">
                  Explore Our World
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            [
              "❖ ONE EXPERIENCE AT A TIME",
              "❖ VASUDHAIVA KUTUMBAKAM",
              "❖ 350+ EVENTS",
              "❖ ACROSS 11 COUNTRIES",
              "❖ 2000+ LIFETIME EVENTS ORCHESTRATED",
              "❖ ROOTED IN TRADITION, DRIVEN BY PASSION",
              "❖ ATITHI DEVO BHAVA",
            ].map((t, i) => <span key={`${k}-${i}`}>{t}</span>),
          )}
        </div>
      </div>

      <style>{`
        @keyframes paisley-float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.25; }
          100% { transform: translateY(-100vh) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
