"use client";

import { useRef } from "react";
import { EasyWord } from "@/components/ui/EasyWord";
import { company } from "@/content/site";
import { gsap, LINE_HIDDEN, ScrollTrigger, splitMaskedLines, useGSAP } from "@/lib/gsap";
import { markIntroSeen } from "@/lib/intro";
import { ease } from "@/lib/motion";

const SKIP_EVENTS = ["pointerdown", "wheel", "touchstart", "keydown"] as const;
const [brand, domain] = company.name.split(".");

function phoneScreenClip() {
  const { innerWidth: width, innerHeight: height } = window;
  const screen = [...document.querySelectorAll<HTMLElement>("[data-intro-target]")]
    .map((element) => element.getBoundingClientRect())
    .find((rect) => rect.width > 0 && rect.top >= 0 && rect.bottom <= height);

  if (!screen) return `inset(0px 0px ${height}px 0px round 0px)`;
  return `inset(${screen.top}px ${width - screen.right}px ${height - screen.bottom}px ${screen.left}px round ${screen.width * 0.137}px)`;
}

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = document.documentElement;
    const overlay = ref.current;
    if (!overlay || root.dataset.intro !== "play") return;

    const title = document.querySelector<HTMLElement>("[data-intro-split]");
    const split = title ? splitMaskedLines(title) : null;
    const timeline = gsap.timeline({ onComplete: finish });
    const skip = () => timeline.progress(1);

    function finish() {
      SKIP_EVENTS.forEach((type) => window.removeEventListener(type, skip));
      split?.revert();
      delete root.dataset.intro;
      markIntroSeen();
      ScrollTrigger.refresh();
    }

    timeline
      .to(overlay.querySelectorAll("[data-letter]"), {
        yPercent: -24,
        duration: 0.3,
        ease: "power2.out",
        stagger: { each: 0.045, yoyo: true, repeat: 1 },
      })
      .to(overlay.querySelector("[data-intro-wordmark]"), { autoAlpha: 0, yPercent: -30, duration: 0.45, ease: "power2.in" }, "+=0.1")
      .fromTo(
        overlay,
        { clipPath: "inset(0px 0px 0px 0px round 0px)" },
        { clipPath: phoneScreenClip, duration: 1, ease: "expo.inOut" },
        "<0.15",
      );

    if (title && split) {
      timeline
        .set(title, { visibility: "visible" }, "-=0.45")
        .from(split.lines, { yPercent: LINE_HIDDEN, duration: 1.1, ease: ease.enter, stagger: 0.09 }, "<");
    }

    timeline
      .fromTo(
        "[data-intro-reveal]",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 1, ease: ease.enter, stagger: 0.08 },
        "<0.25",
      )
      .fromTo(
        "[data-intro-pop]",
        { autoAlpha: 0, scale: 0.5 },
        { autoAlpha: 1, scale: 1, duration: 0.7, ease: ease.pop, stagger: 0.05 },
        "<",
      )
      .to(overlay, { autoAlpha: 0, duration: 0.4 }, "<");

    SKIP_EVENTS.forEach((type) => window.addEventListener(type, skip, { passive: true }));
    if (window.scrollY > 10) skip();

    return () => SKIP_EVENTS.forEach((type) => window.removeEventListener(type, skip));
  });

  return (
    <div
      ref={ref}
      data-intro-overlay
      aria-hidden
      className="fixed inset-0 z-[100] grid place-items-center bg-orange text-paper on-orange"
    >
      <p data-intro-wordmark className="flex items-baseline text-[clamp(56px,13vw,190px)] leading-none">
        <EasyWord letters>{brand}</EasyWord>
        <span className="font-semibold">.{domain}</span>
      </p>
    </div>
  );
}
