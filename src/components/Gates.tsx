import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { gsap } from "gsap";

const GATES = [
  {
    title: "EVENTS",
    tagline: "Where Moments Become Memory",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=900&fit=crop",
    active: true,
    route: "/events" as const,
  },
  {
    title: "CELEBRITY",
    tagline: "Where Stars Meet Soul",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=900&fit=crop",
    active: false,
    route: "/events" as const,
  },
  {
    title: "TOURISM",
    tagline: "Where India Reveals Herself",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=900&fit=crop",
    active: false,
    route: "/events" as const,
  },
];

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

/* Floating diya sparks */
function DiyaSparks() {
  const sparks = Array.from({ length: 35 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: 2 + Math.random() * 3,
  }));
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

/* Diya flame at arch apex */
function DiyaFlame() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2"
      style={{
        top: "-8px",
        width: 12, height: 22,
        background: "linear-gradient(to top, #f0c040, #ff8c00 50%, transparent)",
        borderRadius: "50% 50% 30% 30%",
        filter: "drop-shadow(0 0 12px #ff8c00) drop-shadow(0 0 24px #ffd700)",
        animation: "diya-flicker 0.4s ease-in-out infinite alternate",
      }}
    />
  );
}

/* Mughal arch clip-path */
const ARCH_CLIP = "polygon(0% 100%, 0% 30%, 5% 18%, 12% 10%, 22% 5%, 32% 2%, 42% 0.5%, 50% 0%, 58% 0.5%, 68% 2%, 78% 5%, 88% 10%, 95% 18%, 100% 30%, 100% 100%)";

function Gate({ gate, index }: { gate: typeof GATES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4 + index * 0.2, ease: "power3.out" }
    );
  }, [index]);

  const handleClick = () => {
    if (!gate.active) {
      // Shake + tooltip
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
    // Gate opening transition
    setTransitioning(true);
    // Fade siblings
    document.querySelectorAll(".gate-card").forEach((el, i) => {
      if (i !== index) {
        gsap.to(el, { opacity: 0, scale: 0.9, duration: 0.4 });
      }
    });
    gsap.to(document.querySelector(".gates-bg"), { opacity: 0, duration: 0.4 });
    // Scale up clicked gate
    if (ref.current) {
      gsap.to(ref.current, {
        scale: 2.5, duration: 0.6, ease: "power3.in",
        onComplete: () => {
          navigate({ to: "/events" });
        },
      });
    }
  };

  return (
    <div
      ref={ref}
      className="gate-card relative"
      style={{
        width: 320, height: 540,
        perspective: "1500px",
        opacity: 0,
        cursor: gate.active ? "pointer" : "not-allowed",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Backglow */}
      <div
        className="absolute -inset-[15%] rounded-full transition-opacity duration-400"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,215,0,0.55) 0%, rgba(255,140,0,0.3) 35%, rgba(196,69,45,0.15) 60%, transparent 80%)",
          filter: "blur(45px)",
          opacity: hovered ? 1 : 0,
          zIndex: -1,
        }}
      />

      {/* Main arch container */}
      <div
        className="relative h-full w-full overflow-hidden transition-all duration-500"
        style={{
          clipPath: ARCH_CLIP,
          border: `${hovered ? 4 : 3}px solid #d4af37`,
          boxShadow: hovered
            ? "0 0 60px rgba(212,175,55,0.6), 0 0 120px rgba(212,175,55,0.3), inset 0 0 30px rgba(255,215,0,0.15)"
            : "0 0 40px rgba(212,175,55,0.3)",
          transform: hovered
            ? "translateY(-14px) translateZ(50px) rotateX(-5deg) scale(1.04)"
            : "translateY(0) translateZ(0) rotateX(0) scale(1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Interior image */}
        <img
          src={gate.image}
          alt={gate.title}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-400"
          style={{
            filter: hovered ? "brightness(1.1) saturate(1.25)" : "brightness(0.75) saturate(1.05)",
          }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 30%, rgba(26,10,10,0.4) 60%, rgba(26,10,10,0.95) 100%)",
          }}
        />

        {/* Shimmer sweep */}
        {hovered && (
          <div
            className="absolute inset-0"
            style={{
              clipPath: ARCH_CLIP,
              background: "linear-gradient(115deg, transparent 30%, rgba(255,215,0,0.45) 50%, transparent 70%)",
              animation: "shimmer-sweep 1.4s linear infinite",
            }}
          />
        )}

        {/* Spandrels (corners with jali) */}
        <div className="absolute inset-0" style={{ opacity: 0.3 }}>
          <svg className="absolute right-0 top-0 h-24 w-24" viewBox="0 0 80 80">
            <path d="M0 0L80 0L80 80" fill="none" stroke="#d4af37" strokeWidth="0.5" />
            <circle cx="50" cy="30" r="8" fill="none" stroke="#d4af37" strokeWidth="0.3" />
            <path d="M40 20L60 20L60 40L40 40Z" fill="none" stroke="#d4af37" strokeWidth="0.3" transform="rotate(45 50 30)" />
          </svg>
        </div>

        {/* Nameplate */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[75%]">
          <div
            className="flex items-center justify-center transition-all duration-400"
            style={{
              height: 60,
              background: "linear-gradient(180deg, #c8a97e 0%, #8b6914 100%)",
              border: "2px solid #5c4209",
              boxShadow: hovered
                ? "inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(255,220,150,0.3), inset 0 0 25px rgba(255,215,0,0.4), 0 0 20px rgba(212,175,55,0.5)"
                : "inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(255,220,150,0.3)",
            }}
          >
            <span
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: 24,
                color: "#d4af37",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textShadow: hovered ? "0 0 12px rgba(255,215,0,0.6)" : "none",
              }}
            >
              {gate.title}
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            fontSize: 16,
            color: "#e8c87a",
          }}
        >
          {gate.tagline}
        </div>

        {/* Coming Soon ribbon */}
        {!gate.active && (
          <div
            className="absolute right-[-30px] top-[30px] z-20"
            style={{
              transform: "rotate(35deg)",
              background: "#8b1a1a",
              border: "1px solid #d4af37",
              padding: "4px 40px",
              animation: "pulse-ribbon 2s ease-in-out infinite",
            }}
          >
            <span
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: 11,
                color: "#d4af37",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              COMING SOON
            </span>
          </div>
        )}
      </div>

      {/* Diya at apex */}
      <DiyaFlame />

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
    </div>
  );
}
