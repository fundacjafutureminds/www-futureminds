"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap-init";
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
  /** Optional override background color (for dark variant) */
  bgColor?: string;
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
  bgColor,
  children,
}: StickySectionProps) {
  const isDark = variant === "dark";
  const sectionRef = useRef<HTMLElement>(null);
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

  // GSAP line animations — desktop only, div scaleX/scaleY
  // Strategy: CSS opacity-0 hides lines on render. GSAP.set() makes them
  // visible at scale 0 (useLayoutEffect timing = before paint). Then
  // gsap.to() with ScrollTrigger animates scale to 1. React never manages
  // the transform property, so re-renders can't interfere.
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        // Upper vertical line — scales from top
        const upperLine = section.querySelector(".line-upper");
        if (upperLine) {
          gsap.set(upperLine, { opacity: 1, scaleY: 0 });
          gsap.to(upperLine, {
            scaleY: 1,
            duration: 1.0,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: upperLine,
              start: "top 90%",
              once: true,
            },
          });
        }

        // Horizontal segments — triggered by HR container
        const hrContainer = section.querySelector(".hr-container");
        if (hrContainer) {
          const hr1 = section.querySelector(".line-hr1");
          const hr2 = section.querySelector(".line-hr2");
          const hr3 = section.querySelector(".line-hr3");

          const lines = [hr1, hr2, hr3].filter(Boolean);
          gsap.set(lines, { opacity: 1, scaleX: 0 });

          if (hr1) {
            gsap.to(hr1, {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: hrContainer,
                start: "top 80%",
                once: true,
              },
            });
          }

          if (hr2) {
            gsap.to(hr2, {
              scaleX: 1,
              duration: 1.0,
              delay: 0.2,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: hrContainer,
                start: "top 80%",
                once: true,
              },
            });
          }

          if (hr3) {
            gsap.to(hr3, {
              scaleX: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: hrContainer,
                start: "top 80%",
                once: true,
              },
            });
          }
        }

        // Lower vertical line — scales from top
        const lowerLine = section.querySelector(".line-lower");
        if (lowerLine) {
          gsap.set(lowerLine, { opacity: 1, scaleY: 0 });
          gsap.to(lowerLine, {
            scaleY: 1,
            duration: 1.5,
            delay: 0.3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: lowerLine,
              start: "top 95%",
              once: true,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative pt-96 ${isDark ? "text-fm-text" : "text-fm-dark"}`}
      style={
        isDark
          ? bgColor
            ? { backgroundColor: bgColor }
            : undefined
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
            <div
              className={`line-upper pointer-events-none absolute bottom-[-65px] left-[300px] hidden w-px origin-top opacity-0 lg:block ${isDark ? "bg-white/8" : "bg-black/12"}`}
              style={{ top: upperLineTop }}
            />
            <div className="px-6 lg:ml-[350px] lg:px-12">
              {header}
            </div>
          </div>
          {/* Horizontal line — 3 segments, each grows outward from vertical lines */}
          <div ref={hrRef} className="hr-container relative my-16 hidden h-px w-full lg:block">
            {/* Segment 1: left edge → sidebar line — grows left to right */}
            <div
              className={`line-hr1 absolute top-0 left-0 h-px origin-left opacity-0 ${isDark ? "bg-white/15" : "bg-black/15"}`}
              style={{ width: "300px" }}
            />
            {/* Segment 2: sidebar line → contentDivider or right edge — grows right to left */}
            <div
              className={`line-hr2 absolute top-0 h-px origin-right opacity-0 ${isDark ? "bg-white/15" : "bg-black/15"}`}
              style={{
                left: "300px",
                width: contentDividerLeft
                  ? `calc(${contentDividerLeft} - 300px)`
                  : "calc(100% - 300px)",
              }}
            />
            {/* Segment 3: contentDivider → right edge — grows left to right */}
            {contentDividerLeft && (
              <div
                className={`line-hr3 absolute top-0 right-0 h-px origin-left opacity-0 ${isDark ? "bg-white/15" : "bg-black/15"}`}
                style={{ left: contentDividerLeft }}
              />
            )}
          </div>
          {/* Mobile: single static line */}
          <div className={`my-16 h-px w-full lg:hidden ${isDark ? "bg-white/15" : "bg-black/15"}`} />
        </>
      )}

      <div className="relative flex">
        {/* Lower vertical sidebar line — from hr to near bottom */}
        <div
          className={`line-lower pointer-events-none absolute top-[-65px] bottom-20 left-[300px] hidden w-px origin-top opacity-0 lg:block ${isDark ? "bg-white/8" : "bg-black/12"}`}
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
                      isDark ? "text-fm-text" : "font-medium text-[#484d54]"
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
                        className={`flex items-center gap-[24px] text-[18px] font-extralight tracking-[0.75px] transition-colors hover:text-fm-green ${isDark ? "text-[#E8E8E8]" : "text-[#3C3C3C] [&]:[-webkit-text-stroke:0.3px]"}`}
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
