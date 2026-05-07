import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { gsap } from "gsap";

const GATES = [
  {
    title: "EVENTS",
    tagline: "Where Moments Become Memory",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=900&fit=crop",
    active: true,
    route: "/events" as const,
    theme: { glow: "rgba(200,50,80,0.5)", accent: "#e05888", motif: "events" as const },
  },
  {
    title: "CELEBRITY",
    tagline: "Where Stars Meet Soul",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=900&fit=crop",
    active: false,
    route: "/events" as const,
    theme: { glow: "rgba(40,180,180,0.5)", accent: "#38b2ac", motif: "celebrity" as const },
  },
  {
    title: "TOURISM",
    tagline: "Where India Reveals Herself",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=900&fit=crop",
    active: false,
    route: "/events" as const,
    theme: { glow: "rgba(220,160,40,0.5)", accent: "#d4a028", motif: "tourism" as const },
  },
];

/* Ornate Mughal/Jharokha arch SVG frame */
function ArchFrame({ motif, hovered }: { motif: "events" | "celebrity" | "tourism"; hovered: boolean }) {
  const accentMap = { events: "#e05888", celebrity: "#38b2ac", tourism: "#d4a028" };
  const accent = accentMap[motif];

  return (
    <svg
      viewBox="0 0 320 540"
      className="absolute inset-0 z-20 h-full w-full"
      style={{ filter: hovered ? `drop-shadow(0 0 20px ${accent}40)` : "none", transition: "filter 0.4s" }}
    >
      <defs>
        <linearGradient id={`pillar-${motif}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8a97e" />
          <stop offset="50%" stopColor="#8b6914" />
          <stop offset="100%" stopColor="#5c4209" />
        </linearGradient>
        <linearGradient id={`arch-${motif}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        {/* Cusped arch clip path - multifoil Mughal style */}
        <clipPath id={`cusped-${motif}`}>
          <path d="
            M 20 540 L 20 180
            Q 20 120 50 80
            Q 65 55 85 40
            Q 100 32 115 28
            Q 130 22 145 18
            Q 155 16 160 15
            Q 165 16 175 18
            Q 190 22 205 28
            Q 220 32 235 40
            Q 255 55 270 80
            Q 300 120 300 180
            L 300 540 Z
          " />
        </clipPath>
      </defs>

      {/* Left pillar */}
      <rect x="8" y="140" width="28" height="400" fill={`url(#pillar-${motif})`} rx="2" />
      <rect x="10" y="140" width="24" height="400" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4" rx="2" />
      {/* Left capital */}
      <rect x="4" y="130" width="36" height="16" fill={`url(#pillar-${motif})`} rx="3" />
      <path d="M8 134 Q22 126 36 134" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />

      {/* Right pillar */}
      <rect x="284" y="140" width="28" height="400" fill={`url(#pillar-${motif})`} rx="2" />
      <rect x="286" y="140" width="24" height="400" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4" rx="2" />
      {/* Right capital */}
      <rect x="280" y="130" width="36" height="16" fill={`url(#pillar-${motif})`} rx="3" />
      <path d="M284 134 Q298 126 312 134" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />

      {/* Outer arch border - cusped multifoil */}
      <path
        d="
          M 20 540 L 20 180
          Q 20 140 40 105
          C 55 75, 80 50, 110 35
          C 130 25, 145 20, 160 17
          C 175 20, 190 25, 210 35
          C 240 50, 265 75, 280 105
          Q 300 140 300 180
          L 300 540
        "
        fill="none"
        stroke="#d4af37"
        strokeWidth="2.5"
        opacity={hovered ? 1 : 0.7}
        style={{ transition: "opacity 0.4s" }}
      />

      {/* Cusped inner decorative arches (multifoil effect) */}
      <g opacity={hovered ? 0.6 : 0.3} style={{ transition: "opacity 0.4s" }}>
        {/* Small cusps along the arch */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const t = (i + 1) / 8;
          const cx = 20 + (300 - 20) * t;
          const cy = 180 - Math.sin(t * Math.PI) * 145;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy + 8} r="6" fill="none" stroke="#d4af37" strokeWidth="0.6" />
              <path
                d={`M${cx - 4} ${cy + 14} Q${cx} ${cy + 6} ${cx + 4} ${cy + 14}`}
                fill="none"
                stroke="#d4af37"
                strokeWidth="0.5"
              />
            </g>
          );
        })}
      </g>

      {/* Finials at top */}
      <g opacity={hovered ? 0.8 : 0.5} style={{ transition: "opacity 0.4s" }}>
        {/* Center finial (lotus bud) */}
        <path d="M156 12 Q160 2 164 12 Q160 8 156 12Z" fill="#d4af37" />
        <circle cx="160" cy="4" r="2.5" fill="#d4af37" />
        {/* Side finials */}
        <circle cx="80" cy="52" r="2" fill="#d4af37" opacity="0.6" />
        <circle cx="240" cy="52" r="2" fill="#d4af37" opacity="0.6" />
      </g>

      {/* Filigree patterns - lotus motifs in spandrels */}
      <g opacity={hovered ? 0.5 : 0.2} style={{ transition: "opacity 0.4s" }}>
        {/* Left spandrel lotus */}
        <path d="M35 160 Q50 145 65 160 Q50 155 35 160Z" fill="none" stroke="#d4af37" strokeWidth="0.5" />
        <path d="M35 180 Q50 165 65 180 Q50 175 35 180Z" fill="none" stroke="#d4af37" strokeWidth="0.5" />
        {/* Right spandrel lotus */}
        <path d="M255 160 Q270 145 285 160 Q270 155 255 160Z" fill="none" stroke="#d4af37" strokeWidth="0.5" />
        <path d="M255 180 Q270 165 285 180 Q270 175 255 180Z" fill="none" stroke="#d4af37" strokeWidth="0.5" />
      </g>

      {/* Theme-specific motifs */}
      {motif === "events" && (
        <g opacity={hovered ? 0.6 : 0.25} style={{ transition: "opacity 0.4s" }}>
          {/* Spotlight rays at top */}
          {[-20, -10, 0, 10, 20].map((deg) => (
            <line
              key={deg}
              x1="160" y1="30"
              x2={160 + Math.sin(deg * Math.PI / 180) * 60}
              y2={30 + Math.cos(deg * Math.PI / 180) * 40}
              stroke={accent}
              strokeWidth="0.4"
              opacity="0.5"
            />
          ))}
        </g>
      )}
      {motif === "celebrity" && (
        <g opacity={hovered ? 0.6 : 0.25} style={{ transition: "opacity 0.4s" }}>
          {/* Stars */}
          {[[60, 70], [260, 70], [160, 25]].map(([cx, cy], i) => (
            <polygon
              key={i}
              points={`${cx},${cy! - 5} ${cx! + 2},${cy! - 1} ${cx! + 5},${cy} ${cx! + 2},${cy! + 1} ${cx},${cy! + 5} ${cx! - 2},${cy! + 1} ${cx! - 5},${cy} ${cx! - 2},${cy! - 1}`}
              fill={accent}
              opacity="0.7"
            />
          ))}
        </g>
      )}
      {motif === "tourism" && (
        <g opacity={hovered ? 0.6 : 0.25} style={{ transition: "opacity 0.4s" }}>
          {/* Jaali pattern */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={30 + i * 8} y={160 + i * 12}
                width="8" height="8"
                fill="none" stroke="#d4af37" strokeWidth="0.3"
                transform={`rotate(45 ${34 + i * 8} ${164 + i * 12})`}
              />
              <rect
                x={278 - i * 8} y={160 + i * 12}
                width="8" height="8"
                fill="none" stroke="#d4af37" strokeWidth="0.3"
                transform={`rotate(45 ${282 - i * 8} ${164 + i * 12})`}
              />
            </g>
          ))}
        </g>
      )}

      {/* Inner shadow edges for recess depth */}
      <rect x="36" y="146" width="248" height="394" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="4" rx="2" clipPath={`url(#cusped-${motif})`} />
    </svg>
  );
}

