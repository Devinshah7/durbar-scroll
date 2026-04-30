import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
    }
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);
  return null;
}
