import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { NEWS_ITEMS } from "@/lib/constants";
import { Calendar, ArrowRight } from "lucide-react";

export function NewsSection() {
  return (
    <section className="bg-fm-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Aktualności"
          subtitle="Bądź na bieżąco z naszymi działaniami i wydarzeniami."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {NEWS_ITEMS.map((item) => (
            <Link key={item.title} href={item.href} className="group">
              <Card className="flex h-full flex-col">
                {/* Placeholder image area */}
                <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-fm-gray-100">
                  <span className="text-sm text-fm-gray-400">Zdjęcie</span>
                </div>

                <div className="mb-2 flex items-center gap-2 text-xs text-fm-gray-400">
                  <Calendar size={12} />
                  <time>
                    {new Date(item.date).toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>

                <h3 className="mb-2 font-semibold text-fm-dark group-hover:text-fm-green">
                  {item.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-fm-gray-600">
                  {item.excerpt}
                </p>

                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-fm-green transition-transform group-hover:translate-x-1">
                  Czytaj dalej <ArrowRight size={14} />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/aktualnosci" variant="outline">
            Wszystkie aktualności
          </Button>
        </div>
      </div>
    </section>
  );
}
