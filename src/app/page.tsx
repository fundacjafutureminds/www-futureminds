import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProgramyEdukacyjneSection } from "@/components/sections/ProgramyEdukacyjneSection";
import { StickySection } from "@/components/ui/StickySection";
import {
  PROJECTS,
  PARTNER_LOGOS,
  SCHOLARSHIP_SECTION_NAV,
  TRAINING_SECTION_NAV,
  KNOWLEDGE_SECTION_NAV,
} from "@/lib/constants";

/* ─────────────────── PROGRAMY STYPENDIALNE ─────────────────── */

function ProgramyStypendialneSection() {
  return (
    <StickySection
      id="programy-stypendialne"
      title="Programy Stypendialne"
      sectionNumber="02"
      navLinks={SCHOLARSHIP_SECTION_NAV}
    >
      {/* Intro headings */}
      <div className="mb-16 space-y-8">
        <h3 className="max-w-3xl text-3xl leading-snug font-light text-white md:text-4xl">
          Łączymy{" "}
          <span className="text-fm-green">
            odpowiedzialne społecznie firmy
          </span>{" "}
          z dziećmi, które potrzebują wsparcia na starcie.
        </h3>
        <p className="max-w-2xl text-lg leading-relaxed font-light text-fm-text">
          Sukces opiera się na duchu dzielenia się - dzielenia się wiedzą,
          doświadczeniem i możliwościami.
        </p>
        <p className="max-w-2xl text-lg leading-relaxed font-light text-fm-text">
          Poprzez umożliwienie młodym ludziom uczestnictwa w międzynarodowych
          programach edukacyjnych, nie tylko umacniamy ich kompetencje w obszarze
          nauki, technologii, inżynierii i matematyki, ale również inspirujemy
          ich do wykorzystywania zdobytej wiedzy na rzecz rozwiązywania
          rzeczywistych problemów świata.
        </p>
      </div>

      {/* Partner logos */}
      <div className="mb-16">
        <p className="mb-8 text-sm tracking-widest text-fm-text-muted uppercase">
          Partnerzy strategiczni
        </p>
        <div className="flex flex-wrap items-center gap-10">
          {PARTNER_LOGOS.map((partner) => (
            <Image
              key={partner.name}
              src={partner.src}
              alt={partner.name}
              width={140}
              height={50}
              className="h-10 w-auto opacity-70 brightness-0 invert transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </div>

      {/* CTA cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/csr"
          className="group block rounded-sm border border-white/10 p-8 transition-colors hover:border-fm-green/30"
        >
          <h4 className="mb-4 text-xl font-light text-white transition-colors group-hover:text-fm-green">
            Jak ufundować stypendium?
          </h4>
          <span className="inline-block border border-white/20 px-6 py-2 text-xs tracking-widest text-fm-text-muted uppercase transition-colors group-hover:border-fm-green group-hover:text-fm-green">
            WIĘCEJ &gt;
          </span>
        </Link>
        <Link
          href="/stypendia"
          className="group block rounded-sm border border-white/10 p-8 transition-colors hover:border-fm-green/30"
        >
          <h4 className="mb-4 text-xl font-light text-white transition-colors group-hover:text-fm-green">
            Jak otrzymać stypendium?
          </h4>
          <span className="inline-block border border-white/20 px-6 py-2 text-xs tracking-widest text-fm-text-muted uppercase transition-colors group-hover:border-fm-green group-hover:text-fm-green">
            WIĘCEJ &gt;
          </span>
        </Link>
      </div>
    </StickySection>
  );
}

/* ──────────────────────── PROJEKTY ──────────────────────── */

function ProjektySection() {
  return (
    <StickySection id="projekty" title="Projekty" sectionNumber="03">
      {/* Intro */}
      <div className="mb-16 space-y-8">
        <h3 className="max-w-3xl text-3xl leading-snug font-light text-white md:text-4xl">
          Podejmujemy wyzwania nowoczesnego świata poprzez realizację projektów,
          które angażują lokalne społeczności
          <span className="text-fm-green">.</span>
        </h3>
        <p className="max-w-2xl text-lg leading-relaxed font-light text-fm-text">
          Przez pryzmat innowacji i współpracy z lokalnymi społecznościami i
          partnerami na całym świecie, tworzymy rozwiązania mające realny wpływ
          na poprawę jakości życia.
        </p>
      </div>

      {/* Project cards */}
      <div className="space-y-6">
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            className="rounded-sm border border-white/10 p-8"
          >
            <div className="flex items-start gap-6">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={80}
                  height={80}
                  className="hidden h-16 w-auto shrink-0 opacity-80 brightness-0 invert md:block"
                />
              )}
              <div>
                <h4 className="mb-3 text-lg font-light text-white">
                  {project.title}
                </h4>
                <p className="leading-relaxed text-fm-text">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StickySection>
  );
}

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
