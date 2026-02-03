import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Kontakt" };

export default function KontaktPage() {
  return (
    <section className="pt-32 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <SectionHeading
          title="Kontakt"
          subtitle="Skontaktuj się z nami"
        />
        <div className="prose prose-lg mx-auto text-fm-gray-600">
          <p>
            Masz pytania dotyczące naszych programów? Chcesz nawiązać
            współpracę lub zostać partnerem fundacji? Napisz do nas — chętnie
            odpowiemy na wszystkie pytania.
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
