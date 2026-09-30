"use client";

import { useRef, type CSSProperties } from "react";
import { GrowthCurve } from "./GrowthCurve";
import { progressAtX, STOPS, VIEWBOX } from "./curve";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { playbook } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease, media } from "@/lib/motion";

const STOP_REVEAL = 0.1;
const FINAL_HOLD = 0.35;

export function Playbook() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current!;
      const stage = section.querySelector<HTMLElement>("[data-playbook-stage]")!;
      const line = section.querySelector<SVGPathElement>("[data-curve-line]")!;
      const area = section.querySelector("[data-curve-area]");
      const dots = gsap.utils.toArray<SVGCircleElement>("[data-curve-dot]", section);
      const stops = gsap.utils.toArray<HTMLElement>("[data-stop]", section);
      const mm = gsap.matchMedia();

      mm.add({ wide: "(min-width: 1024px)", motion: media.motion }, (context) => {
        const { wide, motion } = context.conditions as { wide: boolean; motion: boolean };
        if (!motion) return;

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: wide
            ? { trigger: stage, start: "top top", end: "+=150%", pin: true, scrub: 0.4 }
            : { trigger: line.ownerSVGElement, start: "top 85%", end: "bottom 45%", scrub: 0.4 },
        });

        // The line's pathLength is 1, so GSAP's default whole-pixel rounding would draw it in a single jump.
        timeline
          .fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, autoRound: false }, 0)
          .fromTo(area, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 0);

        dots.forEach((dot, index) => {
          const at = progressAtX(line, STOPS[index].x);
          timeline.fromTo(
            dot,
            { scale: 0, transformOrigin: "50% 50%" },
            { scale: 1, duration: 0.05, ease: "back.out(3)" },
            at,
          );
          if (wide) {
            timeline.fromTo(
              stops[index],
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: STOP_REVEAL, ease: "power2.out" },
              at,
            );
          }
        });

        if (wide) {
          // Keeps the finished chart pinned for a while before the page moves on.
          timeline.to({}, { duration: FINAL_HOLD });
          return;
        }

        stops.forEach((stop) =>
          gsap.from(stop, {
            autoAlpha: 0,
            y: 32,
            duration: 1,
            ease: ease.enter,
            scrollTrigger: { trigger: stop, start: "top 88%", once: true },
          }),
        );
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="playbook"
      tabIndex={-1}
      aria-labelledby="playbook-title"
      data-nav-theme="light"
      className="bg-paper text-ink outline-none"
    >
      <div className="mx-auto max-w-7xl px-4 pt-28 md:px-8 md:pt-40">
        <SectionHeading id="playbook-title" eyebrow={playbook.eyebrow} title={playbook.title} lead={playbook.lead} />
      </div>

      <div
        data-playbook-stage
        className="mx-auto flex max-w-7xl flex-col justify-center px-4 pt-16 pb-28 md:px-8 lg:min-h-svh lg:py-0"
      >
        <div className="relative mx-auto w-full lg:w-[min(100%,calc((100svh-200px)*2.222))]">
          <GrowthCurve />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block">
            {playbook.stops.map((stop, index) => {
              const point = STOPS[index];
              const position = {
                "--x": `${(point.x / VIEWBOX.width) * 100}%`,
                "--y": `${(point.y / VIEWBOX.height) * 100}%`,
              } as CSSProperties;

              return (
                <li
                  key={stop.title}
                  style={position}
                  className="lg:absolute lg:top-[var(--y)] lg:left-[var(--x)] lg:w-56 lg:-translate-x-[calc(100%-16px)] lg:-translate-y-[calc(100%+28px)] lg:text-right"
                >
                  <div data-stop>
                    <span className="text-sm font-semibold text-orange-deep tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-2xl font-heavy tracking-tight">{stop.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{stop.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
