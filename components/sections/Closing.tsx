"use client";

import { useRef } from "react";
import { EasyText } from "@/components/ui/EasyText";
import { CheckIcon, CopyIcon, LinkedInLogo } from "@/components/ui/icons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { closing, company } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard";
import { media } from "@/lib/motion";

export function Closing() {
  const ref = useRef<HTMLElement>(null);
  const { copied, copy } = useCopyToClipboard();

  useGSAP(
    () => {
      const section = ref.current!;
      const cta = section.querySelector<HTMLElement>("[data-closing-cta]")!;

      // The orange grows out of the CTA and must reach the farthest corner of the section.
      const circle = (grown: boolean) => {
        const box = section.getBoundingClientRect();
        const rect = cta.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - box.left;
        const y = rect.top + rect.height / 2 - box.top;
        const radius = grown ? Math.hypot(Math.max(x, box.width - x), Math.max(y, box.height - y)) : 0;
        return `circle(${radius}px at ${x}px ${y}px)`;
      };

      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.fromTo(
          "[data-closing-fill]",
          { clipPath: () => circle(false) },
          {
            clipPath: () => circle(true),
            ease: "none",
            scrollTrigger: { trigger: section, start: "top 85%", end: "top top", scrub: 0.6, invalidateOnRefresh: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      data-nav-theme="light"
      className="relative isolate overflow-hidden bg-paper text-ink outline-none on-orange"
    >
      <div data-closing-fill aria-hidden className="absolute inset-0 -z-10 bg-orange" />

      <div className="mx-auto flex min-h-svh max-w-7xl flex-col items-center justify-center px-4 py-32 text-center md:px-8">
        <p className="text-sm font-semibold">{closing.eyebrow}</p>
        <h2 id="contact-title" className="mt-6 text-mega">
          <SplitReveal>
            <EasyText text={closing.title} />
          </SplitReveal>
        </h2>
        <p className="mt-8 max-w-md text-lg leading-relaxed md:text-xl">{closing.lead}</p>

        <div data-closing-cta className="relative mt-12">
          <MagneticButton
            onClick={() => copy(company.email)}
            aria-label={`${closing.copy}: ${company.email}`}
            className="flex h-16 items-center gap-3 rounded-full bg-ink px-8 text-lg font-semibold text-paper transition-colors duration-300 hover:bg-paper hover:text-ink md:h-20 md:px-10 md:text-xl"
          >
            {company.email}
            {copied ? <CheckIcon className="size-5" /> : <CopyIcon className="size-5" />}
          </MagneticButton>
          <p
            role="status"
            className={cn(
              "pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm font-medium whitespace-nowrap text-paper transition duration-300",
              copied ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            {copied ? closing.copied : ""}
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold">
          <a href={`mailto:${company.email}`} className="underline-offset-4 hover:underline">
            {closing.mailApp}
          </a>
          <a
            href={company.linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
          >
            <LinkedInLogo className="size-4" />
            {closing.linkedIn}
          </a>
        </div>
      </div>
    </section>
  );
}
