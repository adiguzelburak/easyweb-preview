import { MeterCard } from "./MeterCard";
import { ProgressCard } from "./ProgressCard";
import { StatsCard } from "./StatsCard";
import type { GlassCard } from "@/content/types";

export function CardView({ card }: { card: GlassCard }) {
  switch (card.kind) {
    case "stats":
      return <StatsCard card={card} />;
    case "progress":
      return <ProgressCard card={card} />;
    case "meter":
      return <MeterCard card={card} />;
  }
}
