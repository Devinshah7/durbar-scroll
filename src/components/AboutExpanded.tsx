import { Diyas } from "@/lib/diyas";
import { FadeUp } from "@/lib/reveal";

const VALUES_LIST = [
  {
    title: "Integrity & Excellence",
    desc: "Always delivering with quality, transparency & class.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M14 24 C 10 22, 8 18, 10 14 C 12 10, 16 10, 20 14 C 24 10, 28 10, 30 14 C 32 18, 30 22, 26 24" />
        <path d="M12 24 L 20 32 L 28 24" />
      </svg>
    ),
  },
  {
    title: "Culture & Pride",
    desc: "Rooted in Indian identity, global in approach.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="20" cy="20" r="14" />
        <path d="M6 20 Q 20 8 34 20 Q 20 32 6 20" />
        <path d="M20 6 V 34" />
      </svg>
    ),
  },
  {
    title: "Partnership-Driven",
    desc: "Growing together with clients, vendors & communities.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="14" cy="20" r="9" />
        <circle cx="26" cy="20" r="9" />
      </svg>
    ),
  },
  {
    title: "Innovation with Impact",
    desc: "Every event & journey, purpose-led and memorable.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M20 6 C 14 14, 14 20, 20 28 C 26 20, 26 14, 20 6 Z" />
        <ellipse cx="20" cy="34" rx="6" ry="2" />
      </svg>
    ),
  },
];

export function AboutExpanded() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36" style={{ background: "linear-gradient(180deg, var(--section-maroon) 0%, var(--section-maroon) 60%, var(--section-terracotta) 100%)" }}>
      <Diyas count={10} />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <FadeUp className="mb-10">
          <p className="eyebrow mb-4">Our Legacy</p>
          <h2 className="section-heading font-serif-display" style={{ color: "var(--color-gold)" }}>
            The Majestic Bharat
          </h2>
          <div className="gold-underline mt-4" />
        </FadeUp>

        <FadeUp delay={0.05}>
          <p className="max-w-3xl font-display italic text-[20px] leading-[1.7] md:text-[22px]" style={{ color: "rgba(253,246,227,0.85)" }}>
            Where every guest feels like family. Across the world, India is admired for its culture, colours, and traditions. But what truly defines us is our spirit of hospitality.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-8 max-w-3xl space-y-5 text-[16px] leading-[1.8]" style={{ color: "rgba(253,246,227,0.75)" }}>
            <p>
              Founded in July 2015, The Majestic Bharat is a leading event management and corporate tourism company dedicated to creating extraordinary experiences. With 350+ events executed across India and abroad, we have redefined the event landscape by blending cultural richness, innovation, and world-class execution.
            </p>
            <p>
              At The Majestic Bharat, we believe an event is never just a gathering — it is an experience. A journey of warmth, elegance, and meaning, rooted in India's timeless ethos of <em style={{ color: "var(--color-gold-pale)" }}>Atithi Devo Bhava</em>.
            </p>
            <p>
              Led by a powerhouse trio — Priyana, Asheesh, and Shikha — TMB brings together decades of expertise across events, marketing, B2B strategy, art, and culture. Each partner contributes a unique dimension, making TMB a truly all-encompassing force in experiential storytelling.
            </p>
          </div>
        </FadeUp>

        {/* Vision & Passion Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <FadeUp>
            <div className="rounded-lg p-8" style={{ background: "rgba(255,255,255,0.04)", borderTop: "3px solid var(--color-gold)", border: "1px solid rgba(200,150,12,0.2)" }}>
              <p className="eyebrow mb-3">Our Vision</p>
              <h3 className="font-serif-display mb-4 text-[24px]" style={{ color: "var(--color-gold)" }}>Our Vision</h3>
              <p className="text-[15px] leading-[1.7]" style={{ color: "rgba(253,246,227,0.75)" }}>
                To showcase India's rich heritage and modern brilliance through immersive events and tourism experiences — fostering pride, connection, and inspiration.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="rounded-lg p-8" style={{ background: "rgba(255,255,255,0.04)", borderTop: "3px solid var(--color-gold)", border: "1px solid rgba(200,150,12,0.2)" }}>
              <p className="eyebrow mb-3">Our Passion</p>
              <h3 className="font-serif-display mb-4 text-[24px]" style={{ color: "var(--color-gold)" }}>Our Passion</h3>
              <p className="text-[15px] leading-[1.7]" style={{ color: "rgba(253,246,227,0.75)" }}>
                Crafting & curating corporate events and luxury travel where every detail is meticulously planned. Blending tradition with technology, we bring events to life with immersive experiences, artistic curation, and global expertise.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Our Values */}
        <FadeUp delay={0.15} className="mt-16">
          <p className="eyebrow mb-4">Our Values</p>
          <h3 className="section-heading font-serif-display mb-2" style={{ color: "var(--color-gold)", fontSize: "clamp(28px, 3.5vw, 40px)" }}>
            What Guides Us
          </h3>
          <div className="gold-underline mt-3 mb-8" />
        </FadeUp>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES_LIST.map((v, i) => (
            <FadeUp key={v.title} delay={0.1 + i * 0.05}>
              <div className="rounded-lg p-6 text-center transition-all duration-300 hover:border-[rgba(200,150,12,0.6)]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,150,12,0.2)" }}>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center" style={{ color: "var(--color-gold)" }}>
                  {v.icon}
                </div>
                <h4 className="font-serif-display mb-2 text-[18px]" style={{ color: "var(--color-gold)" }}>{v.title}</h4>
                <p className="text-[14px] leading-[1.6]" style={{ color: "rgba(253,246,227,0.7)" }}>{v.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
