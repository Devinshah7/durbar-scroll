import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Cinematic Globe → India → Logo loader.
 * Phase 1: Globe appears (0–1s)
 * Phase 2: Slowdown, India centers (1–2.5s)
 * Phase 3: Zoom into India (2.5–4s)
 * Phase 4: Logo reveals (4–5.5s)
 */

// Simplified India SVG path (subcontinent outline)
const INDIA_PATH =
  "M62,18 L66,22 L70,20 L74,24 L72,30 L76,34 L74,40 L78,46 L76,52 L72,56 L68,62 L64,68 L60,74 L56,78 L52,76 L50,72 L48,68 L44,64 L42,58 L40,52 L38,46 L42,40 L44,34 L48,28 L52,22 L56,18 Z";

// Continent outlines (very simplified shapes for the globe)
const CONTINENTS = [
  // North America
  "M20,25 L28,22 L36,24 L38,30 L34,38 L28,42 L22,38 L18,32 Z",
  // South America
  "M30,52 L34,48 L38,50 L40,58 L38,66 L34,72 L30,68 L28,60 Z",
  // Europe
  "M52,22 L58,20 L62,22 L60,28 L56,30 L52,26 Z",
  // Africa
  "M52,34 L58,32 L62,36 L64,44 L62,54 L58,60 L54,56 L52,48 L50,40 Z",
  // India/Asia
  "M62,18 L70,16 L80,18 L86,24 L88,32 L86,40 L82,48 L76,52 L72,56 L68,62 L64,68 L60,74 L56,78 L52,76 L50,72 L48,68 L44,64 L42,58 L40,52 L42,46 L46,40 L50,34 L54,28 L58,22 Z",
  // Australia
  "M82,58 L90,56 L96,60 L94,66 L88,68 L82,64 Z",
];

