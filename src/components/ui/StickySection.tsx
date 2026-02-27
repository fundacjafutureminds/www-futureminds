import Image from "next/image";
import Link from "next/link";
import type { StickyNavLink } from "@/lib/types";
import { FadeIn } from "@/components/ui/FadeIn";
import { DrawLine } from "@/components/ui/DrawLine";


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
      {/* Vertical separator line — draw animation */}
      <DrawLine
        direction="vertical"
        stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)"}
        className="pointer-events-none absolute top-96 bottom-20 left-[300px] hidden lg:block"
        duration={1.5}
      />
      {/* Decorative header above two-column layout */}
      {header && (
        <>
          <div className="px-6 lg:ml-[350px] lg:px-12">
            {header}
          </div>
          {/* Horizontal line — segmented at vertical line intersections, no gaps */}
          <div className="relative my-16 hidden h-px w-full lg:block">
            {/* Segment 1: left edge → sidebar line (300px) */}
            <DrawLine
              direction="horizontal"
              stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              className="absolute top-0 left-0 h-px"
              style={{ width: "300px" }}
              duration={0.8}
            />
            {/* Segment 2: sidebar line → contentDivider or right edge */}
            <DrawLine
              direction="horizontal"
              stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              className="absolute top-0 h-px"
              style={{
                left: "300px",
                width: contentDividerLeft
                  ? `calc(${contentDividerLeft} - 300px)`
                  : "calc(100% - 300px)",
              }}
              duration={1.0}
              delay={0.2}
            />
            {/* Segment 3: contentDivider → right edge (only if contentDivider exists) */}
            {contentDividerLeft && (
              <DrawLine
                direction="horizontal"
                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                className="absolute top-0 right-0 h-px"
                style={{ left: contentDividerLeft }}
                duration={0.8}
                delay={0.4}
              />
            )}
          </div>
          {/* Mobile: single line */}
          <div className={`my-16 h-px w-full lg:hidden ${isDark ? "bg-white/10" : "bg-black/10"}`} />
        </>
      )}

      <div className="relative flex">
        {/* Content divider — starts at hr level (top of flex), ends at bottom-20 */}
        {contentDividerLeft && (
          <DrawLine
            direction="vertical"
            stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)"}
            className="pointer-events-none absolute -top-16 bottom-20 hidden lg:block"
            style={{ left: contentDividerLeft }}
            duration={1.5}
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
