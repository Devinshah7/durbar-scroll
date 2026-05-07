export function Footer() {
  return (
    <>
      {/* Final marquee */}
      <div className="marquee-strip" style={{ background: "var(--color-ink)" }}>
        <div
          className="marquee-inner"
          style={{ animationDuration: "60s" }}
        >
          {Array.from({ length: 2 }).flatMap((_, k) =>
            [
              "❖ THE MAJESTIC BHARAT",
              "EVENTS",
              "TOURISM",
              "CULTURE",
              "CELEBRITIES",
              "ATITHI DEVO BHAVA",
              "EST. 2015",
            ].map((t, i) => (
              <span
                key={`${k}-${i}`}
                style={{ color: "var(--color-gold)" }}
              >
                {t}
              </span>
            )),
          )}
        </div>
      </div>

      <footer
        className="relative pt-16"
        style={{ background: "var(--color-ink)" }}
      >
        {/* Kolam border */}
        <div
          className="absolute left-0 right-0 top-0 h-[20px]"
          style={{
            background: `repeating-linear-gradient(90deg, transparent 0 18px, var(--color-gold) 18px 19px, transparent 19px 38px)`,
            opacity: 0.5,
          }}
        />

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pb-12 md:grid-cols-3 md:px-10">
          <div>
            <div className="flex items-center gap-3">
              <span
                className="font-display text-4xl leading-none"
                style={{ color: "var(--color-gold)" }}
              >
                M°
              </span>
              <span
                className="text-[10px] tracking-[0.32em]"
                style={{ color: "var(--color-gold-pale)" }}
              >
                THE MAJESTIC BHARAT
              </span>
            </div>
            <p
              className="mt-6 max-w-xs font-display italic"
              style={{ color: "var(--color-gold-pale)", fontSize: "18px" }}
            >
              A Blend of Culture through Events & Tourism.
            </p>
            <p
              className="mt-3 text-[13px] leading-[1.7]"
              style={{ color: "rgba(253,246,227,0.55)" }}
            >
              India's premium experiential partner since 2015.
            </p>
            <div className="mt-5 flex gap-2.5">
              {["IG", "in", "▶"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border text-[11px]"
                  style={{
                    borderColor: "rgba(200,150,12,0.5)",
                    color: "var(--color-gold)",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow mb-5">Navigate</div>
            <ul className="space-y-2.5 text-[14px]" style={{ color: "rgba(253,246,227,0.8)" }}>
              <li><a href="#philosophy">About TMB</a></li>
              <li><a href="#pillars">Our Services</a></li>
              <li><a href="#gallery">Our Work</a></li>
              <li><a href="#team">The Team</a></li>
              <li><a href="#contact">Connect With Us</a></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-5">Contact</div>
            <ul className="space-y-2.5 text-[14px]" style={{ color: "rgba(253,246,227,0.8)" }}>
              <li><a href="tel:+919167122999" style={{ color: "inherit", textDecoration: "none" }}>+91 9167122999</a></li>
              <li>connect@themajesticbharat.com</li>
              <li>www.themajesticbharat.com</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="flex flex-col items-center justify-between gap-2 px-6 py-4 text-[10px] uppercase tracking-[0.25em] md:flex-row md:px-10"
          style={{
            background: "var(--color-gold)",
            color: "var(--color-ink)",
          }}
        >
          <span>© 2025 The Majestic Bharat. All Rights Reserved.</span>
          <span>Designed with Culture. Executed with Precision.</span>
        </div>
      </footer>
    </>
  );
}
