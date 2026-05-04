import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Stars, Text, Html } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PILLAR_LABELS = ["EVENTS", "TOURISM", "CULTURE", "CELEBRITIES"];
const PILLAR_X = [-4.5, -1.5, 1.5, 4.5];

const PILLAR_DETAILS: Record<string, string[]> = {
  EVENTS: ["Corporate Galas", "Cultural Festivals", "Grand Weddings"],
  TOURISM: ["Heritage Tours", "MICE Travel", "Luxury Retreats"],
  CULTURE: ["Folk Art Revival", "Sacred Journeys", "Artisan Showcases"],
  CELEBRITIES: ["Brand Partnerships", "Talent Management", "Star Experiences"],
};

/* ------------------------------------------------------------------ */
/*  Single Dravidian pillar                                            */
/* ------------------------------------------------------------------ */
function DravidianPillar({
  x,
  label,
  progress,
  index,
}: {
  x: number;
  label: string;
  progress: number;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Stagger: each pillar starts at different scroll progress
  const start = 0.1 + index * 0.125;
  const end = start + 0.12;
  const pillarProgress = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  const scaleY = THREE.MathUtils.lerp(0.001, 1, easeOutCubic(pillarProgress));
  const labelOpacity = pillarProgress > 0.8 ? (pillarProgress - 0.8) / 0.2 : 0;

  // Sandstone material
  const sandstone = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c8a97e"),
        roughness: 0.85,
        metalness: 0,
      }),
    [],
  );

  const darkSandstone = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#a88a60"),
        roughness: 0.9,
        metalness: 0,
      }),
    [],
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#d4af37"),
        metalness: 0.9,
        roughness: 0.3,
        emissive: new THREE.Color("#d4af37"),
        emissiveIntensity: 0.2,
      }),
    [],
  );

  // Hover effect
  useFrame(() => {
    if (!groupRef.current) return;
    const targetEmissive = hovered ? 0.4 : 0;
    sandstone.emissiveIntensity = THREE.MathUtils.lerp(
      sandstone.emissiveIntensity,
      targetEmissive,
      0.1,
    );
    sandstone.emissive = new THREE.Color("#ffaa00");
    const targetScale = hovered ? 1.02 : 1;
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.1);
  });

  return (
    <group
      ref={groupRef}
      position={[x, -2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Scale from bottom */}
      <group scale={[1, scaleY, 1]}>
        {/* Plinth base */}
        <mesh position={[0, 0.15, 0]} material={darkSandstone} castShadow>
          <boxGeometry args={[1.2, 0.3, 1.2]} />
        </mesh>
        <mesh position={[0, 0.4, 0]} material={darkSandstone} castShadow>
          <boxGeometry args={[0.95, 0.2, 0.95]} />
        </mesh>

        {/* Column shaft */}
        <mesh position={[0, 3, 0]} material={sandstone} castShadow>
          <cylinderGeometry args={[0.35, 0.4, 4.8, 32, 1, false]} />
        </mesh>

        {/* Capital — torus ring */}
        <mesh position={[0, 5.5, 0]} material={sandstone} castShadow>
          <torusGeometry args={[0.42, 0.08, 16, 64]} />
        </mesh>

        {/* Capital — top abacus */}
        <mesh position={[0, 5.7, 0]} material={darkSandstone} castShadow>
          <boxGeometry args={[1, 0.15, 1]} />
        </mesh>

        {/* Carved label */}
        <Text
          position={[0, 3, 0.42]}
          fontSize={0.22}
          font="https://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-tbnfY3lCA.woff2"
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          material={goldMat}
          fillOpacity={labelOpacity}
        >
          {label}
        </Text>
      </group>

      {/* Dust particles (when rising) */}
      {pillarProgress > 0.01 && pillarProgress < 0.95 && (
        <DustBurst x={0} progress={pillarProgress} />
      )}

      {/* Diya light at base after risen */}
      {pillarProgress > 0.9 && (
        <pointLight
          position={[0, 0.5, 0.6]}
          color="#ff7a3a"
          intensity={0.8 * ((pillarProgress - 0.9) / 0.1)}
          distance={4}
        />
      )}

      {/* Hover tooltip */}
      {hovered && pillarProgress > 0.95 && (
        <Html position={[0, 6.5, 0]} center transform={false}>
          <div
            className="pointer-events-none rounded-sm border px-4 py-3 text-center"
            style={{
              background: "rgba(26, 10, 10, 0.9)",
              borderColor: "#d4af37",
              minWidth: 160,
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="mb-1 text-xs font-bold tracking-[0.2em]"
              style={{ color: "#d4af37", fontFamily: "'Cinzel', serif" }}
            >
              {label}
            </div>
            {PILLAR_DETAILS[label]?.map((item) => (
              <div
                key={item}
                className="text-[10px]"
                style={{ color: "#f5e9d0" }}
              >
                {item}
              </div>
            ))}
          </div>
        </Html>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Dust particles                                                     */
/* ------------------------------------------------------------------ */
function DustBurst({ x, progress }: { x: number; progress: number }) {
  const ref = useRef<THREE.Points>(null);
  const count = 40;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 1.5;
      arr[i * 3 + 1] = Math.random() * 0.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * 0.5;
      arr[i * 3] += (Math.random() - 0.5) * delta * 0.3;
    }
    posAttr.needsUpdate = true;
    ref.current.material.opacity = Math.max(0, 1 - progress);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        color="#c4a47a"
        size={0.05}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Gopuram roof                                                       */
/* ------------------------------------------------------------------ */
function GopuramRoof({ progress }: { progress: number }) {
  const roofProgress = Math.min(1, Math.max(0, (progress - 0.6) / 0.15));
  const eased = easeElasticOut(roofProgress);
  const posY = THREE.MathUtils.lerp(12, 5.8, eased);
  const scaleX = THREE.MathUtils.lerp(0.01, 1, eased);

  const sandstone = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#b89468"),
        roughness: 0.85,
        metalness: 0,
      }),
    [],
  );

  // Diya flame flicker
  const flameRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (flameRef.current && roofProgress > 0.8) {
      const t = state.clock.elapsedTime;
      flameRef.current.intensity = 1.5 + Math.sin(t * 8) * 0.3 + Math.random() * 0.1;
    }
  });

  if (roofProgress <= 0) return null;

  return (
    <group position={[0, posY, 0]} scale={[scaleX, 1, 1]}>
      {/* Central lintel beam */}
      <mesh material={sandstone} castShadow>
        <boxGeometry args={[12, 0.3, 1.2]} />
      </mesh>

      {/* Pyramidal top */}
      <mesh position={[0, 0.8, 0]} material={sandstone} castShadow>
        <coneGeometry args={[2, 1.5, 4]} />
      </mesh>

      {/* Apex diya flame light */}
      {roofProgress > 0.8 && (
        <>
          <pointLight
            ref={flameRef}
            position={[0, 2, 0]}
            color="#ff9933"
            intensity={1.5}
            distance={8}
          />
          {/* Flame cone */}
          <mesh position={[0, 1.8, 0]}>
            <coneGeometry args={[0.08, 0.3, 8]} />
            <meshBasicMaterial color="#ffd27a" transparent opacity={0.9} />
          </mesh>
        </>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  The floor                                                          */
/* ------------------------------------------------------------------ */
function TempleFloor({ progress }: { progress: number }) {
  const opacity = Math.min(1, progress / 0.1);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, 0]}
      receiveShadow
    >
      <planeGeometry args={[40, 20, 64, 64]} />
      <meshStandardMaterial
        color="#c8a97e"
        roughness={0.9}
        metalness={0}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Main temple scene                                                  */
/* ------------------------------------------------------------------ */
function TempleScene({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  // Camera movement
  useFrame(() => {
    if (scrollProgress > 0.75) {
      const camProgress = (scrollProgress - 0.75) / 0.15;
      camera.position.z = THREE.MathUtils.lerp(12, 9, Math.min(1, camProgress));
      camera.position.y = THREE.MathUtils.lerp(2, 2.3, Math.min(1, camProgress));
    }
  });

  const bloomIntensity = scrollProgress > 0.75
    ? THREE.MathUtils.lerp(0.8, 1.6, Math.min(1, (scrollProgress - 0.75) / 0.15))
    : 0.8;

  return (
    <>
      <ambientLight intensity={0.4} color="#3a2845" />
      <directionalLight
        position={[3, 10, 4]}
        intensity={1.8}
        color="#ffd9a8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
      />
      <spotLight
        position={[0, 12, 5]}
        intensity={1.2}
        angle={0.6}
        penumbra={0.5}
        color="#fff2dd"
      />
      <Environment preset="sunset" />
      <Stars radius={80} depth={40} count={2000} factor={3} fade speed={0.5} />

      <TempleFloor progress={scrollProgress} />

      {PILLAR_LABELS.map((label, i) => (
        <DravidianPillar
          key={label}
          x={PILLAR_X[i]}
          label={label}
          progress={scrollProgress}
          index={i}
        />
      ))}

      <GopuramRoof progress={scrollProgress} />

      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Easing helpers                                                     */
/* ------------------------------------------------------------------ */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeElasticOut(t: number) {
  if (t === 0 || t === 1) return t;
  const p = 0.5;
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
}

/* ------------------------------------------------------------------ */
/*  Exported component                                                 */
/* ------------------------------------------------------------------ */
export function Pillars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        if (self.progress > 0.75) setShowTitle(true);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pillars"
      className="relative h-screen w-full"
      style={{ background: "#0a0510" }}
    >
      {/* 3D Canvas */}
      <Suspense fallback={null}>
        <Canvas
          shadows
          camera={{ position: [0, 2, 12], fov: 50 }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0,
          }}
          dpr={[1, 2]}
          style={{ position: "absolute", inset: 0 }}
        >
          <TempleScene scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>

      {/* Title overlay */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start pt-12 transition-opacity duration-700"
        style={{ opacity: showTitle ? 1 : 0 }}
      >
        <div
          className="text-center text-3xl font-bold uppercase tracking-[0.4em] md:text-4xl"
          style={{
            color: "#d4af37",
            fontFamily: "'Cinzel', serif",
            textShadow: "0 0 40px rgba(212,175,55,0.3)",
          }}
        >
          THE TEMPLE OF EXCELLENCE
        </div>
        <p
          className="mt-4 text-sm italic tracking-widest"
          style={{
            color: "#e8c87a",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Four sacred pillars upon which every Majestic experience is built
        </p>
      </div>

      {/* Golden exit veil */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, #ffd27a 0%, transparent 70%)",
          opacity: scrollProgress > 0.9 ? (scrollProgress - 0.9) / 0.1 : 0,
        }}
      />
    </section>
  );
}
