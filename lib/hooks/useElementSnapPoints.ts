import { useEffect, type RefObject } from "react";
import { useMediaQuery } from "./useMediaQuery";
import { media } from "@/lib/motion";
import { registerSnapPoints } from "@/lib/snap";

export function useElementSnapPoints(containerRef: RefObject<HTMLElement | null>, selector: string) {
  const isDesktop = useMediaQuery(media.desktop);

  useEffect(() => {
    const container = containerRef.current;
    if (!isDesktop || !container) return;
    return registerSnapPoints(() =>
      [...container.querySelectorAll<HTMLElement>(selector)].map((element) =>
        Math.round(element.getBoundingClientRect().top + window.scrollY),
      ),
    );
  }, [isDesktop, containerRef, selector]);
}
