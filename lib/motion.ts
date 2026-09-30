export const ease = {
  enter: "expo.out",
  swap: "power3.inOut",
  pop: "back.out(1.7)",
} as const;

export const media = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 768px)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

export function prefersReducedMotion() {
  return window.matchMedia(media.reduce).matches;
}
