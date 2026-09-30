import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// yPercent that hides a line completely below its widened mask.
export const LINE_HIDDEN = 140;

// Masks clip at the line box, which would cut the easy® pills and descenders, so the clip reaches past it.
export function splitMaskedLines(target: Element, vars: Partial<SplitText.Vars> = {}) {
  return SplitText.create(target, {
    ...vars,
    type: "lines",
    mask: "lines",
    // Splitting inside an easy® pill slices it into clones, which showed up as stray orange fragments.
    ignore: "[data-easy]",
    onSplit: (split) => {
      gsap.set(split.masks, { overflow: "visible", clipPath: "inset(-0.3em 0)" });
      return vars.onSplit?.(split);
    },
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
