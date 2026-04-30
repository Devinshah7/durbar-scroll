import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Diyas } from "@/lib/diyas";
import { SplitWords, FadeUp } from "@/lib/reveal";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll<SVGPathElement | SVGCircleElement>("path, circle"));
    paths.forEach((p) => {
      const len = (p as any).getTotalLength?.() ?? 0;
      if (len) {
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      }
    });

    const trig = ScrollTrigger.create({
      trigger: "#philosophy",
      start: "top 90%",
      end: "top 20%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        paths.forEach((p) => {
          const len = (p as any).getTotalLength?.() ?? 0;
          if (len) p.style.strokeDashoffset = `${len * (1 - progress)}`;
        });
      },
    });
    return () => trig.kill();
  }, []);

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden py-28 md:py-40"
      style={{ background: "var(--color-burgundy-dark)" }}
    >
      <Diyas count={10} />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-[45%_1fr] md:gap-20 md:px-10">
        {/* Rangoli */}
        <div className="relative flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 400 400"
            className="h-[320px] w-[320px] md:h-[460px] md:w-[460px]"
            style={{ color: "var(--color-gold)" }}
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <circle cx="200" cy="200" r="180" />
              <circle cx="200" cy="200" r="140" />
              <circle cx="200" cy="200" r="100" />
              <circle cx="200" cy="200" r="60" />
              <circle cx="200" cy="200" r="20" />
              {/* 8 lotus petals */}
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i * 360) / 8;
                return (
                  <path
                    key={i}
                    d="M200 60 C 175 110, 175 150, 200 200 C 225 150, 225 110, 200 60 Z"
                    transform={`rotate(${a} 200 200)`}
                  />
                );
              })}
              {/* outer dots ring */}
              {Array.from({ length: 24 }).map((_, i) => {
                const a = (i * 360) / 24;
                const rad = (a * Math.PI) / 180;
                const x = 200 + Math.cos(rad) * 195;
                const y = 200 + Math.sin(rad) * 195;
                return <circle key={`d${i}`} cx={x} cy={y} r="2.5" />;
              })}
              {/* diamond cross */}
              <path d="M200 20 L 380 200 L 200 380 L 20 200 Z" />
              <path d="M200 80 L 320 200 L 200 320 L 80 200 Z" />
            </g>
          </svg>
        </div>

        {/* Text */}
        <div id="philosophy-text">
          <div className="eyebrow mb-5">Our Belief</div>
          <SplitWords
            as="h2"
            text="An event is never just a gathering."
            className="font-display italic"
            wordClassName=""
            // styles
          />
          <div className="my-8 gold-rule">
            <span className="text-base">❖</span>
          </div>
          <FadeUp>
            <p
              className="text-base leading-[1.85] md:text-[18px]"
              style={{ color: "rgba(253,246,227,0.78)" }}
            >
              It is a journey. Of warmth, of elegance, of meaning. Rooted in India's timeless
              ethos of <em style={{ color: "var(--color-gold-pale)" }}>Atithi Devo Bhava</em> —
              where every guest is not a client, but an honoured guest.
            </p>
          </FadeUp>
          <div className="my-10 gold-rule">
            <span className="text-base">◆</span>
          </div>
          <FadeUp delay={0.1}>
            <p
              className="text-base leading-[1.85] md:text-[18px]"
              style={{ color: "rgba(253,246,227,0.78)" }}
            >
              At The Majestic Bharat, we design experiences that are strategically aligned with
              business objectives, operationally seamless, emotionally engaging, and culturally
              rooted.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-12 flex items-baseline gap-5">
              <span
                className="font-display"
                style={{ color: "var(--color-gold)", fontSize: "92px", lineHeight: 0.9 }}
              >
                10
              </span>
              <span
                className="text-[12px] uppercase tracking-[0.25em]"
                style={{ color: "rgba(253,246,227,0.6)" }}
              >
                Years of redefining Indian
                <br />
                experiential excellence
              </span>
            </div>
          </FadeUp>
        </div>
      </div>

      <style>{`
        #philosophy-text h2 {
          font-size: clamp(36px, 5vw, 68px);
          color: var(--color-ivory);
          line-height: 1.05;
        }
      `}</style>
    </section>
  );
}
