import Image from "next/image";
import Link from "next/link";
import { StickySection } from "@/components/ui/StickySection";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

import { PROGRAMS, EDUCATION_SECTION_NAV } from "@/lib/constants";

interface ProgramyEdukacyjneProps {
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
}

export function ProgramyEdukacyjneSection({ bgColor, accentColor, textColor }: ProgramyEdukacyjneProps = {}) {
  // Kolory: domyślne (dark) lub override
  const ac = accentColor || undefined;
  const tx = textColor || undefined;

  const accentStyle = ac ? { color: ac } : undefined;
  const textStyle = tx ? { color: tx } : undefined;
  const accentClass = ac ? "" : "text-fm-green";
  const headingClass = tx ? "" : "text-fm-text";
  const bodyClass = tx ? "" : "text-[#E8E8E8]";
  const cardTextClass = tx ? "" : "text-[#E8E8E8]";
  const linkClass = tx ? "" : "text-[#FFFFFFF2]";
  const hoverClass = ac ? "" : "hover:text-fm-green";

  return (
    <StickySection
      id="programy-edukacyjne"
      bgColor={bgColor}
      title="Programy Edukacyjne"
      sectionNumber="01"
      navLinks={EDUCATION_SECTION_NAV}
      contentDividerLeft="calc(350px + 48px + (100% - 350px - 48px) * 0.4 + 48px)"
      header={
        <h2 className="mb-32 w-full max-w-[980px] text-[200px] font-thin leading-[0.95] text-white/15">
          Programy<br />edukacyjne
        </h2>
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
                <h3 className={`max-w-3xl text-heading ${headingClass}`} style={textStyle}>
                  Realizujemy{" "}
                  <span className={accentClass} style={accentStyle}>globalne i lokalne </span>
                  programy edukacyjne, które uzupełniają braki systemu edukacyjnego
                  <span className={accentClass} style={accentStyle}>.</span>
                </h3>
                <p className={`max-w-2xl text-body ${bodyClass}`} style={textStyle}>
                  Dążymy do kształtowania odpowiedzialnego i zaangażowanego
                  społeczeństwa, które myśli krytycznie i jest gotowe na dynamicznie
                  zmieniający się świat.
                </p>
                <p className={`max-w-2xl text-body ${bodyClass}`} style={textStyle}>
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
                    className={`group relative [&:not(:first-child)]:pt-32 ${isLast ? '' : 'pb-32'} before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-[10px] before:right-[-200px] before:transition-colors before:duration-700 before:ease-in-out hover:before:bg-white/[0.01] first:before:top-[-128px]`}
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
                      <p className={`mb-12 text-[18px] font-extralight leading-relaxed tracking-[0.75px] ${cardTextClass}`} style={textStyle}>
                        {program.description}
                      </p>
                      <Link
                        href={program.href}
                        className={`inline-block text-[11px] font-light uppercase tracking-[3px] transition-colors ${linkClass} ${hoverClass}`}
                        style={ac ? { color: tx || '#FFFFFFF2' } : undefined}
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
              <h3 className={`mb-6 max-w-3xl text-heading ${headingClass}`} style={textStyle}>
                Tworzymy również autorskie programy edukacyjne dostosowane do{" "}
                <span className={accentClass} style={accentStyle}>
                  indywidualnych potrzeb i specyfiki regionu{" "}
                </span>
                lub branży<span className={accentClass} style={accentStyle}>.</span>
              </h3>
              <div className="space-y-6">
                <p className={`max-w-2xl text-body ${bodyClass}`} style={textStyle}>
                  Niezależnie od tego, czy chodzi o specyfikę gospodarczą danego
                  regionu, wymagania konkretnego sektora, nasze programy są
                  projektowane tak, aby odpowiadały na{" "}
                  <span className={accentClass} style={accentStyle}>
                    wyzwania i potrzeby społeczności
                  </span>
                  , w której będą realizowane.
                </p>
                <p className={`max-w-2xl text-body ${bodyClass}`} style={textStyle}>
                  Dzięki bliskim relacjom z biznesem i organizacjami pozarządowymi
                  wypracowujemy programy, które odpowiadają{" "}
                  <span className={accentClass} style={accentStyle}>
                    na rzeczywiste potrzeby rynku pracy
                  </span>{" "}
                  i pomagają budować kompetencje przyszłości.
                </p>
                <p className={`max-w-2xl text-body ${bodyClass}`} style={textStyle}>
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
