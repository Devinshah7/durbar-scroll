import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Diyas } from "@/lib/diyas";
import heroLeft from "@/assets/hero-left.jpg";
import heroRight from "@/assets/hero-right.jpg";

const MORPH_WORDS = ["experiences.", "ceremonies.", "stories.", "moments.", "journeys."];

export function Hero() {
  const morphRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 2.6,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Morphing word
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      const el = morphRef.current;
      if (!el) return;
      i = (i + 1) % MORPH_WORDS.length;
      gsap.to(el, {
        yPercent: -120,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          el.textContent = MORPH_WORDS[i];
          gsap.fromTo(
            el,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          );
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
      style={{ background: "var(--color-ink)" }}
    >
      {/* Dual video panels */}
      <div className="relative flex h-[88vh] min-h-[640px] w-full">
        {/* LEFT — portrait */}
        <div
          className="relative h-full w-[40%] overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-burgundy-dark), var(--color-ink))",
          }}
        >
          <img
            src={heroLeft}
            alt="A ceremonial Indian gathering bathed in chandelier light"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            width={704}
            height={1280}
          />
          {/* Smoke / paisley float-up overlay */}
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 40 60"
                className="absolute h-16 w-16"
                style={{
                  left: `${15 + i * 15}%`,
                  bottom: "-60px",
                  color: "var(--color-gold)",
                  opacity: 0.18,
                  animation: `paisley-float ${10 + i * 2}s ease-out ${i * 1.5}s infinite`,
                }}
              >
                <path
                  d="M20 5 C 8 18, 8 38, 20 55 C 28 40, 30 28, 26 18 C 24 12, 22 8, 20 5 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
              </svg>
            ))}
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset -60px 0 80px rgba(200,150,12,0.1)" }}
          />
          <Diyas count={5} />
        </div>

        {/* RIGHT — landscape */}
        <div
          className="relative h-full w-[60%] overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, var(--color-indigo-night), var(--color-ink))",
          }}
        >
          <img
            src={heroRight}
            alt="A grand corporate event stage with ornate Indian-inspired backdrop"
            className="absolute inset-0 h-full w-full object-cover opacity-85"
            width={1280}
            height={720}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,150,12,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,150,12,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 60px 0 80px rgba(200,150,12,0.1)" }}
          />
          <Diyas count={7} />
        </div>


        {/* Hero overlay text */}
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="hero-content mx-auto w-full max-w-[1500px] px-6 md:px-10">
            <div className="max-w-3xl">
              <div
                className="mb-6 flex items-center gap-3 text-[10px]"
                style={{ letterSpacing: "0.4em", color: "var(--color-gold)" }}
              >
                <span className="inline-block h-px w-10" style={{ background: "var(--color-gold)" }} />
                EST. 2015 · 500+ EVENTS · INDIA & ABROAD
              </div>
              <h1
                className="font-display italic leading-[0.95]"
                style={{
                  fontSize: "clamp(48px, 7.5vw, 116px)",
                  color: "var(--color-ivory)",
                  fontWeight: 500,
                }}
              >
                <span className="block">We don't organise</span>
                <span className="block" style={{ overflow: "hidden", display: "inline-block" }}>
                  <span
                    ref={morphRef}
                    className="inline-block font-display italic"
                    style={{
                      color: "var(--color-gold)",
                      transformOrigin: "center bottom",
                    }}
                  >
                    experiences.
                  </span>
                </span>
              </h1>
              <p
                className="mt-8 max-w-xl text-base leading-[1.7] md:text-lg"
                style={{ color: "rgba(253,246,227,0.78)" }}
              >
                India's most trusted experiential partner for corporate events, MICE travel,
                celebrity integration, and cultural storytelling.
              </p>
              <div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4">
                <a href="#gallery" className="btn-gold">
                  Explore Our Work
                </a>
                <a
                  href="#contact"
                  className="text-[12px] font-semibold uppercase tracking-[0.3em] transition-colors hover:text-[var(--color-gold-bright)]"
                  style={{ color: "#000000" }}
                >
                  Begin a Conversation →
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
              "❖ CORPORATE EVENTS",
              "❖ MICE TRAVEL",
              "❖ CELEBRITY MANAGEMENT",
              "❖ CULTURAL CURATION",
              "❖ ATITHI DEVO BHAVA",
              "❖ 500+ EVENTS",
              "❖ SAMSUNG",
              "❖ RELIANCE",
              "❖ AUDI",
              "❖ MOËT HENNESSY",
              "❖ BMW",
              "❖ COCA-COLA",
              "❖ HYUNDAI",
              "❖ ICICI BANK",
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
