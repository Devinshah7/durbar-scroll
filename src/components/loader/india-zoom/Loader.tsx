import { lazy, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { MandalaOverlay } from "./MandalaOverlay";
import { LoaderErrorBoundary } from "./ErrorBoundary";

const Scene = lazy(() => import("./Scene").then((m) => ({ default: m.Scene })));

function LotusSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0510]">
      <svg width="80" height="80" viewBox="-50 -50 100 100" className="animate-spin" style={{ animationDuration: "3s" }}>
        <g fill="none" stroke="#d4af37" strokeWidth="1.5">
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * 360;
            return (
              <ellipse key={i} cx="0" cy="-20" rx="8" ry="20" transform={`rotate(${a})`} opacity={0.7} />
            );
          })}
          <circle cx="0" cy="0" r="6" fill="#ffd27a" stroke="none" />
        </g>
      </svg>
    </div>
  );
}

export function Loader({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);
  const [fade, setFade] = useState(false);
  const [mandalaPos, setMandalaPos] = useState<{ x: number; y: number } | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const refs = useRef({
    bgColor: new THREE.Color("#000005"),
    bloom: { intensity: isMobile ? 0.8 : 1.2 },
    particlesOpacity: { value: 0 },
    sceneOpacity: { value: 1 },
    logoOpacity: { value: 0 },
    logoScale: { value: 2.5 },
  }).current;

  const mandala = useRef({ progress: 0 });
  const [mandalaProgress, setMandalaProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === 3) {
      gsap.to(mandala.current, {
        progress: 1,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => setMandalaProgress(mandala.current.progress),
      });
    }
  }, [phase]);

  const handleDone = () => {
    setFade(true);
    setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, 800);
  };

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{
        background: "radial-gradient(circle at 50% 60%, #150818 0%, #0a0518 50%, #000005 100%)",
        opacity: fade ? 0 : 1,
        transition: "opacity 0.8s ease",
      }}
    >
      <LoaderErrorBoundary>
        <Suspense fallback={<LotusSpinner />}>
          <Scene
            isMobile={isMobile}
            onPhase={setPhase}
            onDone={handleDone}
            refs={refs}
            onMandalaPos={setMandalaPos}
          />
        </Suspense>
      </LoaderErrorBoundary>

      {phase === 3 && (
        <MandalaOverlay progress={mandalaProgress} position={mandalaPos} />
      )}
    </div>
  );
}
