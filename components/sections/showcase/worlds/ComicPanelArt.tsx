import { polar } from "@/lib/geometry";

export type ComicArt = "speed" | "dots" | "stripes";

const RAYS = Array.from({ length: 24 }, (_, index) => {
  const angle = -Math.PI / 2 + (index / 23) * (Math.PI / 2);
  return { angle, end: polar(8, 92, 150, angle) };
});

export function ComicPanelArt({ art }: { art: ComicArt }) {
  if (art === "speed") {
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full">
        {RAYS.map(({ angle, end }) => (
          <line
            key={angle}
            x1="8"
            y1="92"
            x2={end.x}
            y2={end.y}
            stroke="#16130f"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    );
  }

  if (art === "dots") {
    return (
      <div className="size-full bg-[radial-gradient(#16130f_1.6px,transparent_2px)] bg-[length:10px_10px] [mask-image:linear-gradient(135deg,black,transparent_80%)]" />
    );
  }

  return <div className="size-full bg-[repeating-linear-gradient(-45deg,#16130f_0_2px,transparent_2px_12px)] opacity-80" />;
}
