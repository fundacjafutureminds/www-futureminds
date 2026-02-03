import type { Metadata } from "next";
import { Inter, Cardo } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const cardo = Cardo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fundacja Future Minds",
    template: "%s | Fundacja Future Minds",
  },
  description:
    "Fundacja Future Minds — edukacja, stypendia, szkolenia i projekty technologiczne dla młodych ludzi.",
  keywords: [
    "fundacja",
    "edukacja",
    "stypendia",
    "szkolenia",
    "technologia",
    "Future Minds",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${cardo.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
