"use client";

import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  // Seconds to wait after scrolling into view, for staggering a row of cards.
  delay?: number;
  // Old options from the first version of this component; ignored.
  y?: number;
  x?: number;
  once?: boolean;
};

// Drifts its content up 8px and fades it in the first time it scrolls into
// view. Only things that start below the fold are ever hidden, and only after
// JavaScript runs, so the first screen never flashes and nothing is lost
// without JS. Reduced motion skips it entirely (see .reveal in globals.css).
export default function Reveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal-pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.transitionDelay = `${delay}s`;
        el.classList.remove("reveal-pending");
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
