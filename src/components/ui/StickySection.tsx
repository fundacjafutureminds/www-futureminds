"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { StickyNavLink } from "@/lib/types";
import { FadeIn } from "@/components/ui/FadeIn";


interface StickySectionProps {
  id?: string;
  title: string;
  sectionNumber?: string;
  variant?: "dark" | "light";
  navLinks?: StickyNavLink[];
  header?: React.ReactNode;
  /** Optional second vertical divider line (CSS left value, e.g. "60%") */
  contentDividerLeft?: string;
  children: React.ReactNode;
}

export function StickySection({
  id,
  title,
  sectionNumber,
  variant = "dark",
  navLinks,
  header,
  contentDividerLeft,
  children,
}: StickySectionProps) {
  const isDark = variant === "dark";
  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const hrRef = useRef<HTMLDivElement>(null);
  const [upperLineTop, setUpperLineTop] = useState(-100);

  useEffect(() => {
    const wrapper = headerWrapperRef.current;
    const hr = hrRef.current;
    if (!wrapper || !hr) return;

    const measure = () => {
      const h2 = wrapper.querySelector("h2");
      if (!h2) return;
      const h2Rect = h2.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();
      const hrRect = hr.getBoundingClientRect();
      // Gap below text = distance from h2 text bottom to hr center
      const gapBelow = hrRect.top - h2Rect.bottom;
      // Line starts gapBelow pixels above h2 text top
      const topPx = (h2Rect.top - wrapperRect.top) - gapBelow;
      setUpperLineTop(topPx);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [header]);

  return (
    <section
      id={id}
      className={`relative pt-96 ${isDark ? "text-fm-text" : "text-fm-dark"}`}
      style={
        isDark
          ? undefined
          : {
              backgroundColor: "#ffffff",
              backgroundImage: "url('/images/szum-lightgrey-1.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
            }
      }
    >
      {/* Decorative header above two-column layout */}
      {header && (
        <>
          {/* Header content area with upper vertical line segment */}
          <div ref={headerWrapperRef} className="relative flex flex-col">
            <motion.div
              className={`pointer-events-none absolute bottom-[-65px] left-[300px] hidden w-px origin-top lg:block ${isDark ? "bg-white/8" : "bg-black/12"}`}
              style={{ top: upperLineTop }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            />
            <div className="px-6 lg:ml-[350px] lg:px-12">
              {header}
            </div>
          </div>
          {/* Horizontal line — 3 segments, each grows outward from vertical lines */}
          <div ref={hrRef} className="relative my-16 hidden h-px w-full lg:block">
            {/* Segment 1: left edge → sidebar line — grows left to right */}
            <motion.div
              className={`absolute top-0 left-0 h-px origin-left ${isDark ? "bg-white/15" : "bg-black/15"}`}
              style={{ width: "300px" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            {/* Segment 2: sidebar line → contentDivider or right edge — grows right to left */}
            <motion.div
              className={`absolute top-0 h-px origin-right ${isDark ? "bg-white/15" : "bg-black/15"}`}
              style={{
                left: "300px",
                width: contentDividerLeft
                  ? `calc(${contentDividerLeft} - 300px)`
                  : "calc(100% - 300px)",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.0, delay: 0.2, ease: "easeInOut" }}
            />
            {/* Segment 3: contentDivider → right edge — grows left to right */}
            {contentDividerLeft && (
              <motion.div
                className={`absolute top-0 right-0 h-px origin-left ${isDark ? "bg-white/15" : "bg-black/15"}`}
                style={{ left: contentDividerLeft }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              />
            )}
          </div>
          {/* Mobile: single static line */}
          <div className={`my-16 h-px w-full lg:hidden ${isDark ? "bg-white/15" : "bg-black/15"}`} />
        </>
      )}

      <div className="relative flex">
        {/* Lower vertical sidebar line — from hr to near bottom */}
        <motion.div
          className={`pointer-events-none absolute top-[-65px] bottom-20 left-[300px] hidden w-px origin-top lg:block ${isDark ? "bg-white/8" : "bg-black/12"}`}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
        />
        {/* Content divider — starts at hr level (top of flex), ends at bottom-20 */}
        {contentDividerLeft && (
          <div
            className={`pointer-events-none absolute -top-16 bottom-20 hidden w-px lg:block ${isDark ? "bg-white/8" : "bg-black/12"}`}
            style={{ left: contentDividerLeft }}
          />
        )}
        {/* Left sticky sidebar */}
        <div className="hidden w-[350px] shrink-0 lg:block">
          <div className="sticky top-16 pt-16 pl-0">
            <div>
              <FadeIn direction="left" delay={0}>
                <div className="flex items-start gap-[23px]">
                  <Image
                    src="/images/Green-Triangle.png"
                    alt=""
                    width={30}
                    height={30}
                    className="mt-[6px] h-[22px] w-auto shrink-0"
                  />
                  {/* sectionNumber ukryty tymczasowo */}
                  <h2
                    className={`max-w-[250px] text-sidebar ${
                      isDark ? "text-fm-text" : "text-fm-dark"
                    }`}
                  >
                    {title}
                  </h2>
                </div>
              </FadeIn>

              {navLinks && navLinks.length > 0 && (
                <nav className="mt-8 space-y-0">
                  {navLinks.map((link, i) => (
                    <FadeIn key={link.label} direction="left" delay={0.15 + i * 0.1}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-[24px] text-[18px] font-extralight tracking-[0.75px] transition-colors hover:text-fm-green ${isDark ? "text-[#E8E8E8]" : "text-[#3C3C3C]"}`}
                      >
                        <span
                          className={`inline-block h-0 w-0 shrink-0 border-t-[7px] border-b-[7px] border-l-[10px] border-t-transparent border-b-transparent ${isDark ? "border-l-white/60" : "border-l-black/40"}`}
                          aria-hidden="true"
                        />
                        {link.label}
                      </Link>
                    </FadeIn>
                  ))}
                </nav>
              )}
            </div>

            <FadeIn direction="left" delay={0.15 + (navLinks?.length ?? 0) * 0.1}>
              <Link
                href="#home"
                className="mt-12 flex items-center gap-[24px] text-[16px] font-extralight text-fm-green transition-colors hover:text-fm-green-dark"
              >
                <span
                  className="inline-block h-0 w-0 shrink-0 border-t-[7px] border-b-[7px] border-l-[10px] border-t-transparent border-b-transparent border-l-fm-green"
                  aria-hidden="true"
                />
                Powrót na górę strony
              </Link>
            </FadeIn>
          </div>
        </div>


        {/* Right scrollable content */}
        <div className="min-w-0 flex-1 px-6 pt-16 pb-12 lg:px-12">
          {/* Mobile title */}
          <h2
            className={`mb-8 text-3xl font-light lg:hidden ${
              isDark ? "text-white" : "text-fm-dark"
            }`}
          >
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
