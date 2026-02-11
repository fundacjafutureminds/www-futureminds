import Image from "next/image";
import Link from "next/link";
import { PROGRAMS } from "@/lib/constants";

export function ProgramyEdukacyjneSection() {
  return (
    <section id="programy-edukacyjne" className="relative">
      {/* Overlay dekoracyjny */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/Tlo-EDUKACYJNE3.png"
          alt=""
          fill
          className="object-contain object-right-top opacity-20"
          aria-hidden="true"
        />
      </div>

      {/* Treść sekcji */}
      <div className="relative z-10 px-6 py-12 lg:px-12">
        {/* Duży nagłówek dekoracyjny 100px */}
        <h2
          className="mb-16 text-section text-[#EFEFEF]"
          style={{
            fontFamily: "'neue-haas-grotesk-display', var(--font-sans)",
          }}
        >
          Programy
          <br /> edukacyjne
        </h2>

        {/* Intro headings z zielonymi akcentami */}
        <div className="mb-16 space-y-8">
          <h3 className="max-w-3xl text-heading text-[#FFFFFFF5]">
            Realizujemy{" "}
            <span className="text-fm-green">globalne i lokalne </span>
            programy edukacyjne, które uzupełniają braki systemu edukacyjnego
            <span className="text-fm-green">.</span>
          </h3>
          <p className="max-w-2xl text-body text-[#E8E8E8]">
            Dążymy do kształtowania odpowiedzialnego i zaangażowanego
            społeczeństwa, które myśli krytycznie i jest gotowe na dynamicznie
            zmieniający się świat.
          </p>
          <p className="max-w-2xl text-body text-[#E8E8E8]">
            Naszą misją jest sprawienie, aby głos dzieci był słyszalny oraz
            wykorzystanie ich pomysłów i wizji do inspirowania liderów na całym
            świecie.
          </p>
        </div>

        {/* Etykieta */}
        <p className="mb-8 text-[18px] font-extralight text-[#E8E8E8]">
          Globalne programy edukacyjne:
        </p>

        {/* Karty programów — grid 2-kolumnowy */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          {PROGRAMS.map((program) => (
            <div
              key={program.title}
              className="border-l border-[#FFFFFF3B] py-8 pl-6"
            >
              <Image
                src={program.logo}
                alt={program.title}
                width={200}
                height={70}
                className="mb-6 h-12 w-auto"
              />
              <p className="mb-6 max-w-lg text-[17px] font-extralight leading-relaxed text-[#E8E8E8]">
                {program.description}
              </p>
              <Link
                href={program.href}
                className="inline-block rounded-[2px] bg-[#FFFFFF0A] px-[30px] pt-[17px] pb-[15px] text-[10px] font-light uppercase tracking-[2px] leading-none text-[#FFFFFFF2] transition-colors hover:bg-fm-green hover:text-white"
              >
                WIĘCEJ
              </Link>
            </div>
          ))}
        </div>

        {/* Sekcja "szyte na miarę" — programy autorskie */}
        <div className="mt-20">
          <h3 className="mb-6 max-w-3xl text-heading text-[#FFFFFFF5]">
            Tworzymy również autorskie programy edukacyjne dostosowane do{" "}
            <span className="text-fm-green">
              indywidualnych potrzeb i specyfiki regionu{" "}
            </span>
            lub branży<span className="text-fm-green">.</span>
          </h3>
          <div className="space-y-6">
            <p className="max-w-2xl text-body text-[#E8E8E8]">
              Niezależnie od tego, czy chodzi o specyfikę gospodarczą danego
              regionu, wymagania konkretnego sektora, nasze programy są
              projektowane tak, aby odpowiadały na{" "}
              <span className="text-fm-green">
                wyzwania i potrzeby społeczności
              </span>
              , w której będą realizowane.
            </p>
            <p className="max-w-2xl text-body text-[#E8E8E8]">
              Dzięki bliskim relacjom z biznesem i organizacjami pozarządowymi
              wypracowujemy programy, które odpowiadają{" "}
              <span className="text-fm-green">
                na rzeczywiste potrzeby rynku pracy
              </span>{" "}
              i pomagają budować kompetencje przyszłości.
            </p>
            <p className="max-w-2xl text-body text-[#E8E8E8]">
              Szyte na miarę programy edukacyjne{" "}
              <em>FIRST</em> to nasze unikalne rozwiązania, które łączą globalną
              metodologię z lokalnymi potrzebami.
            </p>
          </div>
        </div>

        {/* Separator strzałka */}
        <div className="mt-16 flex justify-center">
          <Image
            src="/images/Strzalka-w-dol.png"
            alt=""
            width={59}
            height={13}
            className="opacity-40"
          />
        </div>
      </div>
    </section>
  );
}
