"use client";

import Image from "next/image";
import { useShowcase } from "./ShowcaseContext";
import { apps } from "@/content/apps";
import { ui } from "@/content/site";
import { cn } from "@/lib/cn";

export function ProgressRail() {
  const { active } = useShowcase();
  const idle = active === "home";

  return (
    <nav
      aria-label={ui.appsRail}
      inert={idle}
      className={cn(
        "absolute top-[calc(100%+1.25rem)] left-1/2 -translate-x-1/2 transition-opacity duration-500",
        idle && "opacity-0",
      )}
    >
      <ul className="flex gap-2.5">
        {apps.map((app) => {
          const current = active === app.id;
          return (
            <li key={app.id}>
              <a
                href={`#app-${app.id}`}
                aria-label={app.name}
                aria-current={current || undefined}
                className={cn(
                  "block size-8 overflow-hidden rounded-[22.5%] ring-2 ring-offset-2 ring-offset-transparent transition duration-300",
                  current ? "scale-110 ring-current" : "opacity-45 ring-transparent hover:opacity-100",
                )}
              >
                <Image src={app.icon} alt="" width={64} height={64} sizes="32px" />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
