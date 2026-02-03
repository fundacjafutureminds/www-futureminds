import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Projekty" };

export default function ProjektyPage() {
  return (
    <section className="pt-32 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <SectionHeading
          title="Projekty"
          subtitle="Technologia w służbie edukacji i społeczności"
        />
        <div className="prose prose-lg mx-auto text-fm-gray-600">
          <p>
            Realizujemy projekty łączące edukację z najnowszymi technologiami.
            Od cyfrowych platform edukacyjnych po lokalne inicjatywy społeczne
            — każdy projekt ma na celu tworzenie realnej wartości.
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
