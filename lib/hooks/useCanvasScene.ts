import { useEffect, useEffectEvent, useRef, type RefObject } from "react";
import { fitCanvas } from "@/lib/canvas";
import { gsap } from "@/lib/gsap";
import { useTicker } from "./useTicker";

type Draw = (time: number) => void;
type CreateScene = (context: CanvasRenderingContext2D, width: number, height: number) => Draw;

export function useCanvasScene(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  createScene: CreateScene,
  running: boolean,
) {
  const draw = useRef<Draw | null>(null);
  const build = useEffectEvent(createScene);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      const { context, width, height } = fitCanvas(canvas);
      draw.current = build(context, width, height);
      draw.current(gsap.ticker.time);
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [canvasRef]);

  useTicker((time) => draw.current?.(time), running);
}
