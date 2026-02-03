import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Publikacje" };

export default function PublikacjePage() {
  return (
    <section className="pt-32 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <SectionHeading
          title="Publikacje"
          subtitle="Raporty, analizy i materiały edukacyjne"
        />
        <div className="prose prose-lg mx-auto text-fm-gray-600">
          <p>
            W naszej bazie wiedzy znajdziesz raporty badawcze, przewodniki
            metodyczne i materiały edukacyjne tworzone przez ekspertów fundacji.
            Wszystkie publikacje są dostępne bezpłatnie.
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
