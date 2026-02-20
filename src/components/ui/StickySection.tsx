import Image from "next/image";
import Link from "next/link";
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

  return (
    <section
      id={id}
      className={`relative ${isDark ? "pt-96 text-fm-text" : "pt-96 bg-white text-fm-dark"}`}
    >
      {/* Vertical separator line */}
      <div
        className="pointer-events-none absolute top-96 bottom-20 left-[300px] hidden w-px bg-white/5 lg:block"
      />
      {/* Decorative header above two-column layout */}
      {header && (
        <>
          <div className="px-6 lg:ml-[350px] lg:px-12">
            {header}
          </div>
          <div
            className="my-16 h-px w-full bg-white/10"
          />
        </>
      )}

      <div className="relative flex">
        {/* Content divider — starts at hr level (top of flex), ends at bottom-20 */}
        {contentDividerLeft && (
          <div
            className="pointer-events-none absolute -top-16 bottom-20 hidden w-px bg-white/5 lg:block"
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
                        className="flex items-center gap-[24px] text-[18px] font-extralight tracking-[0.75px] text-[#E8E8E8] transition-colors hover:text-fm-green"
                      >
                        <span
                          className="inline-block h-0 w-0 shrink-0 border-t-[7px] border-b-[7px] border-l-[10px] border-t-transparent border-b-transparent border-l-white/60"
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
