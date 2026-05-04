import { Suspense, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Stars, useTexture } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { gsap } from "gsap";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const EARTH_DIFFUSE =
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_NORMAL =
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg";
const EARTH_SPECULAR =
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg";
const EARTH_CLOUDS =
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png";

// India center: lat 22°N, lon 79°E → rotationY so it faces camera (camera at +Z)
const INDIA_ROT_Y = -((79 / 360) * Math.PI * 2) + Math.PI * 0.5;
const INDIA_ROT_X = -(22 / 360) * Math.PI * 0.5;

/* ------------------------------------------------------------------ */
/*  Atmosphere fresnel shader                                          */
/* ------------------------------------------------------------------ */
const atmosphereVertex = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const atmosphereFragment = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
    vec3 color = mix(vec3(0.3, 0.7, 1.0), vec3(1.0, 0.85, 0.4), fresnel);
    gl_FragColor = vec4(color, fresnel * 0.6);
  }
`;

/* ------------------------------------------------------------------ */
/*  Diya spark particles (Three.js Points)                             */
/* ------------------------------------------------------------------ */
function DiyaSparks({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = 400;

  const { positions, velocities, alphas } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const alp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = -3 + Math.random() * -2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = 0.01 + Math.random() * 0.04;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      alp[i] = Math.random();
    }
    return { positions: pos, velocities: vel, alphas: alp };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current || !active) return;
    const geo = ref.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      alphas[i] -= delta * 0.3;
      if (alphas[i] < 0) {
        arr[i * 3] = (Math.random() - 0.5) * 4;
        arr[i * 3 + 1] = -3;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 2;
        alphas[i] = 0.5 + Math.random() * 0.5;
      }
    }
    posAttr.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffd27a"
        size={0.06}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Earth globe                                                        */
/* ------------------------------------------------------------------ */
function Earth({
  phase,
  onPhaseAdvance,
}: {
  phase: number;
  onPhaseAdvance: (p: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const earthRef = useRef<THREE.Mesh>(null);

  const [map, normalMap, roughnessMap, cloudMap] = useTexture([
    EARTH_DIFFUSE,
    EARTH_NORMAL,
    EARTH_SPECULAR,
    EARTH_CLOUDS,
  ]);

  const { camera } = useThree();
  const speedRef = useRef(8);
  const phaseRef = useRef(0);
  const startTimeRef = useRef(0);
  const bloomRef = useRef({ intensity: 1.2 });

  // GSAP timeline
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    startTimeRef.current = performance.now() / 1000;

    const tl = gsap.timeline();

    // Phase 1 — scale in
    group.scale.set(0, 0, 0);
    tl.to(group.scale, {
      x: 1.15,
      y: 1.15,
      z: 1.15,
      duration: 0.6,
      ease: "elastic.out(1, 0.6)",
    }).to(group.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        phaseRef.current = 2;
        onPhaseAdvance(2);
      },
    });

    // Phase 2 — decelerate (handled in useFrame)

    return () => {
      tl.kill();
    };
  }, [onPhaseAdvance]);

  // Phase 2→3→4 transitions
  useEffect(() => {
    if (phase === 3) {
      // Dive camera
      gsap.to(camera.position, {
        z: 0.4,
        y: 0.15,
        duration: 1.5,
        ease: "power3.in",
      });
      // Fade globe
      setTimeout(() => {
        if (groupRef.current) {
          gsap.to(groupRef.current, {
            visible: true,
            duration: 0.5,
            onUpdate: function () {
              // fade materials
            },
          });
        }
        onPhaseAdvance(4);
      }, 1400);
    }
  }, [phase, camera, onPhaseAdvance]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Cloud rotation
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.0003;
    }

    if (phaseRef.current <= 1) {
      // Phase 1: fast spin
      group.rotation.y += speedRef.current * delta;
    } else if (phaseRef.current === 2) {
      // Phase 2: decelerate
      speedRef.current *= 0.96;
      group.rotation.y += speedRef.current * delta;

      if (speedRef.current < 0.05) {
        // Lock onto India
        phaseRef.current = 2.5;
        gsap.to(group.rotation, {
          y: INDIA_ROT_Y,
          x: INDIA_ROT_X,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            // Settle bounce
            gsap.to(group.rotation, {
              y: INDIA_ROT_Y + 0.04,
              duration: 0.15,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(group.rotation, {
                  y: INDIA_ROT_Y,
                  duration: 0.2,
                  ease: "power2.inOut",
                  onComplete: () => {
                    phaseRef.current = 3;
                    onPhaseAdvance(3);
                  },
                });
              },
            });
          },
        });
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth sphere */}
      <mesh ref={earthRef} castShadow>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          map={map}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.85, 0.85)}
          roughnessMap={roughnessMap}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere glow (fresnel) */}
      <mesh>
        <sphereGeometry args={[2.15, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Main 3D Scene                                                      */
/* ------------------------------------------------------------------ */
function GlobeScene({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState(1);
  const completedRef = useRef(false);

  const handlePhaseAdvance = useCallback(
    (p: number) => {
      setPhase(p);
      if (p === 4 && !completedRef.current) {
        completedRef.current = true;
        setTimeout(onComplete, 2000);
      }
    },
    [onComplete],
  );

  return (
    <>
      <ambientLight intensity={0.15} color="#1a2540" />
      <directionalLight
        position={[5, 3, 5]}
        intensity={2.5}
        color="#fff4e0"
        castShadow
      />
      <pointLight position={[-4, 0, 2]} color="#4a90ff" intensity={0.6} />
      <Environment preset="dawn" />

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        fade
        speed={1}
      />

      <Earth phase={phase} onPhaseAdvance={handlePhaseAdvance} />
      <DiyaSparks active={phase >= 4} />

      <EffectComposer>
        <Bloom
          intensity={phase >= 3 ? 2.5 : 1.2}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0008, 0.0008)}
        />
      </EffectComposer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Loader wrapper (HTML overlay + Canvas)                             */
/* ------------------------------------------------------------------ */
export function Loader() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleComplete = useCallback(() => {
    setShowLogo(true);
    // Logo reveal timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(wrapperRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            setDone(true);
          },
        });
      },
    });

    tl.fromTo(
      "#loader-logo-3d",
      { scale: 2.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
    )
      .fromTo(
        "#loader-tagline-3d",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3",
      )
      .to({}, { duration: 1 });
  }, []);

  if (done) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[10000]"
      style={{ backgroundColor: "#000000" }}
    >
      {/* 3D Canvas */}
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-transparent"
              style={{ borderTopColor: "#d4af37" }}
            />
          </div>
        }
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          dpr={[1, 2]}
          onCreated={() => setSceneReady(true)}
          style={{ position: "absolute", inset: 0 }}
        >
          <GlobeScene onComplete={handleComplete} />
        </Canvas>
      </Suspense>

      {/* Crimson overlay for phase 3+ transition */}
      <div
        className="pointer-events-none absolute inset-0 transition-colors duration-1000"
        style={{
          backgroundColor: showLogo ? "#1a0a0a" : "transparent",
          mixBlendMode: "multiply",
        }}
      />

      {/* Logo overlay */}
      {showLogo && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div
            id="loader-logo-3d"
            className="flex flex-col items-center"
            style={{ opacity: 0 }}
          >
            <div
              className="mb-2 text-6xl font-bold italic md:text-7xl"
              style={{
                color: "#d4af37",
                fontFamily: "'Cinzel', serif",
              }}
            >
              M°
            </div>
            <div
              className="text-2xl tracking-[0.35em] md:text-3xl"
              style={{
                color: "#e8c87a",
                fontFamily: "'Cinzel', serif",
              }}
            >
              THE MAJESTIC BHARAT
            </div>
          </div>
          <div
            id="loader-tagline-3d"
            className="absolute text-[10px] uppercase tracking-[0.4em]"
            style={{
              color: "#e8c87a",
              opacity: 0,
              top: "60%",
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "0.3em",
            }}
          >
            Where Every Experience Becomes A Sacred Journey
          </div>
        </div>
      )}
    </div>
  );
}
