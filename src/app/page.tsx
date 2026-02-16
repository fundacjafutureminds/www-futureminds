import Image from "next/image";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProgramyEdukacyjneSection } from "@/components/sections/ProgramyEdukacyjneSection";
import { ProgramyStypendialneSection } from "@/components/sections/ProgramyStypendialneSection";
import { ProjektySection } from "@/components/sections/ProjektySection";
import { SzkoleniaSection } from "@/components/sections/SzkoleniaSection";
import { BazaWiedzySection } from "@/components/sections/BazaWiedzySection";

/* ─────────────────────── MAIN PAGE ─────────────────────── */

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* Scroll indicator between Hero and Programy */}
      <div className="flex justify-center pt-96 pb-0">
        <a href="#programy-edukacyjne" aria-label="Przewiń w dół">
          <Image
            src="/images/Strzalka-w-dol.png"
            alt=""
            width={59}
            height={13}
            className="animate-bounce opacity-60 transition-opacity hover:opacity-100"
          />
        </a>
      </div>
      <ProgramyEdukacyjneSection />
      <ProgramyStypendialneSection />
      <ProjektySection />
      <SzkoleniaSection />
      <BazaWiedzySection />
    </>
  );
}
