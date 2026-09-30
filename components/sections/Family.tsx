import { EasyText } from "@/components/ui/EasyText";
import { EasyWord } from "@/components/ui/EasyWord";
import { ArrowUpRight } from "@/components/ui/icons";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { family } from "@/content/site";

export function Family() {
  return (
    <section
      id="family"
      tabIndex={-1}
      aria-labelledby="family-title"
      data-nav-theme="light"
      className="overflow-hidden bg-paper text-ink outline-none"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-28 md:grid-cols-[1.1fr_1fr] md:px-8 md:py-40">
        <Reveal>
          <p aria-hidden className="pb-[0.22em] text-[clamp(6rem,14.5vw,13.5rem)] leading-none">
            <EasyWord>{family.mark}</EasyWord>
          </p>
        </Reveal>

        <div>
          <SectionHeading id="family-title" eyebrow={family.eyebrow} title={family.title} />
          <Reveal className="mt-8">
            <p className="max-w-lg text-lg leading-relaxed text-muted md:text-xl">
              <EasyText text={family.body} />
            </p>
            <a
              href={family.link.href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-orange-deep underline-offset-4 hover:underline"
            >
              {family.link.label}
              <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>
      </div>

      {family.brands.length > 0 && (
        <div className="pb-28">
          <Marquee items={family.brands} />
        </div>
      )}
    </section>
  );
}
