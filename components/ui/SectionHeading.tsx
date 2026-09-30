import { EasyText } from "./EasyText";
import { SplitReveal } from "./SplitReveal";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, lead, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="flex items-center gap-3 text-sm font-semibold">
        <span aria-hidden className="size-2 rounded-[2px] bg-orange" />
        <EasyText text={eyebrow} />
      </p>
      <h2 id={id} className="mt-6 text-title">
        <SplitReveal>
          <EasyText text={title} />
        </SplitReveal>
      </h2>
      {lead && <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-75 md:text-xl">{lead}</p>}
    </div>
  );
}
