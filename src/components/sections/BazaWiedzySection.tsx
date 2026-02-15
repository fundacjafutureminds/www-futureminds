import Image from "next/image";
import { StickySection } from "@/components/ui/StickySection";
import { KNOWLEDGE_SECTION_NAV } from "@/lib/constants";

export function BazaWiedzySection() {
  return (
    <StickySection
      id="baza-wiedzy"
      title="Wiedza"
      sectionNumber="05"
      navLinks={KNOWLEDGE_SECTION_NAV}
    >
      <div className="relative">
        {/* Overlay 1: subtelny pattern Baza-wiedzy.png */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/Baza-wiedzy.png"
            alt=""
            fill
            className="object-contain object-right-bottom opacity-20"
            aria-hidden="true"
          />
        </div>
        {/* Overlay 2: laptop na ksiazkach baza-wieedzy.png */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/baza-wieedzy.png"
            alt=""
            fill
            className="object-contain object-right-bottom opacity-20"
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
            {`Baza wiedzy`}
          </h2>

          {/* Intro heading z zielonym akcentem + opis */}
          <div className="mb-16 w-[60%] space-y-8">
            <h3 className="max-w-3xl text-heading text-[#FFFFFFF5]">
              {`Stale analizujemy `}
              <span className="text-fm-green">
                {`skuteczno\u015B\u0107 naszych program\u00F3w`}
              </span>
              <br />
              {`i \u015Bledzimy mi\u0119dzynarodowe badania`}
              <br />
              {` w dziedzinie edukacji`}
              <span className="text-fm-green">{`. `}</span>
            </h3>
            <p className="max-w-2xl text-body text-[#E8E8E8]">
              {`Baza wiedzy to zbi\u00F3r materia\u0142\u00F3w stworzonych przez trener\u00F3w fundacji oraz ekspert\u00F3w zewn\u0119trznych zajmuj\u0105cych si\u0119 nowoczesn\u0105 edukacj\u0105. `}
            </p>
            <p className="max-w-2xl text-body text-[#E8E8E8]">
              {`Znajduj\u0105 si\u0119 tam r\u00F3wnie\u017C badania i raporty publikowane przez jednostki naukowe.`}
            </p>
          </div>

          {/* PLACEHOLDER: Grid artykulow i CTA beda dodane w planie 08-02 */}
        </div>
      </div>
    </StickySection>
  );
}
