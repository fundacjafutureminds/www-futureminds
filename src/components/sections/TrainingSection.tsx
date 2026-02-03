import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TRAINING_TECHNOLOGIES } from "@/lib/constants";
import { Monitor, Users, Award, BookOpen } from "lucide-react";

const features = [
  {
    icon: <Monitor size={24} />,
    title: "Szkolenia online i stacjonarne",
    description: "Elastyczne formy nauki dostosowane do potrzeb uczestników.",
  },
  {
    icon: <Users size={24} />,
    title: "Doświadczeni trenerzy",
    description: "Praktycy z branży IT z wieloletnim doświadczeniem.",
  },
  {
    icon: <Award size={24} />,
    title: "Certyfikaty",
    description: "Potwierdzenie zdobytych kompetencji uznawane w branży.",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Materiały dydaktyczne",
    description: "Profesjonalne materiały i dostęp do platformy e-learningowej.",
  },
];

export function TrainingSection() {
  return (
    <section className="bg-fm-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Szkolenia i warsztaty"
          subtitle="Organizujemy profesjonalne szkolenia z najnowszych technologii dla młodzieży i dorosłych."
        />

        {/* Features */}
        <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto mb-4 inline-flex rounded-xl bg-fm-green/10 p-3 text-fm-green">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-semibold text-fm-dark">
                {feature.title}
              </h3>
              <p className="text-sm text-fm-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="mb-10 text-center">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-fm-gray-600">
            Technologie
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {TRAINING_TECHNOLOGIES.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-fm-gray-200 bg-white px-5 py-2 text-sm font-medium text-fm-dark transition-colors hover:border-fm-green hover:text-fm-green"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button href="/programy-edukacyjne">
            Sprawdź harmonogram szkoleń
          </Button>
        </div>
      </div>
    </section>
  );
}