export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Lock scroll
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    // Phase 1 — Globe appears (0–1s)
    tl.fromTo(
      "#globe-container",
      { scale: 0, opacity: 0 },
      { scale: 1.2, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" },
    )
      .to("#globe-container", { scale: 1, duration: 0.4, ease: "power2.out" })
      // Start spinning fast
      .to(
        "#globe-sphere",
        { rotationY: 1080, duration: 0.01, ease: "none" },
        0,
      )

      // Phase 2 — Slowdown (1s–2.5s)
      .to("#globe-sphere", {
        rotationY: 1800,
        duration: 1.5,
        ease: "power4.out",
      })
      // Settle bounce
      .to("#globe-sphere", { rotationY: "+=8", duration: 0.15, ease: "power2.out" })
      .to("#globe-sphere", { rotationY: "-=8", duration: 0.2, ease: "power2.inOut" })
      // India glows
      .to("#india-highlight", { opacity: 1, duration: 0.4 }, "-=0.6")
      .to("#india-pulse", { opacity: 0.6, scale: 1.3, duration: 0.5, repeat: 1, yoyo: true }, "-=0.4")

      // Phase 3 — Zoom into India (2.5s–4s)
      .to("#globe-container", {
        scale: 8,
        duration: 1.5,
        ease: "power2.in",
      })
      .to("#loader-bg", {
        backgroundColor: "#1a0a0a",
        duration: 1.2,
      }, "-=1.3")
      // Mandala burst from India
      .fromTo(
        "#zoom-mandala",
        { scale: 0, opacity: 0, rotation: 0 },
        { scale: 2, opacity: 0.6, rotation: 90, duration: 0.8, ease: "power3.out" },
        "-=0.8",
      )
      .to("#zoom-mandala", { opacity: 0, duration: 0.4 })
      .to("#globe-container", { opacity: 0, duration: 0.5 }, "-=0.6")

      // Phase 4 — Logo reveals (4s–5.5s)
      .fromTo(
        ".loader-spark",
        { opacity: 0, y: 0 },
        {
          opacity: (i: number) => 0.3 + Math.random() * 0.7,
          y: (i: number) => -(40 + Math.random() * 80),
          x: (i: number) => (Math.random() - 0.5) * 120,
          duration: 1.2,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.3",
      )
      .to(".loader-spark", { opacity: 0, duration: 0.5 }, "-=0.4")
      .fromTo(
        "#loader-logo",
        { scale: 2.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.8",
      )
      .fromTo(
        "#loader-tagline",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3",
      )
      // Hold
      .to({}, { duration: 0.8 })
      // Fade out
      .to(el, { opacity: 0, duration: 0.8, ease: "power2.inOut" });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={ref}
      id="loader-bg"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Globe */}
      <div
        id="globe-container"
        className="relative"
        style={{ width: 280, height: 280, perspective: "800px" }}
      >
        <div
          id="globe-sphere"
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* Globe base sphere */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #1e3a5f 0%, #0a1628 50%, #050d18 100%)",
              boxShadow:
                "0 0 60px rgba(200,150,12,0.15), 0 0 120px rgba(200,150,12,0.08), inset -30px -30px 60px rgba(0,0,0,0.6), inset 20px 20px 40px rgba(30,58,95,0.3)",
            }}
          />

          {/* Latitude lines */}
          {[20, 35, 50, 65, 80].map((top) => (
            <div
              key={`lat-${top}`}
              className="absolute left-[10%] right-[10%] border-t"
              style={{
                top: `${top}%`,
                borderColor: "rgba(200,150,12,0.15)",
                transform: `scaleX(${1 - Math.abs(top - 50) / 60})`,
              }}
            />
          ))}

          {/* Longitude lines (simulated with arcs) */}
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <div
              key={`lon-${deg}`}
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: "rgba(200,150,12,0.1)",
                transform: `rotateY(${deg}deg)`,
                transformStyle: "preserve-3d",
              }}
            />
          ))}

          {/* Continent outlines SVG */}
          <svg
            viewBox="0 0 100 80"
            className="absolute inset-[15%] h-[70%] w-[70%]"
            style={{ opacity: 0.5 }}
          >
            {CONTINENTS.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="0.8"
                opacity={i === 4 ? 0.9 : 0.4}
              />
            ))}
          </svg>

          {/* India highlight */}
          <svg
            id="india-highlight"
            viewBox="0 0 100 80"
            className="absolute inset-[15%] h-[70%] w-[70%]"
            style={{ opacity: 0 }}
          >
            <path
              d={INDIA_PATH}
              fill="rgba(200,150,12,0.3)"
              stroke="var(--color-gold-bright)"
              strokeWidth="1.2"
            />
          </svg>

          {/* India pulse ring */}
          <div
            id="india-pulse"
            className="absolute rounded-full"
            style={{
              width: 40,
              height: 40,
              top: "38%",
              left: "55%",
              transform: "translate(-50%,-50%)",
              border: "2px solid var(--color-gold)",
              opacity: 0,
              boxShadow: "0 0 20px var(--color-gold-bright)",
            }}
          />

          {/* Rim light */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 75% 25%, rgba(255,255,255,0.12) 0%, transparent 50%)",
              boxShadow:
                "inset -2px -2px 20px rgba(255,255,255,0.05), 0 0 40px rgba(255,255,255,0.06)",
            }}
          />
        </div>
      </div>

      {/* Zoom mandala (brief bloom during zoom) */}
      <svg
        id="zoom-mandala"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute h-40 w-40"
        style={{ color: "var(--color-gold)", opacity: 0 }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.6">
          <circle cx="100" cy="100" r="90" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="30" />
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d="M100 15 C 85 45, 85 70, 100 95 C 115 70, 115 45, 100 15 Z"
              transform={`rotate(${i * 45} 100 100)`}
            />
          ))}
        </g>
      </svg>

      {/* Diya sparks */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="loader-spark absolute rounded-full"
            style={{
              width: 3 + Math.random() * 4,
              height: 3 + Math.random() * 4,
              background: `radial-gradient(circle, var(--color-gold-bright), var(--color-gold))`,
              boxShadow: "0 0 6px var(--color-gold-bright)",
              left: `${45 + Math.random() * 10}%`,
              top: `${48 + Math.random() * 4}%`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div
        id="loader-logo"
        className="absolute flex flex-col items-center"
        style={{ opacity: 0 }}
      >
        {/* M° mark */}
        <div
          className="font-display mb-2 text-6xl font-bold italic md:text-7xl"
          style={{ color: "var(--color-gold)" }}
        >
          M°
        </div>
        <div
          className="font-display text-2xl tracking-[0.35em] md:text-3xl"
          style={{ color: "var(--color-gold-pale)" }}
        >
          THE MAJESTIC BHARAT
        </div>
      </div>

      <div
        id="loader-tagline"
        className="absolute text-[10px] uppercase tracking-[0.4em]"
        style={{
          color: "var(--color-gold)",
          opacity: 0,
          top: "60%",
        }}
      >
        Where Every Experience is a Sacred Journey
      </div>
    </div>
  );
}
