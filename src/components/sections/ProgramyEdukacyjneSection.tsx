import Image from "next/image";
import Link from "next/link";
import { StickySection } from "@/components/ui/StickySection";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

import { PROGRAMS, EDUCATION_SECTION_NAV } from "@/lib/constants";

export function ProgramyEdukacyjneSection() {
  return (
    <StickySection
      id="programy-edukacyjne"
      title="Programy Edukacyjne"
      sectionNumber="01"
      navLinks={EDUCATION_SECTION_NAV}
      contentDividerLeft="calc(350px + 48px + (100% - 350px - 48px) * 0.4 + 48px)"
      header={
        <FadeIn direction="right">
          <div className="mb-32 w-full max-w-[980px] text-[200px] font-thin leading-[0.95] text-fm-text">
            Programy<br />edukacyjne
          </div>
        </FadeIn>
      }
    >
      <div className="relative">
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

        {/* Treść z z-10 — dwie kolumny: tekst intro | karty programów */}
        <div className="relative z-10">
          {/* Dwie kolumny: tekst intro (sticky) | karty programów (scrolluje) */}
          <div className="relative flex flex-col gap-12 lg:flex-row lg:gap-24">
            {/* Środkowa kolumna — sticky dopóki prawa się scrolluje */}
            <div className="lg:w-2/5">
              <div className="sticky top-32 space-y-8">
                <h3 className="max-w-3xl text-heading text-fm-text">
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
            </div>

            {/* Prawa kolumna — karty programów w kolumnie, staggered fade-in */}
            <div className="relative flex flex-col lg:w-3/5">
              {PROGRAMS.map((program, index) => {
                const isLast = index === PROGRAMS.length - 1;
                return (
                  <FadeIn
                    key={program.title}
                    direction="right"
                    delay={index * 0.15}
                    className={`relative [&:not(:first-child)]:pt-32 ${isLast ? '' : 'pb-32'}`}
                  >
                    <div className="lg:pl-[120px] lg:pr-[80px]">
                      <Image
                        src={program.logo}
                        alt={program.title}
                        width={program.logoWidth ?? 200}
                        height={program.logoHeight ?? 70}
                        className="mb-12 w-auto"
                        style={{ height: program.logoHeight ?? 70 }}
                      />
                      <p className="mb-12 text-[18px] font-extralight leading-relaxed tracking-[0.75px] text-[#E8E8E8]">
                        {program.description}
                      </p>
                      <Link
                        href={program.href}
                        className="inline-block text-[11px] font-light uppercase tracking-[3px] text-[#FFFFFFF2] transition-colors hover:text-fm-green"
                      >
                        Więcej
                      </Link>
                    </div>
                    {/* Linia separator między kartami */}
                    {!isLast && (
                      <div
                        className="absolute bottom-0 h-px bg-white/10"
                        style={{ left: '10px', right: '-200px' }}
                      />
                    )}
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Sekcja "szyte na miare" — programy autorskie z fadeIn */}
          <FadeIn>
            <div className="mt-40 lg:w-2/5">
              <h3 className="mb-6 max-w-3xl text-heading text-fm-text">
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
          </FadeIn>

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
      </div>
    </StickySection>
  );
}
