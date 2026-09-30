import type { CSSProperties, ReactNode } from "react";
import type { Stat } from "@/content/types";

type GlassCardProps = {
  tint: string;
  title: string;
  subtitle: string;
  items?: Stat[];
  children: ReactNode;
};

export function GlassCard({ tint, title, subtitle, items, children }: GlassCardProps) {
  return (
    <div
      data-glass-card
      style={{ "--tint": tint } as CSSProperties}
      className="relative isolate overflow-hidden rounded-[28px] border border-white/15 bg-[color-mix(in_oklab,var(--tint)_74%,transparent)] px-5 pt-4 pb-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_30px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150"
    >
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-10 size-[80%] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-[color-mix(in_oklab,var(--tint),white_40%)] blur-3xl motion-reduce:animate-none"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-[22px] leading-tight font-semibold tracking-tight">{title}</p>
          <p className="truncate text-[15px] font-medium text-[color-mix(in_oklab,var(--tint),white_55%)]">{subtitle}</p>
        </div>
        {items && (
          <dl className="grid shrink-0 grid-cols-[auto_auto] gap-x-5 gap-y-0.5 pt-1 text-[13px] leading-snug">
            {items.map((item) => (
              <div key={item.label} className="contents">
                <dt className="font-medium">{item.label}</dt>
                <dd className="text-right text-[color-mix(in_oklab,var(--tint),white_55%)] tabular-nums">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {children}

      <span aria-hidden className="absolute bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/35" />
    </div>
  );
}
