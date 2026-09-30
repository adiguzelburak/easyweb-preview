// Mirrors the showcase grid (max-w-7xl, px-8, phone width min(34svh, 340px)); keep in sync with the left-phone utility.
export function phoneCenterX(width: number, viewportHeight: number) {
  return width / 2 + Math.min(width / 2, 640) - 32 - Math.min(viewportHeight * 0.17, 170);
}
