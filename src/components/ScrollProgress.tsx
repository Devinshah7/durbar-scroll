import { useEffect, useState } from "react";

/** Thin gold scroll-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] bg-transparent">
      <div
        className="h-full bg-gold transition-[width] duration-100"
        style={{ width: `${pct}%`, background: "var(--color-gold)" }}
      />
    </div>
  );
}
