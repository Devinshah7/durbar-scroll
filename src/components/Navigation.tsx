import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const links = [
  { label: "About", href: "#philosophy" },
  { label: "Services", href: "#pillars" },
  { label: "Our Work", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Connect", href: "#contact" },
];

interface NavigationProps {
  /** If true, plays the grand logo reveal animation on mount */
  logoReveal?: boolean;
}

export function Navigation({ logoReveal = false }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [revealDone, setRevealDone] = useState(!logoReveal);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Grand logo reveal animation
  useEffect(() => {
    if (!logoReveal || revealDone) return;
    const overlay = overlayLogoRef.current;
    const headerLogo = logoRef.current;
    if (!overlay || !headerLogo) return;

    const tl = gsap.timeline({
      onComplete: () => setRevealDone(true),
    });

    // Phase 1: Hold centered logo with glow for 1.2s
    tl.fromTo(
      overlay,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    );
    tl.to(overlay, { duration: 1.2 }); // hold

    // Phase 2: Scale down and translate to header position
    tl.to(overlay, {
      opacity: 0,
      scale: 0.4,
      y: -window.innerHeight * 0.4,
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, [logoReveal, revealDone]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Grand logo reveal overlay */}
      {!revealDone && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none">
          <div
            ref={overlayLogoRef}
            className="flex flex-col items-center justify-center"
            style={{ opacity: 0 }}
          >
            {/* Amber halo */}
            <div
              className="absolute rounded-full"
              style={{
                width: "clamp(300px, 50vw, 600px)",
                height: "clamp(300px, 50vw, 600px)",
                background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(255,140,0,0.1) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            {/* Gold particle shimmer dots */}
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const r = 120 + Math.random() * 80;
              return (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 2 + Math.random() * 3,
                    height: 2 + Math.random() * 3,
                    left: `calc(50% + ${Math.cos(angle) * r}px)`,
                    top: `calc(50% + ${Math.sin(angle) * r}px)`,
                    background: "#ffd27a",
                    boxShadow: "0 0 6px #ffd27a",
                    animation: `diya-flicker ${0.3 + Math.random() * 0.4}s ease-in-out infinite alternate`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              );
            })}
            <div
              className="relative flex items-center justify-center"
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#d4af37",
                textShadow: "0 0 40px rgba(255,210,122,0.6), 0 0 80px rgba(212,175,55,0.4)",
              }}
            >
              <span style={{ marginRight: "0.3em", position: "relative", top: "-0.1em", fontSize: "0.6em" }}>
                M°
              </span>
              <span>THE MAJESTIC BHARAT</span>
            </div>
            <p
              className="mt-4 text-center"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontStyle: "italic",
                color: "#e8c87a",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)",
              }}
            >
              Where Every Experience Becomes A Sacred Journey
            </p>
          </div>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 top-0 z-[1000] transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
        style={{
          background: scrolled ? "rgba(13, 11, 8, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,150,12,0.25)" : "1px solid transparent",
        }}
      >
        {/* 3-column grid: left nav | centered logo | right CTA + burger */}
        <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10">
          {/* Left: desktop nav links */}
          <nav className="hidden items-center gap-7 md:flex">
            {links.slice(0, 3).map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className="group relative text-[11px] font-medium uppercase tracking-[0.3em] transition-colors"
                style={{ color: "var(--color-gold-pale)" }}
              >
                {l.label}
                <span
                  className="absolute -bottom-2 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: "var(--color-gold)" }}
                />
              </a>
            ))}
          </nav>

          {/* Center: logo */}
          <div ref={logoRef} className="flex justify-center">
            <a
              href="#top"
              onClick={(e) => handleNav(e, "#top")}
              className="flex flex-col items-center gap-1"
              style={{
                filter: "drop-shadow(0 0 12px rgba(212,175,55,0.35))",
              }}
            >
              <span
                className="font-display leading-none"
                style={{
                  color: "var(--color-gold)",
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                }}
              >
                M°
              </span>
              <span
                className="text-[9px] font-medium tracking-[0.32em]"
                style={{ color: "var(--color-gold-pale)" }}
              >
                THE MAJESTIC BHARAT
              </span>
            </a>
          </div>

          {/* Right: remaining nav + CTA + burger */}
          <div className="flex items-center justify-end gap-7">
            <nav className="hidden items-center gap-7 md:flex">
              {links.slice(3).map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNav(e, l.href)}
                  className="group relative text-[11px] font-medium uppercase tracking-[0.3em] transition-colors"
                  style={{ color: "var(--color-gold-pale)" }}
                >
                  {l.label}
                  <span
                    className="absolute -bottom-2 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                    style={{ background: "var(--color-gold)" }}
                  />
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="hidden md:inline-flex btn-outline-gold !py-2.5 !px-5 !text-[10px] rounded-full"
            >
              Begin Your Experience
            </a>

            <button
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
              className="flex flex-col gap-[5px] p-2 md:hidden"
            >
              <span
                className={`block h-px w-7 transition-all ${open ? "translate-y-[6px] rotate-45" : ""}`}
                style={{ background: "var(--color-gold)" }}
              />
              <span
                className={`block h-px w-7 transition-all ${open ? "opacity-0" : ""}`}
                style={{ background: "var(--color-gold)" }}
              />
              <span
                className={`block h-px w-7 transition-all ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                style={{ background: "var(--color-gold)" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ background: "var(--color-burgundy-dark)" }}
      >
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => handleNav(e, l.href)}
            className="font-display text-4xl italic"
            style={{
              color: "var(--color-gold-pale)",
              transform: open ? "translateX(0)" : "translateX(-30px)",
              opacity: open ? 1 : 0,
              transition: `all 0.4s ease ${i * 0.07 + 0.1}s`,
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
