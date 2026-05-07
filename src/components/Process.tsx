import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Deeply Understand the Brief.",
    body:
      "Before a single idea is proposed, we sit with you. We learn your objectives, your audience, your constraints, your ambitions. The brief is sacred. We honour it.",
  },
  {
    n: "02",
    title: "Shape the Concept.",
    body:
      "Every event begins as a story. We craft a bespoke narrative concept — one that is aligned with your brand, resonant with your audience, and executable without compromise.",
  },
  {
    n: "03",
    title: "Validate Together.",
    body:
      "Nothing moves forward without your complete sign-off. We present, refine, and only proceed when you are certain. Your vision is the brief. We execute it.",
  },
  {
    n: "04",
    title: "Execute. Flawlessly.",
    body:
      "On the day, we are invisible. The experience is everything. Backed by a pan-India vendor network and a decade of operational discipline — we deliver on time, on brief, on budget. Every time.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);
  const numRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: () => `+=${root.offsetHeight - window.innerHeight}`,
          pin: ".process-left",
          pinSpacing: false,
        });
      }

      // Line grow
      gsap.fromTo(
        lineRef.current,
        { height: 0 },
        {
          height: "60%",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        },
      );

      const stepEls = root.querySelectorAll<HTMLElement>(".process-step");
      stepEls.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setStep(i + 1),
          onEnterBack: () => setStep(i + 1),
        });
        gsap.from(el.querySelectorAll(".reveal"), {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Animate big number on change
  useEffect(() => {
    if (!numRef.current) return;
    gsap.fromTo(
      numRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [step]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ background: "linear-gradient(180deg, var(--section-warm-dark) 0%, var(--section-maroon) 40%, var(--section-maroon) 100%)" }}
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 py-24 md:grid-cols-[40%_1fr] md:gap-16 md:px-10 md:py-0">
        {/* LEFT — pinned */}
        <div className="process-left flex h-screen flex-col justify-center md:sticky md:top-0">
          <div
            ref={numRef}
            className="font-display"
            style={{
              color: "var(--color-gold)",
              opacity: 0.25,
              fontSize: "clamp(180px, 22vw, 300px)",
              lineHeight: 0.85,
              fontWeight: 700,
            }}
          >
            {String(step).padStart(2, "0")}
          </div>
          <div
            ref={lineRef}
            className="mt-4 w-px"
            style={{ background: "var(--color-gold)", height: 0 }}
          />
          <div
            className="mt-6 text-[11px] uppercase tracking-[0.35em]"
            style={{ color: "var(--color-burgundy)" }}
          >
            The Process
          </div>
        </div>

        {/* RIGHT — scrolls */}
        <div className="md:py-[35vh]">
          {STEPS.map((s) => (
            <div key={s.n} className="process-step mb-28 md:mb-40">
              <div className="reveal eyebrow mb-4" style={{ color: "var(--color-burgundy)" }}>
                Step {s.n}
              </div>
              <h3
                className="reveal font-serif-display"
                style={{ color: "var(--color-ink)", fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.1 }}
              >
                {s.title}
              </h3>
              <div
                className="reveal mt-6 h-px w-16"
                style={{ background: "var(--color-gold)" }}
              />
              <p
                className="reveal mt-6 max-w-xl text-[16px] leading-[1.85] md:text-[17px]"
                style={{ color: "rgba(13,11,8,0.65)" }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
