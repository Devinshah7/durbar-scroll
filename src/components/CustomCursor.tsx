import { useEffect } from "react";
import { gsap } from "gsap";

/** Site-wide custom cursor with diya flame ember trail. */
export function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = document.querySelector<HTMLDivElement>(".cursor-dot");
    const ring = document.querySelector<HTMLDivElement>(".cursor-ring");
    if (!dot || !ring) return;

    // Create trail embers
    const TRAIL_COUNT = 5;
    const trails: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const t = document.createElement("div");
      t.className = "cursor-trail";
      t.style.cssText = `
        position: fixed;
        width: ${4 - i * 0.5}px;
        height: ${4 - i * 0.5}px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--color-gold-bright), var(--color-gold));
        pointer-events: none;
        z-index: 99997;
        opacity: 0;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 4px var(--color-gold-bright);
        transition: opacity 0.15s;
      `;
      document.body.appendChild(t);
      trails.push(t);
    }

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.18, ease: "power2.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.18, ease: "power2.out" });

    const positions: { x: number; y: number }[] = [];

    const onMove = (e: MouseEvent) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);

      // Trail history
      positions.unshift({ x: e.clientX, y: e.clientY });
      if (positions.length > 20) positions.length = 20;
    };

    // Animate trails
    let raf: number;
    function animateTrails() {
      trails.forEach((t, i) => {
        const idx = (i + 1) * 3;
        const pos = positions[idx];
        if (pos) {
          t.style.left = pos.x + "px";
          t.style.top = pos.y + "px";
          t.style.opacity = String(0.5 - i * 0.1);
        }
      });
      raf = requestAnimationFrame(animateTrails);
    }
    animateTrails();

    const onEnter = () => {
      gsap.to(ring, {
        width: 64,
        height: 64,
        borderColor: "rgba(200,150,12,1)",
        backgroundColor: "rgba(200,150,12,0.08)",
        duration: 0.3,
      });
    };
    const onLeave = () => {
      gsap.to(ring, {
        width: 36,
        height: 36,
        borderColor: "rgba(200,150,12,0.6)",
        backgroundColor: "rgba(200,150,12,0)",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", onMove);

    const observer = new MutationObserver(() => attach());
    function attach() {
      document
        .querySelectorAll<HTMLElement>("a, button, [data-hover], input, textarea, select, [role='button']")
        .forEach((el) => {
          if ((el as any)._cursorBound) return;
          (el as any)._cursorBound = true;
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    }
    attach();
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      trails.forEach((t) => t.remove());
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" />
      <div className="cursor-dot" />
    </>
  );
}
