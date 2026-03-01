import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { PROGRAMS, PARTNER_LOGOS, PROJECTS } from "@/lib/constants";

const STATS = [
  { value: "16+", label: "lat doświadczenia" },
  { value: "4", label: "programy edukacyjne" },
  { value: "200+", label: "stypendiów rocznie" },
  { value: "9", label: "partnerów strategicznych" },
];

export default function V2Page() {
  return (
    <div className="min-h-screen">
      {/* ── Nav ── */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/[0.06] bg-[#1e2024]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <Link href="/v2">
            <Image
              src="/images/FMF-white.png"
              alt="Future Minds Foundation"
              width={140}
              height={44}
              className="h-8 w-auto"
            />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {["Programy", "Projekty", "Partnerzy", "O nas", "Kontakt"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-[14px] font-light tracking-wide text-white/50 transition-colors hover:text-fm-green"
                >
                  {item}
                </a>
              )
            )}
            <a
              href="/"
              className="rounded-lg border border-white/10 px-4 py-1.5 text-[13px] font-light text-white/40 transition-colors hover:border-white/20 hover:text-white/60"
            >
              V1
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/dzieci-panorama4.png"
            alt=""
            fill
            className="object-cover object-center opacity-[0.08]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1c20]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-8 py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <FadeIn direction="up">
                <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-thin leading-[1.05] tracking-tight text-white/90">
                  Budujemy{" "}
                  <span className="text-fm-green">przyszłość</span>
                  <br />
                  <span className="text-white/30">przez edukację</span>
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.15}>
                <p className="mt-8 max-w-lg text-[17px] font-extralight leading-relaxed text-white/50">
                  Fundacja Future Minds wspiera dzieci i młodzież w realizacji
                  pełnego potencjału poprzez innowacyjną edukację STEAM. Jako
                  oficjalny operator FIRST LEGO League w Polsce, łączymy
                  robotykę z kreatywnością.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.3}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#programy"
                    className="rounded-full bg-fm-green px-7 py-3 text-[14px] font-medium tracking-wide text-fm-dark transition-all hover:bg-fm-green/90 hover:shadow-[0_0_24px_rgba(154,252,78,0.2)]"
                  >
                    Poznaj nasze programy
                  </a>
                  <a
                    href="#o-nas"
                    className="rounded-full border border-white/15 px-7 py-3 text-[14px] font-light tracking-wide text-white/60 transition-colors hover:border-white/30 hover:text-white/80"
                  >
                    O fundacji
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right side: feature highlights */}
            <FadeIn direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: "🤖",
                    title: "Robotyka",
                    desc: "FIRST LEGO League i SPIKE Prime",
                  },
                  {
                    icon: "⚡",
                    title: "Energia",
                    desc: "OZEdukacja i świadomość energetyczna",
                  },
                  {
                    icon: "🎓",
                    title: "Stypendia",
                    desc: "Ponad 200 stypendiów rocznie",
                  },
                  {
                    icon: "🏫",
                    title: "Szkolenia",
                    desc: "Akademia dla nauczycieli STEAM",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.05]"
                  >
                    <div className="mb-3 text-2xl">{item.icon}</div>
                    <h3 className="text-[15px] font-medium text-white/80">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[13px] font-extralight leading-snug text-white/35">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative border-y border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-8 py-20">
          <StaggerContainer staggerDelay={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 text-center transition-colors hover:bg-white/[0.05]">
                  <div className="text-[3.5rem] font-thin leading-none tracking-tight text-fm-green">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-[14px] font-extralight tracking-wide text-white/40">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Programs ── */}
      <section id="programy" className="relative">
        <div className="mx-auto max-w-7xl px-8 py-28">
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-thin tracking-tight text-white/90">
                Programy{" "}
                <span className="text-white/25">edukacyjne</span>
              </h2>
              <p className="mt-4 max-w-xl text-[16px] font-extralight leading-relaxed text-white/40">
                Realizujemy globalne i lokalne programy edukacyjne, które
                uzupełniają braki systemu edukacyjnego.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-5 md:grid-cols-2">
            {PROGRAMS.map((program, i) => (
              <FadeIn key={program.title} direction="up" delay={i * 0.1}>
                <Link
                  href={program.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all hover:border-white/[0.1] hover:bg-white/[0.04]"
                >
                  <div className="mb-6 h-10">
                    <Image
                      src={program.logo}
                      alt={program.title}
                      width={program.logoWidth}
                      height={program.logoHeight}
                      className="h-full w-auto object-contain opacity-70 brightness-0 invert transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="text-[18px] font-light text-white/80 group-hover:text-fm-green">
                    {program.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14px] font-extralight leading-relaxed text-white/35">
                    {program.description.length > 180
                      ? program.description.slice(0, 180) + "..."
                      : program.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[12px] font-light uppercase tracking-[2px] text-white/25 transition-colors group-hover:text-fm-green/70">
                    Więcej
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Thin separator ── */}
      <div className="mx-auto max-w-7xl px-8">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ── Projects ── */}
      <section id="projekty" className="relative">
        <div className="mx-auto max-w-7xl px-8 py-28">
          <FadeIn>
            <h2 className="mb-16 text-[clamp(1.8rem,3vw,2.5rem)] font-thin tracking-tight text-white/90">
              Projekty{" "}
              <span className="text-white/25">i inicjatywy</span>
            </h2>
          </FadeIn>

          <StaggerContainer staggerDelay={0.07} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 6).map((project) => (
              <StaggerItem key={project.title}>
                <div className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.1] hover:bg-white/[0.04]">
                  <div className="mb-4 flex h-12 items-center">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt=""
                        width={120}
                        height={48}
                        className="h-10 w-auto object-contain opacity-50 brightness-0 invert"
                      />
                    )}
                  </div>
                  <h3 className="text-[15px] font-light leading-snug text-white/70 group-hover:text-white/90">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] font-extralight leading-relaxed text-white/30">
                    {project.description.length > 140
                      ? project.description.slice(0, 140) + "..."
                      : project.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Partners ── */}
      <section
        id="partnerzy"
        className="border-y border-white/[0.06] bg-white/[0.02]"
      >
        <div className="mx-auto max-w-7xl px-8 py-16">
          <FadeIn>
            <p className="mb-10 text-center text-[12px] font-light uppercase tracking-[3px] text-white/25">
              Nasi partnerzy
            </p>
          </FadeIn>
          <StaggerContainer
            staggerDelay={0.05}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
          >
            {PARTNER_LOGOS.map((partner) => (
              <StaggerItem key={partner.name}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain opacity-30 brightness-0 invert transition-opacity hover:opacity-60"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Mission / About ── */}
      <section id="o-nas" className="relative">
        <div className="mx-auto max-w-7xl px-8 py-28">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <div>
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-thin leading-[1.15] tracking-tight text-white/90">
                  Innowacyjna edukacja
                  <br />
                  <span className="text-fm-green/80">dla każdego dziecka</span>
                </h2>
                <div className="mt-2 h-px w-24 bg-fm-green/30" />
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="space-y-6">
                <p className="text-[16px] font-extralight leading-relaxed text-white/50">
                  Dążymy do kształtowania odpowiedzialnego i zaangażowanego
                  społeczeństwa, które myśli krytycznie i jest gotowe na
                  dynamicznie zmieniający się świat.
                </p>
                <p className="text-[16px] font-extralight leading-relaxed text-white/50">
                  Naszą misją jest sprawienie, aby głos dzieci był słyszalny
                  oraz wykorzystywanie ich pomysłów i wizji do inspirowania
                  liderów na całym świecie.
                </p>
                <p className="text-[16px] font-extralight leading-relaxed text-white/50">
                  We współpracy z partnerami biznesowymi tworzymy system
                  stypendiów, zapewniając dostępność programów dla każdego
                  dziecka niezależnie od pochodzenia.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-8 py-28">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-thin tracking-tight text-white/90">
                Dołącz do nas
              </h2>
              <p className="mt-5 text-[16px] font-extralight leading-relaxed text-white/40">
                Zostań partnerem, sponsorem stypendium lub zapisz swoją szkołę
                do jednego z naszych programów. Razem zmieniamy edukację.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/kontakt"
                  className="rounded-full bg-fm-green px-8 py-3.5 text-[14px] font-medium tracking-wide text-fm-dark transition-all hover:bg-fm-green/90 hover:shadow-[0_0_24px_rgba(154,252,78,0.2)]"
                >
                  Skontaktuj się z nami
                </Link>
                <Link
                  href="/csr"
                  className="rounded-full border border-white/15 px-8 py-3.5 text-[14px] font-light tracking-wide text-white/60 transition-colors hover:border-white/30 hover:text-white/80"
                >
                  Oferta dla biznesu
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-8">
          <Image
            src="/images/FMF-white.png"
            alt="Future Minds Foundation"
            width={100}
            height={32}
            className="h-6 w-auto opacity-30"
          />
          <p className="text-[12px] font-extralight text-white/20">
            Future Minds Foundation
          </p>
        </div>
      </footer>
    </div>
  );
}
