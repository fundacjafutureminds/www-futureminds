import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Programy stypendialne" };

export default function ProgramyStypendialePage() {
  return (
    <section className="pt-32 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <SectionHeading
          title="Programy stypendialne"
          subtitle="Wspieramy utalentowaną młodzież"
        />
        <div className="prose prose-lg mx-auto text-fm-gray-600">
          <p>
            Programy stypendialne Fundacji Future Minds pomagają młodym, zdolnym
            osobom w realizacji ich edukacyjnych i zawodowych aspiracji.
            Oferujemy wsparcie finansowe, mentoring i dostęp do sieci kontaktów.
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
