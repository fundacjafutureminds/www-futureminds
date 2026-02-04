import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { StickySection } from "@/components/ui/StickySection";
import {
  PROGRAMS,
  PROJECTS,
  PARTNER_LOGOS,
  EDUCATION_SECTION_NAV,
  SCHOLARSHIP_SECTION_NAV,
  TRAINING_SECTION_NAV,
  KNOWLEDGE_SECTION_NAV,
} from "@/lib/constants";

/* ─────────────────────────── HERO ─────────────────────────── */

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      {/* Subtle blueprint-style background pattern */}
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="absolute right-0 bottom-0 h-[80%] w-[60%] opacity-[0.04]"
          viewBox="0 0 800 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rocket silhouette — line art */}
          <path
            d="M400 50 C400 50 340 200 340 400 C340 500 360 580 380 640 L320 720 L380 700 L400 780 L420 700 L480 720 L420 640 C440 580 460 500 460 400 C460 200 400 50 400 50Z"
            stroke="white"
            strokeWidth="1.5"
          />
          {/* Exhaust flames */}
          <path
            d="M380 780 Q400 850 420 780"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M370 770 Q400 870 430 770"
            stroke="white"
            strokeWidth="0.8"
          />
          {/* Window */}
          <circle cx="400" cy="280" r="30" stroke="white" strokeWidth="1.2" />
          {/* Stars */}
          <circle cx="200" cy="150" r="2" fill="white" />
          <circle cx="600" cy="100" r="1.5" fill="white" />
          <circle cx="700" cy="300" r="2" fill="white" />
          <circle cx="150" cy="400" r="1" fill="white" />
          <circle cx="650" cy="500" r="1.5" fill="white" />
          <circle cx="250" cy="600" r="1" fill="white" />
          {/* Grid lines */}
          <line
            x1="100"
            y1="0"
            x2="100"
            y2="900"
            stroke="white"
            strokeWidth="0.3"
          />
          <line
            x1="300"
            y1="0"
            x2="300"
            y2="900"
            stroke="white"
            strokeWidth="0.3"
          />
          <line
            x1="500"
            y1="0"
            x2="500"
            y2="900"
            stroke="white"
            strokeWidth="0.3"
          />
          <line
            x1="700"
            y1="0"
            x2="700"
            y2="900"
            stroke="white"
            strokeWidth="0.3"
          />
          <line
            x1="0"
            y1="200"
            x2="800"
            y2="200"
            stroke="white"
            strokeWidth="0.3"
          />
          <line
            x1="0"
            y1="450"
            x2="800"
            y2="450"
            stroke="white"
            strokeWidth="0.3"
          />
          <line
            x1="0"
            y1="700"
            x2="800"
            y2="700"
            stroke="white"
            strokeWidth="0.3"
          />
          {/* Person silhouettes */}
          <ellipse
            cx="370"
            cy="870"
            rx="25"
            ry="35"
            stroke="white"
            strokeWidth="0.8"
          />
          <ellipse
            cx="430"
            cy="875"
            rx="20"
            ry="28"
            stroke="white"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-8 py-20">
        {/* Logo */}
        <Image
          src="/images/FMF-white.png"
          alt="Future Minds Foundation"
          width={300}
          height={95}
          className="mb-20 h-16 w-auto"
          priority
        />

        {/* Mission text */}
        <div className="max-w-xl space-y-6">
          <p className="text-lg leading-relaxed font-light text-fm-text">
            Fundacja Future Minds wspiera każde dziecko i młodą osobę w
            realizacji pełnego potencjału poprzez innowacyjną edukację STEAM.
          </p>
          <p className="text-lg leading-relaxed font-light text-fm-text">
            Jako oficjalny operator programu FIRST LEGO League w Polsce,
            rozwijamy kompetencje przyszłości łącząc robotykę z kreatywnością i
            współpracą. Szkolimy nauczycieli w nowoczesnych metodach nauczania i
            technologiach przyszłości.
          </p>
          <p className="text-lg leading-relaxed font-light text-fm-text">
            We współpracy z partnerami biznesowymi tworzymy system stypendiów,
            zapewniając dostępność programów dla każdego dziecka niezależnie od
            pochodzenia.
          </p>
          <p className="text-lg leading-relaxed font-light text-fm-text">
            Budujemy odpowiedzialne społeczeństwo gotowe na wyzwania jutra,
            gdzie innowacja spotyka się z inkluzywnością.
          </p>
        </div>
      </div>

      {/* Arrow down */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <Image
          src="/images/Strzalka-w-dol.png"
          alt="Przewiń w dół"
          width={59}
          height={13}
          className="animate-bounce opacity-60"
        />
      </div>
    </section>
  );
}

