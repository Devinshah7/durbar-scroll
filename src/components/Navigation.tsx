import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Logo } from "@/components/Logo";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronUp } from "lucide-react";

const leftLinks = [
  { label: "Home", href: "/gates", isRoute: true },
  { label: "About", href: "#philosophy", isRoute: false },
  { label: "Services", href: "#pillars", isRoute: false },
];

const rightLinks = [
  { label: "Team", href: "#team", isRoute: false },
  { label: "Connect", href: "#contact", isRoute: false },
  { label: "Journal", href: "/blogs", isRoute: true },
];

interface NavigationProps {
  logoReveal?: boolean;
  onComingSoon?: (pillar: string) => void;
}

export function Navigation({ logoReveal = false }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const introPlayed =
    typeof window !== "undefined" && sessionStorage.getItem("eventsIntroPlayed") === "true";
  const [revealDone, setRevealDone] = useState(!logoReveal || introPlayed);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const overlayLogoRef = useRef<HTMLDivElement>(null);
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!logoReveal || revealDone) return;
    const overlay = overlayLogoRef.current;
    if (!overlay) return;
    const tl = gsap.timeline({ onComplete: () => setRevealDone(true) });
    tl.fromTo(overlay, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
    tl.to(overlay, { duration: 1.2 });
    tl.to(overlay, { opacity: 0, scale: 0.4, y: -window.innerHeight * 0.4, duration: 0.7, ease: "power3.inOut" });
  }, [logoReveal, revealDone]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const linkBase: React.CSSProperties = {
    fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#EBD9A4",
  };

  const NavLink = ({ label, href, isRoute }: { label: string; href: string; isRoute: boolean }) => {
    const isActive = isRoute && currentPath === href;
    const inner = (
      <>
        <span className="nav-link-label">{label}</span>
        <span className="nav-link-underline" />
        {isActive && <span className="nav-link-dot" />}
      </>
    );
    if (isRoute) {
      return (
        <Link to={href as any} className="nav-link" style={linkBase}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={href} onClick={(e) => handleNav(e, href)} className="nav-link" style={linkBase}>
        {inner}
      </a>
    );
  };

  const Ornament = () => (
    <span
      aria-hidden
      className="hidden md:inline-flex items-center gap-2 select-none"
      style={{ color: "#D4AF37", opacity: 0.75, fontSize: 11, letterSpacing: "0.3em" }}
    >
      · <span style={{ fontSize: 10 }}>❖</span> ·
    </span>
  );

  return (
    <>
      {!revealDone && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none">
          <div ref={overlayLogoRef} className="flex flex-col items-center justify-center" style={{ opacity: 0 }}>
            <div
              className="absolute rounded-full"
              style={{
                width: "clamp(300px, 50vw, 600px)",
                height: "clamp(300px, 50vw, 600px)",
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(255,140,0,0.1) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <Logo height={120} glow />
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
        className="fixed left-0 right-0 top-0 z-[1000] transition-all duration-500"
        style={{
          paddingTop: scrolled ? 10 : 18,
          paddingBottom: scrolled ? 10 : 18,
          background: scrolled
            ? "linear-gradient(180deg, rgba(42,10,14,0.92) 0%, rgba(11,6,8,0.92) 100%)"
            : "linear-gradient(180deg, rgba(42,10,14,0.55) 0%, rgba(11,6,8,0.35) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid #D4AF37",
          boxShadow: scrolled ? "0 6px 24px rgba(0,0,0,0.45)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-10">
          {/* Left group */}
          <nav className="hidden items-center gap-6 md:flex">
            {leftLinks.map((l, i) => (
              <span key={l.label} className="flex items-center gap-6">
                <NavLink {...l} />
                {i < leftLinks.length - 1 && (
                  <span aria-hidden style={{ color: "#D4AF37", opacity: 0.5 }}>·</span>
                )}
              </span>
            ))}
            <Ornament />
          </nav>

          {/* Center logo */}
          <div className="flex justify-center">
            <Link to="/gates" aria-label="The Majestic Bharat — Home" className="logo-link">
              <Logo height={scrolled ? 48 : 56} />
            </Link>
          </div>

          {/* Right group */}
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 md:flex">
              <Ornament />
              {rightLinks.map((l, i) => (
                <span key={l.label} className="flex items-center gap-6">
                  <NavLink {...l} />
                  {i < rightLinks.length - 1 && (
                    <span aria-hidden style={{ color: "#D4AF37", opacity: 0.5 }}>·</span>
                  )}
                </span>
              ))}
            </nav>

            <button
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
              className="flex flex-col gap-[5px] p-2 md:hidden"
            >
              <span
                className={`block h-px w-7 transition-all ${open ? "translate-y-[6px] rotate-45" : ""}`}
                style={{ background: "#D4AF37" }}
              />
              <span
                className={`block h-px w-7 transition-all ${open ? "opacity-0" : ""}`}
                style={{ background: "#D4AF37" }}
              />
              <span
                className={`block h-px w-7 transition-all ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                style={{ background: "#D4AF37" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center gap-7 transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, #2A0A0E 0%, #170609 60%, #0B0608 100%)",
        }}
      >
        {[...leftLinks, ...rightLinks].map((l, i) => {
          const baseStyle: React.CSSProperties = {
            fontFamily: "'Cormorant Garamond', serif",
            color: "#EBD9A4",
            fontSize: 30,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            transform: open ? "translateY(0)" : "translateY(-12px)",
            opacity: open ? 1 : 0,
            transition: `all 0.4s ease ${i * 0.07 + 0.1}s`,
          };
          return l.isRoute ? (
            <Link key={l.label} to={l.href as any} onClick={() => setOpen(false)} style={baseStyle}>
              {l.label}
            </Link>
          ) : (
            <a key={l.label} href={l.href} onClick={(e) => handleNav(e, l.href)} style={baseStyle}>
              {l.label}
            </a>
          );
        })}
      </div>

      {/* Scroll to top */}
      <button
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-[1001] flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          background: "#D4AF37",
          color: "#0B0608",
          border: "1px solid #8b6914",
          boxShadow: "0 4px 18px rgba(212,175,55,0.45)",
        }}
      >
        <ChevronUp size={18} />
      </button>

      <style>{`
        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 6px 2px;
          transition: color 0.3s ease;
        }
        .nav-link:hover { color: #D4AF37 !important; }
        .nav-link .nav-link-underline {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0;
          height: 1px;
          background: #D4AF37;
          transform: translateX(-50%);
          transition: width 0.35s ease;
        }
        .nav-link:hover .nav-link-underline { width: 100%; }
        .nav-link .nav-link-dot {
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #D4AF37;
          transform: translateX(-50%);
          box-shadow: 0 0 8px rgba(212,175,55,0.8);
        }
        .logo-link img { transition: filter 0.4s ease; }
        .logo-link:hover img { filter: drop-shadow(0 0 12px rgba(212,175,55,0.45)); }
      `}</style>
    </>
  );
}
