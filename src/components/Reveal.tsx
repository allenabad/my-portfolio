import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Applies the hero's .reveal entrance the first time the wrapped content
 * scrolls into view. Renders children plain under reduced motion.
 */
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setShown(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={shown ? "reveal" : "opacity-0"}>
      {children}
    </div>
  );
}
