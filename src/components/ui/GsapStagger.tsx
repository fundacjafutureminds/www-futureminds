"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-init";
import type { ReactNode } from "react";

interface GsapStaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function GsapStagger({
  children,
  staggerDelay = 0.1,
  className,
}: GsapStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const items = ref.current.querySelectorAll("[data-stagger-item]");
      if (!items.length) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: staggerDelay,
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
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface GsapStaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function GsapStaggerItem({
  children,
  className,
}: GsapStaggerItemProps) {
  return (
    <div data-stagger-item className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
