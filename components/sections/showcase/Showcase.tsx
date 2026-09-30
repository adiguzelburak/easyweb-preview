"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { PhoneScreens } from "./PhoneScreens";
import { ProgressRail } from "./ProgressRail";
import { ShowcaseContext, type ActiveApp } from "./ShowcaseContext";
import { WorldBackdrop } from "./WorldBackdrop";
import { Phone } from "@/components/ui/Phone";
import { worldOf } from "@/content/apps";

export function Showcase({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ActiveApp>("home");
  const world = worldOf(active);

  return (
    <ShowcaseContext value={{ active, setActive }}>
      <div className="relative" style={{ "--world-fg": world.foreground } as CSSProperties}>
        <WorldBackdrop />
        <div className="relative mx-auto grid max-w-7xl px-4 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14 md:px-8 lg:gap-24">
          <div className="min-w-0">{children}</div>
          <div className="hidden text-[color:var(--world-fg)] transition-colors duration-700 md:block">
            <div className="sticky top-0 flex h-svh items-center">
              <div className="relative w-[min(34svh,340px)]">
                <Phone introTarget framed={active === "home"}>
                  <PhoneScreens />
                </Phone>
                <ProgressRail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseContext>
  );
}
