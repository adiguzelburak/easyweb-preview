"use client";

import { useRef } from "react";
import type { WorldProps } from "./types";
import { useCanvasScene } from "@/lib/hooks/useCanvasScene";
import { phoneCenterX } from "@/lib/layout";
import { useReducedMotion } from "@/lib/hooks/useMediaQuery";

const INK = "#16130f";

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function MusicWorld({ active, compact = false }: WorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useCanvasScene(
    canvasRef,
    (context, width, height) => {
      const count = compact ? 22 : 54;
      const slot = width / count;
      const barWidth = slot * 0.5;
      const floor = height * 0.94;
      const reach = height * (compact ? 0.22 : 0.3);
      const source = compact ? { x: width * 0.5, y: height * 0.74 } : { x: phoneCenterX(width, height), y: height * 0.5 };
      const maxRadius = Math.hypot(width, height) * 0.6;
      // Bars fade out towards the copy on the left so they never fight the text.
      const bars = Array.from({ length: count }, (_, index) => ({
        x: index * slot + (slot - barWidth) / 2,
        speed: 1.6 + Math.random() * 2.4,
        phase: Math.random() * Math.PI * 2,
        alpha: compact ? 0.28 : 0.1 + 0.55 * smoothstep(0.35, 0.75, index / count),
      }));
      let gain = 1;
      let lastScroll = window.scrollY;

      context.fillStyle = INK;
      context.strokeStyle = INK;
      context.lineWidth = 1.5;

      return (time) => {
        const scrolled = Math.abs(window.scrollY - lastScroll);
        lastScroll = window.scrollY;
        gain += (Math.min(1 + scrolled / 30, 2.2) - gain) * 0.08;

        context.clearRect(0, 0, width, height);

        for (let ring = 0; ring < 4; ring++) {
          const radius = (time * 90 + ring * (maxRadius / 4)) % maxRadius;
          context.globalAlpha = 0.22 * (1 - radius / maxRadius);
          context.beginPath();
          context.arc(source.x, source.y, radius, 0, Math.PI * 2);
          context.stroke();
        }

        bars.forEach((bar, index) => {
          const wave = 0.5 + 0.5 * Math.sin(time * bar.speed + bar.phase);
          const swell = 0.6 + 0.4 * Math.sin(time * 1.1 + index * 0.32);
          const barHeight = Math.max(barWidth, Math.min(reach * 1.6, reach * (0.15 + 0.85 * wave * swell) * gain));
          context.globalAlpha = bar.alpha;
          context.beginPath();
          context.roundRect(bar.x, floor - barHeight, barWidth, barHeight, barWidth / 2);
          context.fill();
        });
      };
    },
    active && !reduceMotion,
  );

  return <canvas ref={canvasRef} className="absolute inset-0 size-full" />;
}
