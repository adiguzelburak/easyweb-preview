import { round } from "@/lib/geometry";

export type Point = { x: number; y: number };

export const VIEWBOX = { width: 1200, height: 540 };

const START: Point = { x: 16, y: 524 };

// Every stop's label hangs above-left of its dot, which a rising curve always leaves empty.
export const STOPS: Point[] = [
  { x: 230, y: 462 },
  { x: 520, y: 388 },
  { x: 830, y: 272 },
  { x: 1150, y: 136 },
];

export const GRID_LINES = [135, 270, 405];

// Catmull–Rom through every stop, converted to cubic Béziers, so the dots sit exactly on the line.
function smoothPath(points: Point[]) {
  let path = `M${points[0].x} ${points[0].y}`;
  for (let index = 0; index < points.length - 1; index++) {
    const p0 = points[index - 1] ?? points[index];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[index + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    path += ` C${round(c1.x)} ${round(c1.y)} ${round(c2.x)} ${round(c2.y)} ${p2.x} ${p2.y}`;
  }
  return path;
}

const last = STOPS[STOPS.length - 1];

export const LINE_PATH = smoothPath([START, ...STOPS]);

export const AREA_PATH = `${LINE_PATH} L${last.x} ${VIEWBOX.height} L${START.x} ${VIEWBOX.height} Z`;

export function progressAtX(path: SVGPathElement, x: number) {
  const total = path.getTotalLength();
  let low = 0;
  let high = total;
  for (let step = 0; step < 24; step++) {
    const middle = (low + high) / 2;
    if (path.getPointAtLength(middle).x < x) low = middle;
    else high = middle;
  }
  return low / total;
}
