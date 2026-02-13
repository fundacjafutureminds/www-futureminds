import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProgramyEdukacyjneSection } from "@/components/sections/ProgramyEdukacyjneSection";
import { ProgramyStypendialneSection } from "@/components/sections/ProgramyStypendialneSection";
import { ProjektySection } from "@/components/sections/ProjektySection";
import { StickySection } from "@/components/ui/StickySection";
import {
  TRAINING_SECTION_NAV,
  KNOWLEDGE_SECTION_NAV,
} from "@/lib/constants";

/* ──────────────────────── SZKOLENIA ──────────────────────── */

function SzkoleniaSection() {
  return (
    <StickySection
      id="szkolenia"
      title="Szkolenia"
      sectionNumber="04"
      navLinks={TRAINING_SECTION_NAV}
    >
      {/* Intro */}
      <div className="mb-16 space-y-8">
        <h3 className="max-w-3xl text-3xl leading-snug font-light text-white md:text-4xl">
          Dzielimy się naszą{" "}
          <span className="text-fm-green">wiedzą i doświadczeniem</span>, aby
          można było ją zastosować podczas pracy z dziećmi.
        </h3>
        <p className="max-w-2xl text-lg leading-relaxed font-light text-fm-text">
          Szkolenia dla nauczycieli realizujemy w ramach Akademii LEGO Education
          i Akademii Future Minds, zapewniając nauczycielom solidne fundamenty w
          obszarach nowoczesnych technologii: robotyce, sztucznej inteligencji i
          elektronice oraz innowacyjnych i angażujących metodach nauczania.
        </p>
        <p className="max-w-2xl text-lg leading-relaxed font-light text-fm-text">
          Warsztaty obejmują szeroki zakres programów edukacyjnych przeznaczonych
          do różnych etapów kształcenia STEAM - od przedszkoli, poprzez
          nauczanie początkowe, szkoły podstawowe, aż po licea i technika.
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/szkolenia"
        className="mb-16 inline-block border border-white/20 px-8 py-3 text-sm tracking-widest text-fm-text-muted uppercase transition-colors hover:border-fm-green hover:text-fm-green"
      >
        Poznaj nasze szkolenia
      </Link>

      {/* Technology icons row */}
      <div>
        <p className="mb-6 text-sm tracking-widest text-fm-text-muted uppercase">
          Technologie
        </p>
        <div className="flex flex-wrap items-center gap-8">
          <Image
            src="/images/23744_20138_spike5a.png"
            alt="SPIKE"
            width={80}
            height={40}
            className="h-8 w-auto opacity-60 brightness-0 invert"
          />
          <Image
            src="/images/raspberry-pi-svgrepo-com.png"
            alt="Raspberry Pi"
            width={80}
            height={40}
            className="h-8 w-auto opacity-60 brightness-0 invert"
          />
        </div>
      </div>
    </StickySection>
  );
}

/* ──────────────────────── BAZA WIEDZY ──────────────────────── */

function BazaWiedzySection() {
  return (
    <StickySection
      id="baza-wiedzy"
      title="Baza wiedzy"
      sectionNumber="05"
      navLinks={KNOWLEDGE_SECTION_NAV}
    >
      {/* Intro */}
      <div className="mb-16 space-y-8">
        <h3 className="max-w-3xl text-3xl leading-snug font-light text-white md:text-4xl">
          Stale analizujemy{" "}
          <span className="text-fm-green">skuteczność naszych programów</span> i
          śledzimy międzynarodowe badania w dziedzinie edukacji.
        </h3>
        <p className="max-w-2xl text-lg leading-relaxed font-light text-fm-text">
          Baza wiedzy to zbiór materiałów stworzonych przez trenerów fundacji
          oraz ekspertów zewnętrznych zajmujących się nowoczesną edukacją.
        </p>
        <p className="max-w-2xl text-lg leading-relaxed font-light text-fm-text">
          Znajdują się tam również badania i raporty publikowane przez jednostki
          naukowe.
        </p>
      </div>

      {/* Publication image */}
      <div className="mb-12">
        <Image
          src="/images/ksiazki.png"
          alt="Publikacje"
          width={400}
          height={300}
          className="h-48 w-auto opacity-80"
        />
      </div>

      {/* Publication links */}
      <div className="space-y-4">
        <Link
          href="/publikacje"
          className="block rounded-sm border border-white/10 p-6 transition-colors hover:border-fm-green/30"
        >
          <p className="mb-2 text-xs text-fm-text-muted">Baza wiedzy</p>
          <p className="text-white">
            Uczenie (się) przez tworzenie – Jakub Piasecki
          </p>
          <span className="mt-3 inline-block text-xs text-fm-green">
            Więcej
          </span>
        </Link>
        <Link
          href="/publikacje"
          className="block rounded-sm border border-white/10 p-6 transition-colors hover:border-fm-green/30"
        >
          <p className="mb-2 text-xs text-fm-text-muted">Baza wiedzy</p>
          <p className="text-white">
            Robotyka w programie „Laboratoria Przyszłości" – Wojciech Zuziak
          </p>
          <span className="mt-3 inline-block text-xs text-fm-green">
            Więcej
          </span>
        </Link>
      </div>
    </StickySection>
  );
}

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
