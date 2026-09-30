"use client";

import { useRef } from "react";
import { AppScreen } from "./AppScreen";
import { HomeScreen } from "./HomeScreen";
import { useShowcase, type ActiveApp } from "./ShowcaseContext";
import { apps } from "@/content/apps";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease, prefersReducedMotion } from "@/lib/motion";

const FULL = "inset(0px 0px 0px 0px round 0px)";
const ORDER: ActiveApp[] = ["home", ...apps.map((app) => app.id)];

function iconGeometry(container: HTMLElement, id: ActiveApp) {
  const icon = container.querySelector(`[data-app-icon="${id}"]`);
  if (!icon) return { clip: FULL, origin: "50% 50%", scale: 1 };
  const box = container.getBoundingClientRect();
  const rect = icon.getBoundingClientRect();
  const top = rect.top - box.top;
  const left = rect.left - box.left;
  return {
    clip: `inset(${top}px ${box.right - rect.right}px ${box.bottom - rect.bottom}px ${left}px round ${rect.width * 0.225}px)`,
    origin: `${left + rect.width / 2}px ${top + rect.height / 2}px`,
    scale: rect.width / box.width,
  };
}

const contentOf = (screen: HTMLElement) => screen.firstElementChild as HTMLElement;

export function PhoneScreens() {
  const { active } = useShowcase();
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef<ActiveApp>("home");

  useGSAP(
    () => {
      const container = ref.current!;
      const from = previous.current;
      previous.current = active;
      if (from === active) return;

      const screens = gsap.utils.toArray<HTMLElement>("[data-screen]", container);
      const incoming = screens.find((screen) => screen.dataset.screen === active);
      const outgoing = screens.find((screen) => screen.dataset.screen === from);

      gsap.killTweensOf([...screens, ...screens.map(contentOf)]);
      gsap.set(
        screens.filter((screen) => screen !== incoming && screen !== outgoing),
        { autoAlpha: 0, zIndex: 0 },
      );

      if (prefersReducedMotion()) {
        if (outgoing) gsap.set(outgoing, { autoAlpha: 0 });
        if (incoming) gsap.set(incoming, { autoAlpha: 1, zIndex: 2, clipPath: FULL });
        return;
      }

      if (incoming && outgoing) {
        const forward = ORDER.indexOf(active) > ORDER.indexOf(from);
        gsap.set([contentOf(incoming), contentOf(outgoing)], { scale: 1 });
        gsap.set(outgoing, { zIndex: 1, clipPath: FULL });
        gsap.set(incoming, { zIndex: 2, autoAlpha: 1, clipPath: FULL, scale: 1 });
        gsap.fromTo(incoming, { yPercent: forward ? 100 : -100 }, { yPercent: 0, duration: 0.85, ease: ease.swap });
        gsap.to(outgoing, {
          yPercent: forward ? -28 : 28,
          scale: 0.9,
          duration: 0.85,
          ease: ease.swap,
          onComplete: () => gsap.set(outgoing, { autoAlpha: 0, yPercent: 0, scale: 1 }),
        });
        return;
      }

      if (incoming) {
        const icon = iconGeometry(container, active);
        gsap.set(incoming, { zIndex: 2, autoAlpha: 1, yPercent: 0, scale: 1 });
        gsap.fromTo(incoming, { clipPath: icon.clip }, { clipPath: FULL, duration: 0.8, ease: "expo.inOut" });
        gsap.fromTo(
          contentOf(incoming),
          { scale: icon.scale, transformOrigin: icon.origin },
          { scale: 1, duration: 0.8, ease: "expo.inOut" },
        );
        return;
      }

      if (outgoing) {
        const icon = iconGeometry(container, from);
        gsap.to(outgoing, {
          clipPath: icon.clip,
          duration: 0.7,
          ease: "expo.inOut",
          onComplete: () => gsap.set(outgoing, { autoAlpha: 0, clipPath: FULL }),
        });
        gsap.to(contentOf(outgoing), {
          scale: icon.scale,
          transformOrigin: icon.origin,
          duration: 0.7,
          ease: "expo.inOut",
          onComplete: () => gsap.set(contentOf(outgoing), { scale: 1 }),
        });
      }
    },
    { dependencies: [active], scope: ref },
  );

  return (
    <div ref={ref} className="absolute inset-0">
      <HomeScreen apps={apps} />
      {apps.map((app) => (
        <div key={app.id} data-screen={app.id} className="invisible absolute inset-0 overflow-hidden">
          <AppScreen app={app} playing={active === app.id} />
        </div>
      ))}
    </div>
  );
}
