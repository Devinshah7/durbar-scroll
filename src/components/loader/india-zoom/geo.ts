import * as THREE from "three";

// Kept for backward compatibility with the Leva control. The correct mapping
// for three.js SphereGeometry + earth_atmos_2048.jpg is baked into geoToLocal
// below, so this offset is no longer needed and defaults to 0.
export const LON_OFFSET_DEFAULT = 0;

export const TARGET = { lat: 22, lon: 79 } as const; // Central India

/**
 * Convert (lat, lon) in degrees to a unit vector on the textured Earth sphere.
 *
 * Derivation: three.js SphereGeometry vertex at UV (u, v):
 *   x = -cos(2π·u) · sin(π·v)
 *   y =  cos(π·v)
 *   z =  sin(2π·u) · sin(π·v)
 *
 * The earth_atmos_2048.jpg equirectangular texture places lon=0 at u=0.5 and
 * lat=0 at v=0.5 (north pole at v=0). Substituting u = 0.5 + lon/360 and
 * v = 0.5 - lat/180 simplifies to:
 *   x =  cos(lat) · cos(lon)
 *   y =  sin(lat)
 *   z = -cos(lat) · sin(lon)
 *
 * The lonOffset parameter is kept for the Leva debug control and applies an
 * extra rotation around the Y axis (default 0).
 */
export function geoToLocal(
  lat: number,
  lon: number,
  lonOffset: number = LON_OFFSET_DEFAULT
): THREE.Vector3 {
  const latR = THREE.MathUtils.degToRad(lat);
  const lonR = THREE.MathUtils.degToRad(lon) + lonOffset;
  const cl = Math.cos(latR);
  return new THREE.Vector3(
    cl * Math.cos(lonR),
    Math.sin(latR),
    -cl * Math.sin(lonR)
  ).normalize();
}

export function geoToUV(
  lat: number,
  lon: number,
  lonOffset: number = LON_OFFSET_DEFAULT
): THREE.Vector2 {
  let u = 0.5 + lon / 360 + lonOffset / (2 * Math.PI);
  u = ((u % 1) + 1) % 1;
  const v = 0.5 - lat / 180;
  return new THREE.Vector2(u, v);
}

export function desiredEulerToFaceCamera(targetLocal: THREE.Vector3): THREE.Euler {
  const q = new THREE.Quaternion().setFromUnitVectors(
    targetLocal.clone().normalize(),
    new THREE.Vector3(0, 0, 1)
  );
  return new THREE.Euler().setFromQuaternion(q, "YXZ");
}
