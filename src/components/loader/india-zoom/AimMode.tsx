import { useEffect, useState } from "react";
import * as THREE from "three";
import type { EarthHandle } from "./Earth";
import { INDIA_LOCK_STORAGE_KEY } from "./constants";

type Props = {
  earthRef: React.MutableRefObject<EarthHandle | null>;
};

/**
 * AimMode — installs mouse-drag + arrow-key controls on the Earth group and
 * renders a HUD that shows the current rotation and lets you save it as the
 * India lock target.
 */
export function AimMode({ earthRef }: Props) {
  const [rot, setRot] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let raf = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const waitForEarth = () => {
      const e = earthRef.current;
      if (!e || !e.group) {
        raf = requestAnimationFrame(waitForEarth);
        return;
      }
      // Stop spin and reset state for clean aiming
      e.spinSpeed.value = 0;
      const earthMesh = e.group.children[0] as THREE.Mesh | undefined;
      if (earthMesh) earthMesh.rotation.set(0, 0, 0);
      e.group.scale.set(1, 1, 1);
      tick();
    };

    const tick = () => {
      const g = earthRef.current?.group;
      if (g) {
        setRot({ x: g.rotation.x, y: g.rotation.y, z: g.rotation.z });
      }
      raf = requestAnimationFrame(tick);
    };

    const onDown = (e: MouseEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      const g = earthRef.current?.group;
      if (!g) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      g.rotation.y += dx * 0.005;
      g.rotation.x += dy * 0.005;
    };
    const onKey = (e: KeyboardEvent) => {
      const g = earthRef.current?.group;
      if (!g) return;
      const step = e.shiftKey ? 0.001 : 0.01;
      switch (e.key) {
        case "ArrowLeft":
          g.rotation.y -= step;
          e.preventDefault();
          break;
        case "ArrowRight":
          g.rotation.y += step;
          e.preventDefault();
          break;
        case "ArrowUp":
          g.rotation.x -= step;
          e.preventDefault();
          break;
        case "ArrowDown":
          g.rotation.x += step;
          e.preventDefault();
          break;
      }
    };

    waitForEarth();
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [earthRef]);

  const fmt = (n: number) => n.toFixed(4);
  const text = `x: ${fmt(rot.x)}  y: ${fmt(rot.y)}  z: ${fmt(rot.z)}`;

  const save = () => {
    const value = { x: rot.x, y: rot.y, z: rot.z };
    try {
      localStorage.setItem(INDIA_LOCK_STORAGE_KEY, JSON.stringify(value));
    } catch {
      /* ignore */
    }
    const snippet = `export const INDIA_LOCK_EULER = { x: ${value.x}, y: ${value.y}, z: ${value.z} };`;
    // eslint-disable-next-line no-console
    console.log("[AimMode] Saved India lock target:\n" + snippet);
  };

  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        left: 12,
        zIndex: 100000,
        padding: "10px 12px",
        background: "rgba(0,0,0,0.75)",
        color: "#ffd27a",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 12,
        borderRadius: 8,
        border: "1px solid rgba(255,210,122,0.3)",
        userSelect: "none",
        pointerEvents: "auto",
        minWidth: 280,
      }}
    >
      <div style={{ marginBottom: 6, fontWeight: 600 }}>Aim Mode</div>
      <div
        onClick={copy}
        title="Click to copy"
        style={{ cursor: "pointer", marginBottom: 8 }}
      >
        {text}
      </div>
      <button
        onClick={save}
        style={{
          background: "#d4af37",
          color: "#1a0a0a",
          border: "none",
          padding: "6px 10px",
          borderRadius: 4,
          fontWeight: 600,
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        Save as India lock target
      </button>
      <div style={{ marginTop: 8, opacity: 0.7, lineHeight: 1.4 }}>
        Drag to rotate · Arrows fine-tune · Shift+Arrow = precise
      </div>
    </div>
  );
}
