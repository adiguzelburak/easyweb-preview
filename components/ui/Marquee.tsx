import { EasyText } from "./EasyText";

export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      {[false, true].map((duplicate) => (
        <ul
          key={String(duplicate)}
          aria-hidden={duplicate || undefined}
          className="flex shrink-0 animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {items.map((item) => (
            <li key={item} className="text-4xl whitespace-nowrap md:text-5xl">
              <EasyText text={item} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
