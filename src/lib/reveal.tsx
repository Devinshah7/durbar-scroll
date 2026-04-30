import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  start?: string;
  delay?: number;
}

/** Splits text into words and staggers them up on scroll-in. DIY SplitText replacement. */
export function SplitWords({
  text,
  className = "",
  wordClassName = "",
  as: Tag = "h2",
  start = "top 80%",
  delay = 0,
}: SplitWordsProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll<HTMLElement>(".reveal-word > span");
    const ctx = gsap.context(() => {
      gsap.to(inners, {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.07,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [text, start, delay]);

  const words = text.split(" ");
  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {words.map((w, i) => (
        <span key={i} className={`reveal-word ${wordClassName}`}>
          <span>{w}</span>
          {i < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </Tag>
  );
}

/** Simple fade-up reveal on scroll. */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  y = 30,
  start = "top 85%",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, start]);
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
