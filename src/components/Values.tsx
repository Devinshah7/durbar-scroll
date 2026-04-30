import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Diyas } from "@/lib/diyas";
import { SplitWords } from "@/lib/reveal";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    title: "Integrity & Excellence",
    body: "Delivering with quality, transparency, and class — always.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M14 24 C 10 22, 8 18, 10 14 C 12 10, 16 10, 20 14 C 24 10, 28 10, 30 14 C 32 18, 30 22, 26 24" />
        <path d="M12 24 L 20 32 L 28 24" />
      </svg>
    ),
  },
  {
    title: "Culture & Pride",
    body: "Rooted in Indian identity. Designed for global impact.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="20" cy="20" r="14" />
        <path d="M6 20 Q 20 8 34 20 Q 20 32 6 20" />
        <path d="M20 6 V 34" />
      </svg>
    ),
  },
  {
    title: "Partnership-Driven",
    body: "We grow with our clients, vendors, and communities.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="14" cy="20" r="9" />
        <circle cx="26" cy="20" r="9" />
      </svg>
    ),
  },
  {
    title: "Innovation with Impact",
    body: "Every event and journey is purpose-led and memorable.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M20 6 C 14 14, 14 20, 20 28 C 26 20, 26 14, 20 6 Z" />
        <ellipse cx="20" cy="34" rx="6" ry="2" />
      </svg>
    ),
  },
];

export function Values() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.set(".lotus-petal", { scale: 0.4, opacity: 0, transformOrigin: "50% 100%" });
      ScrollTrigger.create({
        trigger: root,
        start: "top 65%",
        once: true,
        onEnter: () => {
          gsap.to(".lotus-petal", {
            scale: 1,
            opacity: 1,
            stagger: 0.08,
            duration: 0.9,
            ease: "back.out(1.7)",
          });
          gsap.to(".lotus-center", {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 0.6,
            ease: "power2.out",
          });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "var(--color-burgundy)" }}
    >
      <Diyas count={10} />
      <div className="relative mx-auto max-w-[1300px] px-6 text-center md:px-10">
        <div className="eyebrow mb-5">Our Values</div>
        <SplitWords
          as="h2"
          text="The Lotus of TMB."
          className="font-display italic"
        />

        {/* Lotus SVG */}
        <div className="my-14 flex items-center justify-center">
          <svg
            viewBox="0 0 400 400"
            className="h-72 w-72 md:h-96 md:w-96"
            style={{ color: "var(--color-gold)" }}
          >
            <g>
              {Array.from({ length: 8 }).map((_, i) => (
                <path
                  key={i}
                  className="lotus-petal"
                  d="M200 200 C 180 130, 180 90, 200 50 C 220 90, 220 130, 200 200 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  transform={`rotate(${i * 45} 200 200)`}
                />
              ))}
              <circle
                className="lotus-center"
                cx="200"
                cy="200"
                r="14"
                fill="currentColor"
                style={{ transform: "scale(0)", transformOrigin: "200px 200px", opacity: 0 }}
              />
              <circle cx="200" cy="200" r="34" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
            </g>
          </svg>
        </div>

        {/* Value cards */}
        <div className="mt-4 grid grid-cols-1 gap-5 text-left md:grid-cols-2 md:gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="group flex items-start gap-5 p-7 transition-all duration-300"
              style={{
                background: "rgba(253,246,227,0.05)",
                border: "1px solid rgba(200,150,12,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,150,12,0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,150,12,0.25)";
              }}
            >
              <div
                className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ color: "var(--color-gold)" }}
              >
                {v.icon}
              </div>
              <div>
                <h3
                  className="font-serif-display"
                  style={{ color: "var(--color-gold-pale)", fontSize: "20px" }}
                >
                  {v.title}
                </h3>
                <p
                  className="mt-2 text-[14px] leading-[1.6]"
                  style={{ color: "rgba(253,246,227,0.7)" }}
                >
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        section h2 { font-size: clamp(40px, 5vw, 72px); color: var(--color-gold-pale); }
      `}</style>
    </section>
  );
}
