import { Award, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SCHOLARSHIP_STATS, PARTNERS } from "@/lib/constants";

const statIcons = [
  <Award key="award" size={24} />,
  <Users key="users" size={24} />,
  <TrendingUp key="trending" size={24} />,
];

export function ScholarshipsSection() {
  return (
    <section className="relative bg-fm-dark py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Programy stypendialne"
          subtitle="Wspieramy utalentowaną młodzież w realizacji ich edukacyjnych i zawodowych celów."
          light
        />

        {/* Stats */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {SCHOLARSHIP_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
            >
              <div className="mb-4 inline-flex rounded-xl bg-fm-green/10 p-3 text-fm-green">
                {statIcons[index]}
              </div>
              <div className="text-3xl font-bold text-fm-green">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-fm-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="mb-12 text-center">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-fm-gray-400">
            Nasi partnerzy
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm text-fm-gray-400"
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/programy-stypendialne" variant="primary">
            Złóż wniosek
          </Button>
          <Button href="/programy-stypendialne" variant="outline">
            Zasady przyznawania
          </Button>
          <Button href="/kontakt" variant="secondary">
            Zostań partnerem
          </Button>
        </div>
      </div>
    </section>
  );
}
