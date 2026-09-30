"use client";

import { useEffect, useRef, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/Button";
import { EasyText } from "@/components/ui/EasyText";
import { company, nav, ui } from "@/content/site";
import type { Theme } from "@/content/types";
import { cn } from "@/lib/cn";

function themeBehind(y: number): Theme {
  let theme: Theme = "light";
  for (const layer of document.querySelectorAll<HTMLElement>("[data-nav-theme]")) {
    const { top, bottom, height } = layer.getBoundingClientRect();
    if (height > 0 && top <= y && bottom > y) theme = layer.dataset.navTheme as Theme;
  }
  return theme;
}

export function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (headerRef.current) setTheme(themeBehind(headerRef.current.offsetHeight / 2));
      if (Math.abs(y - lastY) > 8) {
        setHidden(y > lastY && y > 200);
        lastY = y;
      }
    };
    const schedule = () => {
      frame ||= requestAnimationFrame(update);
    };

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { subtree: true, attributeFilter: ["data-nav-theme"] });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const dark = theme === "dark";

  return (
    <header
      ref={headerRef}
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[translate,color] duration-500 ease-out-expo",
        hidden && "-translate-y-full",
        dark ? "text-paper" : "text-ink",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:h-20 md:px-8">
        <a href="#top" className="text-[22px] leading-none md:text-2xl">
          <EasyText text={company.name} />
        </a>

        <nav aria-label={ui.mainNav} className="hidden md:block">
          <ul
            className={cn(
              "flex items-center gap-1 rounded-full p-1 ring-1 backdrop-blur-md transition-colors duration-500 ring-inset",
              dark ? "bg-ink/30 ring-paper/15" : "bg-paper/60 ring-ink/10",
            )}
          >
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-current/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button href={nav.cta.href} size="sm">
              {nav.cta.label}
            </Button>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
