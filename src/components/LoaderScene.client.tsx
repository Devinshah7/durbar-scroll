import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";
import { gsap } from "gsap";

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
   PARTICLE SYSTEM (Phase 4 — gold sparks)
   ============================================================ */
function GoldParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 400;
  const { positions, velocities, seeds } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = -5 + Math.random() * -3;
      p[i * 3 + 2] = (Math.random() - 0.5) * 2;
      v[i] = 1.5 + Math.random() * 1.5;
      s[i] = Math.random() * Math.PI * 2;
    }
    return { positions: p, velocities: v, seeds: s };
  }, []);

  useFrame(({ clock }) => {
    const pts = ref.current;
    if (!pts) return;
    const posArr = pts.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += velocities[i] * 0.016;
      if (posArr[i * 3 + 1] > 5) posArr[i * 3 + 1] = -5;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    // flicker via alpha — handled in shader
    if (pts.material instanceof THREE.ShaderMaterial) {
      pts.material.uniforms.uTime.value = t;
    }
  });

  const shaderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float seed;
          varying float vAlpha;
          uniform float uTime;
          void main() {
            vAlpha = 0.4 + 0.6 * abs(sin(uTime * 2.0 + seed * 6.28));
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPos;
            gl_PointSize = (3.0 + seed * 3.0) * (300.0 / -mvPos.z);
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5) * 2.0;
            if (d > 1.0) discard;
            float a = smoothstep(1.0, 0.2, d) * vAlpha;
            gl_FragColor = vec4(1.0, 0.82, 0.48, a);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  return (
    <points ref={ref} material={shaderMat}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-seed" args={[seeds, 1]} />
      </bufferGeometry>
    </points>
  );
}

/* ============================================================
   EARTH GLOBE
   ============================================================ */
