import { EasyText } from "@/components/ui/EasyText";
import { Odometer } from "@/components/ui/Odometer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { traction } from "@/content/site";

export function Traction() {
  return (
    <section
      id="traction"
      tabIndex={-1}
      aria-labelledby="traction-title"
      data-nav-theme="dark"
      className="bg-ink text-paper outline-none"
    >
      <div className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
        <SectionHeading id="traction-title" eyebrow={traction.eyebrow} title={traction.title} />

        <dl className="mt-20 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {traction.metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.08} className="flex flex-col-reverse justify-end gap-6 border-t border-paper/15 pt-6">
              <dt>
                <span className="block text-lg font-semibold">{metric.label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-paper/60">
                  <EasyText text={metric.context} />
                </span>
              </dt>
              <dd className="text-stat">
                <Odometer value={metric.value} suffix={metric.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
