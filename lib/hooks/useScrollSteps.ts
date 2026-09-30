import type Lenis from "lenis";
import { useEffect } from "react";
import { setScrollGate } from "@/lib/scroll";
import { collectSnapPoints, createSnapController, type Direction } from "@/lib/snap";

const STEP_SECONDS = 1.1;
const STEP_MS = STEP_SECONDS * 1000;
const KEYS: Record<string, Direction> = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 };

const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;

// One wheel gesture or key press moves to the next registered snap point; outside them the page scrolls freely.
export function useScrollSteps(lenis: Lenis | undefined) {
  useEffect(() => {
    if (!lenis) return;

    const snap = createSnapController({
      points: collectSnapPoints,
      position: () => lenis.animatedScroll,
      viewport: () => window.innerHeight,
      scrollTo: (target) => lenis.scrollTo(target, { duration: STEP_SECONDS, easing: easeOutQuart, force: true }),
      stepMs: STEP_MS,
    });

    setScrollGate(({ deltaY, event }) => {
      if (event.type.startsWith("touch") || deltaY === 0) return true;
      if (!snap.wheel(deltaY > 0 ? 1 : -1, Math.abs(deltaY))) return true;
      if (event.cancelable) event.preventDefault();
      return false;
    });

    const onKeyDown = (event: KeyboardEvent) => {
      const direction = KEYS[event.key];
      if (!direction || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable]")) return;
      if (snap.key(direction)) event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      setScrollGate(null);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lenis]);
}
