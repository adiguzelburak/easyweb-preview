import { useEffect, useEffectEvent } from "react";
import { gsap } from "@/lib/gsap";

export function useTicker(callback: (time: number, deltaTime: number) => void, running: boolean) {
  const onTick = useEffectEvent(callback);

  useEffect(() => {
    if (!running) return;
    const tick = (time: number, deltaTime: number) => onTick(time, deltaTime);
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [running]);
}
