"use client";

import { useRef, type ReactNode } from "react";
import { gsap, LINE_HIDDEN, splitMaskedLines, useGSAP } from "@/lib/gsap";
import { ease, media } from "@/lib/motion";

export function SplitReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        splitMaskedLines(ref.current!, {
          autoSplit: true,
          onSplit: (split) =>
            gsap.from(split.lines, {
              yPercent: LINE_HIDDEN,
              duration: 1.1,
              ease: ease.enter,
              stagger: 0.08,
              scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
            }),
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className="block">
      {children}
    </span>
  );
}
