import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ComingSoonModal } from "@/components/ComingSoonModal";

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
      style={{ filter: hovered ? `drop-shadow(0 0 24px ${accent}50)` : "none", transition: "filter 0.6s" }}
    >
      <defs>
        <linearGradient id={`pillar-${motif}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5c4209" />
          <stop offset="20%" stopColor="#8b6914" />
          <stop offset="50%" stopColor="#d4b96a" />
          <stop offset="80%" stopColor="#8b6914" />
          <stop offset="100%" stopColor="#5c4209" />
        </linearGradient>
        <linearGradient id={`pillar-v-${motif}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8a97e" />
          <stop offset="50%" stopColor="#8b6914" />
          <stop offset="100%" stopColor="#5c4209" />
        </linearGradient>
        <linearGradient id={`beam-${motif}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4b96a" />
          <stop offset="30%" stopColor="#a88734" />
          <stop offset="70%" stopColor="#8b6914" />
          <stop offset="100%" stopColor="#5c4209" />
        </linearGradient>
        {/* Clip path for the photo - matches door opening */}
        <clipPath id={`photo-clip-${motif}`}>
          <path d="
            M 36 540 L 36 180
            Q 36 130 60 95
            Q 85 60 120 40
            Q 140 30 160 27
            Q 180 30 200 40
            Q 235 60 260 95
            Q 284 130 284 180
            L 284 540 Z
          " />
        </clipPath>
      </defs>

      {/* Golden glow behind the arch */}
      <ellipse cx="160" cy="180" rx="140" ry="160" fill="none"
        stroke="#d4af37" strokeWidth="0" opacity="0">
        <animate attributeName="opacity" values={hovered ? "0.15;0.25;0.15" : "0.05;0.1;0.05"} dur="3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="160" cy="200" rx="120" ry="140"
        fill={`${accent}08`}
        style={{ filter: "blur(30px)", opacity: hovered ? 0.6 : 0.2, transition: "opacity 0.6s" }}
      />

      {/* Left pillar - richer with bevel */}
      <rect x="8" y="140" width="30" height="400" fill={`url(#pillar-${motif})`} rx="2" />
      {/* Inner bevel highlight */}
      <rect x="10" y="142" width="4" height="396" fill="rgba(255,230,160,0.15)" rx="1" />
      {/* Golden rim-light left edge */}
      <line x1="8" y1="140" x2="8" y2="540" stroke="#d4af37" strokeWidth="0.8" opacity={hovered ? 0.7 : 0.35} style={{ transition: "opacity 0.4s" }} />
      {/* Golden rim-light right edge */}
      <line x1="37" y1="140" x2="37" y2="540" stroke="#d4af37" strokeWidth="0.5" opacity={hovered ? 0.5 : 0.2} style={{ transition: "opacity 0.4s" }} />
      {/* Left capital */}
      <rect x="4" y="130" width="38" height="16" fill={`url(#beam-${motif})`} rx="3" />
      <rect x="4" y="130" width="38" height="16" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4" rx="3" />
      <path d="M8 134 Q23 126 38 134" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />

      {/* Right pillar - richer with bevel */}
      <rect x="282" y="140" width="30" height="400" fill={`url(#pillar-${motif})`} rx="2" />
      <rect x="306" y="142" width="4" height="396" fill="rgba(255,230,160,0.15)" rx="1" />
      <line x1="312" y1="140" x2="312" y2="540" stroke="#d4af37" strokeWidth="0.8" opacity={hovered ? 0.7 : 0.35} style={{ transition: "opacity 0.4s" }} />
      <line x1="282" y1="140" x2="282" y2="540" stroke="#d4af37" strokeWidth="0.5" opacity={hovered ? 0.5 : 0.2} style={{ transition: "opacity 0.4s" }} />
      {/* Right capital */}
      <rect x="278" y="130" width="38" height="16" fill={`url(#beam-${motif})`} rx="3" />
      <rect x="278" y="130" width="38" height="16" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4" rx="3" />
      <path d="M282 134 Q297 126 312 134" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />

      {/* Ornate corner brackets where pillars meet beam */}
      <g opacity={hovered ? 0.7 : 0.4} style={{ transition: "opacity 0.4s" }}>
        {/* Top-left bracket */}
        <path d="M42 146 Q42 135 52 132" fill="none" stroke="#d4af37" strokeWidth="1" />
        <circle cx="42" cy="146" r="1.5" fill="#d4af37" />
        {/* Top-right bracket */}
        <path d="M278 146 Q278 135 268 132" fill="none" stroke="#d4af37" strokeWidth="1" />
        <circle cx="278" cy="146" r="1.5" fill="#d4af37" />
      </g>

      {/* Outer arch border */}
      <path
        d="
          M 36 540 L 36 180
          Q 36 130 60 95
          C 75 70, 100 50, 130 38
          C 145 32, 155 28, 160 27
          C 165 28, 175 32, 190 38
          C 220 50, 245 70, 260 95
          Q 284 130 284 180
          L 284 540
        "
        fill="none"
        stroke="#d4af37"
        strokeWidth="2.5"
        opacity={hovered ? 1 : 0.7}
        style={{ transition: "opacity 0.4s" }}
      />
      {/* Thin engraved gold line along inner edge */}
      <path
        d="
          M 40 540 L 40 182
          Q 40 134 62 100
          C 78 74, 102 54, 132 42
          C 146 36, 155 32, 160 31
          C 165 32, 174 36, 188 42
          C 218 54, 242 74, 258 100
          Q 280 134 280 182
          L 280 540
        "
        fill="none"
        stroke="#d4af37"
        strokeWidth="0.5"
        opacity={hovered ? 0.6 : 0.25}
        style={{ transition: "opacity 0.4s" }}
      />

      {/* Lotus medallion at apex of arch */}
      <g transform="translate(160, 20)" opacity={hovered ? 0.9 : 0.5} style={{ transition: "opacity 0.4s" }}>
        {/* Gem/lotus */}
        <ellipse cx="0" cy="0" rx="6" ry="5" fill="#d4af37" opacity="0.3" />
        <path d="M-4 2 Q0 -6 4 2 Q0 -2 -4 2Z" fill="#d4af37" />
        <path d="M-6 3 Q-3 -3 0 3Z" fill="#d4af37" opacity="0.5" />
        <path d="M0 3 Q3 -3 6 3Z" fill="#d4af37" opacity="0.5" />
        <circle cx="0" cy="-2" r="1.5" fill="#ffd700" opacity="0.8" />
      </g>

      {/* Cusped inner decorative arches */}
      <g opacity={hovered ? 0.6 : 0.3} style={{ transition: "opacity 0.4s" }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const t = (i + 1) / 8;
          const cx = 36 + (284 - 36) * t;
          const cy = 180 - Math.sin(t * Math.PI) * 130;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy + 8} r="5" fill="none" stroke="#d4af37" strokeWidth="0.6" />
              <path
                d={`M${cx - 3} ${cy + 13} Q${cx} ${cy + 7} ${cx + 3} ${cy + 13}`}
                fill="none" stroke="#d4af37" strokeWidth="0.4"
              />
            </g>
          );
        })}
      </g>

      {/* Finials at top */}
      <g opacity={hovered ? 0.8 : 0.5} style={{ transition: "opacity 0.4s" }}>
        <path d="M156 8 Q160 -2 164 8 Q160 4 156 8Z" fill="#d4af37" />
        <circle cx="160" cy="0" r="2.5" fill="#d4af37" />
        <circle cx="80" cy="52" r="2" fill="#d4af37" opacity="0.6" />
        <circle cx="240" cy="52" r="2" fill="#d4af37" opacity="0.6" />
      </g>

      {/* Filigree lotus motifs in spandrels */}
      <g opacity={hovered ? 0.5 : 0.2} style={{ transition: "opacity 0.4s" }}>
        <path d="M42 160 Q55 145 68 160 Q55 155 42 160Z" fill="none" stroke="#d4af37" strokeWidth="0.5" />
        <path d="M42 180 Q55 165 68 180 Q55 175 42 180Z" fill="none" stroke="#d4af37" strokeWidth="0.5" />
        <path d="M252 160 Q265 145 278 160 Q265 155 252 160Z" fill="none" stroke="#d4af37" strokeWidth="0.5" />
        <path d="M252 180 Q265 165 278 180 Q265 175 252 180Z" fill="none" stroke="#d4af37" strokeWidth="0.5" />
      </g>

      {/* Theme-specific motifs */}
      {motif === "events" && (
        <g opacity={hovered ? 0.6 : 0.25} style={{ transition: "opacity 0.4s" }}>
          {[-20, -10, 0, 10, 20].map((deg) => (
            <line key={deg} x1="160" y1="30" x2={160 + Math.sin(deg * Math.PI / 180) * 60} y2={30 + Math.cos(deg * Math.PI / 180) * 40} stroke={accent} strokeWidth="0.4" opacity="0.5" />
          ))}
        </g>
      )}
      {motif === "celebrity" && (
        <g opacity={hovered ? 0.6 : 0.25} style={{ transition: "opacity 0.4s" }}>
          {[[60, 70], [260, 70], [160, 25]].map(([cx, cy], i) => (
            <polygon key={i} points={`${cx},${cy! - 5} ${cx! + 2},${cy! - 1} ${cx! + 5},${cy} ${cx! + 2},${cy! + 1} ${cx},${cy! + 5} ${cx! - 2},${cy! + 1} ${cx! - 5},${cy} ${cx! - 2},${cy! - 1}`} fill={accent} opacity="0.7" />
          ))}
        </g>
      )}
      {motif === "tourism" && (
        <g opacity={hovered ? 0.6 : 0.25} style={{ transition: "opacity 0.4s" }}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={42 + i * 8} y={160 + i * 12} width="8" height="8" fill="none" stroke="#d4af37" strokeWidth="0.3" transform={`rotate(45 ${46 + i * 8} ${164 + i * 12})`} />
              <rect x={270 - i * 8} y={160 + i * 12} width="8" height="8" fill="none" stroke="#d4af37" strokeWidth="0.3" transform={`rotate(45 ${274 - i * 8} ${164 + i * 12})`} />
            </g>
          ))}
        </g>
      )}

      {/* Inner shadow edges for recess depth */}
      <rect x="40" y="146" width="240" height="394" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="4" rx="2" clipPath={`url(#photo-clip-${motif})`} />
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
      {/* Silk ribbon with fabric grain */}
      <div
        style={{
          background: "linear-gradient(135deg, #6b1a1a 0%, #8b2020 30%, #5a1515 70%, #3d0e0e 100%)",
          padding: "6px 32px",
          borderRadius: "2px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,200,200,0.1)",
          position: "relative" as const,
        }}
      >
        {/* Fabric grain texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px), repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.04) 1px, rgba(0,0,0,0.04) 2px)",
            borderRadius: "2px",
          }}
        />
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
function Gate({ gate, index, onComingSoon }: { gate: typeof GATES[0]; index: number; onComingSoon: (pillar: string) => void }) {
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
      onComingSoon(gate.title === "CELEBRITY" ? "Celebrities" : "Tourism");
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
      {/* Backglow - theme colored with gentle pulse */}
      <div
        className="absolute -inset-[20%] rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, ${gate.theme.glow} 0%, rgba(212,175,55,0.2) 35%, transparent 70%)`,
          filter: "blur(50px)",
          opacity: hovered ? 1 : 0.15,
          zIndex: -1,
          transition: "opacity 0.6s ease",
          animation: "gate-glow-pulse 4s ease-in-out infinite",
        }}
      />

      {/* Main 3D container with parallax tilt */}
      <div
        className="relative h-full w-full"
        style={{
          transform: `translateZ(30px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${hovered ? "translateY(-4px) scale(1.03)" : ""}`,
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          animation: hovered ? "none" : "gate-breathe 4s ease-in-out infinite",
        }}
      >
        {/* Shadow layer for depth */}
        <div
          className="absolute inset-0 z-10"
          style={{
            boxShadow: hovered
              ? "0 24px 60px rgba(0,0,0,0.6), 0 5px 20px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.3)"
              : "0 10px 40px rgba(0,0,0,0.4), 0 3px 12px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.2)",
            borderRadius: "4px",
            transition: "box-shadow 0.6s",
          }}
        />

        {/* Recessed photo interior - clipped to arch via SVG clipPath */}
        <svg viewBox="0 0 320 540" className="absolute inset-0 h-full w-full" style={{ overflow: "hidden" }}>
          <defs>
            <clipPath id={`img-clip-${gate.theme.motif}`}>
              <path d="
                M 36 540 L 36 180
                Q 36 130 60 95
                Q 85 60 120 40
                Q 140 30 160 27
                Q 180 30 200 40
                Q 235 60 260 95
                Q 284 130 284 180
                L 284 540 Z
              " />
            </clipPath>
          </defs>
          <g clipPath={`url(#img-clip-${gate.theme.motif})`}>
            <image
              href={gate.image}
              x="20" y="10" width="280" height="530"
              preserveAspectRatio="xMidYMid slice"
              style={{
                filter: hovered ? "brightness(1.15) saturate(1.3)" : "brightness(0.65) saturate(0.95)",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transformOrigin: "160px 270px",
                transition: "filter 0.5s, transform 0.5s",
              }}
            />
            {/* Dark gradient overlay inside arch */}
            <rect x="20" y="0" width="280" height="540" fill="url(#photo-darken)" />
          </g>
          <defs>
            <linearGradient id="photo-darken" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0.2" stopColor="rgba(0,0,0,0)" />
              <stop offset="0.5" stopColor="rgba(26,10,10,0.3)" />
              <stop offset="1" stopColor="rgba(26,10,10,0.95)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Shimmer sweep on hover (layered above photo) */}
        {hovered && (
          <div
            className="absolute inset-0 z-15 pointer-events-none"
            style={{
              clipPath: `polygon(
                11.25% 100%, 11.25% 33.3%,
                13.5% 22%, 17% 15%, 22% 10%, 28% 6%, 34% 4%, 42% 2.5%, 50% 2%, 58% 2.5%, 66% 4%, 72% 6%, 78% 10%, 83% 15%, 86.5% 22%, 88.75% 33.3%,
                88.75% 100%
              )`,
              background: "linear-gradient(115deg, transparent 30%, rgba(255,215,0,0.25) 50%, transparent 70%)",
              animation: "shimmer-sweep 1.6s linear infinite",
            }}
          />
        )}

        {/* Ornate arch SVG frame overlay */}
        <ArchFrame motif={gate.theme.motif} hovered={hovered} />

        {/* Nameplate with shimmer on hover */}
        <Nameplate title={gate.title} motif={gate.theme.motif} hovered={hovered} />

        {/* Tagline - elegant italic serif with gold-to-cream gradient */}
        <div
          className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 text-center whitespace-nowrap"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: "0.04em",
            background: "linear-gradient(135deg, #ffd700 0%, #e8c87a 40%, #fff5e0 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "none",
            filter: hovered ? "drop-shadow(0 0 6px rgba(255,215,0,0.4))" : "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
            transition: "filter 0.5s",
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
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonPillar, setComingSoonPillar] = useState("Tourism");

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

  const handleComingSoon = (pillar: string) => {
    setComingSoonPillar(pillar);
    setComingSoonOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, #0d0820 0%, #1a0a0a 50%, #2a0d0d 100%)" }}>
      <div className="gates-bg absolute inset-0">
        <JaliPattern />
        <DiyaSparks />
      </div>

      <div ref={headingRef} className="relative z-10 pt-20 text-center">
        <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(32px, 5vw, 56px)", color: "#d4af37", letterSpacing: "0.25em", textTransform: "uppercase" }}>
          {splitText("CHOOSE YOUR JOURNEY")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl animate-fade-in" style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "clamp(16px, 2vw, 20px)", color: "#e8c87a", animationDelay: "0.6s", animationFillMode: "both" }}>
          Three sacred gates. Three realms of Bharat. One unforgettable path.
        </p>
      </div>

      <div className="relative z-10 flex min-h-[70vh] items-center justify-center gap-8 px-6 py-12 max-lg:gap-6 max-md:flex-col max-md:gap-8">
        {GATES.map((gate, i) => (
          <Gate key={gate.title} gate={gate} index={i} onComingSoon={handleComingSoon} />
        ))}
      </div>

      <div id="gate-gold-overlay" className="pointer-events-none fixed inset-0 z-[10000]" style={{ background: "radial-gradient(circle at center, rgba(255,215,0,1) 0%, rgba(255,140,0,0.8) 40%, rgba(26,10,10,0) 80%)", opacity: 0 }} />

      <ComingSoonModal open={comingSoonOpen} pillarName={comingSoonPillar} onClose={() => setComingSoonOpen(false)} />

      <style>{`
        @keyframes gate-breathe {
          0%, 100% { transform: translateY(0) rotateX(0) rotateY(0); }
          50% { transform: translateY(-4px) rotateX(-1deg) rotateY(0.5deg); }
        }
        @keyframes gate-glow-pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes diya-flicker {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes spark-rise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
