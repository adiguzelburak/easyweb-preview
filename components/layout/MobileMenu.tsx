"use client";

import { useLenis } from "lenis/react";
import { useRef, useState, type MouseEvent } from "react";
import { EasyText } from "@/components/ui/EasyText";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { company, nav, ui } from "@/content/site";
import { gsap } from "@/lib/gsap";
import { ease, prefersReducedMotion } from "@/lib/motion";
import { scrollToHash } from "@/lib/scroll";

const CLOSED = "circle(0% at 100% 0%)";
const OPEN = "circle(150% at 100% 0%)";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  const restore = () => {
    document.documentElement.style.removeProperty("overflow");
    lenis?.start();
    setOpen(false);
  };

  const show = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    setOpen(true);
    if (prefersReducedMotion()) return;

    gsap.fromTo(dialog, { clipPath: CLOSED }, { clipPath: OPEN, duration: 0.7, ease: "power3.inOut" });
    gsap.fromTo(
      dialog.querySelectorAll("[data-menu-item]"),
      { yPercent: 110 },
      { yPercent: 0, duration: 0.8, delay: 0.15, ease: ease.enter, stagger: 0.06 },
    );
  };

  const hide = (then?: () => void) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const finish = () => {
      dialog.close();
      restore();
      then?.();
    };
    if (prefersReducedMotion()) return finish();
    gsap.to(dialog, { clipPath: CLOSED, duration: 0.5, ease: "power3.in", onComplete: finish });
  };

  const goTo = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const hash = event.currentTarget.getAttribute("href")!;
    hide(() => scrollToHash(hash, lenis));
  };

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={ui.openMenu}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid size-11 place-items-center rounded-full ring-1 ring-current/20 ring-inset md:hidden"
      >
        <MenuIcon className="size-5" />
      </button>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label={ui.mainNav}
        onCancel={(event) => {
          event.preventDefault();
          hide();
        }}
        onClose={restore}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-orange p-0 text-ink on-orange backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col px-4 pb-10">
          <div className="flex h-16 items-center justify-between">
            <span className="text-[22px] leading-none">
              <EasyText text={company.name} />
            </span>
            <button
              type="button"
              onClick={() => hide()}
              aria-label={ui.closeMenu}
              className="grid size-11 place-items-center rounded-full ring-1 ring-ink/20 ring-inset"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <nav className="mt-auto">
            <ul>
              {nav.links.map((link) => (
                <li key={link.href} className="overflow-hidden">
                  <a
                    data-menu-item
                    href={link.href}
                    onClick={goTo}
                    className="block text-[clamp(44px,13vw,72px)] leading-[1.08] font-heavy tracking-[-0.04em]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 overflow-hidden">
            <a
              data-menu-item
              href={nav.cta.href}
              className="flex h-14 items-center justify-center rounded-full bg-ink text-lg font-semibold text-paper"
            >
              {nav.cta.label}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
