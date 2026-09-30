import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-orange text-ink hover:bg-ink hover:text-paper",
  outline: "ring-1 ring-current/25 ring-inset hover:ring-current",
  ink: "bg-ink text-paper hover:bg-orange hover:text-ink",
};

const sizes = {
  md: "h-12 px-6 text-[15px]",
  sm: "h-10 px-5 text-sm",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({ href, children, variant = "primary", size = "md" }: ButtonProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-300",
        variants[variant],
        sizes[size],
      )}
    >
      {children}
    </a>
  );
}
