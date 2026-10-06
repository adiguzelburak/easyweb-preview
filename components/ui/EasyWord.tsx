type EasyWordProps = {
  children: string;
  suffix?: string;
  registered?: boolean;
  letters?: boolean;
};

// The x-height (cap height with capitals) is centred in the pill so it sits on the line like a word; descenders dip into its lower edge.
export function EasyWord({ children, suffix, registered = false, letters = false }: EasyWordProps) {
  return (
    <span
      data-easy
      data-caps={/[A-Z]/.test(children) || undefined}
      className="relative isolate mx-(--easy-pad) font-cooper font-normal tracking-[-0.01em] text-(color:--easy-ink) [font-synthesis:none] before:absolute before:inset-x-[calc(var(--easy-pad)*-1)] before:top-[0.2em] before:bottom-0 before:-z-10 before:rounded-full before:bg-(--easy-fill) data-caps:before:top-[0.12em]"
    >
      {letters
        ? [...children].map((letter, index) => (
            <span key={index} data-letter className="inline-block">
              {letter}
            </span>
          ))
        : children}
      {suffix && <span className="font-sans">{suffix}</span>}
      {registered &&<sup className="-top-[0.8em] ml-[0.04em] text-[0.36em] leading-none">®</sup>}
    </span>
  );
}