/* Brass engraved nameplate */
function Nameplate({ title, motif, hovered }: { title: string; motif: string; hovered: boolean }) {
  return (
    <div
      className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2 w-[70%]"
    >
      <div
        className="relative flex items-center justify-center overflow-hidden transition-all duration-500"
        style={{
          height: 56,
          background: "linear-gradient(180deg, #d4b96a 0%, #a88734 30%, #8b6914 70%, #6b4f10 100%)",
          border: "1.5px solid #5c4209",
          borderRadius: 4,
          boxShadow: hovered
            ? "inset 0 2px 6px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(255,220,150,0.4), inset 0 0 30px rgba(255,215,0,0.3), 0 4px 20px rgba(212,175,55,0.5), 0 0 30px rgba(212,175,55,0.3)"
            : "inset 0 3px 8px rgba(0,0,0,0.6), inset 0 -2px 4px rgba(255,220,150,0.25), 0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        {/* Bevelled top edge highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,230,160,0.5), transparent)" }}
        />
        {/* Bevelled bottom edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(90,60,10,0.6), transparent)" }}
        />
        {/* Side ornament left */}
        <span className="absolute left-3 text-[10px]" style={{ color: "#d4af37", opacity: 0.6 }}>✦</span>
        {/* Engraved text with pressed-in shadow */}
        <span
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "transparent",
            background: "linear-gradient(180deg, #f0d775 0%, #c89b30 50%, #8b6914 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: hovered
              ? "0 1px 0 rgba(255,240,180,0.4), 0 -1px 2px rgba(0,0,0,0.6), 0 0 12px rgba(255,215,0,0.4)"
              : "0 1px 0 rgba(255,240,180,0.3), 0 -1px 2px rgba(0,0,0,0.7)",
            filter: hovered ? "brightness(1.2)" : "brightness(1)",
            transition: "all 0.4s",
          }}
        >
          {title}
        </span>
        {/* Side ornament right */}
        <span className="absolute right-3 text-[10px]" style={{ color: "#d4af37", opacity: 0.6 }}>✦</span>
      </div>
    </div>
  );
}

