import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Logo } from "@/components/Logo";
import { Link } from "@tanstack/react-router";
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

export function Navigation({ logoReveal = false, onComingSoon }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const introPlayed = typeof window !== "undefined" && sessionStorage.getItem("eventsIntroPlayed") === "true";
  const [revealDone, setRevealDone] = useState(!logoReveal || introPlayed);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayLogoRef = useRef<HTMLDivElement>(null);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const NavLink = ({ label, href, isRoute }: { label: string; href: string; isRoute: boolean }) => {
    const cls = "group relative text-[11px] font-medium uppercase tracking-[0.3em] transition-colors";
    const underline = (
      <span className="absolute -bottom-2 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" style={{ background: "var(--color-gold)" }} />
    );
    if (isRoute) {
      return (
        <Link to={href as any} className={cls} style={{ color: "var(--color-gold-pale)" }}>
          {label}
          {underline}
        </Link>
      );
    }
    return (
      <a href={href} onClick={(e) => handleNav(e, href)} className={cls} style={{ color: "var(--color-gold-pale)" }}>
        {label}
        {underline}
      </a>
    );
  };

  return (
    <>
      {!revealDone && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none">
          <div ref={overlayLogoRef} className="flex flex-col items-center justify-center" style={{ opacity: 0 }}>
            <div className="absolute rounded-full" style={{ width: "clamp(300px, 50vw, 600px)", height: "clamp(300px, 50vw, 600px)", background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(255,140,0,0.1) 40%, transparent 70%)", filter: "blur(40px)" }} />
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const r = 120 + Math.random() * 80;
              return (
                <div key={i} className="absolute rounded-full" style={{ width: 2 + Math.random() * 3, height: 2 + Math.random() * 3, left: `calc(50% + ${Math.cos(angle) * r}px)`, top: `calc(50% + ${Math.sin(angle) * r}px)`, background: "#ffd27a", boxShadow: "0 0 6px #ffd27a", animation: `diya-flicker ${0.3 + Math.random() * 0.4}s ease-in-out infinite alternate`, animationDelay: `${Math.random() * 2}s` }} />
              );
            })}
            <Logo height={120} glow />
            <p className="mt-4 text-center" style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", color: "#e8c87a", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)" }}>
              Where Every Experience Becomes A Sacred Journey
            </p>
          </div>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 top-0 z-[1000] transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
        style={{
          background: scrolled ? "rgba(13, 11, 8, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,150,12,0.25)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10">
          {/* Left nav — 3 links */}
          <nav className="hidden items-center gap-7 md:flex">
            {leftLinks.map((l) => (
              <NavLink key={l.label} {...l} />
            ))}
          </nav>

          {/* Center logo */}
          <div ref={logoRef} className="flex justify-center">
            <a href="#top" onClick={(e) => handleNav(e, "#top")}>
              <Logo height={48} glow />
            </a>
          </div>

          {/* Right nav — 3 links */}
          <div className="flex items-center justify-end gap-7">
            <nav className="hidden items-center gap-7 md:flex">
              {rightLinks.map((l) => (
                <NavLink key={l.label} {...l} />
              ))}
            </nav>

            <button aria-label="Open menu" onClick={() => setOpen((v) => !v)} className="flex flex-col gap-[5px] p-2 md:hidden">
              <span className={`block h-px w-7 transition-all ${open ? "translate-y-[6px] rotate-45" : ""}`} style={{ background: "var(--color-gold)" }} />
              <span className={`block h-px w-7 transition-all ${open ? "opacity-0" : ""}`} style={{ background: "var(--color-gold)" }} />
              <span className={`block h-px w-7 transition-all ${open ? "-translate-y-[6px] -rotate-45" : ""}`} style={{ background: "var(--color-gold)" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ background: "var(--section-maroon)" }}
      >
        {[...leftLinks, ...rightLinks].map((l, i) =>
          l.isRoute ? (
            <Link key={l.label} to={l.href as any} onClick={() => setOpen(false)} className="font-display text-4xl italic"
              style={{ color: "var(--color-gold-pale)", transform: open ? "translateX(0)" : "translateX(-30px)", opacity: open ? 1 : 0, transition: `all 0.4s ease ${i * 0.07 + 0.1}s` }}>
              {l.label}
            </Link>
          ) : (
            <a key={l.label} href={l.href} onClick={(e) => handleNav(e, l.href)} className="font-display text-4xl italic"
              style={{ color: "var(--color-gold-pale)", transform: open ? "translateX(0)" : "translateX(-30px)", opacity: open ? 1 : 0, transition: `all 0.4s ease ${i * 0.07 + 0.1}s` }}>
              {l.label}
            </a>
          )
        )}
      </div>

      {/* Scroll to top button */}
      <button
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-[1001] flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        style={{
          background: "rgba(13, 11, 8, 0.85)",
          borderColor: "rgba(200, 150, 12, 0.4)",
          backdropFilter: "blur(8px)",
          color: "var(--color-gold)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <ChevronUp size={18} />
      </button>
    </>
  );
}
