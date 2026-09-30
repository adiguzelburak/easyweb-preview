"use client";

import { useRef, type ReactNode } from "react";
import { CarArt } from "./CarArt";
import { LocationIcon, MoonIcon, PinIcon, PlayIcon, PlugIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useMediaQuery";
import { ease } from "@/lib/motion";

const SURFACE = "bg-[linear-gradient(160deg,#1d211f,#0f1211)]";

const BARS = Array.from({ length: 18 }, (_, index) => ({
  height: 30 + ((index * 41) % 70),
  delay: -((index * 0.37) % 1.1),
}));

const STARS = [
  { left: "58%", top: "16%", size: 2, delay: "0s" },
  { left: "74%", top: "30%", size: 1.5, delay: "-0.6s" },
  { left: "86%", top: "12%", size: 2.5, delay: "-1.2s" },
  { left: "66%", top: "44%", size: 1.5, delay: "-0.3s" },
  { left: "88%", top: "46%", size: 2, delay: "-0.9s" },
];

function Widget({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      data-widget
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[1.6em] p-[1.05em] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1.5em_3em_-1em_rgba(0,0,0,0.85)] ring-1 ring-white/10",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DateWidget() {
  return (
    <Widget className={cn(SURFACE, "flex size-[9em] flex-col")}>
      <p className="flex justify-between text-[1.1em] leading-none font-semibold">
        <span className="text-alert">Fri</span>
        Jul
      </p>
      <p className="my-auto text-center text-[4.1em] leading-none font-bold tracking-[-0.05em] tabular-nums">24</p>
      <p className="flex items-center gap-[0.6em] text-[0.78em] leading-none font-medium text-paper/55 tabular-nums">
        <span className="h-px flex-1 bg-white/15" />
        2026
        <span className="h-px flex-1 bg-white/15" />
      </p>
    </Widget>
  );
}

function DriverWidget() {
  return (
    <Widget className="flex h-[9em] w-[19.1em] flex-col justify-between bg-[radial-gradient(60%_80%_at_75%_75%,rgba(227,38,27,0.3),transparent_70%),linear-gradient(160deg,#1d211f,#0f1211)]">
      <div>
        <p className="text-[0.66em] font-semibold tracking-[0.32em] text-paper/55">FORD</p>
        <p className="mt-[0.25em] text-[1.55em] leading-[0.95] font-extrabold tracking-tight uppercase italic">
          Hello,
          <br />
          Driver
        </p>
      </div>
      <p className="flex items-center gap-[0.3em] text-[0.76em] text-paper/60">
        <PinIcon className="size-[1.1em] text-paper" />
        New York
      </p>
      <CarArt className="absolute right-[0.4em] bottom-[0.55em] w-[10.8em]" />
    </Widget>
  );
}

function SoundWidget() {
  return (
    <Widget className={cn(SURFACE, "flex h-[9em] w-[19.1em] flex-col justify-between")}>
      <div className="flex items-center gap-[0.7em]">
        <span className="grid size-[2.5em] shrink-0 place-items-center rounded-[0.75em] bg-green/15 text-green">
          <PlugIcon className="size-[1.3em]" />
        </span>
        <p className="min-w-0 leading-tight">
          <span className="block text-[0.95em] font-semibold">Connection Sound</span>
          <span className="block text-[0.74em] text-paper/50">Plays when CarPlay connects</span>
        </p>
      </div>
      <div className="flex items-center gap-[0.65em] rounded-[1em] bg-green/12 p-[0.4em] pr-[0.85em] ring-1 ring-green/35">
        <span className="grid size-[2.1em] shrink-0 place-items-center rounded-[0.7em] bg-green text-ink">
          <PlayIcon className="size-[1em]" />
        </span>
        <span className="text-[0.88em] font-semibold whitespace-nowrap text-green">V8 Cold Start</span>
        <span className="ml-auto flex h-[1.5em] items-center gap-[0.16em]">
          {BARS.map((bar, index) => (
            <span
              key={index}
              className="w-[0.16em] animate-eq rounded-full bg-green motion-reduce:animate-none"
              style={{ height: `${bar.height}%`, animationDelay: `${bar.delay}s` }}
            />
          ))}
        </span>
      </div>
    </Widget>
  );
}

function WeatherWidget() {
  return (
    <Widget className="flex size-[9em] flex-col bg-[linear-gradient(180deg,#26386a,#0e1530)]">
      {STARS.map((star) => (
        <span
          key={star.left + star.top}
          className="absolute animate-pulse rounded-full bg-white/80 motion-reduce:animate-none"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay }}
        />
      ))}
      <p className="flex items-center gap-[0.25em] text-[0.82em] font-semibold">
        New York
        <LocationIcon className="size-[0.85em]" />
      </p>
      <p className="text-[2.7em] leading-none font-light tracking-tight">18°</p>
      <div className="mt-auto">
        <MoonIcon className="size-[1.25em] text-[#ffe7a3]" />
        <p className="mt-[0.35em] text-[0.8em] leading-tight font-semibold">Clear</p>
        <p className="text-[0.72em] leading-tight text-paper/65 tabular-nums">H:21° L:14°</p>
      </div>
    </Widget>
  );
}

// Sized in em from one svh-based font size, so the whole set scales with the viewport height.
export function WidgetTiles({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!active || reduceMotion) return;
      gsap.fromTo(
        "[data-widget]",
        { autoAlpha: 0, y: 28, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1, delay: 0.35, ease: ease.enter, stagger: 0.08 },
      );
    },
    { dependencies: [active, reduceMotion], scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 mx-auto hidden max-w-7xl text-[clamp(10px,1.55svh,15px)] text-paper lg:block"
    >
      <div className="absolute top-[max(6.5rem,11svh)] left-8 flex gap-[1.1em] short:hidden">
        <DateWidget />
        <DriverWidget />
      </div>
      <div className="absolute bottom-[max(3rem,9svh)] left-8 flex gap-[1.1em]">
        <SoundWidget />
        <WeatherWidget />
      </div>
    </div>
  );
}
