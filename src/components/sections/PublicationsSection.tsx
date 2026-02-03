import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FileText, Download, ExternalLink } from "lucide-react";

const publications = [
  {
    title: "Kompetencje cyfrowe młodzieży w Polsce — raport 2024",
    type: "Raport",
    description:
      "Kompleksowa analiza poziomu kompetencji cyfrowych wśród polskiej młodzieży.",
  },
  {
    title: "Przewodnik po programowaniu dla nauczycieli",
    type: "Przewodnik",
    description:
      "Praktyczny poradnik wprowadzania nauki programowania do szkolnego programu.",
  },
  {
    title: "AI w edukacji — szanse i wyzwania",
    type: "Publikacja",
    description:
      "Analiza wpływu sztucznej inteligencji na procesy edukacyjne.",
  },
];

export function PublicationsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Baza wiedzy"
          subtitle="Publikacje, raporty i materiały edukacyjne tworzone przez naszych ekspertów."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {publications.map((pub) => (
            <Card key={pub.title} className="flex flex-col">
              <div className="mb-4 inline-flex items-center gap-2">
                <FileText size={20} className="text-fm-green" />
                <span className="rounded-full bg-fm-turquoise/20 px-3 py-1 text-xs font-medium text-fm-dark">
                  {pub.type}
                </span>
              </div>
              <h3 className="mb-2 font-semibold text-fm-dark">{pub.title}</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-fm-gray-600">
                {pub.description}
              </p>
              <div className="flex gap-3">
                <button className="inline-flex items-center gap-1 text-sm font-medium text-fm-green transition-colors hover:text-fm-green-dark">
                  <Download size={14} />
                  Pobierz PDF
                </button>
                <button className="inline-flex items-center gap-1 text-sm font-medium text-fm-gray-600 transition-colors hover:text-fm-dark">
                  <ExternalLink size={14} />
                  Czytaj online
                </button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/publikacje" variant="outline">
            Wszystkie publikacje
          </Button>
        </div>
      </div>
    </section>
  );
}
