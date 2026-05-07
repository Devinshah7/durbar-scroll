import { FadeUp } from "@/lib/reveal";
import bullockCart from "@/assets/bullock-cart.png";

const BRANDS = [
  "Reliance", "Samsung", "Audi", "Coca-Cola", "Red Bull",
  "Tata Sky", "SBI", "ICICI", "BMW", "Aditya Birla Ultratech",
  "Birla Sun Life", "Hyundai", "Moët Hennessy", "Axis Max Life",
  "McDowell's", "Tata Salt", "Bollywood Music Project", "Pop Tate's",
  "GSTTA", "Miss Malini", "eMedica",
];

function BrandMedallion({ brand }: { brand: string }) {
  return (
    <div
      className="flex-shrink-0 rounded-full border px-5 py-2.5 text-center transition-all duration-500 hover:border-[rgba(201,168,76,0.8)] hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
      style={{
        borderColor: "rgba(201,168,76,0.35)",
        background: "rgba(201,168,76,0.06)",
      }}
    >
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap"
        style={{ color: "var(--color-gold)" }}
      >
        {brand}
      </span>
    </div>
  );
}

export function AnimalCaravan() {
  const medallions = BRANDS.map((brand, i) => (
    <BrandMedallion key={`${brand}-${i}`} brand={brand} />
  ));

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "var(--section-dark)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <FadeUp>
          <p className="eyebrow mb-3">A Royal Procession of Trusted Partnerships</p>
          <h2
            className="section-heading font-serif-display"
            style={{ color: "var(--color-ivory)", fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Brands That Have Travelled With Us
          </h2>
          <div className="heading-flourish mx-auto">
            <span className="flourish-diamond">◆</span>
          </div>
        </FadeUp>
      </div>

      {/* Bullock Cart Illustration */}
      <FadeUp className="mt-10 flex justify-center px-6">
        <img
          src={bullockCart}
          alt="Traditional Varanasi-style decorated bullock cart — The Majestic Bharat"
          className="h-auto w-full max-w-[700px] opacity-90"
          loading="lazy"
          width={1920}
          height={640}
        />
      </FadeUp>

      {/* Brand marquee */}
      <div className="caravan-marquee mt-10 overflow-hidden" style={{ height: "56px" }}>
        <div className="caravan-track flex items-center gap-6">
          {medallions}
          {medallions}
        </div>
      </div>

      {/* Gold horizon line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 10%, rgba(201,168,76,0.3) 50%, transparent 90%)" }}
      />

      <style>{`
        .caravan-track {
          width: max-content;
          animation: caravan-scroll 50s linear infinite;
        }
        .caravan-marquee:hover .caravan-track {
          animation-play-state: paused;
        }
        @keyframes caravan-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
