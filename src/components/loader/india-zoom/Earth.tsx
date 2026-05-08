import { useRef, useMemo, forwardRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const EARTH_MAP = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_NORMAL = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg";
const EARTH_SPEC = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg";
const CLOUDS = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png";

useTexture.preload([EARTH_MAP, EARTH_NORMAL, EARTH_SPEC, CLOUDS]);

const fresnelVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fresnelFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float rim = pow(1.0 - dot(normalize(vNormal), normalize(vViewDir)), 3.0);
    vec3 cyan = vec3(0.30, 0.78, 0.95);
    vec3 gold = vec3(0.83, 0.69, 0.22);
    vec3 col = mix(cyan, gold, rim);
    gl_FragColor = vec4(col * rim, rim);
  }
`;

export type EarthHandle = {
  group: THREE.Group;
  setHighlight: (v: number) => void;
  setTargetUV: (uv: THREE.Vector2) => void;
  spinSpeed: { value: number };
};

type Props = {
  isMobile: boolean;
};

export const Earth = forwardRef<EarthHandle, Props>(function Earth({ isMobile }, ref) {
  const group = useRef<THREE.Group>(null!);
  const earthMesh = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  const spinSpeed = useRef({ value: 8 });
  const highlight = useRef({ value: 0 });
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);

  const [map, normalMap, roughnessMap, cloudsMap] = useTexture([
    EARTH_MAP,
    EARTH_NORMAL,
    EARTH_SPEC,
    CLOUDS,
  ]);
  map.colorSpace = THREE.SRGBColorSpace;

  const targetUV = useRef({ value: new THREE.Vector2(0.7194, 0.6222) });

  // inject highlight uniform via onBeforeCompile
  const onBeforeCompile = useMemo(
    () => (shader: THREE.WebGLProgramParametersWithUniforms) => {
      shader.uniforms.uHighlightStrength = highlight.current;
      shader.uniforms.uTargetUV = targetUV.current;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
        uniform float uHighlightStrength;
        uniform vec2 uTargetUV;
        varying vec2 vEarthUv;`
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `#include <common>
        varying vec2 vEarthUv;`
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <uv_vertex>",
        `#include <uv_vertex>
        vEarthUv = uv;`
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `#include <dithering_fragment>
        vec2 _duv = vEarthUv - uTargetUV;
        _duv.x -= floor(_duv.x + 0.5);
        float d = length(_duv);
        float pulse = smoothstep(0.06, 0.0, d) * uHighlightStrength;
        vec3 saffron = vec3(1.0, 0.70, 0.28);
        vec3 gold = vec3(1.0, 0.84, 0.0);
        vec3 hi = mix(saffron, gold, 0.5 + 0.5 * sin(uHighlightStrength * 6.2831));
        gl_FragColor.rgb += hi * pulse * 1.4;`
      );
    },
    []
  );

  useImperativeHandle(ref, () => ({
    group: group.current,
    setHighlight: (v: number) => {
      highlight.current.value = v;
    },
    setTargetUV: (uv: THREE.Vector2) => {
      targetUV.current.value.copy(uv);
    },
    spinSpeed: spinSpeed.current,
  }));

  useFrame((_, dt) => {
    if (earthMesh.current) {
      earthMesh.current.rotation.y += spinSpeed.current.value * dt;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y -= 0.02 * dt;
    }
  });

  return (
    <group ref={group} scale={0}>
      <mesh ref={earthMesh} castShadow receiveShadow>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          ref={matRef}
          map={map}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.85, 0.85)}
          roughnessMap={roughnessMap}
          metalness={0.1}
          roughness={0.7}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>

      {!isMobile && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[2.02, 96, 96]} />
          <meshStandardMaterial
            map={cloudsMap}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[2.15, 96, 96]} />
        <shaderMaterial
          vertexShader={fresnelVertex}
          fragmentShader={fresnelFragment}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
});
