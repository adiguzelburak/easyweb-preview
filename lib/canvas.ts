export function fitCanvas(canvas: HTMLCanvasElement, maxPixelRatio = 2) {
  const ratio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);

  const context = canvas.getContext("2d")!;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { context, width, height };
}
