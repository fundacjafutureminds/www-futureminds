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
      <ProgramyEdukacyjneSection />
      <ProgramyStypendialneSection />
      <ProjektySection />
      <SzkoleniaSection />
      <BazaWiedzySection />
    </>
  );
}
