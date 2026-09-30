import { useCallback, useEffect, useRef, useState } from "react";

export function useCopyToClipboard(resetAfter = 2200) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        return false;
      }
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetAfter);
      return true;
    },
    [resetAfter],
  );

  return { copied, copy };
}
