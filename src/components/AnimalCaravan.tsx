import { FadeUp } from "@/lib/reveal";

const BRANDS = [
  "Reliance", "Samsung", "Audi", "Coca-Cola", "Red Bull",
  "Tata Sky", "SBI", "ICICI", "BMW", "Aditya Birla Ultratech",
  "Birla Sun Life", "Hyundai", "Moët Hennessy", "Axis Max Life",
  "McDowell's", "Tata Salt", "Bollywood Music Project", "Pop Tate's",
  "GSTTA", "Miss Malini", "eMedica",
];

/* Elephant silhouette SVG */
function Elephant({ brand }: { brand: string }) {
  return (
    <div className="caravan-animal flex flex-col items-center" style={{ width: 140 }}>
      {/* Brand banner on top */}
      <div className="mb-1 rounded border px-3 py-1 text-center" style={{
        borderColor: "rgba(201,168,76,0.4)",
        background: "rgba(201,168,76,0.1)",
      }}>
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap" style={{ color: "#C9A84C" }}>{brand}</span>
      </div>
      <svg viewBox="0 0 120 80" className="h-[60px] w-[90px] md:h-[80px] md:w-[120px]" style={{ color: "rgba(201,168,76,0.7)" }}>
        <g fill="currentColor">
          <ellipse cx="60" cy="50" rx="35" ry="22" />
          <circle cx="30" cy="35" r="16" />
          <path d="M18 38 Q14 55 20 65 L16 65 Q10 55 14 38Z" />
          <rect x="38" y="62" width="8" height="16" rx="3" />
          <rect x="54" y="62" width="8" height="16" rx="3" />
          <rect x="70" y="62" width="8" height="16" rx="3" />
          <rect x="82" y="62" width="8" height="16" rx="3" />
          <path d="M95 48 Q102 52 95 58" />
        </g>
      </svg>
    </div>
  );
}

function Camel({ brand }: { brand: string }) {
  return (
    <div className="caravan-animal flex flex-col items-center" style={{ width: 130 }}>
      <div className="mb-1 rounded border px-3 py-1 text-center" style={{
        borderColor: "rgba(201,168,76,0.4)",
        background: "rgba(201,168,76,0.1)",
      }}>
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap" style={{ color: "#C9A84C" }}>{brand}</span>
      </div>
      <svg viewBox="0 0 100 80" className="h-[60px] w-[75px] md:h-[80px] md:w-[100px]" style={{ color: "rgba(201,168,76,0.65)" }}>
        <g fill="currentColor">
          <ellipse cx="55" cy="40" rx="28" ry="16" />
          <ellipse cx="45" cy="34" rx="10" ry="12" />
          <circle cx="22" cy="22" r="10" />
          <path d="M14 18 Q8 12 12 8 L16 14Z" />
          <rect x="35" y="52" width="6" height="22" rx="2" />
          <rect x="48" y="52" width="6" height="22" rx="2" />
          <rect x="62" y="52" width="6" height="22" rx="2" />
          <rect x="74" y="52" width="6" height="22" rx="2" />
          <path d="M83 38 Q90 42 83 48" />
        </g>
      </svg>
    </div>
  );
}

function Horse({ brand }: { brand: string }) {
  return (
    <div className="caravan-animal flex flex-col items-center" style={{ width: 120 }}>
      <div className="mb-1 rounded border px-3 py-1 text-center" style={{
        borderColor: "rgba(201,168,76,0.4)",
        background: "rgba(201,168,76,0.1)",
      }}>
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap" style={{ color: "#C9A84C" }}>{brand}</span>
      </div>
      <svg viewBox="0 0 100 80" className="h-[60px] w-[75px] md:h-[80px] md:w-[100px]" style={{ color: "rgba(201,168,76,0.6)" }}>
        <g fill="currentColor">
          <ellipse cx="55" cy="40" rx="25" ry="14" />
          <ellipse cx="30" cy="28" rx="12" ry="14" />
          <path d="M22 18 Q16 8 22 4 L26 14Z" />
          <path d="M28 18 Q30 6 34 4 L34 16Z" />
          <rect x="38" y="50" width="5" height="22" rx="2" />
          <rect x="50" y="50" width="5" height="22" rx="2" />
          <rect x="62" y="50" width="5" height="22" rx="2" />
          <rect x="72" y="50" width="5" height="22" rx="2" />
          <path d="M80 38 Q92 35 95 42 Q90 40 82 42" />
        </g>
      </svg>
    </div>
  );
}

const ANIMALS = [Elephant, Camel, Horse] as const;

export function AnimalCaravan() {
  const items = BRANDS.map((brand, i) => {
    const Animal = ANIMALS[i % 3];
    return <Animal key={`${brand}-${i}`} brand={brand} />;
  });

  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{ background: "#0D0D1A" }}
    >
      {/* Gold horizon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />

      {/* Subtle sand texture */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8"
        style={{ background: "linear-gradient(to top, rgba(19,19,32,0.8), transparent)" }} />

      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <FadeUp>
          <p className="eyebrow mb-3">A Royal Procession of Trusted Partnerships</p>
          <h2 className="section-heading font-serif-display" style={{ color: "var(--color-ivory)", fontSize: "clamp(28px, 4vw, 44px)" }}>
            Brands That Have Travelled With Us
          </h2>
          <div className="gold-underline mx-auto mt-3" />
        </FadeUp>
      </div>

      <div className="caravan-marquee mt-10 overflow-hidden" style={{ height: "clamp(140px, 16vw, 180px)" }}>
        <div className="caravan-track flex items-end gap-10">
          {items}
          {items}
        </div>
      </div>

      <style>{`
        .caravan-track {
          width: max-content;
          animation: caravan-scroll 40s linear infinite;
        }
        .caravan-marquee:hover .caravan-track {
          animation-play-state: paused;
        }
        @keyframes caravan-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .caravan-track { animation-duration: 30s; }
        }
      `}</style>
    </section>
  );
}
