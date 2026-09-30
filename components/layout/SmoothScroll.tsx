"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useMediaQuery";
import { useScrollSteps } from "@/lib/hooks/useScrollSteps";
import { passScrollGate, scrollToHash } from "@/lib/scroll";

export function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis(ScrollTrigger.update);
  useScrollSteps(lenis);

  useEffect(() => {
    if (reduceMotion) return;
    const raf = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(raf);
  }, [reduceMotion]);

  useEffect(() => {
    if (!lenis) return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const hash = (event.target as Element | null)?.closest("a[href^='#']")?.getAttribute("href");
      if (!hash || hash === "#") return;
      event.preventDefault();
      scrollToHash(hash, lenis);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  if (reduceMotion) return null;
  return <ReactLenis root options={{ autoRaf: false, virtualScroll: passScrollGate }} ref={lenisRef} />;
}