/* Diya flame at arch apex - larger & flickering */
function DiyaFlame({ accent }: { accent: string }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 z-30"
      style={{ top: "-4px" }}
    >
      {/* Glow aura */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 60,
          height: 60,
          background: `radial-gradient(circle, ${accent}60 0%, ${accent}20 40%, transparent 70%)`,
          filter: "blur(12px)",
          animation: "diya-flicker 0.5s ease-in-out infinite alternate",
        }}
      />
      {/* Flame */}
      <div
        style={{
          width: 16,
          height: 28,
          background: `linear-gradient(to top, #f0c040, ${accent} 50%, transparent)`,
          borderRadius: "50% 50% 30% 30%",
          filter: `drop-shadow(0 0 16px ${accent}) drop-shadow(0 0 30px #ffd700)`,
          animation: "diya-flicker 0.35s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}

/* Wax-sealed silk banner for Coming Soon */
function SealedBanner() {
  return (
    <div
      className="absolute right-[-20px] top-[30px] z-40"
      style={{ transform: "rotate(30deg)" }}
    >
      {/* Silk ribbon */}
      <div
        style={{
          background: "linear-gradient(135deg, #6b1a1a 0%, #8b2020 30%, #5a1515 70%, #3d0e0e 100%)",
          padding: "6px 32px",
          borderRadius: "2px",
          boxShadow: "0 3px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,200,200,0.1)",
          position: "relative" as const,
        }}
      >
        {/* Silk sheen */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
            borderRadius: "2px",
          }}
        />
        {/* Gold border */}
        <div
          className="absolute inset-0"
          style={{
            border: "1px solid #d4af37",
            borderRadius: "2px",
            opacity: 0.5,
          }}
        />
        <span
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: 10,
            color: "#d4af37",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            position: "relative" as const,
            zIndex: 1,
          }}
        >
          COMING SOON
        </span>
      </div>
      {/* Wax seal */}
      <div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2"
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #c0392b, #8b1a1a 60%, #5a0e0e)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,100,100,0.2)",
          border: "1px solid #d4af37",
        }}
      >
        <span
          className="flex items-center justify-center h-full"
          style={{ fontFamily: "Cinzel, serif", fontSize: 7, color: "#d4af37" }}
        >
          ❖
        </span>
      </div>
    </div>
  );
}

