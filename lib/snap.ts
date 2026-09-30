export type Direction = 1 | -1;

type PointsProvider = () => number[];

const EDGE = 2;
const providers = new Set<PointsProvider>();

// Sections register the scroll positions they want to rest on; the page steps through all of them in order.
export function registerSnapPoints(provider: PointsProvider) {
  providers.add(provider);
  return () => {
    providers.delete(provider);
  };
}

export function collectSnapPoints() {
  return [...providers].flatMap((provider) => provider()).sort((a, b) => a - b);
}

// The stop to scroll to, or null when the gesture should scroll the page normally.
export function nextSnapPoint(points: number[], y: number, direction: Direction, viewport: number) {
  if (points.length === 0) return null;
  const first = points[0];
  const last = points[points.length - 1];

  if (direction > 0) {
    if (y < first - viewport || y >= last - EDGE) return null;
    return points.find((point) => point > y + EDGE) ?? null;
  }
  if (y <= first + EDGE || y > last + viewport) return null;
  return points.findLast((point) => point < y - EDGE) ?? null;
}

type SnapControllerOptions = {
  points: () => number[];
  position: () => number;
  viewport: () => number;
  scrollTo: (target: number) => void;
  stepMs: number;
  now?: () => number;
  gapMs?: number;
};

// One gesture moves at most one step and the rest of it (trackpad inertia included) is consumed.
// Locks are time-based, so a step interrupted by another scroll can never leave the wheel stuck.
export function createSnapController({
  points,
  position,
  viewport,
  scrollTo,
  stepMs,
  now = () => performance.now(),
  gapMs = 140,
}: SnapControllerOptions) {
  let stepEnd = 0;
  let gesture = 0;
  let usedGesture = -1;
  let lastTime = -Infinity;
  let lastDirection = 0;
  let level = 0;

  // A pause, a reversal or a jump well above the fading inertia starts a new gesture.
  const track = (direction: Direction, magnitude: number, time: number) => {
    const fresh = time - lastTime > gapMs || direction !== lastDirection || magnitude > Math.max(level * 2.5, 12);
    if (fresh) gesture += 1;
    level = fresh ? magnitude : level * 0.8 + magnitude * 0.2;
    lastTime = time;
    lastDirection = direction;
  };

  const step = (direction: Direction, time: number) => {
    const target = nextSnapPoint(points(), position(), direction, viewport());
    if (target === null) return false;
    scrollTo(target);
    stepEnd = time + stepMs;
    return true;
  };

  return {
    wheel(direction: Direction, magnitude: number) {
      const time = now();
      track(direction, magnitude, time);
      if (time < stepEnd || gesture === usedGesture) {
        usedGesture = gesture;
        return true;
      }
      if (!step(direction, time)) return false;
      usedGesture = gesture;
      return true;
    },
    key(direction: Direction) {
      const time = now();
      return time < stepEnd || step(direction, time);
    },
  };
}
