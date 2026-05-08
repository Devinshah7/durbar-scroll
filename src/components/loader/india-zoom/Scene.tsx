import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Stars,
  PerspectiveCamera,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
  useTexture,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BloomEffect } from "postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { Leva, useControls } from "leva";
import { Earth, type EarthHandle } from "./Earth";
import { DiyaParticles } from "./DiyaParticles";
import { readIndiaLockEuler } from "./constants";
import { AimMode } from "./AimMode";

const DEBUG =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("debug") === "1";

const LOCK_TEST =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("lockTest") === "1";

const AIM =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("aim") === "1";

// Versions (read at runtime to avoid JSON import friction)
const VERSIONS = {
  three: (THREE as any).REVISION ? `r${(THREE as any).REVISION}` : "unknown",
};

const LOGO_URL = "/brand/majestic-bharat-logo.png";
useTexture.preload(LOGO_URL);

export type LoaderRefs = {
  bgColor: THREE.Color;
  bloom: { intensity: number };
  particlesOpacity: { value: number };
  sceneOpacity: { value: number };
  logoOpacity: { value: number };
  logoScale: { value: number };
};

type Props = {
  isMobile: boolean;
  onPhase: (p: number) => void;
  onDone: () => void;
  refs: LoaderRefs;
  onMandalaPos?: (p: { x: number; y: number } | null) => void;
};

function Rig({
  earthRef,
  onPhase,
  onDone,
  refs,
  isMobile,
  aimWorldTarget,
}: {
  earthRef: React.MutableRefObject<EarthHandle | null>;
  aimWorldTarget: React.MutableRefObject<THREE.Vector3 | null>;
} & Props) {
  const { camera } = useThree();
  const cam = camera as THREE.PerspectiveCamera;
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      while (!earthRef.current) await wait(50);
      const e = earthRef.current;

      const lockEuler = readIndiaLockEuler();
      const desiredEuler = new THREE.Euler(lockEuler.x, lockEuler.y, lockEuler.z, "XYZ");

      // After lock, India faces +Z (camera). Use a fixed front-of-globe UV
      // for the highlight pulse. (UV(0.5, 0.5) is the meridian/equator point
      // that ends up at +Z after our captured rotation aims India there.)
      e.setTargetUV(new THREE.Vector2(0.5, 0.5));

      if (AIM) {
        // AimMode component handles input and HUD; just hold the Earth still.
        onPhase(2);
        e.spinSpeed.value = 0;
        const earthMesh0 = e.group.children[0] as THREE.Mesh;
        if (earthMesh0) earthMesh0.rotation.set(0, 0, 0);
        e.group.scale.set(1, 1, 1);
        e.setHighlight(0);
        return;
      }

      if (LOCK_TEST) {
        onPhase(2);
        e.spinSpeed.value = 0;
        const earthMesh = e.group.children[0] as THREE.Mesh;
        earthMesh.rotation.set(0, 0, 0);
        e.group.scale.set(1, 1, 1);
        e.group.rotation.set(desiredEuler.x, desiredEuler.y, desiredEuler.z);
        e.setHighlight(1);
        return;
      }

      // Phase 1
      onPhase(1);
      cam.fov = 60;
      cam.updateProjectionMatrix();
      gsap.to(e.group.scale, { x: 1, y: 1, z: 1, duration: 1.2, ease: "elastic.out(1, 0.6)" });
      gsap.to(cam, {
        fov: 45,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => cam.updateProjectionMatrix(),
      });
      await wait(1200);

      // Phase 2 — spin decay then lock to captured Euler
      onPhase(2);
      const decay = setInterval(() => {
        e.spinSpeed.value *= 0.94;
        if (e.spinSpeed.value < 0.02) {
          e.spinSpeed.value = 0;
          clearInterval(decay);
        }
      }, 16);
      await wait(700);
      clearInterval(decay);
      e.spinSpeed.value = 0;

      const earthMesh = e.group.children[0] as THREE.Mesh;
      earthMesh.rotation.set(0, 0, 0);

      gsap.to(e.group.rotation, {
        x: desiredEuler.x,
        y: desiredEuler.y,
        z: desiredEuler.z,
        duration: 1.2,
        ease: "power2.inOut",
      });
      const hl = { v: 0 };
      gsap.to(hl, {
        v: 1,
        duration: 0.6,
        delay: 0.6,
        onUpdate: () => e.setHighlight(hl.v),
      });
      await wait(1300);

      // World-space "front of Earth" point — what now faces the camera
      const worldTarget = e.group.localToWorld(new THREE.Vector3(0, 0, 2));
      aimWorldTarget.current = worldTarget;

      // Phase 3 — dolly toward worldTarget, stop 0.4 units outside it
      onPhase(3);
      const dir = worldTarget.clone().normalize();
      const dollyEnd = dir.multiplyScalar(worldTarget.length() + 0.4);
      // Wait — we want to approach FROM camera TO just outside the surface point.
      // Start ~6 away, end at point along center→worldTarget line, 0.4 beyond surface (closer to camera by 0.4 from worldTarget).
      const approachEnd = worldTarget.clone().normalize().multiplyScalar(
        Math.max(0.4, worldTarget.length() - 0.4)
      );
      // Suppress unused warning
      void dollyEnd;
      gsap.to(cam.position, {
        x: approachEnd.x,
        y: approachEnd.y,
        z: approachEnd.z,
        duration: 1.5,
        ease: "power3.in",
      });
      gsap.to(refs.bloom, {
        intensity: isMobile ? 2.0 : 3.5,
        duration: 1.5,
        ease: "power2.in",
      });
      const bgTarget = new THREE.Color("#1a0a0a");
      gsap.to(refs.bgColor, { r: bgTarget.r, g: bgTarget.g, b: bgTarget.b, duration: 1.5 });
      gsap.to(hl, { v: 0, duration: 0.8, delay: 0.7, onUpdate: () => e.setHighlight(hl.v) });
      await wait(1500);

      // Phase 4
      onPhase(4);
      aimWorldTarget.current = null;
      gsap.to(refs.sceneOpacity, { value: 0, duration: 0.6 });
      gsap.to(refs.particlesOpacity, { value: 1, duration: 0.6, delay: 0.2 });
      gsap.to(refs.logoScale, { value: 1, duration: 0.9, ease: "power3.out", delay: 0.2 });
      gsap.to(refs.logoOpacity, { value: 1, duration: 0.6, delay: 0.2 });
      await wait(1500);

      await wait(1000);
      gsap.to(refs.particlesOpacity, { value: 0, duration: 0.6 });
      gsap.to(refs.logoOpacity, { value: 0, duration: 0.6 });
      await wait(700);
      onDone();
    })();
  }, []);

  useFrame(() => {
    const w = aimWorldTarget.current;
    if (w) cam.lookAt(w);
  });

  return null;
}

