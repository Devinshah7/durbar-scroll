import { FadeUp } from "@/lib/reveal";

const BRAND_ANIMALS: { brand: string; animal: string; svg: JSX.Element }[] = [
  {
    brand: "Reliance",
    animal: "Elephant",
    svg: (
      <svg viewBox="0 0 160 120" className="h-full w-full">
        {/* Elephant with howdah */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Body */}
          <ellipse cx="80" cy="72" rx="38" ry="24" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Legs */}
          <rect x="52" y="88" width="8" height="22" rx="3" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="64" y="90" width="8" height="20" rx="3" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="90" y="88" width="8" height="22" rx="3" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="102" y="90" width="8" height="20" rx="3" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.2" />
          {/* Head */}
          <ellipse cx="122" cy="58" rx="16" ry="14" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Trunk */}
          <path d="M136 62 C140 68, 142 78, 138 88 C136 92, 132 90, 134 86 C136 80, 134 72, 130 66" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Ear */}
          <ellipse cx="112" cy="54" rx="8" ry="10" fill="var(--color-saffron)" stroke="var(--color-ink)" strokeWidth="1.2" opacity="0.7" />
          {/* Eye */}
          <circle cx="126" cy="54" r="2" fill="var(--color-ink)" />
          {/* Tusk */}
          <path d="M132 60 L136 56" stroke="var(--color-cream)" strokeWidth="2" />
          {/* Howdah (seat) */}
          <rect x="64" y="40" width="32" height="18" rx="3" fill="var(--color-saffron)" stroke="var(--color-gold)" strokeWidth="1.2" />
          <path d="M62 40 L96 40" stroke="var(--color-gold)" strokeWidth="1.5" />
          <path d="M60 58 L62 40 M98 40 L100 58" stroke="var(--color-gold)" strokeWidth="1" />
          {/* Decorative saddle blanket */}
          <rect x="58" y="56" width="44" height="6" rx="2" fill="var(--color-marigold)" stroke="var(--color-gold)" strokeWidth="0.8" />
          {/* Bells garland */}
          <circle cx="118" cy="68" r="2" fill="var(--color-gold)" />
          <circle cx="124" cy="72" r="1.5" fill="var(--color-gold)" />
          {/* Tail */}
          <path d="M42 68 C36 64, 34 70, 38 74" stroke="var(--color-ink)" strokeWidth="1.2" fill="none" />
        </g>
      </svg>
    ),
  },
  {
    brand: "Samsung",
    animal: "Peacock",
    svg: (
      <svg viewBox="0 0 160 120" className="h-full w-full">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Tail fan */}
          {[−40, −25, −10, 5, 20, 35].map((a, i) => (
            <ellipse key={i} cx="50" cy="70" rx="8" ry="35" fill={i % 2 === 0 ? "var(--color-saffron)" : "var(--color-marigold)"} stroke="var(--color-gold)" strokeWidth="0.6" transform={`rotate(${a} 50 70)`} opacity="0.6" />
          ))}
          {/* Tail eye spots */}
          {[−30, −10, 10, 30].map((a, i) => (
            <circle key={i} cx={50 + Math.sin(a * Math.PI / 180) * 28} cy={70 - Math.cos(a * Math.PI / 180) * 28} r="3" fill="var(--color-indigo-subtle)" stroke="var(--color-gold)" strokeWidth="0.5" />
          ))}
          {/* Body */}
          <ellipse cx="90" cy="78" rx="22" ry="14" fill="var(--color-indigo-subtle)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Neck */}
          <path d="M106 72 C110 60, 112 48, 114 40" stroke="var(--color-ink)" strokeWidth="2.5" />
          <path d="M106 72 C110 60, 112 48, 114 40" stroke="var(--color-indigo-subtle)" strokeWidth="1.8" />
          {/* Head */}
          <circle cx="114" cy="36" r="6" fill="var(--color-indigo-subtle)" stroke="var(--color-ink)" strokeWidth="1.2" />
          {/* Crown */}
          <line x1="112" y1="30" x2="111" y2="22" stroke="var(--color-gold)" strokeWidth="1" />
          <line x1="114" y1="30" x2="114" y2="20" stroke="var(--color-gold)" strokeWidth="1" />
          <line x1="116" y1="30" x2="117" y2="22" stroke="var(--color-gold)" strokeWidth="1" />
          <circle cx="111" cy="21" r="1.5" fill="var(--color-gold)" />
          <circle cx="114" cy="19" r="1.5" fill="var(--color-gold)" />
          <circle cx="117" cy="21" r="1.5" fill="var(--color-gold)" />
          {/* Eye */}
          <circle cx="116" cy="35" r="1.5" fill="var(--color-ink)" />
          {/* Beak */}
          <path d="M120 36 L124 35 L120 37" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="0.8" />
          {/* Legs */}
          <line x1="84" y1="90" x2="84" y2="108" stroke="var(--color-ink)" strokeWidth="1.2" />
          <line x1="96" y1="90" x2="96" y2="108" stroke="var(--color-ink)" strokeWidth="1.2" />
          {/* Saddle/platform */}
          <rect x="78" y="60" width="24" height="10" rx="2" fill="var(--color-saffron)" stroke="var(--color-gold)" strokeWidth="1" />
          <rect x="76" y="58" width="28" height="4" rx="1" fill="var(--color-marigold)" stroke="var(--color-gold)" strokeWidth="0.6" />
        </g>
      </svg>
    ),
  },
  {
    brand: "Audi",
    animal: "Horse",
    svg: (
      <svg viewBox="0 0 160 120" className="h-full w-full">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Body */}
          <ellipse cx="75" cy="68" rx="32" ry="18" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Legs */}
          <path d="M54 82 L50 108" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M62 84 L60 108" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M88 82 L92 108" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M96 84 L98 108" stroke="var(--color-ink)" strokeWidth="2" />
          {/* Neck */}
          <path d="M102 60 C108 48, 112 38, 118 30" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M96 62 C102 50, 106 40, 112 32" stroke="var(--color-terracotta)" strokeWidth="6" />
          {/* Head */}
          <ellipse cx="120" cy="26" rx="12" ry="8" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.5" transform="rotate(-10 120 26)" />
          {/* Eye */}
          <circle cx="124" cy="24" r="1.5" fill="var(--color-ink)" />
          {/* Ear */}
          <path d="M116 18 L114 10 L118 16" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1" />
          {/* Mane */}
          <path d="M108 34 C106 30, 104 26, 106 22" stroke="var(--color-ink)" strokeWidth="1.5" />
          <path d="M104 40 C102 36, 100 32, 102 28" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Tail */}
          <path d="M43 62 C36 56, 32 60, 34 68 C32 72, 36 74, 40 70" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
          {/* Saddle */}
          <rect x="62" y="46" width="28" height="12" rx="3" fill="var(--color-saffron)" stroke="var(--color-gold)" strokeWidth="1.2" />
          <rect x="60" y="44" width="32" height="4" rx="1" fill="var(--color-marigold)" stroke="var(--color-gold)" strokeWidth="0.6" />
          {/* Saddle blanket fringe */}
          <path d="M60 58 L62 62 L66 58 L70 62 L74 58 L78 62 L82 58 L86 62 L90 58 L92 62" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" />
          {/* Bridle */}
          <path d="M130 28 L134 32 L128 34" stroke="var(--color-gold)" strokeWidth="1" />
          {/* Bells */}
          <circle cx="128" cy="36" r="1.5" fill="var(--color-gold)" />
        </g>
      </svg>
    ),
  },
  {
    brand: "Coca-Cola",
    animal: "Camel",
    svg: (
      <svg viewBox="0 0 160 120" className="h-full w-full">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Body */}
          <ellipse cx="78" cy="66" rx="30" ry="16" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Hump */}
          <ellipse cx="72" cy="48" rx="12" ry="10" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="1.2" />
          {/* Legs */}
          <path d="M56 78 L54 108" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M66 80 L64 108" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M92 78 L94 108" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M100 80 L102 108" stroke="var(--color-ink)" strokeWidth="2" />
          {/* Neck */}
          <path d="M104 62 C110 50, 116 38, 120 26" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M100 64 C106 52, 112 40, 116 28" stroke="var(--color-marigold)" strokeWidth="5" />
          {/* Head */}
          <ellipse cx="122" cy="22" rx="10" ry="7" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Eye */}
          <circle cx="126" cy="20" r="1.5" fill="var(--color-ink)" />
          {/* Ear */}
          <ellipse cx="118" cy="16" rx="3" ry="4" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="0.8" />
          {/* Nostril */}
          <circle cx="130" cy="24" r="1" fill="var(--color-ink)" />
          {/* Tail */}
          <path d="M48 62 C42 58, 38 62, 40 68" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
          {/* Howdah on hump */}
          <rect x="60" y="34" width="24" height="10" rx="2" fill="var(--color-saffron)" stroke="var(--color-gold)" strokeWidth="1.2" />
          <path d="M58 34 L84 34" stroke="var(--color-gold)" strokeWidth="1.5" />
          {/* Decorative necklace */}
          <path d="M108 56 C112 60, 116 58, 120 54" stroke="var(--color-gold)" strokeWidth="1" />
          <circle cx="114" cy="58" r="1.5" fill="var(--color-gold)" />
        </g>
      </svg>
    ),
  },
  {
    brand: "Red Bull",
    animal: "Bull",
    svg: (
      <svg viewBox="0 0 160 120" className="h-full w-full">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Body */}
          <ellipse cx="76" cy="68" rx="34" ry="20" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Legs */}
          <rect x="50" y="84" width="8" height="24" rx="3" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="62" y="86" width="8" height="22" rx="3" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="88" y="84" width="8" height="24" rx="3" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="100" y="86" width="8" height="22" rx="3" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.2" />
          {/* Head */}
          <ellipse cx="116" cy="58" rx="14" ry="12" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Horns */}
          <path d="M108 48 C104 38, 100 36, 98 40" stroke="var(--color-cream)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M122 48 C126 38, 130 36, 132 40" stroke="var(--color-cream)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Eye */}
          <circle cx="120" cy="56" r="2" fill="var(--color-ink)" />
          {/* Nostril */}
          <circle cx="128" cy="62" r="1.5" fill="var(--color-ink)" opacity="0.5" />
          {/* Hump */}
          <ellipse cx="88" cy="48" rx="14" ry="8" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1" />
          {/* Saddle */}
          <rect x="64" y="42" width="26" height="10" rx="2" fill="var(--color-saffron)" stroke="var(--color-gold)" strokeWidth="1.2" />
          <rect x="62" y="40" width="30" height="4" rx="1" fill="var(--color-marigold)" stroke="var(--color-gold)" strokeWidth="0.6" />
          {/* Bells */}
          <circle cx="112" cy="70" r="2" fill="var(--color-gold)" />
          <circle cx="108" cy="72" r="1.5" fill="var(--color-gold)" />
          {/* Tail */}
          <path d="M42 64 C36 58, 32 62, 34 70" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    ),
  },
  {
    brand: "Tata Sky",
    animal: "Deer",
    svg: (
      <svg viewBox="0 0 160 120" className="h-full w-full">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Body */}
          <ellipse cx="78" cy="68" rx="28" ry="16" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Legs */}
          <path d="M58 80 L56 108" stroke="var(--color-ink)" strokeWidth="1.8" />
          <path d="M66 82 L65 108" stroke="var(--color-ink)" strokeWidth="1.8" />
          <path d="M90 80 L92 108" stroke="var(--color-ink)" strokeWidth="1.8" />
          <path d="M98 82 L99 108" stroke="var(--color-ink)" strokeWidth="1.8" />
          {/* Neck */}
          <path d="M100 60 C104 48, 108 38, 112 30" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M96 62 C100 50, 104 40, 108 32" stroke="var(--color-marigold)" strokeWidth="4" />
          {/* Head */}
          <ellipse cx="114" cy="26" rx="9" ry="7" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Antlers */}
          <path d="M110 20 L106 10 M106 10 L104 6 M106 10 L108 6" stroke="var(--color-gold)" strokeWidth="1.2" />
          <path d="M118 20 L122 10 M122 10 L124 6 M122 10 L120 6" stroke="var(--color-gold)" strokeWidth="1.2" />
          {/* Eye */}
          <circle cx="118" cy="24" r="1.5" fill="var(--color-ink)" />
          {/* Ear */}
          <ellipse cx="108" cy="20" rx="3" ry="5" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="0.8" />
          {/* Spots */}
          <circle cx="70" cy="64" r="2" fill="var(--color-gold-pale)" opacity="0.4" />
          <circle cx="80" cy="60" r="2" fill="var(--color-gold-pale)" opacity="0.4" />
          <circle cx="88" cy="66" r="2" fill="var(--color-gold-pale)" opacity="0.4" />
          {/* Tail */}
          <path d="M50 64 C46 60, 44 64, 46 68" stroke="var(--color-ink)" strokeWidth="1.2" fill="none" />
          {/* Small saddle */}
          <rect x="66" y="48" width="24" height="10" rx="2" fill="var(--color-saffron)" stroke="var(--color-gold)" strokeWidth="1" />
        </g>
      </svg>
    ),
  },
  {
    brand: "BMW",
    animal: "Tiger",
    svg: (
      <svg viewBox="0 0 160 120" className="h-full w-full">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Body */}
          <ellipse cx="76" cy="70" rx="32" ry="18" fill="var(--color-saffron)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Stripes */}
          <path d="M60 62 L64 78" stroke="var(--color-ink)" strokeWidth="1.5" opacity="0.4" />
          <path d="M70 60 L72 80" stroke="var(--color-ink)" strokeWidth="1.5" opacity="0.4" />
          <path d="M80 60 L82 80" stroke="var(--color-ink)" strokeWidth="1.5" opacity="0.4" />
          <path d="M90 62 L92 78" stroke="var(--color-ink)" strokeWidth="1.5" opacity="0.4" />
          {/* Legs */}
          <rect x="50" y="84" width="8" height="24" rx="3" fill="var(--color-saffron)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="62" y="86" width="8" height="22" rx="3" fill="var(--color-saffron)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="88" y="84" width="8" height="24" rx="3" fill="var(--color-saffron)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="100" y="86" width="8" height="22" rx="3" fill="var(--color-saffron)" stroke="var(--color-ink)" strokeWidth="1.2" />
          {/* Head */}
          <circle cx="114" cy="60" r="14" fill="var(--color-saffron)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Face markings */}
          <path d="M108 54 L106 50" stroke="var(--color-ink)" strokeWidth="1.2" opacity="0.5" />
          <path d="M120 54 L122 50" stroke="var(--color-ink)" strokeWidth="1.2" opacity="0.5" />
          {/* Ears */}
          <circle cx="104" cy="50" r="4" fill="var(--color-saffron)" stroke="var(--color-ink)" strokeWidth="1" />
          <circle cx="124" cy="50" r="4" fill="var(--color-saffron)" stroke="var(--color-ink)" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="110" cy="58" r="2" fill="var(--color-ink)" />
          <circle cx="118" cy="58" r="2" fill="var(--color-ink)" />
          {/* Nose */}
          <circle cx="114" cy="64" r="2" fill="var(--color-ink)" opacity="0.6" />
          {/* Whiskers */}
          <path d="M100 62 L106 62" stroke="var(--color-ink)" strokeWidth="0.8" />
          <path d="M100 66 L106 66" stroke="var(--color-ink)" strokeWidth="0.8" />
          <path d="M122 62 L128 62" stroke="var(--color-ink)" strokeWidth="0.8" />
          <path d="M122 66 L128 66" stroke="var(--color-ink)" strokeWidth="0.8" />
          {/* Tail */}
          <path d="M44 66 C36 58, 30 64, 32 72 C30 76, 34 78, 38 74" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
          {/* Saddle */}
          <rect x="62" y="48" width="28" height="10" rx="2" fill="var(--color-marigold)" stroke="var(--color-gold)" strokeWidth="1.2" />
        </g>
      </svg>
    ),
  },
  {
    brand: "Hyundai",
    animal: "Parrot",
    svg: (
      <svg viewBox="0 0 160 120" className="h-full w-full">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Body */}
          <ellipse cx="80" cy="60" rx="20" ry="28" fill="var(--color-saffron)" stroke="var(--color-ink)" strokeWidth="1.5" transform="rotate(-15 80 60)" />
          {/* Wing */}
          <ellipse cx="72" cy="58" rx="14" ry="20" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="1" transform="rotate(-10 72 58)" opacity="0.7" />
          {/* Head */}
          <circle cx="96" cy="34" r="12" fill="var(--color-saffron)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Eye ring */}
          <circle cx="100" cy="32" r="4" fill="var(--color-ivory)" stroke="var(--color-ink)" strokeWidth="0.8" />
          <circle cx="100" cy="32" r="2" fill="var(--color-ink)" />
          {/* Beak */}
          <path d="M108 30 C114 28, 114 34, 108 36 Z" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1" />
          {/* Crest */}
          <path d="M88 24 C86 18, 90 14, 94 18" stroke="var(--color-saffron)" strokeWidth="2" fill="var(--color-saffron)" />
          {/* Tail feathers */}
          <path d="M66 82 C60 96, 56 106, 52 112" stroke="var(--color-marigold)" strokeWidth="2.5" />
          <path d="M70 84 C66 98, 62 108, 60 114" stroke="var(--color-saffron)" strokeWidth="2" />
          <path d="M74 86 C72 100, 70 108, 68 112" stroke="var(--color-gold)" strokeWidth="1.5" />
          {/* Feet/perch */}
          <path d="M84 86 L82 96 L78 98 M82 96 L86 98" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Saddle/banner on back */}
          <rect x="72" y="42" width="20" height="10" rx="2" fill="var(--color-gold-pale)" stroke="var(--color-gold)" strokeWidth="1" />
        </g>
      </svg>
    ),
  },
  {
    brand: "SBI",
    animal: "Monkey",
    svg: (
      <svg viewBox="0 0 160 120" className="h-full w-full">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Body */}
          <ellipse cx="80" cy="68" rx="22" ry="18" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Belly */}
          <ellipse cx="82" cy="72" rx="12" ry="10" fill="var(--color-cream)" stroke="none" opacity="0.5" />
          {/* Legs */}
          <path d="M64 82 C60 90, 56 98, 54 106" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M96 82 C100 90, 104 98, 106 106" stroke="var(--color-ink)" strokeWidth="2" />
          {/* Arms */}
          <path d="M62 62 C56 58, 52 62, 54 68" stroke="var(--color-ink)" strokeWidth="2" />
          <path d="M98 62 C104 58, 108 62, 106 68" stroke="var(--color-ink)" strokeWidth="2" />
          {/* Head */}
          <circle cx="80" cy="42" r="14" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Face */}
          <ellipse cx="80" cy="46" rx="9" ry="7" fill="var(--color-cream)" stroke="none" opacity="0.5" />
          {/* Eyes */}
          <circle cx="76" cy="40" r="2" fill="var(--color-ink)" />
          <circle cx="84" cy="40" r="2" fill="var(--color-ink)" />
          {/* Mouth */}
          <path d="M77 48 C79 50, 81 50, 83 48" stroke="var(--color-ink)" strokeWidth="1" />
          {/* Ears */}
          <circle cx="66" cy="38" r="5" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1" />
          <circle cx="94" cy="38" r="5" fill="var(--color-terracotta)" stroke="var(--color-ink)" strokeWidth="1" />
          {/* Tail */}
          <path d="M58 78 C48 74, 40 80, 36 72 C32 64, 28 68, 30 76" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
          {/* Small saddle/pack */}
          <rect x="68" y="52" width="24" height="8" rx="2" fill="var(--color-saffron)" stroke="var(--color-gold)" strokeWidth="1" />
        </g>
      </svg>
    ),
  },
  {
    brand: "ICICI",
    animal: "Ox",
    svg: (
      <svg viewBox="0 0 160 120" className="h-full w-full">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Body */}
          <ellipse cx="76" cy="68" rx="32" ry="18" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Legs */}
          <rect x="50" y="82" width="8" height="26" rx="3" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="62" y="84" width="8" height="24" rx="3" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="90" y="82" width="8" height="26" rx="3" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x="102" y="84" width="8" height="24" rx="3" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="1.2" />
          {/* Head */}
          <ellipse cx="116" cy="58" rx="14" ry="12" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="1.5" />
          {/* Horns */}
          <path d="M106 50 C102 40, 98 38, 96 42" stroke="var(--color-gold)" strokeWidth="2.5" />
          <path d="M124 50 C128 40, 132 38, 134 42" stroke="var(--color-gold)" strokeWidth="2.5" />
          {/* Eye */}
          <circle cx="120" cy="56" r="2" fill="var(--color-ink)" />
          {/* Nostril */}
          <circle cx="128" cy="62" r="1.5" fill="var(--color-ink)" opacity="0.4" />
          {/* Hump */}
          <ellipse cx="90" cy="50" rx="12" ry="6" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="1" />
          {/* Cart yoke */}
          <path d="M106 64 L140 64" stroke="var(--color-gold)" strokeWidth="2" />
          {/* Saddle */}
          <rect x="64" y="44" width="26" height="10" rx="2" fill="var(--color-saffron)" stroke="var(--color-gold)" strokeWidth="1.2" />
          {/* Garland */}
          <path d="M110 66 C112 70, 116 72, 120 70 C124 72, 128 70, 130 66" stroke="var(--color-marigold)" strokeWidth="1" />
          <circle cx="116" cy="72" r="1.5" fill="var(--color-marigold)" />
          <circle cx="124" cy="72" r="1.5" fill="var(--color-marigold)" />
          {/* Tail */}
          <path d="M44 64 C38 58, 34 62, 36 70" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    ),
  },
];

