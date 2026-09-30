"use client";

import { useRef } from "react";
import type { WorldProps } from "./types";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useMediaQuery";

const CENTER = 350;

const RINGS = [
  { radius: 300, color: "#7b5cf0", progress: 72 },
  { radius: 256, color: "#ec6fb0", progress: 58 },
  { radius: 212, color: "#2bb3a3", progress: 86 },
];

export function GlpalWorld({ active, compact = false }: WorldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Each ring is its own layer and sweeps in by rotating, so the entrance never repaints the SVG.
  useGSAP(
    () => {
      if (!active || reduceMotion) return;
      gsap.fromTo(
        "[data-ring]",
        { rotate: -150, scale: 0.92, autoAlpha: 0 },
        { rotate: 0, scale: 1, autoAlpha: 1, duration: 1.6, ease: "expo.out", stagger: 0.12 },
      );
    },
    { dependencies: [active, reduceMotion], scope: ref },
  );

  return (
    <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_80%_50%,rgba(123,92,240,0.2),transparent_70%)]">
      <div
        ref={ref}
        className={cn(
          "absolute aspect-square -translate-x-1/2 -translate-y-1/2",
          compact ? "top-[72%] left-1/2 w-[150%]" : "top-1/2 left-phone w-[min(118svh,1100px)]",
        )}
      >
        <svg viewBox="0 0 700 700" fill="none" className="absolute inset-0 size-full animate-orbit motion-reduce:animate-none">
          <circle cx={CENTER} cy={CENTER} r="338" stroke="#7b5cf0" strokeOpacity="0.25" strokeDasharray="2 12" />
        </svg>

        <svg viewBox="0 0 700 700" fill="none" strokeWidth="26" className="absolute inset-0 size-full">
          {RINGS.map((ring) => (
            <circle key={ring.radius} cx={CENTER} cy={CENTER} r={ring.radius} stroke={ring.color} strokeOpacity="0.14" />
          ))}
        </svg>

        {RINGS.map((ring) => (
          <svg key={ring.radius} data-ring viewBox="0 0 700 700" fill="none" className="absolute inset-0 size-full">
            <circle
              cx={CENTER}
              cy={CENTER}
              r={ring.radius}
              stroke={ring.color}
              strokeWidth="26"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={`${ring.progress} 100`}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
