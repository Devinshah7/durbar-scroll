import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface PillarData {
  num: string;
  label: string;
  title: string;
  desc: string;
  bullets: string[];
}

const PILLARS_DATA: PillarData[] = [
  {
    num: "01",
    label: "EVENTS",
    title: "Corporate Events & Live Experiences",
    desc: "From boardroom conclaves to packed arenas — events that move people.",
    bullets: ["Corporate Conclaves", "Product Launches", "Celebrity Concerts"],
  },
  {
    num: "02",
    label: "SPORTS",
    title: "Sports Management & Activations",
    desc: "Powering sporting spectacles with precision and cultural flair.",
    bullets: ["Sports Events", "Athlete Management", "Brand Activations"],
  },
  {
    num: "03",
    label: "TOURISM",
    title: "MICE & Experiential Travel",
    desc: "Journeys that balance business with discovery — immersive and enriching.",
    bullets: ["MICE Travel", "Incentive Tours", "Heritage Journeys"],
  },
  {
    num: "04",
    label: "CULTURE",
    title: "Culture Embedded, Not Decorated",
    desc: "Culture built into the architecture of every experience.",
    bullets: ["Cultural Curation", "Artistry Workshops", "Exhibitions"],
  },
];

export function Pillars() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const totalProgress = 5; // total scroll units

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * totalProgress}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      });

      // Create a timeline driven by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${window.innerHeight * totalProgress}`,
          scrub: 1.2,
        },
      });

      // Build pillars one by one
      PILLARS_DATA.forEach((_, i) => {
        const delay = i * 0.15;

        // Rise pillar
        tl.fromTo(
          `#temple-pillar-${i}`,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.2, ease: "power3.out" },
          delay,
        );

        // Dust burst
        tl.fromTo(
          `#dust-${i} .dust-particle`,
          { opacity: 0.8, y: 0, x: 0, scale: 1 },
          {
            opacity: 0,
            y: 30,
            x: "random(-40, 40)",
            scale: 0,
            duration: 0.1,
            stagger: 0.008,
          },
          delay + 0.18,
        );

        // Etch label via stroke-dashoffset
        tl.fromTo(
          `#pillar-label-${i}`,
          { strokeDashoffset: 300 },
          { strokeDashoffset: 0, duration: 0.12, ease: "none" },
          delay + 0.15,
        );

        // Fade in description
        tl.fromTo(
          `#pillar-desc-${i}`,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.08 },
          delay + 0.22,
        );
      });

      // Roof appears after all pillars
      tl.fromTo(
        "#temple-roof",
        { scaleX: 0, opacity: 0, rotateX: -5 },
        { scaleX: 1, opacity: 1, rotateX: 0, duration: 0.15, ease: "elastic.out(1, 0.5)" },
        0.85,
      );

      // Diya flame at apex
      tl.fromTo(
        "#roof-diya",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.08, ease: "back.out(2)" },
        0.95,
      );

      // Light intensifies
      tl.to("#temple-light-rays", { opacity: 0.25, duration: 0.1 }, 0.95);

      // Title appears
      tl.fromTo(
        "#temple-title",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.97,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pillars"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0d1033 0%, #1a1a42 30%, #3d1a1a 70%, #8b5a2b 90%, #c8a97e 100%)",
      }}
    >
      {/* Light rays from above */}
      <div
        id="temple-light-rays"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.08,
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 30%, rgba(200,150,12,0.3) 35%, transparent 40%, transparent 45%, rgba(200,150,12,0.2) 48%, transparent 52%, transparent 60%, rgba(200,150,12,0.25) 63%, transparent 67%, transparent 100%)",
        }}
      />

      {/* Sanskrit border top */}
      <div
        className="absolute top-0 left-0 right-0 h-6 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0px, transparent 20px, var(--color-gold) 20px, var(--color-gold) 21px, transparent 21px, transparent 30px, var(--color-gold) 30px, var(--color-gold) 34px, transparent 34px, transparent 40px)",
          backgroundSize: "60px 100%",
        }}
      />

      {/* Title */}
      <div id="temple-title" className="absolute top-8 left-0 right-0 z-10 text-center" style={{ opacity: 0 }}>
        <h2
          className="font-display text-3xl tracking-[0.3em] md:text-5xl"
          style={{ color: "var(--color-gold)", fontWeight: 600 }}
        >
          THE TEMPLE OF EXCELLENCE
        </h2>
        <p
          className="mt-3 text-[11px] uppercase tracking-[0.35em]"
          style={{ color: "var(--color-gold-pale)" }}
        >
          Four sacred pillars upon which every Majestic experience is built
        </p>
      </div>

      {/* Temple scene */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
        {/* Roof / Gopuram */}
        <div
          id="temple-roof"
          className="relative z-10 mb-0 flex flex-col items-center"
          style={{
            transformOrigin: "center bottom",
            transform: "scaleX(0)",
            perspective: "600px",
          }}
        >
          {/* Triangular pediment */}
          <div
            className="relative"
            style={{
              width: 0,
              height: 0,
              borderLeft: "120px solid transparent",
              borderRight: "120px solid transparent",
              borderBottom: "70px solid #8b6914",
              filter: "drop-shadow(0 -4px 20px rgba(200,150,12,0.3))",
            }}
          />
          {/* Diya at apex */}
          <svg
            id="roof-diya"
            viewBox="0 0 30 40"
            className="absolute -top-10 h-10 w-8"
            style={{ opacity: 0 }}
          >
            <ellipse cx="15" cy="30" rx="8" ry="4" fill="#c8960c" />
            <path
              d="M15 5 C 10 15, 10 22, 15 28 C 20 22, 20 15, 15 5 Z"
              fill="url(#flame-grad)"
            />
            <defs>
              <linearGradient id="flame-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff8e0" />
                <stop offset="40%" stopColor="#f0c040" />
                <stop offset="100%" stopColor="#ff8c00" />
              </linearGradient>
            </defs>
          </svg>
          {/* Horizontal lintel */}
          <div
            className="w-full"
            style={{
              height: 16,
              background:
                "linear-gradient(180deg, #a07830 0%, #8b6914 50%, #6b4500 100%)",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.5), inset 0 2px 4px rgba(200,150,12,0.3)",
              width: "min(90vw, 900px)",
            }}
          />
        </div>

        {/* Pillars container */}
        <div
          className="relative flex items-end justify-center gap-6 md:gap-12 lg:gap-20"
          style={{ width: "min(90vw, 900px)" }}
        >
          {PILLARS_DATA.map((p, i) => (
            <div key={i} className="group relative flex flex-col items-center">
              {/* Tooltip on hover */}
              <div
                className="pointer-events-none absolute -top-32 z-20 w-48 rounded-sm border px-4 py-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "rgba(26,10,10,0.95)",
                  borderColor: "var(--color-gold)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="mb-1 text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--color-gold)" }}>
                  {p.title}
                </div>
                {p.bullets.map((b) => (
                  <div key={b} className="text-[9px] leading-4" style={{ color: "var(--color-gold-pale)" }}>
                    ◆ {b}
                  </div>
                ))}
              </div>

              {/* The pillar */}
              <div
                id={`temple-pillar-${i}`}
                className="relative transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(200,150,12,0.4)]"
                style={{
                  transformOrigin: "bottom center",
                  transform: "scaleY(0)",
                }}
              >
                {/* Capital — lotus cap */}
                <div className="relative mx-auto" style={{ width: 70, height: 28 }}>
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      width: 70,
                      height: 24,
                      background:
                        "linear-gradient(180deg, #c8a97e 0%, #a07830 40%, #8b6914 100%)",
                      borderRadius: "50% 50% 4px 4px",
                      boxShadow:
                        "0 -2px 10px rgba(200,150,12,0.3), inset 0 4px 8px rgba(255,240,200,0.15)",
                    }}
                  />
                  {/* Lotus motif SVG */}
                  <svg
                    viewBox="0 0 50 20"
                    className="absolute bottom-1 left-1/2 h-4 w-10 -translate-x-1/2"
                    style={{ color: "var(--color-gold)" }}
                  >
                    {[0, 1, 2, 3, 4].map((j) => (
                      <ellipse
                        key={j}
                        cx={10 + j * 7.5}
                        cy="14"
                        rx="5"
                        ry="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.6"
                        opacity="0.6"
                      />
                    ))}
                  </svg>
                </div>

                {/* Shaft */}
                <div
                  className="group relative mx-auto overflow-hidden"
                  style={{
                    width: 50,
                    height: "min(35vh, 220px)",
                    background:
                      "repeating-linear-gradient(90deg, #b8956a 0px, #a07830 3px, #c8a97e 6px, #a07830 9px, #b8956a 12px)",
                    boxShadow:
                      "inset 3px 0 8px rgba(0,0,0,0.3), inset -3px 0 8px rgba(0,0,0,0.3), 4px 0 12px rgba(0,0,0,0.4), -4px 0 12px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Shimmer effect on hover */}
                  <div
                    className="absolute inset-0 -translate-y-full opacity-0 transition-all duration-700 group-hover:translate-y-full group-hover:opacity-30"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(255,240,200,0.5) 50%, transparent 100%)",
                    }}
                  />

                  {/* Etched label */}
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 50 220"
                    style={{ overflow: "visible" }}
                  >
                    <text
                      id={`pillar-label-${i}`}
                      x="25"
                      y="110"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="none"
                      stroke="var(--color-gold)"
                      strokeWidth="0.8"
                      fontSize="14"
                      fontFamily="var(--font-serif)"
                      letterSpacing="3"
                      transform="rotate(-90 25 110)"
                      strokeDasharray="300"
                      strokeDashoffset="300"
                    >
                      {p.label}
                    </text>
                  </svg>
                </div>

                {/* Base — tiered plinth */}
                <div className="flex flex-col items-center">
                  <div
                    style={{
                      width: 58,
                      height: 10,
                      background:
                        "linear-gradient(180deg, #8b6914 0%, #6b4500 100%)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                    }}
                  />
                  <div
                    style={{
                      width: 66,
                      height: 10,
                      background:
                        "linear-gradient(180deg, #6b4500 0%, #4a3000 100%)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
                    }}
                  />
                </div>
              </div>

              {/* Dust particles */}
              <div id={`dust-${i}`} className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2">
                {Array.from({ length: 12 }).map((_, j) => (
                  <div
                    key={j}
                    className="dust-particle absolute rounded-full"
                    style={{
                      width: 2 + Math.random() * 3,
                      height: 2 + Math.random() * 3,
                      background: "#c8a97e",
                      opacity: 0,
                      left: (Math.random() - 0.5) * 30,
                      top: 0,
                    }}
                  />
                ))}
              </div>

              {/* Description below */}
              <div
                id={`pillar-desc-${i}`}
                className="mt-3 text-center"
                style={{ opacity: 0, maxWidth: 140 }}
              >
                <div
                  className="font-display text-sm font-semibold md:text-base"
                  style={{ color: "var(--color-gold)" }}
                >
                  {p.title}
                </div>
                <div
                  className="mt-1 text-[9px] leading-3 md:text-[10px] md:leading-4"
                  style={{ color: "var(--color-gold-pale)" }}
                >
                  {p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stone floor */}
        <div
          className="w-full"
          style={{
            height: 60,
            background:
              "repeating-linear-gradient(180deg, #c8a97e 0px, #b8956a 2px, #c8a97e 4px)",
            boxShadow: "inset 0 4px 20px rgba(0,0,0,0.4), 0 -2px 30px rgba(0,0,0,0.3)",
          }}
        />

        {/* Sanskrit border bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-4 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0px, transparent 20px, var(--color-gold) 20px, var(--color-gold) 21px, transparent 21px, transparent 30px, var(--color-gold) 30px, var(--color-gold) 34px, transparent 34px, transparent 40px)",
            backgroundSize: "60px 100%",
          }}
        />
      </div>
    </section>
  );
}
