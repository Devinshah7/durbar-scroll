import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import gsap from "gsap";

const EARTH_DAY = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_NORMAL = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg";
const EARTH_SPEC = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg";
const EARTH_CLOUDS = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png";

interface EarthProps {
  phase: 0 | 1 | 2 | 3;
  onSettled?: () => void;
  simplified?: boolean;
}

export default function Earth({ phase, onSettled, simplified = false }: EarthProps) {
  const group = useRef<THREE.Group>(null!);
  const earthMesh = useRef<THREE.Mesh>(null!);
  const cloudsMesh = useRef<THREE.Mesh>(null!);
  const atmoMesh = useRef<THREE.Mesh>(null!);
  const spinSpeed = useRef(8);
  const settledRef = useRef(false);

  const segs = simplified ? 64 : 128;

  const [dayMap, normalMap, specMap, cloudMap] = useLoader(TextureLoader, [
    EARTH_DAY,
    EARTH_NORMAL,
    EARTH_SPEC,
    EARTH_CLOUDS,
  ]);

  const atmoMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColorInner: { value: new THREE.Color("#7ad6ff") },
        uColorOuter: { value: new THREE.Color("#ffd27a") },
        uPower: { value: 3.0 },
        uIntensity: { value: 1.2 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vPos = -mv.xyz;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        uniform vec3 uColorInner;
        uniform vec3 uColorOuter;
        uniform float uPower;
        uniform float uIntensity;
        void main() {
          vec3 viewDir = normalize(vPos);
          float rim = pow(1.0 - clamp(dot(normalize(vNormal), viewDir), 0.0, 1.0), uPower);
          vec3 col = mix(uColorInner, uColorOuter, rim);
          gl_FragColor = vec4(col * rim * uIntensity, rim);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  useEffect(() => {
    if (phase >= 1 && group.current) {
      gsap.fromTo(
        group.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1.2, ease: "elastic.out(1, 0.6)" }
      );
    }
  }, [phase]);

  useEffect(() => {
    if (phase >= 2 && earthMesh.current) {
      const targetY = -((79 / 360) * Math.PI * 2);
      const targetX = (22 / 360) * Math.PI * 2 * 0.5;
      gsap.to(earthMesh.current.rotation, {
        y: targetY,
        x: targetX,
        duration: 1.6,
        ease: "power3.inOut",
        onUpdate: () => {
          spinSpeed.current *= 0.9;
        },
        onComplete: () => {
          settledRef.current = true;
          gsap.to(earthMesh.current.rotation, {
            y: targetY + 0.04,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
            onComplete: () => onSettled?.(),
          });
        },
      });
    }
  }, [phase, onSettled]);

  useFrame((_, delta) => {
    if (!settledRef.current && earthMesh.current && phase >= 1) {
      earthMesh.current.rotation.y += spinSpeed.current * delta;
      spinSpeed.current = Math.max(0.0, spinSpeed.current * 0.985);
    }
    if (cloudsMesh.current) {
      cloudsMesh.current.rotation.y -= 0.0003;
    }
  });

  return (
    <group ref={group} scale={0}>
      <mesh ref={earthMesh} castShadow receiveShadow>
        <sphereGeometry args={[2, segs, segs]} />
        <meshStandardMaterial
          map={dayMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.85, 0.85)}
          roughnessMap={specMap}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {!simplified && (
        <mesh ref={cloudsMesh}>
          <sphereGeometry args={[2.02, segs, segs]} />
          <meshStandardMaterial
            map={cloudMap}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      )}

      <mesh ref={atmoMesh} scale={1.075}>
        <sphereGeometry args={[2, simplified ? 32 : 64, simplified ? 32 : 64]} />
        <primitive object={atmoMaterial} attach="material" />
      </mesh>
    </group>
  );
}