function BgSync({ color }: { color: THREE.Color }) {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = color;
  }, [scene, color]);
  return null;
}

function DebugMarker({
  earthRef,
}: {
  earthRef: React.MutableRefObject<EarthHandle | null>;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const local = useMemo(() => new THREE.Vector3(0, 0, 2.02), []);
  useFrame(() => {
    const e = earthRef.current;
    if (!e || !ref.current) return;
    const p = local.clone();
    e.group.localToWorld(p);
    ref.current.position.copy(p);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial color="#ff2a2a" depthTest={false} />
    </mesh>
  );
}

function MandalaTracker({
  aimWorldTarget,
  onPos,
}: {
  aimWorldTarget: React.MutableRefObject<THREE.Vector3 | null>;
  onPos: (p: { x: number; y: number } | null) => void;
}) {
  const { camera, size } = useThree();
  useFrame(() => {
    const w = aimWorldTarget.current;
    if (!w) {
      onPos(null);
      return;
    }
    const ndc = w.clone().project(camera);
    onPos({
      x: (ndc.x * 0.5 + 0.5) * size.width,
      y: (-ndc.y * 0.5 + 0.5) * size.height,
    });
  });
  return null;
}

function SceneFader({
  opacity,
  children,
}: {
  opacity: { value: number };
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.visible = opacity.value > 0.01;
    ref.current.traverse((c: any) => {
      if (c.material && "opacity" in c.material) {
        if (c.material.userData._origOp == null) {
          c.material.userData._origOp = c.material.opacity ?? 1;
          c.material.transparent = true;
        }
        c.material.opacity = c.material.userData._origOp * opacity.value;
      }
    });
  });
  return <group ref={ref}>{children}</group>;
}

function BloomDriver({
  composerRef,
  target,
}: {
  composerRef: React.MutableRefObject<any>;
  target: { intensity: number };
}) {
  useFrame(() => {
    const composer = composerRef.current;
    if (!composer) return;
    // composer.passes contains EffectPasses; iterate to find the BloomEffect
    const passes = composer.passes ?? [];
    for (const pass of passes) {
      const effects = (pass as any).effects;
      if (!effects) continue;
      for (const eff of effects) {
        if (eff instanceof BloomEffect) {
          eff.intensity = target.intensity;
          return;
        }
      }
    }
  });
  return null;
}

function BrandLogo({
  opacity,
  scale,
}: {
  opacity: { value: number };
  scale: { value: number };
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshBasicMaterial>(null!);
  const tex = useTexture(LOGO_URL);

  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
  }, [tex]);

  // Aspect ratio from texture
  const img: any = tex.image;
  const aspect = img && img.width && img.height ? img.width / img.height : 2.6;
  const baseW = 3.2;
  const baseH = baseW / aspect;

  useFrame(() => {
    if (matRef.current) matRef.current.opacity = opacity.value;
    if (ref.current) ref.current.scale.setScalar(scale.value);
  });

  const onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    const token = "vec4 diffuseColor = vec4( diffuse, opacity );";
    if (!shader.fragmentShader.includes(token)) {
      console.warn("[BrandLogo] expected token not found in fragmentShader; skipping white-key");
      return;
    }
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <map_fragment>",
      `#include <map_fragment>
       float _maxC = max(max(diffuseColor.r, diffuseColor.g), diffuseColor.b);
       float _a = 1.0 - smoothstep(0.92, 0.99, _maxC);
       diffuseColor.a *= _a;`
    );
  };

  return (
    <mesh ref={ref} position={[0, 0, 0]} scale={2.5}>
      <planeGeometry args={[baseW, baseH]} />
      <meshBasicMaterial
        ref={matRef}
        map={tex}
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
        premultipliedAlpha
        onBeforeCompile={onBeforeCompile}
      />
    </mesh>
  );
}

