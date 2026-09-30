"use client";

import { useRef } from "react";
import type { WorldProps } from "./types";
import { cn } from "@/lib/cn";
import { polar } from "@/lib/geometry";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCanvasScene } from "@/lib/hooks/useCanvasScene";
import { useReducedMotion } from "@/lib/hooks/useMediaQuery";
import { ease } from "@/lib/motion";

type Point = [number, number];

const CONSTELLATIONS: Point[][] = [
  [[830, 160], [905, 138], [975, 165], [1040, 205], [1150, 218], [1140, 305], [1060, 285], [1040, 205]],
  [[760, 790], [842, 722], [912, 796], [992, 734], [1082, 806]],
];

const RING = { center: 620, radius: 560 };

const TICKS = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2;
  const inner = polar(RING.center, RING.center, RING.radius - 14, angle);
  const outer = polar(RING.center, RING.center, RING.radius + 14, angle);
  return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
});

const toPath = (points: Point[]) => points.map(([x, y], index) => `${index ? "L" : "M"}${x} ${y}`).join(" ");

type Star = { x: number; y: number; radius: number; alpha: number; speed: number; phase: number };

function createStars(count: number, width: number, height: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() ** 3 * 1.5 + 0.4,
    alpha: 0.3 + Math.random() * 0.7,
    speed: 0.6 + Math.random() * 1.8,
    phase: Math.random() * Math.PI * 2,
  }));
}

export function StarsWorld({ active, compact = false }: WorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduceMotion = useReducedMotion();

  useCanvasScene(
    canvasRef,
    (context, width, height) => {
      const stars = createStars(Math.round((width * height) / (compact ? 5000 : 3600)), width, height);
      context.fillStyle = "#f6f1e9";
      return (time) => {
        context.clearRect(0, 0, width, height);
        for (const star of stars) {
          context.globalAlpha = star.alpha * (0.55 + 0.45 * Math.sin(time * star.speed + star.phase));
          context.beginPath();
          context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          context.fill();
        }
      };
    },
    active && !reduceMotion,
  );

  useGSAP(
    () => {
      if (!active || reduceMotion) return;
      gsap.fromTo(
        "[data-line]",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 2.4, delay: 0.3, ease: "power2.inOut", stagger: 0.4 },
      );
      gsap.fromTo(
        "[data-star]",
        { scale: 0, transformOrigin: "50% 50%" },
        { scale: 1, duration: 0.6, delay: 0.3, ease: ease.pop, stagger: 0.05 },
      );
    },
    { dependencies: [active, reduceMotion], scope: svgRef },
  );

  return (
    <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_22%,rgba(139,92,246,0.35),transparent_70%),radial-gradient(50%_45%_at_15%_85%,rgba(91,33,182,0.25),transparent_70%)]">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <div
        className={cn(
          "absolute aspect-square -translate-x-1/2 -translate-y-1/2",
          compact ? "top-[72%] left-1/2 w-[170%]" : "top-1/2 left-phone w-[min(124svh,1180px)]",
        )}
      >
        <svg
          viewBox="0 0 1240 1240"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.14"
          className="size-full animate-orbit text-paper motion-reduce:animate-none"
        >
          <circle cx={RING.center} cy={RING.center} r={RING.radius} />
          <circle cx={RING.center} cy={RING.center} r={RING.radius + 40} strokeDasharray="2 14" />
          {TICKS.map((tick, index) => (
            <line key={index} {...tick} />
          ))}
        </svg>
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 size-full text-paper"
      >
        {CONSTELLATIONS.map((points, index) => (
          <g key={index}>
            <path
              data-line
              d={toPath(points)}
              pathLength={1}
              strokeDasharray="1"
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
            {points.map(([x, y], star) => (
              <circle key={star} data-star cx={x} cy={y} r="4.5" fill="currentColor" />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
