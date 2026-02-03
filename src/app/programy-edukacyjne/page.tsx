import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Programy edukacyjne" };

export default function ProgramyEdukacyjnePage() {
  return (
    <section className="pt-32 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <SectionHeading
          title="Programy edukacyjne"
          subtitle="Innowacyjne programy rozwijające kompetencje przyszłości"
        />
        <div className="prose prose-lg mx-auto text-fm-gray-600">
          <p>
            Nasze programy edukacyjne łączą nowoczesne technologie z praktycznym
            podejściem do nauki. Oferujemy warsztaty, kursy i projekty dla
            dzieci, młodzieży i dorosłych na różnych poziomach zaawansowania.
          </p>
        </div>
        <div className="mt-10 text-center">
          <Button href="/" variant="outline">
            Wróć na stronę główną
          </Button>
        </div>
      </div>
    </section>
  );
}
