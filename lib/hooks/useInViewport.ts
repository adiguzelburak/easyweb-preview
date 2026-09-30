import { useEffect, useState, type RefObject } from "react";

export function useInViewport(ref: RefObject<Element | null>, rootMargin = "0px") {
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting), { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inViewport;
}
