import Link from "next/link";
import { GraduationCap, Microscope, Code, Lightbulb, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROGRAMS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={32} />,
  Microscope: <Microscope size={32} />,
  Code: <Code size={32} />,
  Lightbulb: <Lightbulb size={32} />,
};

export function ProgramsSection() {
  return (
    <section className="bg-fm-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Programy edukacyjne"
          subtitle="Rozwijamy kompetencje przyszłości poprzez innowacyjne programy edukacyjne dla dzieci i młodzieży."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((program) => (
            <Link key={program.title} href={program.href} className="group">
              <Card className="h-full">
                <div className="mb-4 inline-flex rounded-xl bg-fm-green/10 p-3 text-fm-green">
                  {iconMap[program.icon]}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-fm-dark">
                  {program.title}
                </h3>
                <p className="text-sm leading-relaxed text-fm-gray-600">
                  {program.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-fm-green transition-transform group-hover:translate-x-1">
                  Więcej <ArrowRight size={14} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
