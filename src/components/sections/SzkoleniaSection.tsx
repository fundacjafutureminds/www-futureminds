import Image from "next/image";
import Link from "next/link";
import { StickySection } from "@/components/ui/StickySection";
import { FadeIn } from "@/components/ui/FadeIn";
import { TRAINING_SECTION_NAV, TECH_ICONS } from "@/lib/constants";

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
          <FadeIn direction="down">
            <h2
              className="mb-16 text-section text-[#EFEFEF]"
              style={{
                fontFamily: "'neue-haas-grotesk-display', var(--font-sans)",
              }}
            >
              Szkolenia
              <br /> dla nauczycieli
            </h2>
          </FadeIn>

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

          {/* CTA — duzy tekst-link 44px, w600 */}
          <div className="mb-16">
            <Link
              href="/szkolenia"
              className="inline-block text-[44px] font-semibold leading-none text-white transition-colors hover:text-fm-green"
              style={{
                fontFamily: "'neue-haas-grotesk-display', var(--font-sans)",
              }}
            >
              Poznaj
              <br />
              nasze szkolenia
            </Link>
          </div>

          {/* Rzad ikon technologii */}
          <div className="mb-16 flex flex-wrap items-center">
            {TECH_ICONS.map((icon, index) => (
              <div
                key={icon.alt}
                className={`flex h-16 items-center justify-center${
                  index === 0 ? " border-l border-[#FFFFFF54]" : ""
                }`}
                style={{ width: 140 }}
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={icon.width}
                  height={40}
                  className="h-8 w-auto brightness-0 invert"
                />
              </div>
            ))}
          </div>

          {/* Separator strzalka */}
          <div className="mt-16 flex justify-center" style={{ width: "60%" }}>
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
