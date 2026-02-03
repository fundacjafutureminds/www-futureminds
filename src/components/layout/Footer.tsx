import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FOOTER_COLUMNS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-fm-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fm-green font-bold text-white">
                FM
              </div>
              <span className="text-lg font-bold">Future Minds</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-fm-gray-400">
              Fundacja na rzecz edukacji, innowacji i rozwoju kompetencji
              przyszłości.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-fm-gray-400">
                <Mail size={16} className="shrink-0 text-fm-green" />
                <span>kontakt@futureminds.org.pl</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-fm-gray-400">
                <Phone size={16} className="shrink-0 text-fm-green" />
                <span>+48 123 456 789</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-fm-gray-400">
                <MapPin size={16} className="shrink-0 text-fm-green" />
                <span>Warszawa, Polska</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fm-gray-400">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-fm-gray-400 transition-colors hover:text-fm-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-fm-dark-lighter pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-fm-gray-400">
              &copy; {new Date().getFullYear()} Fundacja Future Minds. Wszelkie
              prawa zastrzeżone.
            </p>
            <div className="flex gap-6">
              <Link
                href="/polityka-prywatnosci"
                className="text-sm text-fm-gray-400 transition-colors hover:text-fm-green"
              >
                Polityka prywatności
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
