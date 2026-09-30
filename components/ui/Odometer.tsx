"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/motion";

const STRIP = Array.from({ length: 20 }, (_, index) => index % 10);

// The strip holds two 0–9 cycles so every digit rolls through at least one full turn.
const restingOffset = (digit: number) => -((10 + digit) / STRIP.length) * 100;

type OdometerProps = {
  value: number;
  suffix?: string;
};

export function Odometer({ value, suffix = "" }: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const digits = [...String(value)].map(Number);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.fromTo(
          "[data-strip]",
          { y: 0, yPercent: 0 },
          {
            y: 0,
            yPercent: (index) => restingOffset(digits[index]),
            duration: (index) => 1.8 + index * 0.3,
            ease: "expo.out",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className="inline-flex tabular-nums">
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden className="flex">
        {digits.map((digit, index) => (
          <span key={index} className="relative inline-block h-[1.05em] overflow-hidden">
            <span
              data-strip
              className="flex flex-col"
              style={{ transform: `translateY(${restingOffset(digit)}%)` }}
            >
              {STRIP.map((number, position) => (
                <span key={position} className="block h-[1.05em] leading-[1.05]">
                  {number}
                </span>
              ))}
            </span>
          </span>
        ))}
        <span className="leading-[1.05]">{suffix}</span>
      </span>
    </span>
  );
}