export function Scene({ isMobile, onPhase, onDone, refs, onMandalaPos }: Props) {
  const earthRef = useRef<EarthHandle | null>(null);
  const composerRef = useRef<any>(null);
  const aimWorldTarget = useRef<THREE.Vector3 | null>(null);

  // Leva control kept for parity but unused now that aim mode captures the lock.
  useControls("Loader", {});

  useEffect(() => {
    console.log("[Loader] three:", VERSIONS.three);
  }, []);

  return (
    <>
    <Leva hidden={!DEBUG} collapsed />
    <Canvas
      shadows
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
        antialias: true,
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <PerspectiveCamera makeDefault fov={45} position={[0, 0, 6]} />
      <PerformanceMonitor />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <BgSync color={refs.bgColor} />

      <ambientLight intensity={0.15} color="#1a2540" />
      <directionalLight
        position={[5, 3, 5]}
        intensity={2.5}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={isMobile ? 1024 : 2048}
        shadow-mapSize-height={isMobile ? 1024 : 2048}
      />
      <pointLight position={[-4, 0, 2]} color="#4a90ff" intensity={0.6} />

      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <Stars
          radius={80}
          depth={40}
          count={isMobile ? 2000 : 5000}
          factor={3}
          fade
          speed={0.4}
        />
        <SceneFader opacity={refs.sceneOpacity}>
          <Earth ref={earthRef} isMobile={isMobile} />
          {DEBUG && <DebugMarker earthRef={earthRef} />}
        </SceneFader>
        <DiyaParticles
          count={isMobile ? 150 : 400}
          opacity={refs.particlesOpacity}
        />
        <BrandLogo opacity={refs.logoOpacity} scale={refs.logoScale} />
        <Rig
          isMobile={isMobile}
          onPhase={onPhase}
          onDone={onDone}
          refs={refs}
          earthRef={earthRef}
          aimWorldTarget={aimWorldTarget}
        />
        <BloomDriver composerRef={composerRef} target={refs.bloom} />
        {onMandalaPos && (
          <MandalaTracker aimWorldTarget={aimWorldTarget} onPos={onMandalaPos} />
        )}
      </Suspense>

      {isMobile ? (
        <EffectComposer ref={composerRef} multisampling={0}>
          <Bloom
            intensity={refs.bloom.intensity}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>
      ) : (
        <EffectComposer ref={composerRef} multisampling={4}>
          <Bloom
            intensity={refs.bloom.intensity}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            offset={new THREE.Vector2(0.0008, 0.0008)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>
      )}
    </Canvas>
    {AIM && <AimMode earthRef={earthRef} />}
    </>
  );
}