function Earth({
  groupRef,
  cloudRef,
  phase,
  bloomRef,
}: {
  groupRef: React.RefObject<THREE.Group | null>;
  cloudRef: React.RefObject<THREE.Mesh | null>;
  phase: number;
  bloomRef: React.RefObject<{ intensity: number } | null>;
}) {
  const earthRef = useRef<THREE.Mesh>(null);
  const spinSpeed = useRef(8);
  const lockedOn = useRef(false);

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
        // India highlight
        vec2 uvC = vMapUv;
        float dist = length(uvC - vec2(0.71, 0.62));
        float glow = smoothstep(0.08, 0.02, dist) * uHighlight;
        gl_FragColor.rgb += glow * vec3(1.0, 0.72, 0.18) * 1.5;
        `
      );
      shader.uniforms.uHighlight = highlightUniform.current;
    };
    return mat;
  }, [earthMap, earthNormal, earthSpec]);

  const { camera } = useThree();

  useFrame((_, delta) => {
    const grp = groupRef.current;
    if (!grp) return;

    // Phase 2: spin decay
    if (phase === 2 && !lockedOn.current) {
      spinSpeed.current *= 0.965;
      grp.rotation.y += spinSpeed.current * delta;
      if (spinSpeed.current < 0.02) {
        lockedOn.current = true;
        const finalRotY = -(79 * Math.PI) / 180;
        const finalRotX = (22 * Math.PI) / 180;
        gsap.to(grp.rotation, {
          y: finalRotY,
          x: finalRotX,
          duration: 1.2,
          ease: "power4.out",
          onComplete: () => {
            // settle bounce
            gsap.to(grp.rotation, {
              y: finalRotY + 0.04,
              duration: 0.15,
              yoyo: true,
              repeat: 1,
            });
          },
        });
        // India glow
        gsap.to(highlightUniform.current, { value: 1, duration: 0.8 });
      }
    }

    // Phase 1: fast spin
    if (phase === 1) {
      grp.rotation.y += spinSpeed.current * delta;
    }

    // Phase 3: camera dive — lookAt earth
    if (phase >= 3) {
      camera.lookAt(grp.position);
    }

    // Cloud counter-rotate
    if (cloudRef.current) {
      cloudRef.current.rotation.y -= 0.0003;
    }
  });

  return (
    <group ref={groupRef} position={[-9, 6, -3]} scale={0.4}>
      {/* Earth */}
      <mesh ref={earthRef} material={earthMaterial}>
        <sphereGeometry args={[2, 128, 128]} />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshStandardMaterial
          alphaMap={cloudTex}
          transparent
          opacity={0.45}
          depthWrite={false}
          color="#ffffff"
        />
      </mesh>

      {/* Atmosphere */}
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
   MAIN SCENE CONTROLLER
   ============================================================ */
function SceneController({ onComplete }: { onComplete: () => void }) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const bloomRef = useRef<any>(null);
  const [phase, setPhase] = useState(0);
  const { camera } = useThree();

  useEffect(() => {
    // Set initial camera
    (camera as THREE.PerspectiveCamera).fov = 60;
    camera.position.set(0, 0, 6);
    camera.updateProjectionMatrix();

    const tl = gsap.timeline();

    // PHASE 1: Entry from top-left (0 → 1.4s)
    setPhase(1);
    tl.to(
      {},
      {
        duration: 0.01,
        onComplete: () => {
          const grp = earthGroupRef.current;
          if (!grp) return;
          // Animate position
          gsap.to(grp.position, {
            x: 0, y: 0, z: 0,
            duration: 1.4, ease: "power3.out",
          });
          // Animate scale with elastic
          gsap.to(grp.scale, {
            x: 1, y: 1, z: 1,
            duration: 1.4, ease: "elastic.out(1, 0.6)",
          });
          // FOV tween
          gsap.to(camera as any, {
            fov: 45, duration: 1.4, ease: "power2.out",
            onUpdate: () => (camera as THREE.PerspectiveCamera).updateProjectionMatrix(),
          });
        },
      }
    );

    // PHASE 2: Spin decay (1.4s → 3.2s)
    tl.to({}, {
      duration: 0.01, delay: 1.4,
      onComplete: () => setPhase(2),
    });

    // PHASE 3: Dive into India (3.2s → 5s)
    tl.to({}, {
      duration: 0.01, delay: 1.8,
      onComplete: () => {
        setPhase(3);
        // Camera dive
        gsap.to(camera.position, {
          z: 0.35, y: 0.18,
          duration: 1.6, ease: "power3.in",
        });
        // Bloom ramp
        if (bloomRef.current) {
          gsap.to(bloomRef.current, {
            intensity: 4.0, duration: 1.6,
          });
        }
      },
    });

    // PHASE 4: Logo (5s → 6s)
    tl.to({}, {
      duration: 0.01, delay: 1.8,
      onComplete: () => setPhase(4),
    });

    // PHASE 5: Complete (6.5s)
    tl.to({}, {
      duration: 0.01, delay: 1.5,
      onComplete: () => {
        setPhase(5);
        setTimeout(onComplete, 500);
      },
    });

    return () => tl.kill();
  }, [camera, onComplete]);

  return (
    <>
      {/* Lighting */}
      <directionalLight position={[5, 3, 5]} intensity={2} castShadow />
      <ambientLight intensity={0.15} />
      <pointLight position={[-5, -2, 3]} intensity={0.8} color="#ff9944" />

      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      {phase < 4 && (
        <Earth
          groupRef={earthGroupRef}
          cloudRef={cloudRef}
          phase={phase}
          bloomRef={bloomRef}
        />
      )}

      {phase === 4 && <GoldParticles />}

      <EffectComposer>
        <Bloom
          ref={bloomRef}
          intensity={1.2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        <Vignette offset={0.3} darkness={0.75} />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0008, 0.0008)}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
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
      const len = el.getTotalLength?.() ?? 200;
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    });
    gsap.to(paths, {
      strokeDashoffset: 0, duration: 0.6, stagger: 0.03, ease: "power2.out",
    });
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
      {/* Simplified Sri Yantra — 9 interlocking triangles */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.8" />
      <circle cx="100" cy="100" r="75" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.6" />
      {/* Upward triangles */}
      <polygon points="100,25 170,145 30,145" fill="none" stroke="#ffd700" strokeWidth="1.2" />
      <polygon points="100,40 155,130 45,130" fill="none" stroke="#ffd700" strokeWidth="1" />
      <polygon points="100,50 145,120 55,120" fill="none" stroke="#ffd700" strokeWidth="0.8" />
      <polygon points="100,60 135,115 65,115" fill="none" stroke="#ffd700" strokeWidth="0.8" />
      {/* Downward triangles */}
      <polygon points="100,175 30,55 170,55" fill="none" stroke="#ff8c00" strokeWidth="1.2" />
      <polygon points="100,160 45,70 155,70" fill="none" stroke="#ff8c00" strokeWidth="1" />
      <polygon points="100,150 55,80 145,80" fill="none" stroke="#ff8c00" strokeWidth="0.8" />
      <polygon points="100,140 65,85 135,85" fill="none" stroke="#ff8c00" strokeWidth="0.8" />
      {/* Central bindu */}
      <circle cx="100" cy="100" r="3" fill="#ffd700" />
    </svg>
  );
}

/* ============================================================
   EXPORTED LOADER COMPONENT
   ============================================================ */
export function LoaderScene({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"globe" | "yantra" | "logo" | "dissolve" | "done">("globe");
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasOpacity = useRef(1);
  const [showYantra, setShowYantra] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showVeil, setShowVeil] = useState(false);

  const handleGlobeComplete = useCallback(() => {
    // Phase 3 end → show yantra briefly
    setShowYantra(true);
    setTimeout(() => {
      setShowYantra(false);
      setShowLogo(true);
      setPhase("logo");
      // After logo display, dissolve
      setTimeout(() => {
        setShowVeil(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 1500);
    }, 1000);
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000]"
      style={{ background: "linear-gradient(180deg, #000005, #0a0518, #150818)" }}
    >
      {/* 3D Canvas */}
      {phase === "globe" && (
        <div className="absolute inset-0" style={{ opacity: canvasOpacity.current }}>
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
      <SriYantra visible={showYantra} />

      {/* Logo Phase */}
      {showLogo && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "#1a0a0a" }}
        >
          {/* Gold particles canvas behind logo */}
          <div className="absolute inset-0">
            <Canvas dpr={[1, 2]} gl={{ antialias: false }}>
              <GoldParticles />
            </Canvas>
          </div>

          <div
            className="relative z-10 flex flex-col items-center animate-loader-logo"
            style={{
              filter: "drop-shadow(0 0 30px rgba(255,215,0,0.6))",
            }}
          >
            <div
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "72px",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#d4af37",
                lineHeight: 1,
              }}
            >
              M°
            </div>
            <div
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "28px",
                letterSpacing: "0.35em",
                color: "#e8c87a",
                marginTop: "8px",
              }}
            >
              THE MAJESTIC BHARAT
            </div>
          </div>

          <div
            className="absolute animate-loader-tagline"
            style={{
              top: "62%",
              fontFamily: "Cinzel, serif",
              fontSize: "14px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#e8c87a",
            }}
          >
            Where Every Experience Becomes A Sacred Journey
          </div>
        </div>
      )}

      {/* Golden veil sweep */}
      {showVeil && (
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
