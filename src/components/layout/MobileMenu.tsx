"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-fm-gray-200 p-6">
          <span className="text-lg font-semibold text-fm-dark">Menu</span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-fm-gray-600 transition-colors hover:bg-fm-gray-100"
            aria-label="Zamknij menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-6">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-lg px-4 py-3 text-fm-dark transition-colors hover:bg-fm-gray-50 hover:text-fm-green"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-fm-gray-200 p-6">
          <Link
            href="/kontakt"
            onClick={onClose}
            className="block w-full rounded-lg bg-fm-green px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-fm-green-dark"
          >
            Skontaktuj się
          </Link>
        </div>
      </div>
    </>
  );
}
