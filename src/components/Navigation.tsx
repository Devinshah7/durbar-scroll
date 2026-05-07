import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Logo } from "@/components/Logo";
import { Link } from "@tanstack/react-router";

const leftLinks = [
  { label: "Home", href: "/gates", isRoute: true },
  { label: "About", href: "#philosophy", isRoute: false },
];

const rightLinks = [
  { label: "Team", href: "#team", isRoute: false },
  { label: "Connect", href: "#contact", isRoute: false },
  { label: "Journal", href: "/blogs", isRoute: true },
];

const dropdownItems = [
  { label: "TMB Events", href: "#pillars", comingSoon: false },
  { label: "TMB Tourism", href: null, comingSoon: true, pillar: "Tourism" },
  { label: "TMB Celebrities", href: null, comingSoon: true, pillar: "Celebrities" },
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
  const [dropdown, setDropdown] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    setDropdown(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDropdownClick = (item: typeof dropdownItems[0], e: React.MouseEvent) => {
    e.preventDefault();
    setDropdown(false);
    if (item.comingSoon && onComingSoon && item.pillar) {
      onComingSoon(item.pillar);
    } else if (item.href) {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
          {/* Left nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {links.slice(0, 2).map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => handleNav(e, l.href)} className="group relative text-[11px] font-medium uppercase tracking-[0.3em] transition-colors" style={{ color: "var(--color-gold-pale)" }}>
                {l.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" style={{ background: "var(--color-gold)" }} />
              </a>
            ))}
            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <button className="group relative text-[11px] font-medium uppercase tracking-[0.3em] transition-colors" style={{ color: "var(--color-gold-pale)" }}>
                Services ▾
              </button>
              {dropdown && (
                <div className="absolute left-0 top-full mt-2 w-48 rounded-lg py-2" style={{ background: "rgba(13,11,8,0.95)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,150,12,0.3)" }}>
                  {dropdownItems.map((item) => (
                    <a
                      key={item.label}
                      href="#"
                      onClick={(e) => handleDropdownClick(item, e)}
                      className="flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-[rgba(200,150,12,0.1)]"
                      style={{ color: item.comingSoon ? "rgba(253,246,227,0.5)" : "var(--color-gold-pale)" }}
                    >
                      {item.label}
                      {item.comingSoon && <span className="text-[8px] rounded border px-1.5 py-0.5" style={{ borderColor: "rgba(200,150,12,0.3)", color: "var(--color-gold)" }}>Soon</span>}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Center logo */}
          <div ref={logoRef} className="flex justify-center">
            <a href="#top" onClick={(e) => handleNav(e, "#top")}>
              <Logo height={48} glow />
            </a>
          </div>

          {/* Right nav */}
          <div className="flex items-center justify-end gap-7">
            <nav className="hidden items-center gap-7 md:flex">
              {links.slice(3).map((l) => (
                <a key={l.href} href={l.href} onClick={(e) => handleNav(e, l.href)} className="group relative text-[11px] font-medium uppercase tracking-[0.3em] transition-colors" style={{ color: "var(--color-gold-pale)" }}>
                  {l.label}
                  <span className="absolute -bottom-2 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" style={{ background: "var(--color-gold)" }} />
                </a>
              ))}
            </nav>

            <a href="#contact" onClick={(e) => handleNav(e, "#contact")} className="hidden md:inline-flex btn-outline-gold !py-2.5 !px-5 !text-[10px] rounded-full">
              Begin Your Experience
            </a>

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
        {links.map((l, i) => (
          <a key={l.href} href={l.href} onClick={(e) => handleNav(e, l.href)} className="font-display text-4xl italic"
            style={{ color: "var(--color-gold-pale)", transform: open ? "translateX(0)" : "translateX(-30px)", opacity: open ? 1 : 0, transition: `all 0.4s ease ${i * 0.07 + 0.1}s` }}>
            {l.label}
          </a>
        ))}
        {/* Mobile coming soon links */}
        <button onClick={() => { setOpen(false); onComingSoon?.("Tourism"); }} className="font-display text-2xl italic" style={{ color: "rgba(253,246,227,0.4)" }}>
          Tourism <span className="text-sm">(Coming Soon)</span>
        </button>
        <button onClick={() => { setOpen(false); onComingSoon?.("Celebrities"); }} className="font-display text-2xl italic" style={{ color: "rgba(253,246,227,0.4)" }}>
          Celebrities <span className="text-sm">(Coming Soon)</span>
        </button>
      </div>
    </>
  );
}
