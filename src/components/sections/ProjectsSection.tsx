import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PROJECTS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function ProjectsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Nasze projekty"
          subtitle="Realizujemy projekty łączące edukację z technologią, tworząc realne rozwiązania dla społeczności."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <Card key={project.title} className="flex flex-col">
              <h3 className="mb-2 text-xl font-semibold text-fm-dark">
                {project.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-fm-gray-600">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-fm-green/10 px-3 py-1 text-xs font-medium text-fm-green"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/projekty" variant="outline">
            Wszystkie projekty
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
