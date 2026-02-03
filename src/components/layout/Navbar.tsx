"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-md backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold ${
                isScrolled
                  ? "bg-fm-green text-white"
                  : "bg-white/20 text-white"
              }`}
            >
              FM
            </div>
            <span
              className={`text-lg font-bold transition-colors ${
                isScrolled ? "text-fm-dark" : "text-white"
              }`}
            >
              Future Minds
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-fm-dark hover:bg-fm-gray-100 hover:text-fm-green"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`rounded-lg p-2 transition-colors lg:hidden ${
              isScrolled
                ? "text-fm-dark hover:bg-fm-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Otwórz menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
