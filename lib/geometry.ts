// Server and browser engines can disagree on the last digits of Math.sin/cos, so SVG coordinates are rounded.
export const round = (value: number, precision = 2) => {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
};

export const polar = (cx: number, cy: number, radius: number, angle: number, radiusY = radius) => ({
  x: round(cx + Math.cos(angle) * radius),
  y: round(cy + Math.sin(angle) * radiusY),
});
