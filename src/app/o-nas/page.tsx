import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "O nas" };

export default function ONasPage() {
  return (
    <section className="pt-32 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <SectionHeading
          title="O nas"
          subtitle="Poznaj Fundację Future Minds"
        />
        <div className="prose prose-lg mx-auto text-fm-gray-600">
          <p>
            Fundacja Future Minds została założona z misją wspierania edukacji i
            rozwoju kompetencji przyszłości. Nasz zespół składa się z pasjonatów
            technologii, edukatorów i ekspertów branżowych, którzy wierzą w
            potencjał młodych ludzi.
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
