"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/lib/motion";

type MagneticButtonProps = ComponentProps<"button"> & {
  strength?: number;
};

export function MagneticButton({ strength = 0.35, className, children, ...props }: MagneticButtonProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const area = areaRef.current!;
      const button = buttonRef.current!;
      const mm = gsap.matchMedia();

      mm.add(`${media.finePointer} and ${media.motion}`, () => {
        const xTo = gsap.quickTo(button, "x", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(button, "y", { duration: 0.7, ease: "power3.out" });

        const follow = (event: PointerEvent) => {
          const rect = button.getBoundingClientRect();
          xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
          yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
        };
        const release = () => {
          xTo(0);
          yTo(0);
        };

        area.addEventListener("pointermove", follow);
        area.addEventListener("pointerleave", release);
        return () => {
          area.removeEventListener("pointermove", follow);
          area.removeEventListener("pointerleave", release);
        };
      });
    },
    { scope: areaRef },
  );

  return (
    <div ref={areaRef} className="-m-10 inline-block p-10">
      <button ref={buttonRef} type="button" className={className} {...props}>
        {children}
      </button>
    </div>
  );
}
