import Image from "next/image";
import { StickySection } from "@/components/ui/StickySection";

export function ProjektySection() {
  return (
    <StickySection id="projekty" title="Projekty" sectionNumber="03">
      <div className="relative">
        {/* Overlay dekoracyjny trybik3.png */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/trybik3.png"
            alt=""
            fill
            className="object-contain object-right-top opacity-20"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10">
          {/* Duzy naglowek dekoracyjny 100px */}
          <h2
            className="mb-16 text-section text-[#EFEFEF]"
            style={{
              fontFamily: "'neue-haas-grotesk-display', var(--font-sans)",
            }}
          >
            Projekty
          </h2>

          {/* Intro naglowki z zielonymi akcentami */}
          <div className="mb-16 space-y-8">
            <h3 className="max-w-3xl text-heading text-[#FFFFFFF5]">
              {`Podejmujemy wyzwania nowoczesnego \u015Bwiata poprzez `}
              <span className="text-fm-green">
                {`realizacj\u0119 projekt\u00F3w`}
              </span>
              {`, kt\u00F3re anga\u017Cuj\u0105 lokalne spo\u0142eczno\u015Bci.`}
            </h3>
            <p className="max-w-2xl text-body text-[#E8E8E8]">
              {`Przez pryzmat innowacji i wsp\u00F3\u0142pracy z lokalnymi spo\u0142eczno\u015Bciami i partnerami na ca\u0142ym \u015Bwiecie, tworzymy rozwi\u0105zania maj\u0105ce realny wp\u0142yw na popraw\u0119 jako\u015Bci \u017Cycia.`}
            </p>
            <p className="max-w-2xl text-body text-[#E8E8E8]">
              {`Pracujemy nad rozwi\u0105zaniami, kt\u00F3re nie tylko odpowiadaj\u0105 na aktualne potrzeby spo\u0142eczne, ale r\u00F3wnie\u017C przyczyniaj\u0105 si\u0119 do budowania lepszej przysz\u0142o\u015Bci dla kolejnych pokole\u0144. Nasze dzia\u0142ania skupiaj\u0105 si\u0119 na praktycznych rozwi\u0105zaniach, kt\u00F3re przynosz\u0105 realne korzy\u015Bci i inspiruj\u0105 do pozytywnych zmian w spo\u0142ecze\u0144stwie.`}
            </p>
          </div>

          {/* Grid kart projektow -- placeholder, implementacja w Plan 02 */}
          {/* TODO: Plan 06-02 doda grid 3-kolumnowy 7 kart projektow + strzalke separator */}
        </div>
      </div>
    </StickySection>
  );
}