function AnimalBrandCard({ brand, svg }: { brand: string; animal: string; svg: JSX.Element }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2" style={{ width: "140px" }}>
      <div className="h-[100px] w-[140px]">{svg}</div>
      <div
        className="rounded-full border px-4 py-1.5 text-center"
        style={{
          borderColor: "rgba(148,72,48,0.35)",
          background: "rgba(148,72,48,0.06)",
        }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
          style={{ color: "var(--color-terracotta)" }}
        >
          {brand}
        </span>
      </div>
    </div>
  );
}

export function AnimalCaravan() {
  const cards = BRAND_ANIMALS.map((item, i) => (
    <AnimalBrandCard key={`${item.brand}-${i}`} brand={item.brand} animal={item.animal} svg={item.svg} />
  ));

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "linear-gradient(180deg, var(--section-cream) 0%, var(--section-light) 30%, var(--section-cream) 100%)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <FadeUp>
          <p className="eyebrow mb-3" style={{ color: "var(--color-terracotta)" }}>A Royal Procession of Trusted Partnerships</p>
          <h2
            className="section-heading font-serif-display"
            style={{ color: "var(--color-ink)", fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Brands That Have Travelled With Us
          </h2>
          <div className="heading-flourish mx-auto" style={{ color: "var(--color-terracotta)" }}>
            <span className="flourish-diamond">◆</span>
          </div>
        </FadeUp>
      </div>

      {/* Animal procession marquee */}
      <div className="caravan-marquee mt-10 overflow-hidden" style={{ height: "140px" }}>
        <div className="caravan-track flex items-end gap-10 px-6">
          {cards}
          {cards}
        </div>
      </div>

      {/* Gold horizon line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 10%, rgba(148,72,48,0.3) 50%, transparent 90%)" }}
      />

      <style>{`
        .caravan-track {
          width: max-content;
          animation: caravan-scroll 60s linear infinite;
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