/* ──────────────────── PROGRAMY EDUKACYJNE ──────────────────── */

function ProgramyEdukacyjneSection() {
  return (
    <StickySection
      id="programy-edukacyjne"
      title="Programy Edukacyjne"
      sectionNumber="01"
      navLinks={EDUCATION_SECTION_NAV}
    >
      {/* Intro headings */}
      <div className="mb-16 space-y-8">
        <h3 className="max-w-3xl text-3xl leading-snug font-light text-white md:text-4xl">
          Realizujemy{" "}
          <span className="text-fm-green">globalne i lokalne</span> programy
          edukacyjne, które uzupełniają braki systemu edukacyjnego
          <span className="text-fm-green">.</span>
        </h3>
        <p className="max-w-2xl text-lg leading-relaxed font-light text-fm-text">
          Dążymy do kształtowania odpowiedzialnego i zaangażowanego
          społeczeństwa, które myśli krytycznie i jest gotowe na dynamiczne
          zmieniający się świat.
        </p>
        <p className="max-w-2xl text-lg leading-relaxed font-light text-fm-text">
          Naszą misją jest sprawienie, aby głos dzieci był słyszalny oraz
          wykorzystanie ich pomysłów i wizji do inspirowania liderów na całym
          świecie.
        </p>
      </div>

      {/* Global programs label */}
      <p className="mb-8 text-sm tracking-widest text-fm-text-muted uppercase">
        Globalne programy edukacyjne:
      </p>

      {/* Program cards */}
      <div className="space-y-8">
        {PROGRAMS.map((program) => (
          <div
            key={program.title}
            className="rounded-sm border border-white/10 p-8 transition-colors hover:border-fm-green/30"
          >
            <div className="mb-6">
              <Image
                src={program.logo}
                alt={program.title}
                width={200}
                height={70}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="mb-6 max-w-2xl leading-relaxed text-fm-text">
              {program.description}
            </p>
            <Link
              href={program.href}
              className="inline-block border border-white/20 px-6 py-2 text-xs tracking-widest text-fm-text-muted uppercase transition-colors hover:border-fm-green hover:text-fm-green"
            >
              WIĘCEJ
            </Link>
          </div>
        ))}
      </div>

      {/* Custom programs */}
      <div className="mt-20">
        <h3 className="mb-6 max-w-3xl text-2xl leading-snug font-light text-white md:text-3xl">
          Tworzymy również autorskie programy edukacyjne dostosowane do
          indywidualnych potrzeb i specyfiki regionu lub branży.
        </h3>
        <p className="max-w-2xl leading-relaxed text-fm-text">
          Niezależnie od tego, czy chodzi o specyfikę gospodarczą danego regionu,
          wymagania konkretnego sektora, nasze programy są projektowane tak, aby
          odpowiadały na wyzwania i potrzeby społeczności, w której będą
          realizowane.
        </p>
      </div>
    </StickySection>
  );
}

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

/* ──────────────────────── SEPARATOR ──────────────────────── */

function SectionSeparator() {
  return (
    <div className="flex justify-center py-16">
      <Image
        src="/images/Strzalka-w-dol.png"
        alt=""
        width={59}
        height={13}
        className="opacity-40"
      />
    </div>
  );
}

/* ─────────────────────── MAIN PAGE ─────────────────────── */

export default function Home() {
  return (
    <>
      <HeroSection />
      <Navbar />
      <SectionSeparator />
      <ProgramyEdukacyjneSection />
      <ProgramyStypendialneSection />
      <ProjektySection />
      <SzkoleniaSection />
      <BazaWiedzySection />
    </>
  );
}
