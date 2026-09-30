import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PhoneProps = {
  children: ReactNode;
  framed?: boolean;
  introTarget?: boolean;
  className?: string;
};

export function Phone({ children, framed = true, introTarget = false, className }: PhoneProps) {
  return (
    <div aria-hidden className={cn("relative aspect-[9/19.5]", className)}>
      <div className={cn("absolute inset-0 transition-opacity duration-700", !framed && "opacity-0")}>
        <div className="absolute inset-0 rounded-[16%/7.385%] bg-ink shadow-[0_50px_90px_-35px_rgba(22,19,15,0.6),inset_0_0_0_1.5px_rgba(255,255,255,0.1)]" />
        <span className="absolute top-[20%] -left-[1.4%] h-[5%] w-[1.4%] rounded-l-sm bg-ink" />
        <span className="absolute top-[27.5%] -left-[1.4%] h-[9%] w-[1.4%] rounded-l-sm bg-ink" />
        <span className="absolute top-[25%] -right-[1.4%] h-[12%] w-[1.4%] rounded-r-sm bg-ink" />
      </div>

      {/* Vertical insets are a share of the height, so 1.477% equals the 3.2%-of-width bezel. */}
      <div
        data-intro-target={introTarget || undefined}
        className={cn(
          "@container absolute inset-x-[3.2%] inset-y-[1.477%] isolate overflow-hidden rounded-[13.7%/6.09%] bg-black transition-shadow duration-700",
          !framed && "shadow-[0_40px_80px_-30px_rgba(22,19,15,0.55)]",
        )}
      >
        {children}
        <span
          className={cn(
            "absolute top-[1.8%] left-1/2 z-30 h-[3.3%] w-[31%] -translate-x-1/2 rounded-full bg-black transition-opacity duration-500",
            !framed && "opacity-0",
          )}
        />
      </div>
    </div>
  );
}