/* Floating diya sparks */
function DiyaSparks() {
  const sparks = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 2 + Math.random() * 3,
    })),
  []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparks.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            bottom: "-10px",
            width: s.size,
            height: s.size,
            background: "radial-gradient(circle, #ffd27a, #ff8c00)",
            boxShadow: "0 0 6px #ffd27a",
            animation: `spark-rise ${s.duration}s ${s.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* Jali lattice SVG pattern */
function JaliPattern() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 opacity-[0.08]">
      <defs>
        <pattern id="jali" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M10 0L20 10L10 20L0 10Z" fill="none" stroke="#d4af37" strokeWidth="0.3" />
          <circle cx="10" cy="10" r="3" fill="none" stroke="#d4af37" strokeWidth="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#jali)" />
    </svg>
  );
}

/* Individual Gate Card */
function Gate({ gate, index }: { gate: typeof GATES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 80, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1,
        delay: 0.4 + index * 0.2,
        ease: "power3.out",
      }
    );
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleClick = () => {
    if (!gate.active) {
      if (ref.current) {
        gsap.fromTo(ref.current, { x: 0 }, {
          x: 6, duration: 0.08, repeat: 7, yoyo: true, ease: "power1.inOut",
          onComplete: () => gsap.set(ref.current, { x: 0 }),
        });
      }
      setTooltip(true);
      setTimeout(() => setTooltip(false), 3000);
      return;
    }
    document.querySelectorAll(".gate-card").forEach((el, i) => {
      if (i !== index) {
        gsap.to(el, { opacity: 0, scale: 0.9, duration: 0.4 });
      }
    });
    gsap.to(document.querySelector(".gates-bg"), { opacity: 0, duration: 0.4 });
    if (ref.current) {
      gsap.to(ref.current, {
        scale: 2.5, duration: 0.6, ease: "power3.in",
        onComplete: () => navigate({ to: "/events" }),
      });
    }
  };

  const rotateX = hovered ? (mousePos.y - 0.5) * -8 : 0;
  const rotateY = hovered ? (mousePos.x - 0.5) * 8 : 0;

  return (
    <div
      ref={ref}
      className="gate-card relative"
      style={{
        width: 320, height: 540,
        perspective: "1200px",
        opacity: 0,
        cursor: gate.active ? "pointer" : "not-allowed",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0.5, y: 0.5 }); }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Backglow - theme colored */}
      <div
        className="absolute -inset-[20%] rounded-full transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at center, ${gate.theme.glow} 0%, rgba(212,175,55,0.2) 35%, transparent 70%)`,
          filter: "blur(50px)",
          opacity: hovered ? 1 : 0,
          zIndex: -1,
        }}
      />

      {/* Main 3D container with parallax tilt */}
      <div
        className="relative h-full w-full"
        style={{
          transform: `translateZ(30px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${hovered ? "translateY(-12px) scale(1.03)" : ""}`,
          transformStyle: "preserve-3d",
          transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
          animation: hovered ? "none" : "gate-breathe 4s ease-in-out infinite",
        }}
      >
        {/* Shadow layer for depth - projects arch forward */}
        <div
          className="absolute inset-0 z-10"
          style={{
            boxShadow: hovered
              ? "0 20px 60px rgba(0,0,0,0.6), 0 5px 20px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.3)"
              : "0 10px 40px rgba(0,0,0,0.4), 0 3px 12px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.2)",
            borderRadius: "4px",
            transition: "box-shadow 0.4s",
          }}
        />

        {/* Recessed photo interior */}
        <div
          className="absolute inset-[12px] overflow-hidden"
          style={{
            clipPath: `polygon(
              0% 100%, 0% 35%,
              3% 22%, 8% 14%, 16% 8%, 25% 4%, 35% 2%, 44% 1%, 50% 0.5%, 56% 1%, 65% 2%, 75% 4%, 84% 8%, 92% 14%, 97% 22%, 100% 35%,
              100% 100%
            )`,
            boxShadow: "inset 0 8px 30px rgba(0,0,0,0.7), inset 4px 0 20px rgba(0,0,0,0.4), inset -4px 0 20px rgba(0,0,0,0.4)",
          }}
        >
          <img
            src={gate.image}
            alt={gate.title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
            style={{
              filter: hovered ? "brightness(1.15) saturate(1.3)" : "brightness(0.65) saturate(0.95)",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 20%, rgba(26,10,10,0.3) 50%, rgba(26,10,10,0.95) 100%)",
            }}
          />
          {/* Diya glow casting down from top */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: "60%",
              height: "40%",
              background: `radial-gradient(ellipse at top center, ${gate.theme.accent}30 0%, transparent 70%)`,
              opacity: hovered ? 1 : 0.4,
              transition: "opacity 0.4s",
            }}
          />
          {/* Shimmer sweep on hover */}
          {hovered && (
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(115deg, transparent 30%, rgba(255,215,0,0.3) 50%, transparent 70%)",
                animation: "shimmer-sweep 1.4s linear infinite",
              }}
            />
          )}
        </div>

        {/* Ornate arch SVG frame overlay */}
        <ArchFrame motif={gate.theme.motif} hovered={hovered} />

        {/* Nameplate */}
        <Nameplate title={gate.title} motif={gate.theme.motif} hovered={hovered} />

        {/* Tagline */}
        <div
          className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 text-center"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            fontSize: 15,
            color: "#e8c87a",
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          }}
        >
          {gate.tagline}
        </div>

        {/* Diya at apex */}
        <DiyaFlame accent={gate.theme.accent} />

        {/* Coming Soon sealed banner */}
        {!gate.active && <SealedBanner />}
      </div>

      {/* Tooltip for locked gates */}
      {tooltip && (
        <div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-50 animate-fade-in whitespace-nowrap"
          style={{
            background: "#1a0a0a",
            border: "1px solid #d4af37",
            padding: "12px 20px",
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            fontSize: 14,
            color: "#d4af37",
          }}
        >
          This gate opens soon. The journey is being prepared.
        </div>
      )}
    </div>
  );
}

