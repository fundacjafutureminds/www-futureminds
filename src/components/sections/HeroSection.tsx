import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex h-screen flex-col justify-center"
    >
      {/* Warstwa 0: Ilustracja rakiety (dekoracyjne tlo) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/dzieci-panorama4.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.15]"
          aria-hidden="true"
        />
      </div>

      {/* Warstwa 1: Logo + tekst misji */}
      <div className="relative z-10 w-full py-20 px-6 lg:ml-[350px] lg:px-12">
        {/* Logo z fadeInLeft */}
        <FadeIn direction="left">
          <Image
            src="/images/FMF-white.png"
            alt="Future Minds Foundation"
            width={300}
            height={95}
            className="mb-20 h-16 w-auto"
            priority
          />
        </FadeIn>

        {/* Tekst misji z fadeInRight i rosnacym delay */}
        <div className="max-w-xl space-y-6">
          <FadeIn direction="right" delay={0.1}>
            <p className="text-body text-[#E8E8E8]">
              Fundacja Future Minds wspiera każde dziecko i młodą osobę w
              realizacji pełnego potencjału poprzez innowacyjną edukację STEAM.
            </p>
          </FadeIn>
          <FadeIn direction="right" delay={0.2}>
            <p className="text-body text-[#E8E8E8]">
              Jako oficjalny operator programu FIRST LEGO League w Polsce,
              rozwijamy kompetencje przyszłości łącząc robotykę z kreatywnością i
              współpracą. Szkolimy nauczycieli w nowoczesnych metodach nauczania i
              technologiach przyszłości.
            </p>
          </FadeIn>
          <FadeIn direction="right" delay={0.3}>
            <p className="text-body text-[#E8E8E8]">
              We współpracy z partnerami biznesowymi tworzymy system stypendiów,
              zapewniając dostępność programów dla każdego dziecka niezależnie od
              pochodzenia.
            </p>
          </FadeIn>
          <FadeIn direction="right" delay={0.4}>
            <p className="text-body text-[#E8E8E8]">
              Budujemy odpowiedzialne społeczeństwo gotowe na wyzwania jutra,
              gdzie innowacja spotyka się z inkluzywnością.
            </p>
          </FadeIn>
        </div>
      </div>

    </section>
  );
}
