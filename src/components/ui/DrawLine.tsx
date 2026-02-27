"use client";

import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

interface DrawLineProps {
  /** "horizontal" or "vertical" */
  direction: "horizontal" | "vertical";
  /** CSS class for the wrapper div (positioning, sizing) */
  className?: string;
  /** Inline styles for the wrapper div */
  style?: React.CSSProperties;
  /** Stroke color — defaults to currentColor */
  stroke?: string;
  /** Stroke width in px — defaults to 1 */
  strokeWidth?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
}

/**
 * DrawLine — animowana linia SVG z scroll-triggered rysowaniem.
 * Uzywa reczny IntersectionObserver + check on mount (scroll restoration fix).
 */
export function DrawLine({
  direction,
  className,
  style,
  stroke = "currentColor",
  strokeWidth = 1,
  duration = 1.5,
  delay = 0,
}: DrawLineProps) {
  const isH = direction === "horizontal";
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    let observer: IntersectionObserver | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const trigger = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      controls.start({ pathLength: 1 });
      observer?.disconnect();
      if (timer) clearTimeout(timer);
    };

    const checkViewport = () => {
      if (hasAnimated.current) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight + 200 && rect.bottom > -200;
    };

    // Check immediately (sync scroll restoration)
    if (checkViewport()) { trigger(); return; }

    // Delayed check catches async scroll restoration (browser restores scroll after JS)
    timer = setTimeout(() => { if (checkViewport()) trigger(); }, 150);

    // IO for normal scrolling
    observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) trigger(); },
      { threshold: 0.01, rootMargin: "200px" }
    );
    observer.observe(el);

    return () => {
      if (timer) clearTimeout(timer);
      observer?.disconnect();
    };
  }, [controls]);

  return (
    <div ref={ref} className={className} style={style}>
      <svg
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
        className={isH ? "block h-px w-full" : "block h-full w-px"}
      >
        <motion.line
          x1={isH ? "0" : "0.5"}
          y1={isH ? "0.5" : "0"}
          x2={isH ? "1" : "0.5"}
          y2={isH ? "0.5" : "1"}
          stroke={stroke}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={controls}
          transition={{ duration, delay, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
