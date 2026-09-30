"use client";

import { useRef } from "react";
import { useShowcase, type ActiveApp } from "./ShowcaseContext";
import { World } from "./worlds/World";
import { apps, worldOf } from "@/content/apps";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { ease, media, prefersReducedMotion } from "@/lib/motion";

const ORDER: ActiveApp[] = ["home", ...apps.map((app) => app.id)];

export function WorldBackdrop() {
  const { active } = useShowcase();
  const isDesktop = useMediaQuery(media.desktop);
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef<ActiveApp>("home");
  const transition = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const backdrop = ref.current!;
      const from = previous.current;
      previous.current = active;
      if (from === active) return;

      const layers = gsap.utils.toArray<HTMLElement>("[data-world]", backdrop);
      const incoming = layers.find((layer) => layer.dataset.world === active)!;
      const outgoing = layers.find((layer) => layer.dataset.world === from)!;
      const forward = ORDER.indexOf(active) > ORDER.indexOf(from);
      const duration = prefersReducedMotion() ? 0 : 1;
      const updateNavTheme = () => {
        backdrop.dataset.navTheme = worldOf(active).theme;
      };

      transition.current?.kill();
      gsap.set(layers, { zIndex: 0 });
      gsap.set(outgoing, { zIndex: 1 });

      // The wipe reaches the nav last when moving forward and first when moving back.
      transition.current = gsap
        .timeline({ onComplete: () => gsap.set(layers.filter((layer) => layer !== incoming), { autoAlpha: 0 }) })
        .fromTo(
          incoming,
          { zIndex: 2, autoAlpha: 1, clipPath: forward ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration, ease: ease.swap },
        )
        .call(updateNavTheme, undefined, duration * (forward ? 0.75 : 0.25));
    },
    { dependencies: [active], scope: ref },
  );

  return (
    <div aria-hidden className="absolute inset-0 hidden md:block">
      <div ref={ref} data-nav-theme="light" className="sticky top-0 h-svh overflow-hidden">
        <div data-world="home" className="absolute inset-0 bg-paper" />
        {apps.map((app) => (
          <div
            key={app.id}
            data-world={app.id}
            className="invisible absolute inset-0"
            style={{ backgroundColor: app.world.background }}
          >
            <World id={app.id} active={isDesktop && active === app.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
