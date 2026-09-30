import { GlassCard } from "./GlassCard";
import type { GlassCard as GlassCardData } from "@/content/types";

export function ProgressCard({ card }: { card: Extract<GlassCardData, { kind: "progress" }> }) {
  return (
    <GlassCard tint={card.tint} title={card.title} subtitle={card.subtitle} items={card.items}>
      <div className="relative mt-5 h-9 rounded-full bg-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)] ring-1 ring-white/15 ring-inset">
        <div className="absolute inset-y-1 left-1" style={{ width: `calc(${card.progress * 100}% - 0.5rem)` }}>
          <span
            data-fill
            className="absolute inset-0 origin-left rounded-full bg-[linear-gradient(90deg,color-mix(in_oklab,var(--tint),white_40%),white)] shadow-[0_0_28px_4px_color-mix(in_oklab,var(--tint),white_45%)]"
          />
          <span
            data-knob
            className="absolute -top-px -right-[15px] size-[30px] rounded-full bg-white/55 shadow-[0_0_18px_rgba(255,255,255,0.7)] ring-1 ring-white/80 backdrop-blur-sm"
          />
        </div>
      </div>
    </GlassCard>
  );
}
