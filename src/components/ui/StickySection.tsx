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
      className={isDark ? "bg-fm-dark text-fm-text" : "bg-white text-fm-dark"}
    >
      <div className="mx-auto flex max-w-[1400px] items-start">
        {/* Left sticky sidebar */}
        <div className="hidden w-[350px] shrink-0 lg:block">
          <div className="sticky top-0 flex flex-col justify-between pt-12 pb-12 pl-8">
            <div>
              <Image
                src="/images/Green-Triangle.png"
                alt=""
                width={20}
                height={20}
                className="mb-6"
              />

              {sectionNumber && (
                <p
                  className={`mb-2 text-5xl font-extralight ${
                    isDark ? "text-fm-green" : "text-fm-green"
                  }`}
                >
                  {sectionNumber}
                </p>
              )}

              <h2
                className={`text-sidebar ${
                  isDark ? "text-white" : "text-fm-dark"
                }`}
              >
                {title}
              </h2>

              {navLinks && navLinks.length > 0 && (
                <nav className="mt-8 space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-fm-text-muted transition-colors hover:text-fm-green"
                    >
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

        {/* Vertical separator */}
        <div
          className={`hidden w-px self-stretch lg:block ${
            isDark ? "bg-white/10" : "bg-fm-dark/10"
          }`}
        />

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
