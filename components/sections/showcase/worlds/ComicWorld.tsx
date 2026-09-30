"use client";

import { useRef } from "react";
import { ComicPanelArt, type ComicArt } from "./ComicPanelArt";
import type { WorldProps } from "./types";
import { cn } from "@/lib/cn";
import { polar } from "@/lib/geometry";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useMediaQuery";
import { ease } from "@/lib/motion";

const PANELS: Record<"wide" | "compact", { className: string; rotate: number; art: ComicArt }[]> = {
  wide: [
    { className: "top-[9%] left-[44%] h-[27%] w-[19%]", rotate: -4, art: "speed" },
    { className: "top-[63%] left-[48%] h-[25%] w-[16%]", rotate: 3, art: "dots" },
    { className: "top-[7%] left-[92%] h-[22%] w-[13%]", rotate: 5, art: "stripes" },
  ],
  compact: [
    { className: "top-[3%] right-[4%] h-[14%] w-[36%]", rotate: 4, art: "speed" },
    { className: "bottom-[5%] left-[3%] h-[16%] w-[30%]", rotate: -4, art: "dots" },
  ],
};

const BURST = Array.from({ length: 28 }, (_, index) => {
  const radius = index % 2 ? 60 + (index % 3) * 4 : 96 - (index % 4) * 3;
  const { x, y } = polar(100, 100, radius, (index / 28) * Math.PI * 2);
  return `${x},${y}`;
}).join(" ");

const RAYS = Array.from({ length: 40 }, (_, index) => {
  const angle = (index / 40) * Math.PI * 2;
  return { angle, from: polar(79, 50, 16, angle, 26), to: polar(79, 50, 70, angle, 110) };
});

export function ComicWorld({ active, compact = false }: WorldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!active || reduceMotion) return;
      gsap.fromTo(
        "[data-panel]",
        { autoAlpha: 0, scale: 1.35, rotate: (_, panel: HTMLElement) => Number(panel.dataset.rotate) * 3 },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: (_, panel: HTMLElement) => Number(panel.dataset.rotate),
          duration: 0.6,
          ease: "back.out(2.4)",
          stagger: 0.12,
        },
      );
      gsap.fromTo(
        "[data-pow]",
        { autoAlpha: 0, scale: 0, rotate: -45 },
        { autoAlpha: 1, scale: 1, rotate: -10, duration: 1, delay: 0.35, ease: "elastic.out(1, 0.45)" },
      );
      if (!compact) {
        gsap.fromTo("[data-rays]", { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.9, ease: ease.enter });
      }
    },
    { dependencies: [active, compact, reduceMotion], scope: ref },
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(22,19,15,0.16)_1.3px,transparent_1.6px)] bg-[length:13px_13px] [mask-image:radial-gradient(ellipse_at_78%_50%,black_15%,transparent_70%)]" />

      {!compact && (
        <svg data-rays viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          {RAYS.map(({ angle, from, to }) => (
            <line
              key={angle}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#16130f"
              strokeOpacity="0.14"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      )}

      {PANELS[compact ? "compact" : "wide"].map((panel) => (
        <div
          key={panel.className}
          data-panel
          data-rotate={panel.rotate}
          style={{ transform: `rotate(${panel.rotate}deg)` }}
          className={cn(
            "absolute overflow-hidden border-[3px] border-ink bg-paper shadow-[6px_6px_0_#16130f]",
            panel.className,
          )}
        >
          <ComicPanelArt art={panel.art} />
        </div>
      ))}

      <div
        data-pow
        style={{ transform: "rotate(-10deg)" }}
        className={cn("absolute aspect-square", compact ? "top-[50%] -left-[8%] w-[30%]" : "top-[31%] left-[49%] w-[12%]")}
      >
        <svg viewBox="0 0 200 200" className="size-full overflow-visible">
          <polygon points={BURST} fill="#e5322d" stroke="#16130f" strokeWidth="6" strokeLinejoin="round" />
          <text
            x="100"
            y="117"
            textAnchor="middle"
            stroke="#16130f"
            strokeWidth="6"
            paintOrder="stroke"
            className="fill-comic font-sans text-[48px] font-extrabold tracking-tight"
          >
            POW!
          </text>
        </svg>
      </div>
    </div>
  );
}
