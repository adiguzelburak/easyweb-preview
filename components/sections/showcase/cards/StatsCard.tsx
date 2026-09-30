import { GlassCard } from "./GlassCard";
import type { GlassCard as GlassCardData } from "@/content/types";

export function StatsCard({ card }: { card: Extract<GlassCardData, { kind: "stats" }> }) {
  return (
    <GlassCard tint={card.tint} title={card.title} subtitle={card.subtitle}>
      <dl className="mt-7 grid grid-cols-3 gap-2 text-center">
        {card.stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-[14px] font-medium">{stat.label}</dt>
            <dd className="mt-0.5 text-[13px] text-[color-mix(in_oklab,var(--tint),white_55%)] tabular-nums">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </GlassCard>
  );
}
