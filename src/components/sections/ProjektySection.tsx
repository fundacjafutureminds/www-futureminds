import Image from "next/image";
import { StickySection } from "@/components/ui/StickySection";
import { FadeIn } from "@/components/ui/FadeIn";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/types";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border-l border-[#FFFFFF54] px-[25px] py-6">
      {/* Logo(s) */}
      {project.image && (
        <div className="mb-4 flex items-center gap-4">
          <Image
            src={project.image}
            alt={project.title}
            width={200}
            height={70}
            className="h-auto w-auto max-w-[212px]"
          />
          {project.secondaryImage && (
            <Image
              src={project.secondaryImage}
              alt=""
              width={160}
              height={70}
              className="h-auto w-auto max-w-[159px]"
            />
          )}
        </div>
      )}

      {/* Tytul — 22px, font-light (w300), line-height 1.1, letter-spacing 1px */}
      <h4 className="mb-4 mr-[45px] text-[22px] font-light leading-[1.1] tracking-[1px] text-[#EFEFEF]">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fm-green"
          >
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h4>

      {/* Opis — 15px, font-normal (w400), line-height 22px, letter-spacing 0.2px */}
      <p className="text-[15px] font-normal leading-[22px] tracking-[0.2px] text-[#E8E8E8]">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fm-green"
          >
            {project.description}
          </a>
        ) : (
          project.description
        )}
      </p>
    </div>
  );
}

export function ProjektySection() {
  return (
    <StickySection
      id="projekty"
      title="Projekty"
      sectionNumber="03"
      header={
        <h2 className="mb-16 text-section font-thin text-white/15">
          Projekty
        </h2>
      }
    >
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

          {/* Grid 3-kolumnowy kart projektow (3+3+1) */}
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>

          {/* Separator strzalka */}
          <div
            className="mt-16 flex justify-center"
            style={{ width: "60%" }}
          >
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
