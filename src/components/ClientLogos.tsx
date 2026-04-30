const ROW1 = [
  "Samsung",
  "Red Bull",
  "Coca-Cola",
  "Audi",
  "BMW",
  "Hyundai",
  "Reliance",
  "SBI",
];
const ROW2 = [
  "ICICI Bank",
  "Aditya Birla UltraTech",
  "Tata Sky",
  "Tata Salt",
  "Moët Hennessy",
  "Axis Max Life",
  "Miss Malini",
  "Bollywood Music Project",
];

export function ClientLogos() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "var(--color-burgundy-dark)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold) 30%, var(--color-gold) 70%, transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold) 30%, var(--color-gold) 70%, transparent)",
        }}
      />

      <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
        <div className="eyebrow mb-5">Trusted by India's Finest</div>
        <h2
          className="font-display italic"
          style={{
            color: "var(--color-ivory)",
            fontSize: "clamp(34px, 4.5vw, 52px)",
            lineHeight: 1.1,
          }}
        >
          Brands That Chose Excellence.
        </h2>
      </div>

      <div className="mt-14 overflow-hidden">
        <div className="logos-row logos-row-1">
          {[...ROW1, ...ROW1].map((b, i) => (
            <span key={i} className="logo-name">
              {b.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="my-3 flex items-center justify-center gap-2 text-[10px]" style={{ color: "var(--color-gold)" }}>
        ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆
      </div>

      <div className="overflow-hidden">
        <div className="logos-row logos-row-2">
          {[...ROW2, ...ROW2].map((b, i) => (
            <span key={i} className="logo-name">
              {b.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
