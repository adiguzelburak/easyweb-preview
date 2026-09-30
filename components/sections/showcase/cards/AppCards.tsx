"use client";

import { useRef } from "react";
import { CardView } from "./CardView";
import type { GlassCard } from "@/content/types";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useMediaQuery";
import { ease } from "@/lib/motion";

type AppCardsProps = {
  cards: GlassCard[];
  active: boolean;
  className?: string;
};

export function AppCards({ cards, active, className }: AppCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);
  const reduceMotion = useReducedMotion();

  // Hidden until the first entrance, then left on screen so leaving the app never makes them pop out.
  useGSAP(
    () => {
      if (reduceMotion) return;
      if (!active) {
        if (!played.current) gsap.set("[data-glass-card]", { autoAlpha: 0 });
        return;
      }
      played.current = true;
      gsap.fromTo(
        "[data-glass-card]",
        { autoAlpha: 0, y: 28, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, delay: 0.15, ease: ease.enter, stagger: 0.09 },
      );
      gsap.fromTo("[data-fill]", { scaleX: 0 }, { scaleX: 1, duration: 1.4, delay: 0.45, ease: "expo.out" });
      gsap.fromTo(
        "[data-knob]",
        { x: (_, knob: HTMLElement) => -(knob.parentElement?.offsetWidth ?? 0) },
        { x: 0, duration: 1.4, delay: 0.45, ease: "expo.out" },
      );
    },
    { dependencies: [active, reduceMotion], scope: ref, revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={cn("flex flex-col gap-4", className)}>
      {cards.map((card) => (
        <CardView key={card.title} card={card} />
      ))}
    </div>
  );
}
