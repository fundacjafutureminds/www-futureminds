"use client";

import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, type ReactNode } from "react";

// Kierunki animacji fadeIn
type FadeDirection = "up" | "down" | "left" | "right" | "none";

// Mapa offsetow poczatkowych wg kierunku
const directionMap: Record<FadeDirection, { x?: number; y?: number }> = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: -30 },
  right: { x: 30 },
  none: {},
};

interface FadeInProps {
  children: ReactNode;
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * FadeIn — Client Component wrapper animujacy dzieci z fadeIn scroll-triggered.
 * Uzywa reczny IntersectionObserver + check on mount (scroll restoration fix).
 */
export function FadeIn({
  children,
  direction = "none",
  delay = 0,
  duration = 0.6,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const trigger = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      controls.start({ opacity: 1, x: 0, y: 0 });
    };

    // Check immediately if already in viewport (scroll restoration)
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
      trigger();
      return;
    }

    // Otherwise observe for scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={controls}
      transition={{ delay, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- StaggerContainer + StaggerItem ---

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * StaggerContainer — kontener uruchamiajacy stagger na dzieciach.
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "100px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * StaggerItem — element wewnatrz StaggerContainer.
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
