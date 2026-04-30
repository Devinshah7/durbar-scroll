import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#philosophy" },
  { label: "Services", href: "#pillars" },
  { label: "Our Work", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Connect", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
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
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-10">
        <a href="#top" onClick={(e) => handleNav(e, "#top")} className="flex items-center gap-3">
          <span
            className="font-display text-3xl leading-none"
            style={{ color: "var(--color-gold)" }}
          >
            M°
          </span>
          <span
            className="hidden text-[10px] font-medium tracking-[0.32em] sm:inline-block"
            style={{ color: "var(--color-gold-pale)" }}
          >
            THE MAJESTIC BHARAT
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
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
    </header>
  );
}
