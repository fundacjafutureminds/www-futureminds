import Image from "next/image";
import Link from "next/link";
import type { StickyNavLink } from "@/lib/types";

interface StickySectionProps {
  id?: string;
  title: string;
  sectionNumber?: string;
  variant?: "dark" | "light";
  navLinks?: StickyNavLink[];
  children: React.ReactNode;
}

export function StickySection({
  id,
  title,
  sectionNumber,
  variant = "dark",
  navLinks,
  children,
}: StickySectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      id={id}
      className={isDark ? "pt-52 text-fm-text" : "pt-52 bg-white text-fm-dark"}
    >
      <div className="flex">
        {/* Left sticky sidebar */}
        <div className="hidden w-[350px] shrink-0 lg:block">
          <div className="sticky top-0 flex h-screen flex-col justify-between pt-[330px] pb-12 pl-0">
            <div>
              <div className="flex items-start gap-3">
                <Image
                  src="/images/Green-Triangle.png"
                  alt=""
                  width={20}
                  height={20}
                />
                {/* sectionNumber ukryty tymczasowo */}
                <h2
                  className={`max-w-[200px] text-sidebar ${
                    isDark ? "text-white" : "text-fm-dark"
                  }`}
                >
                  {title}
                </h2>
              </div>

              {navLinks && navLinks.length > 0 && (
                <nav className="mt-8 space-y-0">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-[24px] text-body text-[#E8E8E8] transition-colors hover:text-fm-green"
                    >
                      <span
                        className="inline-block h-0 w-0 shrink-0 border-t-[7px] border-b-[7px] border-l-[10px] border-t-transparent border-b-transparent border-l-white/60"
                        aria-hidden="true"
                      />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              )}
            </div>

            <Link
              href="#home"
              className="mt-12 text-xs text-fm-green underline transition-colors hover:text-fm-green-dark"
            >
              Powrot na gore strony
            </Link>
          </div>
        </div>


        {/* Right scrollable content */}
        <div className="min-w-0 flex-1 px-6 py-12 lg:px-12">
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
