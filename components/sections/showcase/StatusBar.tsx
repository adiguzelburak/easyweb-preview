import { BatteryIcon, SignalIcon, WifiIcon } from "@/components/ui/icons";
import { phone } from "@/content/site";
import { cn } from "@/lib/cn";

export function StatusBar({ tone }: { tone: "light" | "dark" }) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 z-20 flex h-[12.5cqw] items-center justify-between px-[8cqw] pt-[1.5cqw] text-[3.9cqw] font-semibold",
        tone === "light" ? "text-white" : "text-ink",
      )}
    >
      <span className="tabular-nums">{phone.time}</span>
      <span className="flex items-center gap-[1.3cqw]">
        <SignalIcon className="h-[2.9cqw]" />
        <WifiIcon className="h-[2.9cqw]" />
        <BatteryIcon className="h-[3.1cqw]" />
      </span>
    </div>
  );
}
