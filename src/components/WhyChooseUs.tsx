import { FadeUp } from "@/lib/reveal";
import { Diyas } from "@/lib/diyas";

const STRENGTHS = [
  "20+ years of cross-industry experience",
  "Trusted vendor base pan-India & internationally",
  "Artist & influencer access for high-impact events",
  "End-to-End Execution: From Concept to Completion",
  "Agile team with attention to detail",
  "Personalised and scalable service model",
];

const WHY_US = [
  "One-stop-shop for Events, Tourism, Talent & Cultural Curation",
  "Flexible retainer & project-based models",
  "Personalised service with national & global delivery",
  "Deep understanding of audience behaviour & execution challenges",
  "Powerful network of artists, influencers, tourism boards & brand collaborations",
  "Global reach with an unmistakable Indian soul",
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "linear-gradient(180deg, var(--section-warm-dark) 0%, var(--section-terracotta) 50%, var(--section-terracotta) 100%)" }}>
      <Diyas count={8} />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <FadeUp className="mb-14 text-center">
          <p className="eyebrow mb-4">A Mad Mix of Heart, Hustle & Heritage</p>
          <h2 className="section-heading font-serif-display" style={{ color: "var(--color-ivory)" }}>
            Why Brands Should Choose Us
          </h2>
          <div className="gold-underline mx-auto mt-4" />
          <p className="mx-auto mt-5 max-w-lg font-display italic text-[18px]" style={{ color: "var(--color-gold)" }}>
            Fuelling experiences that hit different.
          </p>
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Our Strengths */}
          <FadeUp>
            <div className="rounded-lg p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,150,12,0.2)", boxShadow: "inset 0 0 40px rgba(200,150,12,0.05)" }}>
              <h3 className="font-serif-display mb-6 text-[24px]" style={{ color: "var(--color-gold)" }}>Our Strengths</h3>
              <ul className="space-y-4">
                {STRENGTHS.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[15px] leading-[1.6]" style={{ color: "rgba(253,246,227,0.8)" }}>
                    <span className="mt-1 shrink-0" style={{ color: "var(--color-gold)" }}>◆</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Why Choose Us */}
          <FadeUp delay={0.1}>
            <div className="rounded-lg p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,150,12,0.2)", boxShadow: "inset 0 0 40px rgba(200,150,12,0.05)" }}>
              <h3 className="font-serif-display mb-6 text-[24px]" style={{ color: "var(--color-gold)" }}>Why Choose Us</h3>
              <ul className="space-y-4">
                {WHY_US.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[15px] leading-[1.6]" style={{ color: "rgba(253,246,227,0.8)" }}>
                    <span className="mt-1 shrink-0" style={{ color: "var(--color-gold)" }}>◆</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="mt-12 text-center">
          <p className="mx-auto max-w-3xl font-display italic text-[20px] leading-[1.6]" style={{ color: "var(--color-gold)" }}>
            "With a global reach and an all-access pass to top vendors worldwide — we deliver world-class experiences with an unmistakable Indian soul."
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
