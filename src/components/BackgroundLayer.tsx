import { useMemo } from "react";
import logoSrc from "@/assets/brand/majestic-bharat-logo.png";

/**
 * Site-wide ambient background:
 *  - deep maroon → ink radial gradient base
 *  - tiled jaali lattice + paisley/mandala motifs in faint gold
 *  - drifting starfield of gold particles
 *  - very faint centered logo watermark
 *
 * Pure presentational, fixed, behind everything (z = -1, pointer-events none).
 * Generic + reusable — no page-specific logic.
 */
export function BackgroundLayer() {
  const stars = useMemo(
    () =>
      Array.from({ length: 42 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 18,
        duration: 14 + Math.random() * 18,
        opacity: 0.25 + Math.random() * 0.45,
      })),
    [],
  );

  // Jaali lattice (repeating SVG, low opacity)
  const jaali =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>
  <g fill='none' stroke='#D4AF37' stroke-width='0.6' opacity='0.5'>
    <path d='M0 60 Q30 30 60 60 T120 60' />
    <path d='M60 0 Q30 30 60 60 T60 120' />
    <circle cx='60' cy='60' r='10' />
    <circle cx='60' cy='60' r='20' />
    <path d='M50 60 Q60 50 70 60 Q60 70 50 60Z' />
    <path d='M0 0 L20 20 M120 0 L100 20 M0 120 L20 100 M120 120 L100 100' />
  </g>
</svg>`);

  // Mandala motif (centered large, very faint)
  const mandala =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
  <g fill='none' stroke='#D4AF37' stroke-width='0.8' opacity='0.6'>
    <circle cx='200' cy='200' r='60'/>
    <circle cx='200' cy='200' r='100'/>
    <circle cx='200' cy='200' r='150'/>
    <circle cx='200' cy='200' r='190'/>
    ${Array.from({ length: 16 })
      .map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const x1 = 200 + Math.cos(a) * 60;
        const y1 = 200 + Math.sin(a) * 60;
        const x2 = 200 + Math.cos(a) * 190;
        const y2 = 200 + Math.sin(a) * 190;
        return `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}'/>`;
      })
      .join("")}
    ${Array.from({ length: 12 })
      .map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const cx = 200 + Math.cos(a) * 125;
        const cy = 200 + Math.sin(a) * 125;
        return `<path d='M${cx} ${cy - 14} Q${cx + 10} ${cy} ${cx} ${cy + 14} Q${cx - 10} ${cy} ${cx} ${cy - 14}Z'/>`;
      })
      .join("")}
  </g>
</svg>`);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base radial maroon → ink */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #2A0A0E 0%, #170609 55%, #0B0608 100%)",
        }}
      />

      {/* Jaali lattice tile, very faint */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${jaali}")`,
          backgroundSize: "180px 180px",
          opacity: 0.08,
          mixBlendMode: "screen",
        }}
      />

      {/* Centered mandala */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(85vw, 1100px)",
          height: "min(85vw, 1100px)",
          backgroundImage: `url("${mandala}")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.09,
        }}
      />

      {/* Logo watermark */}
      <img
        src={logoSrc}
        alt=""
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(60vw, 720px)",
          height: "auto",
          opacity: 0.05,
          filter: "grayscale(0.2)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Drifting gold starfield */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: "#D4AF37",
            boxShadow: `0 0 ${4 + s.size * 2}px rgba(212,175,55,0.65)`,
            opacity: s.opacity,
            animation: `bg-drift ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}

      <style>{`
        @keyframes bg-drift {
          0%   { transform: translate(0, 0); opacity: var(--o, 0.4); }
          50%  { transform: translate(8px, -14px); opacity: 0.85; }
          100% { transform: translate(-6px, 10px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
