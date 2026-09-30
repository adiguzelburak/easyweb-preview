"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useMediaQuery";
import { ease } from "@/lib/motion";

const DWELL_SECONDS = 3.2;

type ScreenshotStoryProps = {
  screenshots: string[];
  playing: boolean;
};

export function ScreenshotStory({ screenshots, playing }: ScreenshotStoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const shown = useRef(0);
  const reduceMotion = useReducedMotion();
  const count = screenshots.length;
  const running = playing && !reduceMotion && count > 1;
  const previous = (index - 1 + count) % count;
  const next = (index + 1) % count;

  useGSAP(
    () => {
      const from = shown.current;
      shown.current = index;
      if (from === index) return;
      const slide = (position: number) => ref.current!.querySelector(`[data-slide="${position}"]`);
      const incoming = slide(index);
      const outgoing = slide(from);
      if (incoming) gsap.fromTo(incoming, { xPercent: 100 }, { xPercent: 0, duration: 0.8, ease: ease.swap });
      if (outgoing) gsap.fromTo(outgoing, { xPercent: 0 }, { xPercent: -35, duration: 0.8, ease: ease.swap });
    },
    { dependencies: [index], scope: ref },
  );

  useGSAP(
    () => {
      if (!running) return;
      gsap.fromTo(
        `[data-progress="${index}"]`,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: DWELL_SECONDS,
          ease: "none",
          onComplete: () => setIndex((current) => (current + 1) % count),
        },
      );
    },
    { dependencies: [index, running, count], scope: ref, revertOnUpdate: true },
  );

  // Only the visible slide stays mounted while paused; the neighbours load once the story plays.
  const layerOf = (position: number) => {
    if (position === index) return "z-20";
    if (running && position === previous) return "z-10";
    if (running && position === next) return "z-0";
    return null;
  };

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-black">
      {screenshots.map((src, position) => {
        const layer = layerOf(position);
        if (!layer) return null;
        return (
          <Image
            key={src}
            data-slide={position}
            src={src}
            alt=""
            fill
            sizes="300px"
            className={cn("object-cover", layer)}
          />
        );
      })}

      {count > 1 && !reduceMotion && (
        <div className="absolute inset-x-[18%] bottom-[2.4%] z-30 flex gap-[1.4cqw] rounded-full bg-black/35 px-[2.6cqw] py-[1.5cqw] backdrop-blur-sm">
          {screenshots.map((src, position) => (
            <span key={src} className="relative h-[0.8cqw] flex-1 overflow-hidden rounded-full bg-white/35">
              <span
                data-progress={position}
                className="absolute inset-0 origin-left bg-white"
                style={{ transform: `scaleX(${position < index ? 1 : 0})` }}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
