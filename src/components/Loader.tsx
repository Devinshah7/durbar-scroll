import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    tl.fromTo("#loader-logo", { scale: 2.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo("#loader-tagline", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to({}, { duration: 1.5 })
      .to(el, { opacity: 0, duration: 0.8, ease: "power2.inOut" });

    return () => { tl.kill(); document.body.style.overflow = ""; };
  }, []);

  if (done) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[10000] flex flex-col items-center justify-center" style={{ backgroundColor: "#000" }}>
      <div id="loader-logo" className="flex flex-col items-center" style={{ opacity: 0 }}>
        <div className="font-display mb-2 text-6xl font-bold italic md:text-7xl" style={{ color: "var(--color-gold)" }}>M°</div>
        <div className="font-display text-2xl tracking-[0.35em] md:text-3xl" style={{ color: "var(--color-gold-pale)" }}>THE MAJESTIC BHARAT</div>
      </div>
      <div id="loader-tagline" className="absolute text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--color-gold)", opacity: 0, top: "60%" }}>
        Where Every Experience is a Sacred Journey
      </div>
    </div>
  );
}
