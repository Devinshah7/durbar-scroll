import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  count?: number;
  active: boolean;
}

export default function EmberParticles({ count = 400, active }: Props) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = -3 - Math.random() * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.4;
      velocities[i * 3 + 1] = 0.6 + Math.random() * 1.0;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }
    return { positions, velocities };
  }, [count]);

  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,220,140,1)");
    g.addColorStop(0.4, "rgba(255,160,60,0.6)");
    g.addColorStop(1, "rgba(255,90,30,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (!active || !pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] += velocities[i * 3 + 0] * delta;
      pos[i * 3 + 1] += velocities[i * 3 + 1] * delta;
      pos[i * 3 + 2] += velocities[i * 3 + 2] * delta;
      velocities[i * 3 + 1] -= 0.02 * delta;
      if (pos[i * 3 + 1] > 4) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 8;
        pos[i * 3 + 1] = -3.5;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
        velocities[i * 3 + 1] = 0.6 + Math.random() * 1.0;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        map={sprite}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#ffd27a"
        sizeAttenuation
      />
    </points>
  );
}
