import type { default as Lenis, VirtualScrollData } from "lenis";

type ScrollGate = (data: VirtualScrollData) => boolean;

let gate: ScrollGate | null = null;

export function setScrollGate(next: ScrollGate | null) {
  gate = next;
}

// Lenis consults this before smoothing a wheel or touch event; returning false leaves the event to the gate.
export function passScrollGate(data: VirtualScrollData) {
  return gate ? gate(data) : true;
}

export function scrollToHash(hash: string, lenis?: Lenis) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;

  if (lenis) lenis.scrollTo(target, { duration: 1.4, force: true });
  else target.scrollIntoView();

  target.focus({ preventScroll: true });
  history.replaceState(null, "", hash);
}
