import Image from "next/image";
import Link from "next/link";
import { StickySection } from "@/components/ui/StickySection";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { TextReveal } from "@/components/ui/TextReveal";
import {
  PARTNER_LOGOS,
  SCHOLARSHIP_SECTION_NAV,
  SCHOLARSHIP_BLOG_POSTS,
  SCHOLARSHIP_CTA_CARDS,
} from "@/lib/constants";

export function ProgramyStypendialneSection() {
  return (
    <StickySection
      variant="light"
      id="programy-stypendialne"
      title="Programy Stypendialne"
      sectionNumber="02"
      navLinks={SCHOLARSHIP_SECTION_NAV}
      header={
        <TextReveal
          text={"Programy\nstypendialne"}
          className="mb-16 text-section font-thin text-[#2b2f33]"
        />
      }
    >
      <div className="relative">
        {/* Overlay 1: Tło stypendia */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/Tlo-STYPENDIA.png"
            alt=""
            fill
            className="object-contain object-right opacity-10"
            aria-hidden="true"
          />
        </div>
        {/* Overlay 2: skrzydło dekoracyjne */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/skrzydlo2.png"
            alt=""
            fill
            className="object-contain object-right-top opacity-[0.08]"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10">
          {/* Layout 60/40 */}
          <div className="flex gap-0">
            {/* Lewa kolumna 60% — intro headings + logotypy */}
            <div className="w-[60%] space-y-8">
              {/* Intro heading z zielonym akcentem */}
              <h3 className="max-w-3xl text-heading text-[#2b2f33]">
                Łączymy{" "}
                <span className="text-fm-green">
                  odpowiedzialne społecznie firmy
                </span>{" "}
                z dziećmi, które potrzebują wsparcia na starcie.
              </h3>
              <p className="max-w-2xl text-body text-[#3C3C3C]">
                Sukces opiera się na duchu dzielenia się - dzielenia się wiedzą,
                doświadczeniem i możliwościami.
              </p>
              <p className="max-w-2xl text-body text-[#3C3C3C]">
                Poprzez umożliwienie młodym ludziom uczestnictwa w
                międzynarodowych programach edukacyjnych, nie tylko umacniamy ich
                kompetencje w obszarze nauki, technologii, inżynierii i
                matematyki, ale również inspirujemy ich do wykorzystywania
                zdobytej wiedzy na rzecz rozwiązywania rzeczywistych problemów
                świata.
              </p>

              {/* Partnerzy strategiczni — grid 9 logotypów */}
              <div className="pt-8">
                <p className="mb-8 text-body text-[#3C3C3C]">
                  Partnerzy strategiczni
                </p>
                <StaggerContainer staggerDelay={0.08} className="flex max-w-[600px] flex-wrap items-center gap-6">
                  {PARTNER_LOGOS.map((partner) => (
                    <StaggerItem key={partner.name}>
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        width={140}
                        height={50}
                        className="h-10 w-auto opacity-70 transition-opacity hover:opacity-100"
                      />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>

            {/* Prawa kolumna 40% — blog widget */}
            <div className="w-[40%]">
              <FadeIn direction="right" delay={0.2}>
                <div className="space-y-10">
                  {SCHOLARSHIP_BLOG_POSTS.map((post) => (
                    <div
                      key={post.title}
                      className="border-l border-black/15 py-0 pl-[35px] pr-[35px]"
                    >
                      <p className="text-[12px] font-normal uppercase leading-[2em] text-[#6b6b6b]">
                        {post.category}
                      </p>
                      <h4 className="text-[22px] font-light leading-[1.1] text-[#2b2f33] transition-colors hover:text-fm-green">
                        <Link href={post.href}>{post.title}</Link>
                      </h4>
                      <p className="mt-5 mb-5 text-[15px] font-normal leading-[22px] tracking-[0.2px] text-[#3C3C3C]">
                        {post.excerpt}
                      </p>
                      <Link
                        href={post.href}
                        className="inline-block border-b border-black/10 pb-2 text-[11px] font-light uppercase tracking-[3px] text-[#2b2f33] transition-colors hover:border-fm-green hover:text-fm-green"
                      >
                        Więcej
                      </Link>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Karty CTA */}
          <div className="mt-16 w-[78%]">
            {/* Dwie pierwsze karty obok siebie */}
            <div className="flex gap-0">
              {SCHOLARSHIP_CTA_CARDS.slice(0, 2).map((card, index) => (
                <FadeIn
                  key={card.keyword}
                  direction={index === 0 ? "left" : "right"}
                  delay={0.4}
                  className="w-[50%]"
                >
                  <div className="w-full space-y-8 pr-8">
                    <h3
                      className="text-[42px] font-semibold leading-[1.1] tracking-[0.6px] text-[#2b2f33]"
                    >
                      {card.title}
                      <br />
                      <span className="text-fm-green text-[70px]">
                        {card.keyword}
                      </span>
                      <br />
                      {card.suffix}
                    </h3>
                    <Image
                      src={card.image}
                      alt={`${card.title} ${card.keyword} ${card.suffix}`}
                      width={400}
                      height={300}
                      className="w-full"
                    />
                    <Link
                      href={card.href}
                      className="inline-block border-b border-black/10 pb-2 text-[11px] font-light uppercase tracking-[3px] text-[#2b2f33] transition-colors hover:border-fm-green hover:text-fm-green"
                    >
                      Więcej
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Trzecia karta — szersza (~87%) */}
            <FadeIn>
              <div className="mt-12 w-[87%] space-y-8">
                <h3
                  className="text-[42px] font-semibold leading-[1.1] tracking-[0.6px] text-[#2b2f33]"
                >
                  {SCHOLARSHIP_CTA_CARDS[2].title}
                  <br />
                  <span className="text-fm-green text-[70px]">
                    {SCHOLARSHIP_CTA_CARDS[2].keyword}
                  </span>
                  <br />
                  {SCHOLARSHIP_CTA_CARDS[2].suffix}
                </h3>
                <Image
                  src={SCHOLARSHIP_CTA_CARDS[2].image}
                  alt={`${SCHOLARSHIP_CTA_CARDS[2].title} ${SCHOLARSHIP_CTA_CARDS[2].keyword} ${SCHOLARSHIP_CTA_CARDS[2].suffix}`}
                  width={600}
                  height={400}
                  className="w-full"
                />
                <Link
                  href={SCHOLARSHIP_CTA_CARDS[2].href}
                  className="inline-block border-b border-black/10 pb-2 text-[11px] font-light uppercase tracking-[3px] text-[#2b2f33] transition-colors hover:border-fm-green hover:text-fm-green"
                >
                  Więcej
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Separator strzałka */}
          <div className="mt-16 flex justify-center" style={{ width: "60%" }}>
            <Image
              src="/images/Strzalka-w-dol.png"
              alt=""
              width={59}
              height={13}
              className="opacity-40 invert"
            />
          </div>
        </div>
      </div>
    </StickySection>
  );
}
