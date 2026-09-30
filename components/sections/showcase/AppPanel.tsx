"use client";

import { useRef, type CSSProperties } from "react";
import { AppScreen } from "./AppScreen";
import { AppCards } from "./cards/AppCards";
import { useShowcase } from "./ShowcaseContext";
import { World } from "./worlds/World";
import { EasyText } from "@/components/ui/EasyText";
import { Phone } from "@/components/ui/Phone";
import { StoreLinks } from "@/components/ui/StoreLinks";
import { isOrangeWorld } from "@/content/apps";
import type { App } from "@/content/types";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { useInViewport } from "@/lib/hooks/useInViewport";
import { ease, media } from "@/lib/motion";

export function AppPanel({ app }: { app: App }) {
  const ref = useRef<HTMLElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const worldVisible = useInViewport(worldRef);
  const { active } = useShowcase();
  const titleId = `app-${app.id}-title`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.from("[data-panel-reveal]", {
          autoAlpha: 0,
          y: 40,
          duration: 1,
          ease: ease.enter,
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 62%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <article
      ref={ref}
      id={`app-${app.id}`}
      data-app-panel={app.id}
      tabIndex={-1}
      aria-labelledby={titleId}
      style={{ "--panel-fg": app.world.foreground } as CSSProperties}
      className={cn(
        "relative isolate flex min-h-svh flex-col justify-center gap-14 py-24 text-[color:var(--panel-fg)] outline-none transition-colors duration-700 md:text-[color:var(--world-fg)]",
        isOrangeWorld(app.world) && "on-orange",
      )}
    >
      <div
        ref={worldRef}
        aria-hidden
        data-nav-theme={app.world.theme}
        style={{ backgroundColor: app.world.background }}
        className="absolute -inset-x-4 inset-y-0 -z-10 overflow-hidden md:hidden"
      >
        <World id={app.id} active={worldVisible} compact />
      </div>

      <div className="@container flex items-center gap-12">
        <div className="max-w-lg lg:max-w-sm xl:max-w-md">
          <p data-panel-reveal className="flex items-center gap-3 text-sm font-semibold opacity-75">
            <span aria-hidden className="h-px w-8 bg-current" />
            {app.category}
          </p>
          <h3 id={titleId} data-panel-reveal className="mt-6 text-app">
            <EasyText text={app.name} />
          </h3>
          <p data-panel-reveal className="mt-6 text-lg leading-relaxed opacity-80 md:text-xl">
            {app.tagline}
          </p>
          {app.metrics && (
            <dl data-panel-reveal className="mt-8 flex gap-10">
              {app.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse justify-end gap-1">
                  <dt className="text-sm opacity-70">{metric.label}</dt>
                  <dd className="text-2xl font-heavy tabular-nums">{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div data-panel-reveal className="mt-10">
            <StoreLinks stores={app.stores} appName={app.name} />
          </div>
        </div>

        {app.cards && (
          <div className="hidden w-72 shrink-0 lg:@min-[44rem]:block">
            <AppCards cards={app.cards} active={active === app.id} className="short:*:last:hidden" />
          </div>
        )}
      </div>

      <div className="md:hidden">
        <div className="mx-auto w-[68%] max-w-72">
          <Phone framed={false}>
            <AppScreen app={app} playing={worldVisible} />
          </Phone>
        </div>
        {app.cards && (
          <AppCards
            cards={app.cards.slice(0, 2)}
            active={worldVisible}
            className="relative z-10 mx-auto -mt-16 max-w-sm"
          />
        )}
      </div>
    </article>
  );
}
