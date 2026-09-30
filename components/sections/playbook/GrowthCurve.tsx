import { AREA_PATH, GRID_LINES, LINE_PATH, STOPS, VIEWBOX } from "./curve";

export function GrowthCurve() {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      aria-hidden
      fill="none"
      className="block w-full overflow-visible"
    >
      <defs>
        <linearGradient id="growth-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff6600" stopOpacity="0.3" />
          <stop offset="1" stopColor="#ff6600" stopOpacity="0" />
        </linearGradient>
      </defs>

      {GRID_LINES.map((y) => (
        <line key={y} x1="0" x2={VIEWBOX.width} y1={y} y2={y} stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 8" />
      ))}
      <line x1="0" x2={VIEWBOX.width} y1={VIEWBOX.height} y2={VIEWBOX.height} stroke="currentColor" strokeOpacity="0.2" />

      <path data-curve-area d={AREA_PATH} fill="url(#growth-area)" />
      <path
        data-curve-line
        d={LINE_PATH}
        pathLength={1}
        strokeDasharray="1"
        stroke="#ff6600"
        strokeWidth="4"
        strokeLinecap="round"
        className="max-md:stroke-[9]"
      />

      {STOPS.map((stop) => (
        <circle
          key={stop.x}
          data-curve-dot
          cx={stop.x}
          cy={stop.y}
          r="10"
          fill="#16130f"
          stroke="#f6f1e9"
          strokeWidth="4"
          className="max-md:[r:18px]"
        />
      ))}
    </svg>
  );
}
