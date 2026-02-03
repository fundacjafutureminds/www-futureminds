import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Polityka prywatności" };

export default function PolitykaPrywatnosciPage() {
  return (
    <section className="pt-32 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <SectionHeading
          title="Polityka prywatności"
          subtitle="Informacje o przetwarzaniu danych osobowych"
        />
        <div className="prose prose-lg mx-auto text-fm-gray-600">
          <p>
            Fundacja Future Minds przywiązuje dużą wagę do ochrony prywatności.
            Poniżej znajdziesz informacje o tym, w jaki sposób zbieramy,
            przetwarzamy i chronimy Twoje dane osobowe zgodnie z RODO.
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
