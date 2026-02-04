import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fundacja Future Minds – Nauka i technologia to nasza pasja. Edukacja to nasza misja.",
    template: "%s | Fundacja Future Minds",
  },
  description:
    "Fundacja Future Minds wspiera każde dziecko i młodą osobę w realizacji pełnego potencjału poprzez innowacyjną edukację STEAM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={plusJakartaSans.variable}>
      <body className="antialiased">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
