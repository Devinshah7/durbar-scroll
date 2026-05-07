import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface ComingSoonModalProps {
  open: boolean;
  pillarName: string;
  onClose: () => void;
}

export function ComingSoonModal({ open, pillarName, onClose }: ComingSoonModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open && cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10002] flex items-center justify-center p-6"
      style={{ background: "rgba(13,13,26,0.9)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-[720px] rounded-lg p-10 md:p-14"
        style={{
          background: "linear-gradient(180deg, #1A1A2E 0%, #0D0D1A 100%)",
          border: "2px solid #C9A84C",
          opacity: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl transition-opacity hover:opacity-70"
          style={{ color: "#C9A84C" }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Ornamental divider */}
        <div className="mb-8 text-center" style={{ color: "#C9A84C" }}>
          <span className="text-3xl">◆</span>
          <div className="mx-auto mt-2 h-px w-32" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
        </div>

        {/* Heading */}
        <h2
          className="text-center font-serif-display"
          style={{
            color: "#C9A84C",
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          Coming Soon
        </h2>

        {/* Sub-heading */}
        <p
          className="mt-4 text-center font-display italic"
          style={{ color: "var(--color-ivory)", fontSize: "clamp(18px, 2.5vw, 24px)" }}
        >
          Crafting something extraordinary for you.
        </p>

        {/* Body */}
        <p
          className="mx-auto mt-6 max-w-[480px] text-center text-[16px] leading-[1.7]"
          style={{ color: "rgba(253,246,227,0.75)" }}
        >
          Our <strong style={{ color: "#C9A84C" }}>{pillarName}</strong> universe is being curated with the same soul, splendour,
          and storytelling that defines The Majestic Bharat. Stay tuned — the journey unfolds soon.
        </p>

        {/* Email capture */}
        <div className="mx-auto mt-8 max-w-sm">
          {!submitted ? (
            <>
              <p className="mb-3 text-center text-[13px] tracking-[0.15em] uppercase" style={{ color: "#C9A84C" }}>
                Be the first to know
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded bg-transparent px-4 py-3 text-[14px] outline-none"
                  style={{
                    border: "1px solid rgba(201,168,76,0.5)",
                    color: "var(--color-ivory)",
                  }}
                />
                <button
                  onClick={() => { if (email) setSubmitted(true); }}
                  className="rounded px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] transition-all hover:brightness-110"
                  style={{
                    background: "#C9A84C",
                    color: "#0D0D1A",
                  }}
                >
                  Notify Me
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-[15px] font-display italic" style={{ color: "#C9A84C" }}>
              ✓ We'll notify you when {pillarName} launches.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
