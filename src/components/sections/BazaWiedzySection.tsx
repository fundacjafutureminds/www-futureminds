import Image from "next/image";
import Link from "next/link";
import { StickySection } from "@/components/ui/StickySection";
import { FadeIn } from "@/components/ui/FadeIn";
import { ARTICLES, KNOWLEDGE_SECTION_NAV } from "@/lib/constants";
import type { Article } from "@/lib/types";

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="border-l border-[#FFFFFF54] px-[35px] pt-[5px]">
      {/* Kategoria 12px uppercase */}
      <p className="text-[12px] font-normal uppercase leading-[2em] text-fm-text-muted">
        {article.category}
      </p>
      {/* Tytul 22px/w300, hover zielony */}
      <h4 className="text-[22px] font-light leading-[1.1] text-[#EAEAEA] transition-colors hover:text-fm-green">
        <Link href={article.href}>{article.title}</Link>
      </h4>
      {/* Excerpt 15px */}
      {article.excerpt && (
        <p className="mt-5 mb-5 text-[15px] font-normal leading-[22px] tracking-[0.2px] text-[#D9D9D9]">
          {article.excerpt}
        </p>
      )}
      {/* Przycisk Wiecej — 13px, uppercase, bg #FFFFFF1A */}
      <Link
        href={article.href}
        className="mt-5 inline-block bg-[#FFFFFF1A] px-[30px] py-[8px] text-[13px] font-light uppercase tracking-[1.7px] text-[#E4E4E4] transition-colors hover:text-fm-green"
      >
        {`Wi\u0119cej`}
      </Link>
    </div>
  );
}

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
          <FadeIn direction="down">
            <h2
              className="mb-16 text-section text-[#EFEFEF]"
              style={{
                fontFamily: "'neue-haas-grotesk-display', var(--font-sans)",
              }}
            >
              {`Baza wiedzy`}
            </h2>
          </FadeIn>

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

          {/* Grid artykulow 3 kolumny */}
          <div className="w-[90%]">
            <FadeIn>
              <div className="grid grid-cols-1 gap-x-[90px] gap-y-[20px] lg:grid-cols-3">
                {ARTICLES.map((article) => (
                  <ArticleCard key={article.title} article={article} />
                ))}
              </div>
            </FadeIn>
          </div>

          {/* CTA + obrazek ksiazki */}
          <div className="mt-16 w-[80%]">
            <Link
              href="/publikacje"
              className="inline-block text-[44px] font-semibold leading-none text-white transition-colors hover:text-fm-green"
              style={{
                fontFamily: "'neue-haas-grotesk-display', var(--font-sans)",
              }}
            >
              {`Pe\u0142na baza wiedzy`}
            </Link>
            <div className="mt-8">
              <Link href="/publikacje">
                <Image
                  src="/images/ksiazki.png"
                  alt="Publikacje"
                  width={259}
                  height={200}
                  className="h-auto w-[259px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  );
}
