import logoSrc from "@/assets/brand/majestic-bharat-logo.png";

interface LogoProps {
  /** Height in pixels (width auto-scales) */
  height?: number;
  /** Optional className */
  className?: string;
  /** For dark backgrounds, adds a subtle glow behind the logo */
  glow?: boolean;
  /** Alt text override */
  alt?: string;
}

export function Logo({ height = 48, className = "", glow = false, alt = "The Majestic Bharat — A Blend of Culture through Events & Tourism" }: LogoProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`} style={glow ? { filter: "drop-shadow(0 0 12px rgba(212,175,55,0.35))" } : undefined}>
      <img
        src={logoSrc}
        alt={alt}
        style={{ height, width: "auto", objectFit: "contain" }}
        draggable={false}
      />
    </div>
  );
}

export { logoSrc };
