"use client";

import { motion } from "framer-motion";

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

  return (
    <div className={className} style={style}>
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
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration, delay, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
