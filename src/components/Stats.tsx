import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: 500, label: "Events executed across India and abroad" },
  { num: 80, label: "Years of combined cross-industry expertise" },
  { num: 2000, label: "Events orchestrated by our founding team" },
  { num: 20, label: "Countries and cities reached" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
        const target = parseInt(el.dataset.target || "0", 10);
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2.2,
              ease: "power2.out",
              onUpdate() {
                el.textContent = `${Math.round(obj.val)}+`;
              },
            });
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "var(--color-gold)" }}
    >
      {/* Torana ornament line */}
      <div className="mx-auto mb-16 flex max-w-[1100px] items-center px-6 md:px-10">
        <span className="h-px flex-1" style={{ background: "var(--color-ink)" }} />
        <svg viewBox="0 0 80 24" className="mx-3 h-5 w-20" style={{ color: "var(--color-ink)" }}>
          <path
            d="M2 22 L 8 22 L 12 14 L 16 22 L 20 22 L 24 8 L 28 22 L 36 22 L 40 4 L 44 22 L 52 22 L 56 8 L 60 22 L 64 22 L 68 14 L 72 22 L 78 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="h-px flex-1" style={{ background: "var(--color-ink)" }} />
      </div>

      <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-x-6 gap-y-14 px-6 md:grid-cols-4 md:px-10">
        {STATS.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <div
              className="stat-number font-display"
              data-target={s.num}
              style={{
                color: "var(--color-ink)",
                fontSize: "clamp(64px, 8vw, 120px)",
                lineHeight: 0.95,
                fontWeight: 600,
              }}
            >
              0+
            </div>
            <div
              className="mt-3 text-[12px] uppercase leading-[1.5] tracking-[0.18em]"
              style={{ color: "rgba(13,11,8,0.7)" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-[900px] px-6 text-center md:px-10">
        <p
          className="font-display italic"
          style={{ color: "var(--color-ink)", fontSize: "clamp(22px, 2.6vw, 36px)" }}
        >
          “A mad mix of Heart, Hustle, and Heritage.”
        </p>
        <div
          className="mt-3 text-[11px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(13,11,8,0.6)" }}
        >
          — The Majestic Bharat
        </div>
      </div>
    </section>
  );
}
