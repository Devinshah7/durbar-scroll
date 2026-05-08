export function MandalaOverlay({
  progress,
  position,
}: {
  progress: number;
  position?: { x: number; y: number } | null;
}) {
  // progress 0..1 controls scale + dissolve
  const scale = 0.05 + progress * 4;
  const opacity =
    progress < 0.7 ? Math.min(1, progress * 3) : Math.max(0, 1 - (progress - 0.7) / 0.3);
  const dash = 1000;
  const offset = (1 - Math.min(1, progress * 2)) * dash;

  const positionStyle: React.CSSProperties = position
    ? {
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }
    : { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" };

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ opacity }}
    >
      <div style={positionStyle}>
      <svg
        width="600"
        height="600"
        viewBox="-300 -300 600 600"
        style={{
          transform: `scale(${scale})`,
          transition: "none",
          filter: "drop-shadow(0 0 30px rgba(212,175,55,0.6))",
        }}
      >
        <g
          fill="none"
          stroke="#d4af37"
          strokeWidth="1.2"
          strokeDasharray={dash}
          strokeDashoffset={offset}
        >
          {Array.from({ length: 9 }).map((_, i) => {
            const r = 30 + i * 28;
            return <circle key={`c${i}`} cx="0" cy="0" r={r} opacity={0.85 - i * 0.05} />;
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <line
                key={`l${i}`}
                x1={Math.cos(a) * 40}
                y1={Math.sin(a) * 40}
                x2={Math.cos(a) * 280}
                y2={Math.sin(a) * 280}
              />
            );
          })}
          {Array.from({ length: 6 }).map((_, i) => {
            const r = 60 + i * 30;
            const flip = i % 2 === 0 ? 1 : -1;
            return (
              <polygon
                key={`t${i}`}
                points={`0,${-r * flip} ${r * 0.866},${(r / 2) * flip} ${-r * 0.866},${(r / 2) * flip}`}
                opacity={0.6}
              />
            );
          })}
        </g>
      </svg>
      </div>
    </div>
  );
}
