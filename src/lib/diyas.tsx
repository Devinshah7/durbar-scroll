import { useMemo } from "react";

interface DiyasProps {
  count?: number;
}

/** Floating gold flame dots scattered across a dark section. */
export function Diyas({ count = 8 }: DiyasProps) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        // Deterministic pseudo-random so SSR + client match
        const seed = (i * 9301 + 49297) % 233280;
        const r1 = seed / 233280;
        const r2 = ((seed * 1.7) % 233280) / 233280;
        const r3 = ((seed * 2.3) % 233280) / 233280;
        return {
          top: `${(r1 * 90 + 5).toFixed(2)}%`,
          left: `${(r2 * 90 + 5).toFixed(2)}%`,
          delay: `${(r3 * 3).toFixed(2)}s`,
          size: 4 + Math.round(r3 * 3),
        };
      }),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="diya"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
}
