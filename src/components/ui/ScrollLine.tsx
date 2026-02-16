"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollLineProps {
  direction: "horizontal" | "vertical";
  className?: string;
}

/**
 * ScrollLine — linia animowana scroll-linked (dwukierunkowa).
 * horizontal: scaleX 0→1 z lewej do prawej
 * vertical: scaleY 0→1 z dołu do góry
 *
 * Trackuje parent section (najbliższy <section>).
 */
export function ScrollLine({ direction, className }: ScrollLineProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // start: element bottom hits viewport bottom → end: element top hits viewport top
    offset: ["start end", "end start"],
  });

  const isHorizontal = direction === "horizontal";
  // Vertical starts earlier (further down the page) and completes sooner
  const scale = useTransform(
    scrollYProgress,
    isHorizontal ? [0, 0.4] : [0, 0.25],
    [0, 1]
  );

  return (
    <motion.div
      ref={ref}
      style={
        isHorizontal
          ? { scaleX: scale, transformOrigin: "left" }
          : { scaleY: scale, transformOrigin: "bottom" }
      }
      className={className}
    />
  );
}
