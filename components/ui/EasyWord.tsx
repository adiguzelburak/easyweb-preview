type EasyWordProps = {
  children: string;
  registered?: boolean;
  letters?: boolean;
};

// The pill's insets hug Cooper's glyphs (x-height, or cap height with capitals, down to the descender) with 0.13em to spare.
export function EasyWord({ children, registered = false, letters = false }: EasyWordProps) {
  return (
    <span
      data-easy
      data-caps={/[A-Z]/.test(children) || undefined}
      className="relative isolate mx-(--easy-pad) font-cooper font-normal tracking-[-0.01em] text-(color:--easy-ink) [font-synthesis:none] before:absolute before:inset-x-[calc(var(--easy-pad)*-1)] before:top-[0.3em] before:-bottom-[0.08em] before:-z-10 before:rounded-full before:bg-(--easy-fill) data-caps:before:top-[0.1em]"
    >
      {letters
        ? [...children].map((letter, index) => (
            <span key={index} data-letter className="inline-block">
              {letter}
            </span>
          ))
        : children}
      {registered && <sup className="-top-[0.8em] ml-[0.04em] text-[0.36em] leading-none">®</sup>}
    </span>
  );
}
