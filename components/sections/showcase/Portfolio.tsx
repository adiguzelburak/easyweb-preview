"use client";

import { useRef } from "react";
import { AppPanel } from "./AppPanel";
import { useShowcase } from "./ShowcaseContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { apps } from "@/content/apps";
import { portfolio } from "@/content/site";
import type { AppId } from "@/content/types";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useElementSnapPoints } from "@/lib/hooks/useElementSnapPoints";

export function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const { setActive } = useShowcase();
  useElementSnapPoints(ref, "[data-app-panel]");

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-app-panel]", ref.current).forEach((panel, index) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: ({ isActive, direction }) => {
            if (isActive) setActive(panel.dataset.appPanel as AppId);
            else if (index === 0 && direction < 0) setActive("home");
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="portfolio" tabIndex={-1} aria-labelledby="portfolio-title" className="outline-none">
      <div className="relative isolate flex min-h-[80svh] items-center py-24 text-ink transition-colors duration-700 md:text-[color:var(--world-fg)]">
        <div aria-hidden data-nav-theme="light" className="absolute -inset-x-4 inset-y-0 -z-10 bg-paper md:hidden" />
        <SectionHeading
          id="portfolio-title"
          eyebrow={portfolio.eyebrow}
          title={portfolio.title}
          lead={portfolio.lead}
        />
      </div>

      {apps.map((app) => (
        <AppPanel key={app.id} app={app} />
      ))}
    </section>
  );
}
