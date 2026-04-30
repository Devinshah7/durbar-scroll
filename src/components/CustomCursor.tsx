import { useEffect } from "react";
import { gsap } from "gsap";

/** Site-wide custom cursor: gold dot follows instantly, ring lags. */
export function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = document.querySelector<HTMLDivElement>(".cursor-dot");
    const ring = document.querySelector<HTMLDivElement>(".cursor-ring");
    if (!dot || !ring) return;

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.18, ease: "power2.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.18, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);
    };

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
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" />
      <div className="cursor-dot" />
    </>
  );
}