export function GatesPage() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const chars = headingRef.current.querySelectorAll(".gate-char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 12, filter: "blur(8px)" },
      {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.5, stagger: 0.04, ease: "power2.out", delay: 0.2,
      }
    );
  }, []);

  const splitText = (text: string) =>
    text.split("").map((c, i) => (
      <span key={i} className="gate-char inline-block" style={{ opacity: 0 }}>
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, #0d0820 0%, #1a0a0a 50%, #2a0d0d 100%)" }}>
      {/* Background layers */}
      <div className="gates-bg absolute inset-0">
        <JaliPattern />
        <DiyaSparks />
      </div>

      {/* Heading */}
      <div ref={headingRef} className="relative z-10 pt-20 text-center">
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            color: "#d4af37",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          {splitText("CHOOSE YOUR JOURNEY")}
        </h1>
        <p
          className="mx-auto mt-4 max-w-xl animate-fade-in"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#e8c87a",
            animationDelay: "0.6s",
            animationFillMode: "both",
          }}
        >
          Three sacred gates. Three realms of Bharat. One unforgettable path.
        </p>
      </div>

      {/* Gates */}
      <div className="relative z-10 flex min-h-[70vh] items-center justify-center gap-8 px-6 py-12 max-lg:gap-6 max-md:flex-col max-md:gap-8">
        {GATES.map((gate, i) => (
          <Gate key={gate.title} gate={gate} index={i} />
        ))}
      </div>

      {/* Gold fade overlay for transition */}
      <div
        id="gate-gold-overlay"
        className="pointer-events-none fixed inset-0 z-[10000]"
        style={{
          background: "radial-gradient(circle at center, rgba(255,215,0,1) 0%, rgba(255,140,0,0.8) 40%, rgba(26,10,10,0) 80%)",
          opacity: 0,
        }}
      />

      <style>{`
        @keyframes gate-breathe {
          0%, 100% { transform: translateY(0) rotateX(0) rotateY(0); }
          50% { transform: translateY(-4px) rotateX(-1deg) rotateY(0.5deg); }
        }
      `}</style>
    </div>
  );
}
