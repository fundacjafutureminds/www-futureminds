import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Aktualności" };

export default function AktualnosciPage() {
  return (
    <section className="pt-32 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <SectionHeading
          title="Aktualności"
          subtitle="Bądź na bieżąco z naszymi działaniami"
        />
        <div className="prose prose-lg mx-auto text-fm-gray-600">
          <p>
            Tutaj znajdziesz najnowsze informacje o naszych projektach,
            wydarzeniach i inicjatywach. Śledź nasze działania i dowiedz się,
            jak wspólnie kształtujemy przyszłość edukacji.
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
