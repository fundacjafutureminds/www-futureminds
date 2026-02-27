"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

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
 * Uzywa Framer Motion whileInView z viewport={{ once: true }}.
 * Sekcje pozostaja Server Components — FadeIn to jedyna granica "use client".
 */
export function FadeIn({
  children,
  direction = "none",
  delay = 0,
  duration = 0.6,
  className,
}: FadeInProps) {
  const offset = directionMap[direction];
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
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
 * Kazde dziecko (StaggerItem) animuje sie z rosnacym opoznieniem.
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
      viewport={{ once: true, amount: 0.2 }}
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
 * Animacja: opacity 0 -> 1, y 20 -> 0.
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
