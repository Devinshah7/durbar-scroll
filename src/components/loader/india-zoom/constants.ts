// Captured Euler rotation (radians) that brings the Indian subcontinent to
// face the camera (+Z). Capture using ?aim=1 in the URL, then click
// "Save as India lock target" and paste the logged values here.
export const INDIA_LOCK_EULER = { x: 0.325, y: -9.23, z: 0 };

export const INDIA_LOCK_STORAGE_KEY = "loader.indiaLockEuler";

export function readIndiaLockEuler(): { x: number; y: number; z: number } {
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(INDIA_LOCK_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          typeof parsed.x === "number" &&
          typeof parsed.y === "number" &&
          typeof parsed.z === "number"
        ) {
          return parsed;
        }
      }
    } catch {
      // fall through
    }
  }
  return INDIA_LOCK_EULER;
}
