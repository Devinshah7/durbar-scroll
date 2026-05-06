import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Stars, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import Earth from "./Earth";
import EmberParticles from "./EmberParticles";

type Phase = 0 | 1 | 2 | 3 | 4;

interface Props {
  onComplete: () => void;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

function DiveCamera({ phase }: { phase: Phase }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 6);
    (camera as THREE.PerspectiveCamera).fov = 60;
    camera.updateProjectionMatrix();
  }, [camera]);

  useEffect(() => {
    if (phase === 1) {
      gsap.to(camera, {
        fov: 45,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => camera.updateProjectionMatrix(),
      });
    }
    if (phase === 3) {
      gsap.to(camera.position, {
        z: 0.4,
        y: 0.15,
        duration: 1.5,
        ease: "power3.in",
      });
    }
  }, [phase, camera]);
  return null;
}

function CinematicEffects({ phase, simplified }: { phase: Phase; simplified: boolean }) {
  const bloomRef = useRef<{ intensity: number }>({ intensity: 1.2 });
  useEffect(() => {
    if (phase === 3) {
      gsap.to(bloomRef.current, { intensity: 3.5, duration: 1.5, ease: "power2.in" });
    }
  }, [phase]);
  const [, force] = useState(0);
  useFrame(() => force((n) => (n + 1) % 1000000));

  if (simplified) {
    return (
      <EffectComposer>
        <Bloom intensity={Math.min(bloomRef.current.intensity, 1.5)} luminanceThreshold={0.4} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.7} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      <Bloom intensity={bloomRef.current.intensity} luminanceThreshold={0.25} luminanceSmoothing={0.9} mipmapBlur />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0008, 0.0012)}
        radialModulation
        modulationOffset={0.5}
        blendFunction={BlendFunction.NORMAL}
      />
      <Vignette eskil={false} offset={0.15} darkness={0.85} />
    </EffectComposer>
  );
}

export default function CinematicLoader({ onComplete }: Props) {
  const simplified = useIsMobile();
  const [phase, setPhase] = useState<Phase>(0);
  const [bgColor, setBgColor] = useState("#000005");
  const [showLogo, setShowLogo] = useState(false);
  const [showMandala, setShowMandala] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    setPhase(1);
    const t1 = setTimeout(() => setPhase(2), 1200);
    const t2 = setTimeout(() => {
      setPhase(3);
      setShowMandala(true);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: 1,
        duration: 1.2,
        onUpdate: () => {
          const c = new THREE.Color("#000005").lerp(new THREE.Color("#1a0a0a"), obj.v);
          setBgColor(`#${c.getHexString()}`);
        },
      });
    }, 3000);
    const t3 = setTimeout(() => {
      setPhase(4);
      setShowLogo(true);
      setShowMandala(false);
    }, 4500);
    const t4 = setTimeout(() => {
      setHidden(true);
      onComplete();
    }, 6500);
    return () => {
      [t1, t2, t3, t4].forEach(clearTimeout);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] transition-opacity duration-700"
      style={{
        background: phase >= 3 ? "#1a0a0a" : "#000005",
      }}
    >
      {/* 3D Scene */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: phase >= 4 ? 0 : 1 }}
      >
        <Canvas
          shadows
          dpr={[1, simplified ? 1.5 : 2]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          camera={{ position: [0, 0, 6], fov: 60 }}
          style={{ background: bgColor }}
        >
          <DiveCamera phase={phase} />
          <ambientLight intensity={0.15} color="#1a2540" />
          <directionalLight
            position={[5, 3, 5]}
            intensity={2.5}
            color="#fff4e0"
            castShadow
            shadow-mapSize={[simplified ? 1024 : 2048, simplified ? 1024 : 2048]}
          />
          <pointLight position={[-4, 0, 2]} color="#4a90ff" intensity={0.6} />
          {!simplified && <Environment preset="sunset" />}
          <Stars
            radius={100}
            depth={50}
            count={simplified ? 1500 : 5000}
            factor={4}
            fade
            speed={1}
          />

          <Suspense fallback={null}>
            <Earth phase={phase >= 4 ? 3 : (phase as 0 | 1 | 2 | 3)} simplified={simplified} />
          </Suspense>

          <EmberParticles count={simplified ? 150 : 400} active={phase >= 3} />

          <CinematicEffects phase={phase} simplified={simplified} />
        </Canvas>
      </div>

      {/* Mandala overlay during dive */}
      {showMandala && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <svg
            width="60vmin"
            height="60vmin"
            viewBox="0 0 200 200"
            className="opacity-90 mix-blend-screen"
            style={{
              animation: "mandala-bloom 1.2s cubic-bezier(0.2,0.7,0.2,1) forwards",
            }}
          >
            <g
              fill="none"
              stroke="#ffd27a"
              strokeWidth="0.6"
              style={{
                strokeDasharray: 1200,
                strokeDashoffset: 1200,
                animation: "mandala-draw 1.4s ease-out forwards",
              }}
            >
              <circle cx="100" cy="100" r="95" />
              <circle cx="100" cy="100" r="78" />
              <circle cx="100" cy="100" r="60" />
              <circle cx="100" cy="100" r="42" />
              <circle cx="100" cy="100" r="24" />
              <circle cx="100" cy="100" r="10" />
              {[0, 30, 60, 90, 120, 150].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 100 100)`}>
                  <polygon points="100,30 130,90 70,90" />
                  <polygon points="100,170 130,110 70,110" />
                </g>
              ))}
              {Array.from({ length: 16 }).map((_, i) => {
                const a = (i * 360) / 16;
                return (
                  <g key={i} transform={`rotate(${a} 100 100)`}>
                    <path d="M100 12 Q108 30 100 48 Q92 30 100 12 Z" />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      )}

      {/* Logo + tagline */}
      {showLogo && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="relative"
            style={{
              animation: "logo-rise 1s cubic-bezier(0.2,0.8,0.2,1) forwards",
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#d4af37",
                textShadow: "0 0 40px rgba(255,210,122,0.6), 0 0 80px rgba(212,175,55,0.4)",
              }}
            >
              <span style={{ marginRight: "0.4em", position: "relative", top: "-0.15em", fontSize: "0.6em" }}>
                M°
              </span>
              <span>THE MAJESTIC BHARAT</span>
            </div>
          </div>
          <p
            className="mt-6 text-center"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              color: "#e8c87a",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontSize: "clamp(0.7rem, 1.4vw, 0.95rem)",
              opacity: 0,
              animation: "tagline-fade 1.2s ease-out 0.4s forwards",
            }}
          >
            Where Every Experience Becomes A Sacred Journey
          </p>
        </div>
      )}
    </div>
  );
}
