import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/** Curtain-rise loader with mandala bloom + letter reveal. */
export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    tl.fromTo(
      "#loader-mandala",
      { scale: 0.3, opacity: 0, rotation: 0 },
      { scale: 1, opacity: 1, rotation: 45, duration: 1.2, ease: "power3.out" },
    )
      .from(
        "#loader-text .char",
        { opacity: 0, yPercent: 80, stagger: 0.04, duration: 0.6, ease: "power2.out" },
        "-=0.5",
      )
      .from("#loader-tagline", { opacity: 0, y: 10, duration: 0.5 }, "-=0.2")
      .to("#loader-bar-fill", { width: "100%", duration: 0.9, ease: "none" }, "-=0.3")
      .to(el, { yPercent: -100, duration: 1.0, ease: "power2.inOut", delay: 0.3 });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  const brand = "THE MAJESTIC BHARAT";

  return (
    <div
      ref={ref}
      id="loader"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ background: "var(--color-ink)" }}
    >
      <svg
        id="loader-mandala"
        viewBox="0 0 200 200"
        className="mb-10 h-32 w-32 mandala-spin"
        style={{ color: "var(--color-gold)" }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.7">
          <circle cx="100" cy="100" r="92" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="48" />
          <circle cx="100" cy="100" r="22" />
          <circle cx="100" cy="100" r="6" fill="currentColor" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 360) / 8;
            return (
              <g key={i} transform={`rotate(${a} 100 100)`}>
                <path d="M100 28 C 86 50, 86 70, 100 92 C 114 70, 114 50, 100 28 Z" />
                <line x1="100" y1="6" x2="100" y2="22" />
                <circle cx="100" cy="14" r="2" fill="currentColor" />
              </g>
            );
          })}
          {Array.from({ length: 16 }).map((_, i) => {
            const a = ((i + 0.5) * 360) / 16;
            return (
              <line
                key={i}
                x1="100"
                y1="100"
                x2="100"
                y2="48"
                transform={`rotate(${a} 100 100)`}
                strokeWidth="0.4"
                opacity="0.5"
              />
            );
          })}
        </g>
      </svg>

      <div
        id="loader-text"
        className="font-display text-3xl tracking-[0.35em] md:text-4xl"
        style={{ color: "var(--color-gold-pale)" }}
      >
        {brand.split("").map((c, i) => (
          <span key={i} className="char inline-block">
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </div>
      <div
        id="loader-tagline"
        className="mt-3 text-[10px]"
        style={{ letterSpacing: "0.4em", color: "var(--color-gold)" }}
      >
        EVENTS · TOURISM · CULTURE
      </div>
      <div className="mt-10 h-px w-48 overflow-hidden" style={{ background: "rgba(200,150,12,0.18)" }}>
        <div id="loader-bar-fill" className="h-full" style={{ width: 0, background: "var(--color-gold)" }} />
      </div>
    </div>
  );
}
