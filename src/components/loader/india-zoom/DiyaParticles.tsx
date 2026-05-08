import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vert = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  varying float vAlpha;
  varying float vSeed;
  uniform float uTime;
  void main() {
    vSeed = aSeed;
    vec3 pos = position;
    float t = mod(uTime * (0.3 + aSeed * 0.4) + aSeed * 5.0, 6.0);
    pos.y += t * 0.7;
    pos.x += sin(uTime * 0.8 + aSeed * 10.0) * 0.15;
    vAlpha = smoothstep(6.0, 5.0, t) * smoothstep(0.0, 0.3, t);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (300.0 / -mv.z);
  }
`;
const frag = /* glsl */ `
  varying float vAlpha;
  varying float vSeed;
  uniform float uTime;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float flicker = 0.7 + 0.3 * sin(uTime * 12.0 + vSeed * 30.0);
    vec3 gold = mix(vec3(1.0, 0.55, 0.1), vec3(1.0, 0.85, 0.4), core);
    gl_FragColor = vec4(gold, core * vAlpha * flicker);
  }
`;

export function DiyaParticles({ count = 400, opacity }: { count?: number; opacity: { value: number } }) {
  const ref = useRef<THREE.Points>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const { geometry, uniforms } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = -3 - Math.random() * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      sizes[i] = 2 + Math.random() * 4;
      seeds[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return {
      geometry: g,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 } },
    };
  }, [count]);

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    if (matRef.current) {
      (matRef.current as any).opacity = opacity.value;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
