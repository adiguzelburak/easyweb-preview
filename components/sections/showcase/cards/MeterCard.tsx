import { GlassCard } from "./GlassCard";
import type { GlassCard as GlassCardData } from "@/content/types";

const PARTICLES = Array.from({ length: 16 }, (_, index) => ({
  left: (index * 37) % 92,
  top: 8 + ((index * 53) % 76),
  size: 4 + (index % 3) * 2,
  delay: (index * 0.17) % 2.4,
  duration: 2.2 + (index % 4) * 0.45,
}));

export function MeterCard({ card }: { card: Extract<GlassCardData, { kind: "meter" }> }) {
  return (
    <GlassCard tint={card.tint} title={card.title} subtitle={card.subtitle} items={card.items}>
      <div className="mt-4 flex items-center gap-4">
        <p className="shrink-0 text-[38px] leading-none font-semibold tracking-tight tabular-nums">{card.reading}</p>
        <div
          aria-hidden
          className="relative h-10 flex-1 [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]"
        >
          {PARTICLES.map((particle, index) => (
            <span
              key={index}
              className="absolute animate-drift rounded-full bg-white/85 blur-[1.5px] motion-reduce:animate-none"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: particle.size,
                height: particle.size,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
