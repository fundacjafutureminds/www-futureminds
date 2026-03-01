"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-init";
import type { ReactNode } from "react";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

const directionOffset: Record<FadeDirection, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
  none: { x: 0, y: 0 },
};

interface GsapFadeInProps {
  children: ReactNode;
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  className?: string;
}

export function GsapFadeIn({
  children,
  direction = "none",
  delay = 0,
  duration = 0.6,
  className,
}: GsapFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const offset = directionOffset[direction];

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: offset.x, y: offset.y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          delay,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
