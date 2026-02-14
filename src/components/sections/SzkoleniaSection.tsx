import Image from "next/image";
import { StickySection } from "@/components/ui/StickySection";
import { TRAINING_SECTION_NAV } from "@/lib/constants";

export function SzkoleniaSection() {
  return (
    <StickySection
      id="szkolenia"
      title="Szkolenia"
      sectionNumber="04"
      navLinks={TRAINING_SECTION_NAV}
    >
      <div className="relative">
        {/* Overlay szkolenia.png */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/szkolenia.png"
            alt=""
            fill
            className="object-contain object-right-top opacity-[0.19]"
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
            Szkolenia
            <br /> dla nauczycieli
          </h2>

          {/* Opis — pelny tekst z Elementora (19px, w200, #E8E8E8) */}
          <div className="mb-16 space-y-8">
            <p className="max-w-2xl text-body text-[#E8E8E8]">
              Szkolenia dla nauczycieli realizujemy w ramach Akademii LEGO
              Education i Akademii Future Minds, zapewniaj{"\u0105"}c nauczycielom
              solidne fundamenty w obszarach nowoczesnych technologii:
              robotyce, sztucznej inteligencji i elektronice oraz
              innowacyjnych i anga{"\u017C"}uj{"\u0105"}cych metodach nauczania.
              Podczas szkole{"\u0144"} nauczyciele dowiaduj{"\u0105"} si{"\u0119"}, jak
              rozwija{"\u0107"} kluczowe umiej{"\u0119"}tno{"\u015B"}ci XXI wieku u swoich
              uczni{"\u00F3"}w i jak wspiera{"\u0107"} ich holistyczny rozw{"\u00F3"}j.
            </p>
          </div>

          {/* CTA i ikony technologii — Plan 07-02 */}

        </div>
      </div>
    </StickySection>
  );
}
