import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { Logo } from "@/components/Logo";

/* ============================================================
   FRESNEL ATMOSPHERE SHADER
   ============================================================ */
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;
const atmosphereFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - dot(vNormal, vViewDir), 3.0);
    vec3 col = mix(vec3(0.3, 0.6, 1.0), vec3(1.0, 0.85, 0.4), fresnel);
    gl_FragColor = vec4(col, fresnel);
  }
`;

/* ============================================================
   EARTH GLOBE
   ============================================================ */
function Earth({
  groupRef,
  cloudRef,
  phaseRef,
}: {
  groupRef: React.RefObject<THREE.Group | null>;
  cloudRef: React.RefObject<THREE.Mesh | null>;
  phaseRef: React.RefObject<number>;
}) {
  const lockedOn = useRef(false);
  const spinSpeed = useRef(8);

  const [earthMap, earthNormal, earthSpec, cloudTex] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png",
  ]);

  const highlightUniform = useRef({ value: 0 });

  const earthMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: earthMap,
      normalMap: earthNormal,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughnessMap: earthSpec,
      roughness: 0.7,
      metalness: 0.1,
    });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uHighlight = highlightUniform.current;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `
        #include <dithering_fragment>
        vec2 uvC = vMapUv;
        float dist = length(uvC - vec2(0.71, 0.62));
        float glow = smoothstep(0.08, 0.02, dist) * uHighlight;
        gl_FragColor.rgb += glow * vec3(1.0, 0.72, 0.18) * 1.5;
        `
      );
    };
    return mat;
  }, [earthMap, earthNormal, earthSpec]);

  const { camera } = useThree();

  useFrame((_, delta) => {
    const grp = groupRef.current;
    if (!grp) return;
    const phase = phaseRef.current;

    if (phase === 1) {
      grp.rotation.y += spinSpeed.current * delta;
    }

    if (phase === 2 && !lockedOn.current) {
      spinSpeed.current *= 0.965;
      grp.rotation.y += spinSpeed.current * delta;
      if (spinSpeed.current < 0.02) {
        lockedOn.current = true;
        const finalRotY = -(79 * Math.PI) / 180;
        const finalRotX = (22 * Math.PI) / 180;
        gsap.to(grp.rotation, {
          y: finalRotY, x: finalRotX,
          duration: 1.2, ease: "power4.out",
          onComplete: () => {
            gsap.to(grp.rotation, { y: finalRotY + 0.04, duration: 0.15, yoyo: true, repeat: 1 });
          },
        });
        gsap.to(highlightUniform.current, { value: 1, duration: 0.8 });
      }
    }

    if (phase >= 3) {
      camera.lookAt(grp.position);
    }

    if (cloudRef.current) {
      cloudRef.current.rotation.y -= 0.0003;
    }
  });

  return (
    <group ref={groupRef} position={[-9, 6, -3]} scale={0.4}>
      <mesh material={earthMaterial}>
        <sphereGeometry args={[2, 128, 128]} />
      </mesh>
      <mesh ref={cloudRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshStandardMaterial alphaMap={cloudTex} transparent opacity={0.45} depthWrite={false} color="#ffffff" />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.18, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   SCENE CONTROLLER — drives the 5-phase timeline
   ============================================================ */
function SceneController({ onComplete }: { onComplete: () => void }) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const phaseRef = useRef(0);
  const { camera } = useThree();

  useEffect(() => {
    (camera as THREE.PerspectiveCamera).fov = 60;
    camera.position.set(0, 0, 6);
    camera.updateProjectionMatrix();

    const tl = gsap.timeline();

    // PHASE 1: Entry from top-left
    phaseRef.current = 1;
    tl.call(() => {
      const grp = earthGroupRef.current;
      if (!grp) return;
      gsap.to(grp.position, { x: 0, y: 0, z: 0, duration: 1.4, ease: "power3.out" });
      gsap.to(grp.scale, { x: 1, y: 1, z: 1, duration: 1.4, ease: "elastic.out(1, 0.6)" });
      gsap.to(camera as any, {
        fov: 45, duration: 1.4, ease: "power2.out",
        onUpdate: () => (camera as THREE.PerspectiveCamera).updateProjectionMatrix(),
      });
    });

    // PHASE 2: Spin decay
    tl.call(() => { phaseRef.current = 2; }, undefined, "+=1.4");

    // PHASE 3: Dive into India
    tl.call(() => {
      phaseRef.current = 3;
      gsap.to(camera.position, { z: 0.35, y: 0.18, duration: 1.6, ease: "power3.in" });
    }, undefined, "+=1.8");

    // PHASE 4: Signal completion to outer component
    tl.call(() => {
      phaseRef.current = 4;
      onComplete();
    }, undefined, "+=1.8");

    return () => { tl.kill(); };
  }, [camera, onComplete]);

  return (
    <>
      <directionalLight position={[5, 3, 5]} intensity={2} castShadow />
      <ambientLight intensity={0.15} />
      <pointLight position={[-5, -2, 3]} intensity={0.8} color="#ff9944" />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <Earth groupRef={earthGroupRef} cloudRef={cloudRef} phaseRef={phaseRef} />
    </>
  );
}

/* ============================================================
   SRI YANTRA SVG
   ============================================================ */
function SriYantra({ visible }: { visible: boolean }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!visible || !ref.current) return;
    const paths = ref.current.querySelectorAll("path, polygon, circle");
    paths.forEach((p) => {
      const el = p as SVGGeometryElement;
      try {
        const len = el.getTotalLength();
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
      } catch { /* not a path-like element */ }
    });
    gsap.to(paths, { strokeDashoffset: 0, duration: 0.6, stagger: 0.03, ease: "power2.out" });
    gsap.to(ref.current, { opacity: 0, duration: 0.3, delay: 0.8 });
  }, [visible]);

  if (!visible) return null;

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: 280, height: 280, zIndex: 100 }}
    >
      <circle cx="100" cy="100" r="90" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.8" />
      <circle cx="100" cy="100" r="75" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.6" />
      <polygon points="100,25 170,145 30,145" fill="none" stroke="#ffd700" strokeWidth="1.2" />
      <polygon points="100,40 155,130 45,130" fill="none" stroke="#ffd700" strokeWidth="1" />
      <polygon points="100,50 145,120 55,120" fill="none" stroke="#ffd700" strokeWidth="0.8" />
      <polygon points="100,60 135,115 65,115" fill="none" stroke="#ffd700" strokeWidth="0.8" />
      <polygon points="100,175 30,55 170,55" fill="none" stroke="#ff8c00" strokeWidth="1.2" />
      <polygon points="100,160 45,70 155,70" fill="none" stroke="#ff8c00" strokeWidth="1" />
      <polygon points="100,150 55,80 145,80" fill="none" stroke="#ff8c00" strokeWidth="0.8" />
      <polygon points="100,140 65,85 135,85" fill="none" stroke="#ff8c00" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="3" fill="#ffd700" />
    </svg>
  );
}

/* ============================================================
   GOLD SPARK PARTICLES (HTML/CSS — avoids second Canvas)
   ============================================================ */
function GoldSparks() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 4,
        size: 2 + Math.random() * 3,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparks.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            bottom: "-10px",
            width: s.size,
            height: s.size,
            background: "radial-gradient(circle, #ffd27a, #ff8c00)",
            boxShadow: "0 0 6px #ffd27a",
            animation: `spark-rise ${s.duration}s ${s.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   EXPORTED LOADER COMPONENT
   ============================================================ */
export function LoaderScene({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"globe" | "yantra" | "logo" | "veil">("globe");
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleGlobeComplete = useCallback(() => {
    // Fade out canvas
    if (canvasRef.current) {
      gsap.to(canvasRef.current, { opacity: 0, duration: 0.3 });
    }
    // Show yantra briefly
    setStage("yantra");
    setTimeout(() => {
      setStage("logo");
      // After logo display, show veil and navigate
      setTimeout(() => {
        setStage("veil");
        setTimeout(onComplete, 500);
      }, 1500);
    }, 1000);
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[10000]" style={{ background: "linear-gradient(180deg, #000005, #0a0518, #150818)" }}>
      {/* 3D Canvas — globe phases */}
      {(stage === "globe" || stage === "yantra") && (
        <div ref={canvasRef} className="absolute inset-0">
          <Canvas
            shadows
            dpr={[1, 2]}
            gl={{
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.1,
              antialias: true,
            }}
            camera={{ fov: 60, position: [0, 0, 6] }}
          >
            <SceneController onComplete={handleGlobeComplete} />
          </Canvas>
        </div>
      )}

      {/* Sri Yantra overlay */}
      <SriYantra visible={stage === "yantra"} />

      {/* Logo Phase */}
      {(stage === "logo" || stage === "veil") && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "#1a0a0a" }}
        >
          <GoldSparks />

          <div
            className="relative z-10 flex flex-col items-center animate-loader-logo"
            style={{ filter: "drop-shadow(0 0 30px rgba(255,215,0,0.6))" }}
          >
            <Logo height={140} glow />
          </div>

          <div
            className="absolute animate-loader-tagline"
            style={{
              top: "62%", fontFamily: "Cinzel, serif", fontSize: "14px",
              letterSpacing: "0.3em", textTransform: "uppercase", color: "#e8c87a",
            }}
          >
            Where Every Experience Becomes A Sacred Journey
          </div>
        </div>
      )}

      {/* Golden veil sweep */}
      {stage === "veil" && (
        <div
          className="absolute inset-0 z-[10001]"
          style={{
            background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
            animation: "veil-sweep 0.4s ease-in-out forwards",
          }}
        />
      )}
    </div>
  );
}
