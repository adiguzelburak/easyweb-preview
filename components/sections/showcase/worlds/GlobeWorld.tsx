"use client";

import type { Globe, Marker } from "cobe";
import { useEffect, useRef, useState } from "react";
import { AlertSignals } from "./AlertSignals";
import type { WorldProps } from "./types";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks/useMediaQuery";
import { useTicker } from "@/lib/hooks/useTicker";

const HOTSPOTS: [number, number][] = [
  [51.51, -0.13],
  [40.71, -74.01],
  [35.68, 139.69],
  [-33.87, 151.21],
  [19.43, -99.13],
  [28.61, 77.21],
  [30.04, 31.24],
  [-23.55, -46.63],
  [37.77, -122.42],
  [1.35, 103.82],
  [41.01, 28.98],
  [-1.29, 36.82],
  [55.68, 12.57],
  [38.3, 142.4],
  [-6.2, 106.85],
  [48.86, 2.35],
];

const ARCS = [
  [0, 1],
  [0, 10],
  [2, 9],
  [5, 6],
  [8, 2],
  [15, 7],
].map(([from, to]) => ({ from: HOTSPOTS[from], to: HOTSPOTS[to] }));

function pulsingMarkers(time: number): Marker[] {
  return HOTSPOTS.map((location, index) => ({
    location,
    size: 0.025 + 0.035 * Math.max(0, Math.sin(time * 2.4 + index * 1.7)),
  }));
}

export function GlobeWorld({ active, compact = false }: WorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const [unsupported, setUnsupported] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!active || !canvas) return;

    let globe: Globe | undefined;
    let cancelled = false;

    import("cobe").then(({ default: createGlobe }) => {
      if (cancelled) return;
      const size = canvas.clientWidth;
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio, 2),
        width: size,
        height: size,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.3,
        mapSamples: compact ? 12000 : 20000,
        mapBrightness: 5,
        mapBaseBrightness: 0.04,
        baseColor: [0.2, 0.26, 0.36],
        markerColor: [1, 0.23, 0.19],
        glowColor: [0.1, 0.16, 0.26],
        markers: pulsingMarkers(0),
        arcs: ARCS,
        arcColor: [1, 0.42, 0.3],
        arcWidth: 0.6,
        arcHeight: 0.28,
        markerElevation: 0.01,
      });
      globeRef.current = globe;
      if (!canvas.getContext("webgl2") && !canvas.getContext("webgl")) setUnsupported(true);
    });

    return () => {
      cancelled = true;
      globeRef.current = null;
      // Keep the last frame on screen while the next world wipes over this one.
      setTimeout(() => globe?.destroy(), 1200);
    };
  }, [active, compact]);

  useTicker((time) => {
    globeRef.current?.update({ phi: time * 0.12, markers: pulsingMarkers(time) });
  }, active && !reduceMotion);

  const position = compact
    ? "absolute bottom-[-22%] left-1/2 w-[150%] -translate-x-1/2"
    : "absolute top-1/2 left-[40%] w-[min(120svh,1150px)] -translate-y-1/2";

  return (
    <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_75%_50%,rgba(40,70,110,0.45),transparent_70%)]">
      {unsupported ? (
        <div className={cn(position, "aspect-square rounded-full bg-[radial-gradient(circle_at_35%_35%,#27466b,#0b1622_70%)]")} />
      ) : (
        <canvas ref={canvasRef} className={cn(position, "aspect-square")} />
      )}
      {!compact && <AlertSignals />}
    </div>
  );
}
