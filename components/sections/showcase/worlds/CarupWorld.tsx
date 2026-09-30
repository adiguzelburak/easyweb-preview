"use client";

import { useRef } from "react";
import type { WorldProps } from "./types";
import { WidgetTiles } from "./WidgetTiles";
import { cn } from "@/lib/cn";
import { polar } from "@/lib/geometry";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useMediaQuery";

const CENTER = 350;
const RADIUS = 300;
const GREEN = "#3ad35e";

// A classic speedometer: 240° of dial opening at the bottom, angles clockwise from 3 o'clock.
const DIAL_START = 150;
const DIAL_SWEEP = 240;
const READING = 0.68;
const NEEDLE_REST = DIAL_START + DIAL_SWEEP * READING;

const angleAt = (fraction: number) => ((DIAL_START + DIAL_SWEEP * fraction) * Math.PI) / 180;

const TICKS = Array.from({ length: 41 }, (_, index) => {
  const major = index % 5 === 0;
  const inner = polar(CENTER, CENTER, RADIUS - (major ? 34 : 18), angleAt(index / 40));
  const outer = polar(CENTER, CENTER, RADIUS, angleAt(index / 40));
  return { major, x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
});

const LABELS = Array.from({ length: 9 }, (_, index) => ({
  value: index * 30,
  ...polar(CENTER, CENTER, RADIUS - 64, angleAt(index / 8)),
}));

function arc(radius: number, to: number) {
  const start = polar(CENTER, CENTER, radius, angleAt(0));
  const end = polar(CENTER, CENTER, radius, angleAt(to));
  const largeArc = DIAL_SWEEP * to > 180 ? 1 : 0;
  return `M${start.x} ${start.y} A${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export function CarupWorld({ active, compact = false }: WorldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Only whole layers move (the needle rotates, the lit arc fades), so the gauge never repaints.
  useGSAP(
    () => {
      if (!active || reduceMotion) return;
      gsap
        .timeline()
        .fromTo("[data-lit-arc]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, 0)
        .fromTo(
          "[data-needle]",
          { rotate: DIAL_START },
          { rotate: NEEDLE_REST, duration: 1.6, ease: "back.out(1.4)" },
          0.1,
        )
        .to("[data-needle]", { rotate: "+=4", duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
    },
    { dependencies: [active, reduceMotion], scope: ref, revertOnUpdate: true },
  );

  return (
    <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_80%_50%,rgba(58,211,94,0.16),transparent_70%)]">
      <div
        ref={ref}
        className={cn(
          "absolute aspect-square -translate-x-1/2 -translate-y-1/2",
          compact ? "top-[72%] left-1/2 w-[150%]" : "top-1/2 left-phone w-[min(118svh,1100px)]",
        )}
      >
        <svg viewBox="0 0 700 700" fill="none" className="absolute inset-0 size-full">
          <path d={arc(RADIUS + 14, 1)} stroke="#f6f1e9" strokeOpacity="0.08" strokeWidth="6" strokeLinecap="round" />
          {TICKS.map((tick, index) => (
            <line
              key={index}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke="#f6f1e9"
              strokeOpacity={tick.major ? 0.5 : 0.2}
              strokeWidth={tick.major ? 4 : 2}
              strokeLinecap="round"
            />
          ))}
          {LABELS.map((label) => (
            <text
              key={label.value}
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#f6f1e9"
              fillOpacity="0.45"
              className="font-sans text-[22px] font-semibold tabular-nums"
            >
              {label.value}
            </text>
          ))}
        </svg>

        <svg data-lit-arc viewBox="0 0 700 700" fill="none" className="absolute inset-0 size-full">
          <path d={arc(RADIUS + 14, READING)} stroke={GREEN} strokeOpacity="0.18" strokeWidth="26" strokeLinecap="round" />
          <path d={arc(RADIUS + 14, READING)} stroke={GREEN} strokeWidth="6" strokeLinecap="round" />
        </svg>

        <svg
          data-needle
          viewBox="0 0 700 700"
          className="absolute inset-0 size-full"
          style={{ transform: `rotate(${NEEDLE_REST}deg)` }}
        >
          <path d={`M${CENTER + 40} ${CENTER - 7} L${CENTER + RADIUS - 44} ${CENTER - 1.5} L${CENTER + RADIUS - 44} ${CENTER + 1.5} L${CENTER + 40} ${CENTER + 7} Z`} fill={GREEN} />
          <circle cx={CENTER} cy={CENTER} r="16" fill={GREEN} />
        </svg>
      </div>
      {!compact && <WidgetTiles active={active} />}
    </div>
  );
}
